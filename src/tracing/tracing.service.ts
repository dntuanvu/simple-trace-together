import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

import { Tracing } from './tracing.model';

@Injectable()
export class TracingService {
  constructor(
    @InjectModel('Tracing') private readonly tracingModel: Model<Tracing>,
    @InjectModel('Users') private readonly userModel: Model<User>,
  ) {}

  async insertTracing(type: string, detail: string, creator: any) {
    if (creator.role !== 'user') {
      throw new NotFoundException('Only user can check in / out.');
    }
    const newTracing = new this.tracingModel({
      type, // check-in or check-out
      detail, // detail of the tracing
      created_by: creator.userId, // user to trace
      created_at: new Date().getTime(), // timestamp
    });

    const result = await newTracing.save();
    return result.id as string;
  }

  /*async assignIncident(incidentId: string, assignee: string, creator: any) {
    const updatedIncident = await this.findIncident(incidentId);

    console.log('created_by=' + updatedIncident.created_by);
    console.log('creator=' + JSON.stringify(creator));
    console.log('role=' + creator.role);
    if (
      updatedIncident.created_by !== creator.userId ||
      creator.role !== 'admin'
    ) {
      throw new NotFoundException('Could not find incident.');
    }

    updatedIncident.assignee = assignee;
    updatedIncident.updated_at = new Date().getTime().toString();

    updatedIncident.save();
  }

  async acknowledgeIncident(incidentId: string, assignee: any) {
    const updatedIncident = await this.findIncident(incidentId);
    if (updatedIncident.assignee !== assignee.userId) {
      throw new NotFoundException('Could not find incident.');
    }

    updatedIncident.assignee = assignee.userId;
    updatedIncident.acknowledged_at = new Date().getTime().toString();

    updatedIncident.save();
  }

  async resolveIncident(incidentId: string, assignee: any) {
    console.log('resolveIncident, assignee=' + JSON.stringify(assignee));
    console.log('resolveIncident, incidentId=' + incidentId);
    const updatedIncident = await this.findIncident(incidentId);
    console.log(
      'resolveIncident, updatedIncident=' + JSON.stringify(updatedIncident),
    );
    if (updatedIncident.assignee !== assignee.userId) {
      throw new NotFoundException('Could not find incident.');
    }
    updatedIncident.assignee = assignee.userId;
    updatedIncident.resolved_at = new Date().getTime().toString();

    updatedIncident.save();
  }*/

  async getAllTracing() {
    const tracings = await this.tracingModel.find().exec();
    return tracings.map((t) => ({
      id: t.id,
      type: t.type,
      detail: t.detail,
      created_by: t.created_by,
      created_at: t.created_at,
    }));
  }

  async getSingleTracing(tracingId: string) {
    const tracing = await this.findTracing(tracingId);
    const creator = await this.findUser(tracing.created_by);

    return {
      id: tracing.id,
      type: tracing.type,
      detail: tracing.detail,
      created_by: { id: creator.id, email: creator.email },
      created_at: tracing.created_at,
    };
  }

  async getTracingByUser(userId: string) {
    console.log(`TracingService, getTracingByUser=${userId}`)
    const tracings = await this.tracingModel
      .find({ created_by: userId })
      .exec();

    return tracings.map((t) => ({
      id: t.id,
      type: t.type,
      detail: t.detail,
      created_by: t.created_by,
      created_at: t.created_at,
    }));
  }

  private async findTracing(id: string): Promise<Tracing> {
    console.log(`TracingService, findTracing=${id}`)
    let tracing;
    try {
      tracing = await this.tracingModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find tracing.');
    }

    return tracing;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }
}
