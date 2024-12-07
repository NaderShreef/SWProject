import { IsOptional, IsString, IsNumber, Min, Max, IsDate } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  courseId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  completionPercentage?: number;

  @IsOptional()
  @IsDate()
  lastAccessed?: Date;
}

