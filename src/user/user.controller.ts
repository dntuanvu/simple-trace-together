import {
  Controller,
  Get,
  Post,
  Request,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    const users = await this.userService.getAllUsers();

    return {
      users,
    };
  }
}
