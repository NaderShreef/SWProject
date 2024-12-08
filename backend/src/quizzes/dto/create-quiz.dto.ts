import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsNotEmpty()
  moduleId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  questions: Array<{ question: string; options: string[]; answer: string }>;

  @IsString()
  @IsNotEmpty()
  questionType: 'MCQ' | 'True/False' | 'Both';
}
