import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>,
  ) {}

  // Submit feedback
  async submitFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    return newFeedback.save();
  }

  // Get all feedback
  async getAllFeedback(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }
}
