import * as dotenv from 'dotenv';
// 加载环境变量
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 增加请求体大小限制，支持大文件上传
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
