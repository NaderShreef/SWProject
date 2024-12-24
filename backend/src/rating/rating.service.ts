import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument, RatingType } from './rating.schema';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<RatingDocument>) {}

  async createRating(type: RatingType, entityId: string, studentId: string, rating: number) {
    const newRating = new this.ratingModel({ type, entityId, studentId, rating });
    return await newRating.save();
  }

  async getAverageRating(entityId: string, type: RatingType): Promise<number> {
    const ratings = await this.ratingModel.find({ type, entityId }).exec();
    if (!ratings || ratings.length === 0) {
      throw new NotFoundException(`${type} with ID ${entityId} has no ratings`);
    }
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  }

  async getCourseRating(courseId: string): Promise<number> {
    return await this.getAverageRating(courseId, RatingType.COURSE);
  }

  async getModuleRating(moduleId: string): Promise<number> {
    return await this.getAverageRating(moduleId, RatingType.MODULE);
  }

  async getInstructorRating(instructorId: string): Promise<number> {
    return await this.getAverageRating(instructorId, RatingType.INSTRUCTOR);
  }
}
