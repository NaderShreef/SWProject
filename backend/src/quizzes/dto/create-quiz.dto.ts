import { Type } from "class-transformer";
import { IsEnum, IsInt, IsNotEmpty, Min, ValidateNested } from "class-validator";
import { Types } from "mongoose";

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
  questions: QuestionDto[]; // Add questions property
}

class QuestionDto {
  @IsNotEmpty()
  type: 'MCQ' | 'True/False';

  @IsNotEmpty()
  question: string;

  options?: string[];

  @IsNotEmpty()
  answer: string;
}
