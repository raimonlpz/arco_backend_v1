import { IsString } from 'class-validator';

export class RawSearchDto {
  @IsString()
  query: string;
}
