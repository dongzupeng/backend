import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Article, article => article.likesRelations)
  @JoinColumn({ name: 'articleId' })
  article: Article;
}
