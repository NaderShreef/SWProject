import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Automatically add createdAt and updatedAt
export class QuestionBank extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Module' })
  moduleId: Types.ObjectId;

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

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);
