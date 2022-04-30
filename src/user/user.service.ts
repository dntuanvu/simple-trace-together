import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();

    return users.map((inc) => ({
      id: inc.id,
      username: inc.username,
      password: inc.password,
      email: inc.email,
      firstName: inc.firstName,
      lastName: inc.lastName,
      role: inc.role,
    }));
  }

  async createUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    key: Buffer,
    iv: Buffer,
  ) {
    const newUser = new this.userModel({
      username,
      password,
      email,
      firstName,
      lastName,
      role,
      key,
      iv,
    });

    const result = await newUser.save();
    return result.id;
  }
}
