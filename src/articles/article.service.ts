import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async create(article: Partial<Article>): Promise<Article> {
    const newArticle = this.articleRepository.create(article);
    return this.articleRepository.save(newArticle);
  }

  async update(id: number, article: Partial<Article>): Promise<Article> {
    const existingArticle = await this.findOne(id);
    Object.assign(existingArticle, article);
    return this.articleRepository.save(existingArticle);
  }

  async delete(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }
}