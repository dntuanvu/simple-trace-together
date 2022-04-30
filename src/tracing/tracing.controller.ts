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

  /* @UseGuards(JwtAuthGuard)
  @Post('assign')
  async assign(
    @Request() req,
    @Body('incident_id') incident_id: string,
    @Body('assignee') assignee: string,
  ) {
    const creator = req.user;
    await this.tracingService.assignIncident(incident_id, assignee, creator);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('acknowledge')
  async acknowledge(@Request() req, @Body('incident_id') incident_id: string) {
    console.log(req.user);
    const assignee = req.user;
    await this.tracingService.acknowledgeIncident(incident_id, assignee);
    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('resolve')
  async resolve(@Request() req, @Body('incident_id') incident_id: string) {
    console.log(req.user);
    const assignee = req.user;
    await this.tracingService.resolveIncident(incident_id, assignee);
    return null;
  }*/

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    const tracings = await this.tracingService.getAllTracing();

    return {
      tracings,
    };
  }

  /*@UseGuards(JwtAuthGuard)
  @Get(':tracing_id')
  async read(@Request() req, @Param('tracing_id') tracing_id: string) {
    const tracing = await this.tracingService.getSingleTracing(tracing_id);

    return {
      tracing,
    };
  }*/

  /*@UseGuards(JwtAuthGuard)
  @Delete(':incident_id')
  async delete(@Request() req, @Param('incident_id') incident_id: string) {
    await this.tracingService.deleteIncident(incident_id);
    return null;
  }*/

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
