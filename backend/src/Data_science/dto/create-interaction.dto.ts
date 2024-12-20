import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  interactionId: string;

  @IsString()
  userId: string;

  @IsString()
  courseId: string;

  @IsNumber()
  score: number;

  @IsNumber()
  timeSpentMinutes: number;

  @IsDate()
  lastAccessed: Date;
}
