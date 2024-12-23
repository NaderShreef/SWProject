import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class QuestionBank extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({
    type: [
      { question: String, options: [String], answer: String, type: String },
    ],
    required: true,
  })
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: string;
  }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);
