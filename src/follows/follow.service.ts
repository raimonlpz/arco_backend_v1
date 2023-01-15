import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowDto } from './dto/follow.dto';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async follow(userId: number, dto: FollowDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    const follow = await this.prisma.follows.create({
      data: {
        followerId: profile.id,
        followingId: dto.followingId,
      },
    });
    return follow;
  }

  async unfollow(userId: number, dto: FollowDto) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    await this.prisma.follows.deleteMany({
      where: {
        followerId: profile.id,
        followingId: dto.followingId,
      },
    });
    return {
      followerId: profile.id,
      followingId: dto.followingId,
    };
  }
}
