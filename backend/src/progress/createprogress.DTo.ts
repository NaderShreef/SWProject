import { IsNotEmpty, IsString, IsNumber, Min, Max, IsDate } from 'class-validator';

export class CreateProgressDto {

  progressId: string;

 
  userId: string;

  courseId: string;
  completionPercentage: number;
  lastAccessed: Date;
}
