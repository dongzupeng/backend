import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Like } from '../likes/like.entity';
import { Favorite } from '../favorites/favorite.entity';
import { History } from '../history/history.entity';
import { Draft } from '../drafts/draft.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true, type: 'longtext' })
  avatar: string;

  @Column({ nullable: true, type: 'longtext' })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => History, history => history.user)
  history: History[];

  @OneToMany(() => Draft, draft => draft.user)
  drafts: Draft[];
}