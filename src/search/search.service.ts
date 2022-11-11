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
import { Args, WEB3Provider } from 'src/shared/connectors/moralis';

@Injectable()
export class SearchService implements IArcoEngine {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService
  ) {}

  // GUI search (advanced?)
  async searchAdvanced() {}

  // NLP Search (raw)
  async searchRaw(
    userId: number,
    dto: RawSearchDto
  ): Promise<
    MinimalError | any //{ fn: (...args: string[]) => string; spec: string }
  > {
    const { query } = dto;
    try {
      const resolver = await this.resolveWitAIOracle(query).then((response) => {
        if (response.status === 200) {
          const mExecutor: MoralisExecutor = this.unpackWitAIResolver(
            response.data
          );
          const resolvedMExecutor = this.resolveMoralisExecutor(mExecutor);
          return { resolvedMExecutor, fn: resolvedMExecutor.toString() };
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
    return WIT.unpackResolver(resolver);
  }

  // 3 - Moralis Search
  resolveMoralisExecutor(executor: MoralisExecutor): {
    fn: (...args: Args[]) => string;
    spec: string;
  } {
    return WEB3Provider.resolveConnector(executor);
  }

  // 4 - DDBB savings (write) by UserId
  writeDB(): void {}
}
