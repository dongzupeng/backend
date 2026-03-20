import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, ip } = req;

    // 监听响应结束事件
    res.on('finish', () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const { statusCode } = res;

      // 格式化日志输出
      console.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} ${responseTime}ms ${ip}`
      );
    });

    next();
  }
}
