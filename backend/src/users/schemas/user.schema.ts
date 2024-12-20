import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  // Track failed login attempts
  @Prop({ default: 0 })
  failedLoginAttempts: number;

  // Optional: Track the timestamp of the last failed login attempt
  @Prop({ default: null })
  lastFailedLoginAttempt: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
