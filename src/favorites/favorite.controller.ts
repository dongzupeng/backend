import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Article } from '../articles/article.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':articleId')
  async toggleFavorite(@Param('articleId') articleId: number, @Request() req): Promise<Article> {
    const userId = req.user.id;
    return this.favoriteService.toggleFavorite(userId, articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserFavorites(@Request() req) {
    const userId = req.user.id;
    return this.favoriteService.getUserFavorites(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':articleId/check')
  async checkFavorite(@Param('articleId') articleId: number, @Request() req): Promise<{ isFavorited: boolean }> {
    const userId = req.user.id;
    const isFavorited = await this.favoriteService.isFavorited(userId, articleId);
    return { isFavorited };
  }
}
