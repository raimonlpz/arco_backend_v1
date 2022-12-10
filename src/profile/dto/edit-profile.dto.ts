import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class EditProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profession?: string;

  @IsArray()
  @IsOptional()
  urls?: string[];

  @IsString()
  @IsOptional()
  handle?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsInt()
  @IsOptional()
  hexAddressId?: number;
}
