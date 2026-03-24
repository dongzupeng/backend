import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string, email: string): Promise<User> {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) {
      throw new Error('Email already exists');
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

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}