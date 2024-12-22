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

  async create(progressData: Partial<Progress>): Promise<Progress> {
    
      const newProgress = new this.progressModel(progressData);
      return await newProgress.save();
    
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

  async getCompletionRate(): Promise<number> {
    const totalProgress = await this.progressModel.find().exec();

    if (totalProgress.length === 0) return 0;

    const totalStudentsCompleted = totalProgress.filter(
      (progress) => progress.completionPercentage === 100,
    ).length;

    return totalStudentsCompleted;
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

  async getPerformanceCategories(userId: string): Promise<string> {
    const userCompletionRate = await this.getUserCompletionRate(userId);
    const averageCompletionRate = await this.getAverageCompletionRate();

    if (userCompletionRate >= 90) return 'Excellent';
    if (userCompletionRate >= averageCompletionRate) return 'Above Average';
    if (userCompletionRate < averageCompletionRate && userCompletionRate >= 50) return 'Average';
    return 'Below Average';
  }

  async getAverageCompletionRate(): Promise<number> {
    const totalProgress = await this.progressModel.find().exec();
    if (totalProgress.length === 0) return 0;
    const totalCompletion = totalProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / totalProgress.length;
  }

  async getDashboard(userId: string): Promise<any> {
    const userCompletionRate = await this.getUserCompletionRate(userId);
    const userPerformanceCategory = await this.getPerformanceCategories(userId);
    const activeUsers = await this.getActiveUsers();
    const totalStudentsCompleted = await this.getCompletionRate();

    return {
      userCompletionRate,
      userPerformanceCategory,
      activeUsers,
      totalStudentsCompleted,
    };
  }
}
