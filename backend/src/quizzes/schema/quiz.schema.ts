import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
<<<<<<< HEAD
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ type: String, required: true, unique: true })
  quizId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({
    type: [{ question: String, options: [String], answer: String }],
    required: true,
  })
  questions: Array<{ question: string; options: string[]; answer: string }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
=======

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

>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
