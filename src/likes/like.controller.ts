import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { Article } from '../articles/article.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':articleId')
  async toggleLike(@Param('articleId') articleId: number, @Request() req): Promise<Article> {
    const userId = req.user.id;
    return this.likeService.toggleLike(userId, articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserLikes(@Request() req) {
    const userId = req.user.id;
    return this.likeService.getUserLikes(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':articleId/check')
  async checkLike(@Param('articleId') articleId: number, @Request() req): Promise<{ isLiked: boolean }> {
    const userId = req.user.id;
    const isLiked = await this.likeService.isLiked(userId, articleId);
    return { isLiked };
  }
}
