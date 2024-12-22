// User Schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true, required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: ['student', 'instructor', 'admin'] })
  role: string;

  @Prop({ default: null })
  profilePictureUrl?: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: 0 })
  failedLoginAttempts: number;

  @Prop({ default: null })
  lastFailedLoginAttempt: Date | null;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'courses' }] })
  enrolledCourses: string[]; // Array of course IDs
}

export const UserSchema = SchemaFactory.createForClass(User);

