import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Article, article => article.favoritesRelations)
  @JoinColumn({ name: 'articleId' })
  article: Article;
}
