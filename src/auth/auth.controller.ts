import { Controller, Post, Body, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password, registerDto.email);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    // 这里可以添加token黑名单逻辑
    // 例如将token添加到redis黑名单中
    return { message: '退出成功' };
  }
}