/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
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

@Injectable()
export class SearchService implements IArcoEngine {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService
  ) {}

  // 0 - User search (GUI -advanced- or NLP -raw-)
  async searchAdvanced() {}
  // NLP Search (raw)
  async searchRaw(
    userId: number,
    dto: RawSearchDto
  ): Promise<MinimalError | MoralisResponse> {
    const { query } = dto;
    try {
      const oracleResponse = await this.resolveWitAIOracle(query);
      if (oracleResponse.status === 200) {
        const mExecutor: MoralisExecutor = this.unpackWitAIResolver(
          oracleResponse.data
        );
        const resolvedMExecutor = await this.resolveMoralisExecutor(mExecutor);
        if (resolvedMExecutor.status === 200) {
          return resolvedMExecutor.data as MoralisResponse;
        }
        return HttpErrors.MORALIS();
      }
      return HttpErrors.WIT_AI();
    } catch (e) {
      return HttpErrors.WIT_AI();
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
    executor: MoralisExecutor
  ): Promise<AxiosResponse> {
    const resolvedMExecutor = WEB3Provider.resolveConnector(executor);
    const url = WEB3Provider.hydrateURL(executor, resolvedMExecutor);
    return await this.httpService.axiosRef.get(url, {
      headers: {
        'x-api-key': this.config.get('MORALIS_KEY'),
      },
    });
  }

  // 4th - In parallel, save/write Data to Postgresql ddbb linked to User
  writeDB(): void {}
}
