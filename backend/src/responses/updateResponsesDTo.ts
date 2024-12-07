import { IsArray, IsDateString, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateResponseDto {
  @IsString()
  @IsOptional()
  response_id?: string;

  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  quiz_id?: string;

  @IsArray()
  @IsOptional()
  answers?: { question_id: string; answer: string }[];

  @IsNumber()
  @IsOptional()
  score?: number;

  @IsDateString()
  @IsOptional()
  submitted_at?: Date;
}
