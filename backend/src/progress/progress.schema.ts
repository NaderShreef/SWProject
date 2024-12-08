import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Progress extends Document {
  static save(): Progress | PromiseLike<Progress> {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true, unique: true })
  progressId: string; // Unique identifier for progress tracking

  @Prop({ required: true })
  userId: string; // Associated user ID

  @Prop({ required: true })
  courseId: string; // Associated course ID

  @Prop({ required: true, min: 0, max: 100 })
  completionPercentage: number; // Percentage of course completed (between 0 and 100)

  @Prop({ required: true })
  lastAccessed: Date; // Last time the course was accessed
}

// Create the Mongoose schema
export const ProgressSchema = SchemaFactory.createForClass(Progress);


