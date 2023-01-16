/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  NLPEntityDecoded,
  NLPIntentDecoded,
  NLPTagDecoded,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addToFavorites(userId: number, dto: FavoriteDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    let intent: NLPIntentDecoded;
    let action: NLPEntityDecoded;
    let chain: NLPEntityDecoded;
    let patterns: NLPEntityDecoded[];
    let traits: NLPTagDecoded[];

    if (dto.bookmarker.intent) {
      intent = await this.prisma.nLPIntentDecoded.findFirst({
        where: {
          nlpIntent: {
            witUuid: dto.bookmarker.intent,
          },
        },
      });
    }

    if (dto.bookmarker.entities.actions.length > 0) {
      action = await this.prisma.nLPEntityDecoded.findFirst({
        where: {
          nlpEntity: {
            witUuid: dto.bookmarker.entities.actions[0],
          },
        },
      });
    }

    if (dto.bookmarker.entities.chains.length > 0) {
      chain = await this.prisma.nLPEntityDecoded.findFirst({
        where: {
          nlpEntity: {
            witUuid: dto.bookmarker.entities.chains[0],
          },
        },
      });
    }

    if (dto.bookmarker.entities.patterns.length > 0) {
      patterns = await Promise.all([
        ...dto.bookmarker.entities.patterns.map(
          async (pattern) =>
            await this.prisma.nLPEntityDecoded.findFirst({
              where: {
                nlpEntity: {
                  witUuid: pattern.pattern_id,
                },
                values: {
                  has: pattern.value,
                },
              },
              include: {
                bookmarkedInSubs: true,
              },
            })
        ),
      ]);
    }

    if (dto.bookmarker.traits.length > 0) {
      traits = await Promise.all([
        ...dto.bookmarker.traits.map(
          async (trait) =>
            await this.prisma.nLPTagDecoded.findFirst({
              where: {
                values: {
                  has: trait.value,
                },
              },
            })
        ),
      ]);
    }

    const favorite = await this.prisma.fav.create({
      data: {
        profileId: profile.id,
      },
      include: {
        entities: true,
        intents: true,
      },
    });
    const favUpdate = await this.prisma.fav.update({
      where: {
        id: favorite.id,
      },
      include: {
        entities: true,
        intents: true,
      },
      data: {
        entities: {
          set: [
            ...favorite.entities.map((e) => ({ id: e.id })),
            // ...patterns.map((p) => ({ id: p.id })),
            // ...(chain ? [{ id: chain.id }] : []),
            ...(action ? [{ id: action.id }] : []),
          ],
        },
        intents: {
          set: [
            // ...favorite.intents.map((i) => ({ id: i.id })),
            // ...(intent ? [{ id: intent.id }] : []),
          ],
        },
      },
    });

    return favUpdate;
  }
}
