import { Test, TestingModule } from '@nestjs/testing';
import { TracingController } from './tracing.controller';
import { TracingSchema } from './tracing.model';
import { UserSchema } from '../user/user.model';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { IncidentModule } from './tracing.module';
import { TracingService } from './tracing.service';

describe('IncidentController', () => {
  let controller: TracingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
          {
            name: 'Incident',
            schema: TracingSchema,
          },
          {
            name: 'Users',
            schema: UserSchema,
          },
        ]),
      ],
      controllers: [TracingController],
      exports: [TracingController],
    }).compile();

    controller = module.get<TracingController>(TracingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
