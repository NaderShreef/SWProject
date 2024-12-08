import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ type: String, required: true, unique: true })
  quizId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Module' })
  moduleId: Types.ObjectId;

  @Prop({ type: String, enum: ['MCQ', 'True/False', 'Both'], required: true })
  questionType: string;

  @Prop({
    type: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
        type: { type: String, enum: ['MCQ', 'True/False'], required: true },
      },
    ],
    required: true,
  })
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: 'MCQ' | 'True/False';
  }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

