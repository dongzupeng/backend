import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from './middleware/cors.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL || 'mysql://root:123456@localhost:3306/wechat_official_account',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, CorsMiddleware)
      .forRoutes('*');
  }
}
