import { Module } from '@nestjs/common';
import { TracingController } from './tracing.controller';
import { TracingService } from './tracing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TracingSchema } from './tracing.model';
import { UserSchema } from '../user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Tracing',
        schema: TracingSchema,
      },
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TracingController],
  providers: [TracingService],
  exports: [TracingService],
})
export class IncidentModule {}
