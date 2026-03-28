import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DraftService } from './draft.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('drafts')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDraftDto: CreateDraftDto, @Request() req) {
    return await this.draftService.create(req.user.id, createDraftDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return await this.draftService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    return await this.draftService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() createDraftDto: CreateDraftDto, @Request() req) {
    return await this.draftService.update(id, req.user.id, createDraftDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.draftService.remove(id, req.user.id);
  }
}
