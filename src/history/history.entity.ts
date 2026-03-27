import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Article } from '../articles/article.entity';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  articleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.history)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Article, article => article.historyRelations)
  @JoinColumn({ name: 'articleId' })
  article: Article;
}
