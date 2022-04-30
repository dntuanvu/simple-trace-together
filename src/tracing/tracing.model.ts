import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';
import { Timestamp } from 'typeorm';

const Schema = mongoose.Schema;

export const TracingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  detail: { type: String, required: true },
  created_by: { type: String, required: true },
  created_at: { type: String, required: true },
});

export interface Tracing extends mongoose.Document {
  id: string;
  type: string;
  detail: string;
  created_by: string;
  created_at: string;
}
