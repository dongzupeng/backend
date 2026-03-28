import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  // 切换点赞状态
  async toggleLike(userId: number, articleId: number): Promise<Article> {
    // 检查文章是否存在
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException(`文章 ${articleId} 不存在`);
    }

    // 检查是否已经点赞
    const existingLike = await this.likeRepository.findOne({
      where: { userId, articleId },
    });

    if (existingLike) {
      // 取消点赞
      await this.likeRepository.remove(existingLike);
      article.likes = Math.max(0, article.likes - 1);
    } else {
      // 点赞
      const newLike = this.likeRepository.create({ userId, articleId });
      await this.likeRepository.save(newLike);
      article.likes += 1;
    }

    return this.articleRepository.save(article);
  }

  // 获取用户的点赞列表
  async getUserLikes(userId: number): Promise<Like[]> {
    return this.likeRepository.find({
      where: { userId },
      relations: ['article'],
      order: { createdAt: 'DESC' },
    });
  }

  // 检查用户是否点赞了某篇文章
  async isLiked(userId: number, articleId: number): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: { userId, articleId },
    });
    return !!like;
  }
}
