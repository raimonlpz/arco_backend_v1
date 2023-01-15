import { IsNumber } from 'class-validator';

export class FollowDto {
  @IsNumber()
  followingId: number;
}
