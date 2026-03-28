import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Article } from '../articles/article.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(username: string, password: string, email: string): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error(`用户名 ${username} 已存在`);
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) {
      throw new Error(`邮箱 ${email} 已存在`);
    }

    // 哈希密码
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`用户 ${id} 不存在`);
    }

    // 检查用户名是否已被其他用户使用
    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await this.userRepository.findOne({ where: { username: updateData.username } });
      if (existingUser) {
        throw new Error(`用户名 ${updateData.username} 已存在`);
      }
    }

    // 检查邮箱是否已被其他用户使用
    if (updateData.email && updateData.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({ where: { email: updateData.email } });
      if (existingEmail) {
        throw new Error(`邮箱 ${updateData.email} 已存在`);
      }
    }

    // 保存旧用户名
    const oldUsername = user.username;

    // 更新用户数据
    Object.assign(user, updateData);
    const updatedUser = await this.userRepository.save(user);

    // 如果用户名发生了变化，更新所有关联的文章
    if (updateData.username && updateData.username !== oldUsername) {
      // 更新该用户的所有文章的作者字段
      await this.articleRepository.update(
        { author: oldUsername },
        { author: updateData.username }
      );
    }

    return updatedUser;
  }

  // 为了兼容前端的调用
  async updateUserInfo(id: number, updateData: Partial<User>): Promise<User> {
    return this.updateUser(id, updateData);
  }
}