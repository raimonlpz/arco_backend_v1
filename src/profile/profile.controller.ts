import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditProfileDto } from './dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMyProfile(@GetUser('id') userId: number): Promise<Profile> {
    return this.profileService.getMyProfile(userId);
  }

  @Patch('me')
  editProfile(
    @GetUser('id') userId: number,
    @Body() dto: EditProfileDto
  ): Promise<Profile> {
    return this.profileService.editProfile(userId, dto);
  }
}
