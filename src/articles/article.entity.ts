import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Like } from '../likes/like.entity';
import { Favorite } from '../favorites/favorite.entity';
import { History } from '../history/history.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  author: string;

  @Column('longtext')
  coverImage: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  favorites: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Like, like => like.article)
  likesRelations: Like[];

  @OneToMany(() => Favorite, favorite => favorite.article)
  favoritesRelations: Favorite[];

  @OneToMany(() => History, history => history.article)
  historyRelations: History[];
}