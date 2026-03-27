import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { Article } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Article])],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikesModule {}
