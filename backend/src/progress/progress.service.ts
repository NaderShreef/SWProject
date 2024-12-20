import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProgressDto } from './createprogress.dto';
import { UpdateProgressDto } from './updateprogress.dto';
import { Progress } from './progress.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
  ) {}

  async create(createProgressDto: CreateProgressDto): Promise<Progress> {
    try {
      const newProgress = new this.progressModel(createProgressDto);
      return await newProgress.save();
    } catch (error) {
      console.error('Error while creating progress:', error);
      throw error;  // Rethrow the error so the controller can handle it
    }
  }
  async findAll(): Promise<Progress[]> {
    return await this.progressModel.find().exec();
  }

  async findById(id: string): Promise<Progress> {
    const progress = await this.progressModel.findById(id).exec();
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return progress;
  }

  async update(id: string, updateProgressDto: UpdateProgressDto): Promise<Progress> {
    const updatedProgress = await this.progressModel.findByIdAndUpdate(
      id,
      updateProgressDto,
      { new: true },
    );
    if (!updatedProgress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return updatedProgress;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.progressModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
  }

  async getActiveUsers(): Promise<number> {
    const activeUsersCount = await this.progressModel.distinct('userId').exec();
    return activeUsersCount.length;
  }

  async getPerformanceReport(): Promise<any> {
    return {
      averageCompletionRate: await this.getCompletionRate(),
      activeUsers: await this.getActiveUsers(),
    };
  }

  async getCompletionRate(): Promise<number> {
    const totalProgress = await this.progressModel.find().exec();
    if (totalProgress.length === 0) return 0;
    const totalCompletion = totalProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / totalProgress.length;
  }

  async getUserCompletionRate(userId: string): Promise<number> {
    const userProgress = await this.progressModel.find({ userId }).exec();
    if (userProgress.length === 0) return 0;
    const totalCompletion = userProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / userProgress.length;
  }

  async getCourseCompletionRate(courseId: string): Promise<number> {
    const courseProgress = await this.progressModel.find({ courseId }).exec();
    if (courseProgress.length === 0) return 0;
    const totalCompletion = courseProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / courseProgress.length;
  }
}

