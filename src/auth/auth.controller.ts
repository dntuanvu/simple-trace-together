import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('first_name') firstName: string,
    @Body('last_name') lastName: string,
    @Body('role') role: string,
  ) {
    return this.authService.register(
      username,
      password,
      email,
      firstName,
      lastName,
      role,
    );
  }
}
