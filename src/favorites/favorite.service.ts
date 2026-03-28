import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite) private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  // 切换收藏状态
  async toggleFavorite(userId: number, articleId: number): Promise<Article> {
    // 检查文章是否存在
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException(`文章 ${articleId} 不存在`);
    }

    // 检查是否已经收藏
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { userId, articleId },
    });

    if (existingFavorite) {
      // 取消收藏
      await this.favoriteRepository.remove(existingFavorite);
      article.favorites = Math.max(0, article.favorites - 1);
    } else {
      // 收藏
      const newFavorite = this.favoriteRepository.create({ userId, articleId });
      await this.favoriteRepository.save(newFavorite);
      article.favorites += 1;
    }

    return this.articleRepository.save(article);
  }

  // 获取用户的收藏列表
  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { userId },
      relations: ['article'],
      order: { createdAt: 'DESC' },
    });
  }

  // 检查用户是否收藏了某篇文章
  async isFavorited(userId: number, articleId: number): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: { userId, articleId },
    });
    return !!favorite;
  }
}
