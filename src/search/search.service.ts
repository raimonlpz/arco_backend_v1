/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RawSearchDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import WIT from 'src/wit.ai/wit';
import HttpErrors from './errors';

@Injectable()
export class SearchService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private config: ConfigService
  ) {}

  async searchAdvanced() {}

  async searchRaw(userId: number, dto: RawSearchDto) {
    const { query } = dto;
    try {
      const resolver = await this.resolveWitAIOracle(query).then((response) => {
        if (response.status === 200) return response.data;
        return HttpErrors.WIT_AI();
      });
      return resolver;
    } catch (e) {
      return HttpErrors.WIT_AI();
    }
  }

  async resolveWitAIOracle(query: string): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get(WIT.query(query), {
      headers: {
        Authorization: this.config.get('WIT_AI_KEY'),
      },
    });
  }

  unpackWitAIResolver(): void {}

  // Moralis Search
  // DDBB savings (write) by UserId
}
