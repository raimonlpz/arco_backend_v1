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
      include: {
        followedBy: true,
        following: true,
      },
    });
    return profile;
  }

  async getProfileById(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: {
        userId,
      },
      include: {
        followedBy: true,
        following: true,
      },
    });
    return profile;
  }

  async getProfilesById(profileIds: number[]): Promise<Profile[]> {
    const profiles = await this.prisma.profile.findMany({
      where: {
        id: { in: profileIds },
      },
      include: {
        user: true,
      },
    });
    return profiles;
  }

  async getAllProfiles(): Promise<Profile[]> {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
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
