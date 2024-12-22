import { IsNotEmpty, IsString, IsEnum, IsInt, Min } from 'class-validator';
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
}

