import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/courses.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(createCourseDto: any): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  async getAllCourses(category?: string): Promise<Course[]> {
    if (category) {
      return this.courseModel.find({ category }).exec();
    }
    return this.courseModel.find().exec();
  }

  async getCourseById(id: string): Promise<Course> {
    return this.courseModel.findById(id).exec();
  }

  async updateCourse(id: string, updateCourseDto: any): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true }).exec();
  }
  async searchCourses(topic?: string, instructor?: string): Promise<Course[]> {
    const filter: any = {};
    if (topic) {
      filter.title = { $regex: topic, $options: 'i' }; // Case-insensitive search for the topic in the title
    }
    if (instructor) {
      filter.createdBy = { $regex: instructor, $options: 'i' }; // Case-insensitive search for instructor name
    }
    return this.courseModel.find(filter).exec();
  }
}
