import { IsString, IsArray, IsDate } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  recommendationId: string;

  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  recommendedItems: string[];

  @IsDate()
  generatedAt: Date;
}
