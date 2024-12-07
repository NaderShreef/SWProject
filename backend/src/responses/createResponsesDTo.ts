import { IsArray, IsDateString, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  @IsNotEmpty()
  response_id: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  quiz_id: string;

  @IsArray()
  @IsNotEmpty()
  answers: { question_id: string; answer: string }[];

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsDateString()
  @IsNotEmpty()
  submitted_at: Date;
}
