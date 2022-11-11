/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

import { PrismaService } from '../prisma/prisma.service';
import { RawSearchDto } from './dto';
import WIT from 'src/shared/connectors/wit';
import HttpErrors from './errors';
import { MinimalError, WITResolver } from './types';
import { MoralisExecutor } from './types/moralis-executor';
import IArcoEngine from './interfaces/arco-engine';

@Injectable()
export class SearchService implements IArcoEngine {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService
  ) {}

  // TO-DO
  async searchAdvanced() {}

  async searchRaw(
    userId: number,
    dto: RawSearchDto
  ): Promise<MinimalError | MoralisExecutor> {
    const { query } = dto;
    try {
      const resolver = await this.resolveWitAIOracle(query).then((response) => {
        if (response.status === 200) {
          return this.unpackWitAIResolver(response.data);
        }
        return HttpErrors.WIT_AI();
      });
      return resolver;
    } catch (e) {
      return HttpErrors.WIT_AI();
    }
  }

  // 1
  async resolveWitAIOracle(query: string): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get(WIT.query(query), {
      headers: {
        Authorization: this.config.get('WIT_AI_KEY'),
      },
    });
  }

  // 2
  unpackWitAIResolver(resolver: WITResolver): MoralisExecutor {
    const mExecutor: MoralisExecutor = {
      // Scheme
      intent: resolver.intents[0].id, // Intent appended
      entities: {
        actions: [],
        chains: [],
        patterns: [],
      },
      traits: [],
    };

    // Entities appended
    Object.keys(resolver.entities).forEach((key) => {
      if (key.startsWith('CHAIN')) {
        // CHAINS
        mExecutor.entities.chains.push(resolver.entities[key][0].id);
      } else if (key.startsWith('PATTERN')) {
        // PATTERNS
        mExecutor.entities.patterns.push({
          pattern_id: resolver.entities[key][0].id,
          value: resolver.entities[key][0].value,
        });
      } else {
        // ACTIONS (all) - NFT, TRANSFERS, DEFI, BLOCKS, EVENTS...
        mExecutor.entities.actions.push(resolver.entities[key][0].id);
      }
    });

    // Traits appended
    Object.keys(resolver.traits).forEach((key) => {
      mExecutor.traits.push({
        trait_id: resolver.traits[key][0].id,
        trait_name: key,
        value: resolver.traits[key][0].value,
      });
    });

    return mExecutor;
  }

  // 3 - Moralis Search
  resolveMoralisExecutor(executor: MoralisExecutor): void {
    //
  }

  // 4 - DDBB savings (write) by UserId
  writeDB(): void {}
}
