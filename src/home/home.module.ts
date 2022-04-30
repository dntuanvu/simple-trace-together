import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HomeController } from './home.controller';
import { HomeService } from './home.service';

import { UserSchema } from '../user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
