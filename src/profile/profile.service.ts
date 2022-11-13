import { Injectable } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
    return profile;
  }

  async editProfile(userId: number, dto: EditProfileDto): Promise<Profile> {
    const profile = await this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...dto,
      },
    });
    return profile;
  }
}
