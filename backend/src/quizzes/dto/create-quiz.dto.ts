import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsInt,
  Min,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateQuizDto {
  @IsNotEmpty()
  moduleId: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(['MCQ', 'True/False', 'Both'])
  questionType: 'MCQ' | 'True/False' | 'Both';

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  questionCount: number;

  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(100) // Example max size
  questions: QuestionDto[];
}

class QuestionDto {
  @IsNotEmpty()
  @IsEnum(['MCQ', 'True/False'])
  type: 'MCQ' | 'True/False';

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsString({ each: true })
  options?: string[];

  @IsNotEmpty()
  @IsString()
  answer: string;
}
