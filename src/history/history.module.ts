import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { Article } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Article])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
