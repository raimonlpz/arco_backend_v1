/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from '../auth/guard';
import { RawSearchDto } from './dto';
import { AdvancedSearchDto } from './dto/advanced-search-dto';
import { SearchService } from './search.service';

@UseGuards(JwtGuard)
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @HttpCode(HttpStatus.OK)
  @Post('raw')
  rawSearch(@GetUser('id') userId: number, @Body() dto: RawSearchDto) {
    return this.searchService.searchRaw(userId, dto);
  }

  // TO-DO
  @HttpCode(HttpStatus.OK)
  @Post('advanced')
  advancedSearch(
    @GetUser('id') userId: number,
    @Body() dto: AdvancedSearchDto
  ) {
    return;
  }
}
