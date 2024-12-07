import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuestionBankDto {
  @IsNotEmpty()
  moduleId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    type: 'MCQ' | 'True/False';
  }>;
}
