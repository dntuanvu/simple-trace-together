import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import { IncidentModule } from './tracing/tracing.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    HomeModule,
    IncidentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
