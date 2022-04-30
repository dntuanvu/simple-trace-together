import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  key: { type: Buffer, required: true },
  iv: { type: Buffer, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  key: Buffer;
  iv: Buffer;
}
