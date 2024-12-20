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

  @Prop({ type: Array, required: true })
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: 'MCQ' | 'True/False';
  }>;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
