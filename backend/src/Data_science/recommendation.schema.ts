import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Recommendation extends Document {
  @Prop({ required: true })
  recommendationId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [String], required: true })
  recommendedItems: string[];

  @Prop({ type: Date, required: true })
  generatedAt: Date;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);
