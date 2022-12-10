import { Injectable } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(user: User): Promise<Profile & User> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    // avoid redundancy in this Join
    delete profile.id;
    delete profile.userId;

    return {
      ...profile,
      ...user,
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
