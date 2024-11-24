import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Interaction extends Document {
  @Prop({ required: true })
  interactionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ type: Number, required: true })
  score: number;

  @Prop({ type: Number, required: true })
  timeSpentMinutes: number;

  @Prop({ type: Date, required: true })
  lastAccessed: Date;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);

