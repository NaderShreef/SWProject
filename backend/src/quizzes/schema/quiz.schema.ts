import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose'; // Import Schema for references
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Automatically manage createdAt and updatedAt
export class Quiz extends Document {
  @Prop({ type: String, required: true, unique: true })
  quizId: string;


  @Prop({ type: String, required: true })
  Module_id: string; // Reference to the Course schema 

  @Prop({ type: [{ question: String, options: [String], answer: String }], required: true })
  questions: Array<{ question: string; options: string[]; answer: string }>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);




