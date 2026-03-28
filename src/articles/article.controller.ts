import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get('popular')
  async getPopularArticles(@Query('limit') limit: number = 5): Promise<Article[]> {
    return this.articleService.getPopularArticles(limit);
  }

  @Get('recommended')
  async getRecommendedArticles(@Query('limit') limit: number = 6): Promise<Article[]> {
    return this.articleService.getRecommendedArticles(limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() articleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(articleDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() articleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.update(id, articleDto);
  }

  @Post(':id/views')
  async incrementViews(@Param('id') id: number): Promise<Article> {
    return this.articleService.incrementViews(id);
  }

  @Post(':id/likes')
  async toggleLikes(@Param('id') id: number, @Body() body: { isLiked: boolean }): Promise<Article> {
    const result = await this.articleService.toggleLikes(id, body.isLiked);
    return result;
  }

  @Post(':id/favorites')
  async toggleFavorites(@Param('id') id: number, @Body() body: { isFavorited: boolean }): Promise<Article> {
    const result = await this.articleService.toggleFavorites(id, body.isFavorited);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.articleService.delete(id);
  }
}