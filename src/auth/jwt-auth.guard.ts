import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 获取请求对象
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    
    // 不需要认证的路径
    const publicPaths = [
      // 认证相关
      '/api/auth/login',
      '/api/auth/register',
      // 文章相关
      '/api/articles',
      '/api/articles/',
    ];
    
    // 检查是否是文章详情接口
    const isArticleDetail = path.match(/^\/api\/articles\/\d+$/);
    
    // 检查是否是公开路径
    if (
      publicPaths.some(p => path.startsWith(p)) ||
      isArticleDetail
    ) {
      return true;
    }
    
    // 其他路径需要认证
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('认证失败，请重新登录');
    }
    return user;
  }
}
