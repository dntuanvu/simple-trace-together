import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      const decipher = createDecipheriv('aes-256-cbc', user.key, user.iv);
      const decryptedText =
        decipher.update(user.password, 'hex', 'utf8') + decipher.final('utf8');
      if (decryptedText === pass) {
        console.log('password matched');
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      const payload = {
        username: user.username,
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload, {
        expiresIn: '24h',
      });

      /*return {
                access_token: this.jwtService.sign(payload, {
                    expiresIn: '24h'
                }),
            };*/

      // return basic user details and token
      return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token,
      };
    } else {
      throw new NotFoundException('User not found.');
    }
  }

  async register(
    username: string,
    pwd: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
  ) {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encryptedText =
      cipher.update(pwd, 'utf8', 'hex') + cipher.final('hex');

    const userInDb = await this.userService.createUser(
      username,
      encryptedText,
      email,
      firstName,
      lastName,
      role,
      key,
      iv,
    );

    const payload = {
      username: username,
      sub: userInDb,
      email: email,
      role: role,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '24h',
      }),
    };
  }
}
