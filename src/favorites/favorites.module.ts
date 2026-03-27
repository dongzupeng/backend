import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Article } from '../articles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Article])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoritesModule {}
