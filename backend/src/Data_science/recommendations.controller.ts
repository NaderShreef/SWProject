import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { Recommendation } from './recommendation.schema';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  async create(@Body() data: Partial<Recommendation>) {
    return this.recommendationsService.create(data);
  }

  @Get()
  async findAll() {
    return this.recommendationsService.findAll();
  }
}
