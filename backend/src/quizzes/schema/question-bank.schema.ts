import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
@Schema({ timestamps: true })
export class QuestionBank extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({
    type: [
      {
        question: String,
        options: [String],
        answer: String,
        type: String,
        difficulty: {
          type: String,
          enum: ['belowAverage', 'average', 'aboveAverage', 'excellent'],
          required: true,
        },
      },
    ],
    required: true,
  })
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: string;
    difficulty: 'belowAverage' | 'average' | 'aboveAverage' | 'excellent';
  }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuestionBankSchema = SchemaFactory.createForClass(QuestionBank);
