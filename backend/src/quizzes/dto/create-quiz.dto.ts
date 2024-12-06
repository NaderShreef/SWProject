import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsNotEmpty()
  Module_id: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  questions: Array<{ question: string; options: string[]; answer: string }>;
}

