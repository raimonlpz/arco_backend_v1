import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { NotFoundInterceptor } from 'src/shared/interceptors';
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

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(NotFoundInterceptor)
  @Get(':id')
  getProfileByUserId(@Param('id') userId: string): Promise<Profile> {
    return this.profileService.getProfileById(parseInt(userId));
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  getAllProfiles(@Query() query: { ids?: string }): Promise<Profile[]> {
    if (query.ids) {
      const ids = query.ids.split(',').map((id: string) => parseInt(id));
      return this.profileService.getProfilesById(ids);
    }
    return this.profileService.getAllProfiles();
  }

  @Patch('me')
  editProfile(
    @GetUser('id') userId: number,
    @Body() dto: EditProfileDto
  ): Promise<Profile> {
    return this.profileService.editProfile(userId, dto);
  }
}
