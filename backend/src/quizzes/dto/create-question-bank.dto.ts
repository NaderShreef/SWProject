import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuestionBankDto {
  

  @IsArray()
  @IsNotEmpty()
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: 'MCQ' | 'True/False';
    difficulty: 'easy' | 'medium' | 'hard'; // New attribute added here
  }>;
}
