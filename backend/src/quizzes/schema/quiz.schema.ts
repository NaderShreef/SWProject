import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ default: () => uuidv4() })
  quizId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Module', required: true }) // Reference Module schema
  moduleId: string;

  @Prop({ required: true, enum: ['MCQ', 'True/False', 'Both'] })
  questionType: string;

  @Prop({ required: true, type: Number })
  questionCount: number;

  @Prop({
    type: [
      {
        question: { type: String, required: true },
        options: { type: [String] },
        answer: { type: String, required: true },
        type: { type: String, enum: ['MCQ', 'True/False'], required: true },
        difficulty: {
          type: String,
          enum: ['belowAverage', 'average', 'aboveAverage', 'excellent'],
          required: true,
        },
      },
    ],
    required: true,
  })
  questions: {
    question: string;
    options?: string[];
    answer: string;
    type: 'MCQ' | 'True/False';
    difficulty: 'belowAverage' | 'average' | 'aboveAverage' | 'excellent';
  }[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
