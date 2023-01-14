/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

import { PrismaService } from '../prisma/prisma.service';
import { RawSearchDto } from './dto';
import WIT from 'src/shared/connectors/wit';
import HttpErrors from './errors';
import { MinimalError, MoralisResponse, WITResolver } from './types';
import { MoralisExecutor } from './types/moralis-executor';
import IArcoEngine from './interfaces/arco-engine';
import { WEB3Provider } from 'src/shared/connectors/moralis';
import { INTENTS } from 'src/shared/nlp/intents';
import { Search } from '@prisma/client';
import { ENTITIES } from 'src/shared/nlp/entities';

@Injectable()
export class SearchService implements IArcoEngine {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService
  ) {}

  /**
   * -Getters-
   */
  async getAllSearches(): Promise<Search[]> {
    return this.prisma.search.findMany({
      include: {
        profile: true,
        intents: true,
        entities: true,
      },
    });
  }

  async getSearchesByUserId(userId: number): Promise<Search[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    if (profile) {
      return this.prisma.search.findMany({
        where: {
          profileId: profile.id,
        },
        include: {
          intents: true,
          entities: true,
        },
      });
    }
  }

  /**
   * -Posts-
   */

  // 0 - User search (GUI -advanced- or NLP -raw text-)
  async searchAdvanced() {}
  // NLP Search (raw)
  async searchRaw(
    userId: number,
    dto: RawSearchDto
  ): Promise<MinimalError | MoralisResponse> {
    const { query } = dto;
    try {
      // NLP search processing
      const oracleResponse = await this.resolveWitAIOracle(query);

      if (oracleResponse.status === 200) {
        const mExecutor: MoralisExecutor = this.unpackWitAIResolver(
          oracleResponse.data
        );

        const resolvedMExecutor = await this.resolveMoralisExecutor(
          userId,
          mExecutor,
          query
        );
        if (resolvedMExecutor.status === 200) {
          // We compose Moralis http response with Wit.ai action scheme ID/Code to acknowledge the front-end about types
          const base = mExecutor.entities.actions[0];
          const actionEntity = ENTITIES.find((e) => e.id === base);

          return {
            data: resolvedMExecutor.data,
            action: actionEntity,
          } as MoralisResponse;
        }
        throw new HttpException(HttpErrors.MORALIS(), 500);
      }

      throw new HttpException(HttpErrors.WIT_AI(), 500);
    } catch (e) {
      console.log(e);
      throw new HttpException(HttpErrors.UNKNOWN(), 500);
    }
  }

  // 1st - Api call to Resolve with WIT.ai user Query
  async resolveWitAIOracle(query: string): Promise<AxiosResponse> {
    return await this.httpService.axiosRef.get(WIT.query(query), {
      headers: {
        Authorization: this.config.get('WIT_AI_KEY'),
      },
    });
  }

  // 2nd - Unpack Wit.ai response <-> Moralis Exec.
  unpackWitAIResolver(resolver: WITResolver): MoralisExecutor {
    return WIT.unpackResolver(resolver);
  }

  // 3rd - Translate Executor to a Functional Query to send against Moralis server
  async resolveMoralisExecutor(
    userId: number,
    mExecutor: MoralisExecutor,
    query: string
  ): Promise<AxiosResponse> {
    const resolvedMExecutor = WEB3Provider.resolveConnector(mExecutor);
    const url = WEB3Provider.hydrateURL(
      JSON.parse(JSON.stringify(mExecutor)), // object deep cloned to splice patterns for URL composition without affecting data to store in DDBB
      resolvedMExecutor
    );
    try {
      // ddbb writes exec.
      await this.writeDB(userId, mExecutor, query, url);
    } catch (e) {
      throw Error(HttpErrors.DDBB().error);
    }
    // return api data
    return await this.httpService.axiosRef.get(url, {
      headers: {
        'x-api-key': this.config.get('MORALIS_KEY'),
      },
    });
  }

  // 4th - In parallel, save/write metadata to Postgresql ddbb linked to User
  async writeDB(
    userId: number,
    mExecutor: MoralisExecutor,
    query: string,
    urlComposed: string
  ): Promise<void> {
    // first we need the profile associated to User
    const userProfile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    const search = await this.saveRawSearch(userProfile.id, urlComposed);
    this.saveIntentMeta(search.id, query, mExecutor);
    this.saveEntityMeta(search.id, query, mExecutor);
    // TO-DO: this.saveTagsMeta
  }

  /**
   * - Save URL final search -
   * @param profileId
   * @param url
   */
  async saveRawSearch(profileId: number, url: string): Promise<Search> {
    // we get the Profile ID and use it to create new Search -url- composed
    return await this.prisma.search.create({
      data: {
        query: url,
        profileId: profileId,
      },
    });
  }

  /**
   * Func to save Entity -metadata- (actions + chains + patterns) to DDBB
   * @param searchId
   * @param query
   * @param mExecutor
   */
  async saveEntityMeta(
    searchId: number,
    query: string,
    mExecutor: MoralisExecutor
  ): Promise<void> {
    /**
     *************************** Entity: CHAIN **************************
     */
    if (mExecutor.entities.chains.length > 0) {
      let entityChain = await this.prisma.nLPEntity.findUnique({
        where: {
          witUuid: mExecutor.entities.chains[0],
        },
      });
      if (!entityChain) {
        entityChain = await this.prisma.nLPEntity.create({
          data: {
            witUuid: mExecutor.entities.chains[0],
            name:
              ENTITIES.find((i) => i.id === mExecutor.entities.chains[0])
                .name ?? '',
          },
        });
      }
      await this.prisma.nLPEntityDecoded.create({
        data: {
          nlpEntityId: entityChain.id,
          searchId,
          values: WEB3Provider.resolveChain(mExecutor.entities.chains[0]),
        },
      });
    }
    /**
     *************************** Entity: ACTION **************************
     */
    if (mExecutor.entities.actions.length > 0) {
      let entityAction = await this.prisma.nLPEntity.findUnique({
        where: {
          witUuid: mExecutor.entities.actions[0],
        },
      });
      if (!entityAction) {
        entityAction = await this.prisma.nLPEntity.create({
          data: {
            witUuid: mExecutor.entities.actions[0],
            name:
              ENTITIES.find((i) => i.id === mExecutor.entities.actions[0])
                .name ?? '',
          },
        });
      }
      await this.prisma.nLPEntityDecoded.create({
        data: {
          nlpEntityId: entityAction.id,
          searchId,
          values: query,
        },
      });
    }
    /**
     *************************** Entity: PATTERNS **************************
     */
    const writeEntityPattern = async (p: {
      pattern_id: string;
      value: string;
    }) => {
      let entityPattern = await this.prisma.nLPEntity.findUnique({
        where: {
          witUuid: p.pattern_id,
        },
      });
      if (!entityPattern) {
        entityPattern = await this.prisma.nLPEntity.create({
          data: {
            witUuid: p.pattern_id,
            name: ENTITIES.find((e) => e.id === p.pattern_id).name ?? '',
          },
        });
      }
      await this.prisma.nLPEntityDecoded.create({
        data: {
          nlpEntityId: entityPattern.id,
          searchId,
          values: p.value,
        },
      });
    };
    await Promise.all([
      ...mExecutor.entities.patterns.map(
        async (p) => await writeEntityPattern(p)
      ),
    ]);
  }

  /**
   * Func to save Intent -metadata- (full search) to DDBB
   * @param searchId
   * @param query
   * @param mExecutor
   */
  async saveIntentMeta(
    searchId: number,
    query: string,
    mExecutor: MoralisExecutor
  ): Promise<void> {
    let intent = await this.prisma.nLPIntent.findUnique({
      where: {
        witUuid: mExecutor.intent,
      },
    });
    if (!intent) {
      intent = await this.prisma.nLPIntent.create({
        data: {
          witUuid: mExecutor.intent,
          name: INTENTS.find((i) => i.id === mExecutor.intent)?.name ?? '',
        },
      });
    }
    await this.prisma.nLPIntentDecoded.create({
      data: {
        nlpIntentId: intent.id,
        searchId,
        value: query,
      },
    });
  }
}
