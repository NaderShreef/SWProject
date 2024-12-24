// Course Schema
import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true })
  courseId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
  difficultyLevel: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  createdBy: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'users' }] })
  enrolledUsers: string[]; // Array of user IDs

  @Prop({ default: Date.now })
  createdAt: Date;

  readonly _id: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
