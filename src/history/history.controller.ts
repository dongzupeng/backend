import { Controller, Post, Get, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':articleId')
  async addHistory(@Param('articleId') articleId: number, @Request() req) {
    const userId = req.user.id;
    return this.historyService.addHistory(userId, articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserHistory(@Request() req, @Query('limit') limit: number = 50) {
    const userId = req.user.id;
    return this.historyService.getUserHistory(userId, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async clearUserHistory(@Request() req): Promise<void> {
    const userId = req.user.id;
    return this.historyService.clearUserHistory(userId);
  }
}
