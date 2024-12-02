import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation } from './recommendation.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Recommendation.name) private recommendationModel: Model<Recommendation>,
  ) {}

  async create(data: Partial<Recommendation>): Promise<Recommendation> {
    const recommendation = new this.recommendationModel(data);
    return recommendation.save();
  }

  async findAll(): Promise<Recommendation[]> {
    return this.recommendationModel.find().exec();
  }
}
