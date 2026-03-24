import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from '../users/dto/login.dto';
import { RegisterDto } from '../users/dto/register.dto';

@Controller('api/auth')
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

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@Request() req) {
    return req.user;
  }
}