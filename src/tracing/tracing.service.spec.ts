import { Test, TestingModule } from '@nestjs/testing';
import { TracingService } from './tracing.service';
import { TracingSchema } from './tracing.model';
import { UserSchema } from '../user/user.model';
import { MongooseModule } from '@nestjs/mongoose'
import { TracingController } from './tracing.controller';
import { ConfigModule } from '@nestjs/config';
import { IncidentModule } from './tracing.module';

describe('IncidentService', () => {
  let service: TracingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URL),
        MongooseModule.forFeature([
            {
              name: 'Incident',
              schema: TracingSchema
            },
            {
              name: 'Users',
              schema: UserSchema
          }
        ]),
        IncidentModule
      ],
      controllers: [TracingController],
      providers: [TracingService],
      exports: [TracingService]
    }).compile();

    service = module.get<TracingService>(TracingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
