import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { FavoriteDto } from './dto/favorite.dto';
import { FavoritesService } from './favorite.service';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('new')
  addToFavorites(@GetUser('id') userId: number, @Body() dto: any) {
    return this.favoritesService.addToFavorites(userId, dto as FavoriteDto);
  }
}
