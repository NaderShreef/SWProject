import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recommendation, RecommendationSchema } from './recommendation.schema';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recommendation.name, schema: RecommendationSchema }]),
  ],
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
