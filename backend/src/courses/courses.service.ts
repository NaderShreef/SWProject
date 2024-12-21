import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course } from './schemas/courses.schema';

import { UpdateCourseDTO } from './dto/updateCousre.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: mongoose.Model<Course>,
  ) {}
  private courseVersions = new Map<string, any[]>();

  // create a course
  async create(courseData: Course): Promise<Course> {
    const newCourse = new this.courseModel(courseData); // Create a new student document
    return await newCourse.save(); // Save it to the database
  }
  // Get all courses
  async findAll(): Promise<Course[]> {
    let courses = await this.courseModel.find(); // Fetch all students from the database
    return courses;
  }

  // Get a course by ID
  async findById(id: string): Promise<Course> {
    return await this.courseModel.findById(id); // Fetch a student by ID
  }

  // Update a course's details by ID
  //  async update(id: string, updateData: UpdateCourseDTO): Promise<Course> {
  //   return await this.courseModel.findByIdAndUpdate(id, updateData, { new: true });  // Find and update the student
  // }

  async searchCourse(title?: string, createdBy?: string): Promise<Course | []> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search for the topic in the title
    }
    if (createdBy) {
      filter.createdBy = { $regex: createdBy, $options: 'i' }; // Case-insensitive search for instructor name
    }
    return await this.courseModel.findOne(filter); // Use findOne to return a single course
  }

  async search(searchTerm: string) {
    return this.courseModel
      .find({
        $or: [
          { $text: { $search: searchTerm } },
          { keywords: { $in: [searchTerm] } },
        ],
      })
      .exec();
  }

  async enroll(courseId: string, userId: string): Promise<string> {
    const course = await this.courseModel.findById(courseId);

    return `User ${userId} successfully enrolled in course "${course.title}"`;
  }
  // Update a course and track versions in-memory
  async update(id: string, updateData: UpdateCourseDTO): Promise<Course> {
    return await this.courseModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async getCourseVersions(id: string): Promise<any[]> {
    return [];
  }

  // Delete a course by ID
  async delete(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndDelete(id); // Find and delete the student
  }
}
