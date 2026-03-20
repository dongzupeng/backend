import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Article> {
    return this.articleService.findOne(id);
  }

  @Post()
  async create(@Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.create(article);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.update(id, article);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.articleService.delete(id);
  }
}