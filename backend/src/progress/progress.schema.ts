import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Automatically manage createdAt and updatedAt
export class Quiz extends Document {
  @Prop({ type: String, required: true, unique: true })
  quizId: string;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  Module_id: Types.ObjectId;

  @Prop({ type: [{ question: String, options: [String], answer: String }], required: true })
  questions: Array<{ question: string; options: string[]; answer: string }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
