import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: User): Promise<Profile & User & { profileId: number }> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        followedBy: true,
        following: true,
        subscriptions: {
          include: {
            entities: true,
            intents: true,
            tags: true,
          },
        },
        favorites: {
          include: {
            entities: true,
            intents: true,
            tags: true,
          },
        },
      },
    });

    const response = {
      ...user,
      profileId: profile.id,
    };

    // avoid redundancy in this mixed Join
    delete profile.id;
    delete profile.userId;

    return {
      ...profile,
      ...response,
    };
  }

  async editUser(userId: number, dto: EditUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
}
