import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RatingDocument = Rating & Document;

export enum RatingType {
  MODULE = 'module',
  COURSE = 'course',
  INSTRUCTOR = 'instructor',
}

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true, type: String, enum: RatingType })
  type: RatingType;

  @Prop({ required: true })
  entityId: string; // Module, Course, or Instructor ID

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  studentId: string; // ID of the student providing the rating
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
