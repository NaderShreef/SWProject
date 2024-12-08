import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop()
  userId: string;

  @Prop()
  message: string;

  @Prop()
  rating: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);


