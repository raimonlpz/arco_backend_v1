import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FollowDto } from './dto/follow.dto';
import { FollowService } from './follow.service';

@UseGuards(JwtGuard)
@Controller('follows')
export class FollowController {
  constructor(private followService: FollowService) {}

  @HttpCode(HttpStatus.OK)
  @Post('follow')
  follow(@GetUser('id') userId: number, @Body() dto: FollowDto) {
    return this.followService.follow(userId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('unfollow')
  unfollow(@GetUser('id') userId: number, @Body() dto: FollowDto) {
    return this.followService.unfollow(userId, dto);
  }
}
