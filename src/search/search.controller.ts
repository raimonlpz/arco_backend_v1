/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Body,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { NotFoundInterceptor } from 'src/shared/interceptors';
import { JwtGuard } from '../auth/guard';
import { RawSearchDto } from './dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('category/:id')
  getSearchesByCategory(@Param('id') intentId: string) {
    return this.searchService.getSearchesByCategory(intentId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  getAllSearches() {
    return this.searchService.getAllSearches();
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('users/me')
  getMySearches(@GetUser('id') userId: number) {
    return this.searchService.getSearchesByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(NotFoundInterceptor)
  @Get('users/:id')
  getSearchesByUser(@Param('id') userId: string) {
    return this.searchService.getSearchesByUserId(parseInt(userId));
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('raw')
  rawSearch(@GetUser('id') userId: number, @Body() dto: RawSearchDto) {
    return this.searchService.searchRaw(userId, dto);
  }
}
