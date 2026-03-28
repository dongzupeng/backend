import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';
import { Article } from '../articles/article.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  // 记录浏览历史
  async addHistory(userId: number, articleId: number): Promise<History> {
    // 检查文章是否存在
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException(`文章 ${articleId} 不存在`);
    }

    // 检查是否已经存在浏览记录
    const existingHistory = await this.historyRepository.findOne({
      where: { userId, articleId },
    });

    if (existingHistory) {
      // 更新浏览时间
      existingHistory.createdAt = new Date();
      return this.historyRepository.save(existingHistory);
    } else {
      // 创建新的浏览记录
      const newHistory = this.historyRepository.create({ userId, articleId });
      return this.historyRepository.save(newHistory);
    }
  }

  // 获取用户的浏览历史
  async getUserHistory(userId: number, limit: number = 50): Promise<History[]> {
    return this.historyRepository.find({
      where: { userId },
      relations: ['article'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  // 清空用户的浏览历史
  async clearUserHistory(userId: number): Promise<void> {
    await this.historyRepository.delete({ userId });
  }
}
