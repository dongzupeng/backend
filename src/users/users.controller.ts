import { Controller, Get, Put, Request, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getCurrentUser(@Request() req) {
    return req.user;
  }

  @Put('updateUserInfo')
  async updateUserInfo(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = req.user;
    const updatedUser = await this.userService.updateUserInfo(user.id, updateUserDto);
    // 移除密码字段
    const { password, ...result } = updatedUser;
    return result;
  }
}
