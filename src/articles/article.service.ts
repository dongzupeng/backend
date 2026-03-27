import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

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

  async create(articleDto: CreateArticleDto): Promise<Article> {
    const newArticle = this.articleRepository.create(articleDto);
    return this.articleRepository.save(newArticle);
  }

  async update(id: number, articleDto: CreateArticleDto): Promise<Article> {
    const existingArticle = await this.findOne(id);
    Object.assign(existingArticle, articleDto);
    return this.articleRepository.save(existingArticle);
  }

  async delete(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
  }

  async incrementViews(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    article.views = (article.views || 0) + 1;
    return this.articleRepository.save(article);
  }

  async toggleLikes(id: number, isLiked: boolean): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    if (isLiked === true) {
      // 取消点赞
      article.likes = Math.max(0, (article.likes || 0) - 1);
    } else {
      // 点赞
      article.likes = (article.likes || 0) + 1;
    }
    const saved = await this.articleRepository.save(article);
    return saved;
  }

  async toggleFavorites(id: number, isFavorited: boolean): Promise<Article> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    if (isFavorited === true) {
      // 取消收藏
      article.favorites = Math.max(0, (article.favorites || 0) - 1);
    } else {
      // 收藏
      article.favorites = (article.favorites || 0) + 1;
    }
    const saved = await this.articleRepository.save(article);
    return saved;
  }
}