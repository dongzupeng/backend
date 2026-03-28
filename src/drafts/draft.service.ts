import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Draft } from './draft.entity';
import { CreateDraftDto } from './dto/create-draft.dto';

@Injectable()
export class DraftService {
  constructor(
    @InjectRepository(Draft)
    private draftRepository: Repository<Draft>,
  ) {}

  async create(userId: number, createDraftDto: CreateDraftDto): Promise<Draft> {
    const draft = this.draftRepository.create({
      ...createDraftDto,
      title: createDraftDto.title || '',
      content: createDraftDto.content || '',
      author: createDraftDto.author || '',
      coverImage: createDraftDto.coverImage || '',
      isPublished: createDraftDto.isPublished || false,
      user: { id: userId },
    });
    return await this.draftRepository.save(draft);
  }

  async findAll(userId: number): Promise<Draft[]> {
    return await this.draftRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Draft> {
    const draft = await this.draftRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!draft) {
      throw new NotFoundException('草稿不存在');
    }
    return draft;
  }

  async update(id: number, userId: number, createDraftDto: CreateDraftDto): Promise<Draft> {
    const draft = await this.findOne(id, userId);
    Object.assign(draft, createDraftDto);
    return await this.draftRepository.save(draft);
  }

  async remove(id: number, userId: number): Promise<void> {
    const draft = await this.findOne(id, userId);
    await this.draftRepository.remove(draft);
  }
}
