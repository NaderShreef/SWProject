<<<<<<< HEAD
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
=======
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

>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
