import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingType } from './rating.schema';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createRating(@Body() createRatingDto: { type: RatingType; entityId: string; studentId: string; rating: number }) {
    const { type, entityId, studentId, rating } = createRatingDto;
    return await this.ratingService.createRating(type, entityId, studentId, rating);
  }

  @Get('/course/:courseId')
  async getCourseRating(@Param('courseId') courseId: string) {
    return await this.ratingService.getCourseRating(courseId);
  }

  @Get('/module/:moduleId')
  async getModuleRating(@Param('moduleId') moduleId: string) {
    return await this.ratingService.getModuleRating(moduleId);
  }

  @Get('/instructor/:instructorId')
  async getInstructorRating(@Param('instructorId') instructorId: string) {
    return await this.ratingService.getInstructorRating(instructorId);
  }
}
