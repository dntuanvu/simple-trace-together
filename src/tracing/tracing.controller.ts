import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TracingService } from './tracing.service';

@Controller('tracings')
export class TracingController {
  constructor(private readonly tracingService: TracingService) {}

  @UseGuards(JwtAuthGuard)
  @Post('raise')
  async raise(
    @Request() req,
    @Body('type') type: string,
    @Body('detail') detail: string,
  ) {
    const creator = req.user;
    const generatedId = await this.tracingService.insertTracing(
      type,
      detail,
      creator,
    );

    return {
      incident_id: generatedId,
      creator: creator,
      incident: {
        type: type,
        detail: detail,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    const tracings = await this.tracingService.getAllTracing();

    return {
      tracings,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getTracingByUser(@Request() req) {
    const creator = req.user;
    console.log(`getTracingByUser, user=${creator.userId}`)
    const tracings = await this.tracingService.getTracingByUser(
      creator.userId,
    );
    return {
      tracings,
    };
  }
}
