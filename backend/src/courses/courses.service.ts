import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course } from './schemas/courses.schema';
import { UpdateCourseDTO } from './dto/updateCousre.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: mongoose.Model<Course>) {}

 
    // create a course
    async create(courseData: Course): Promise<Course> {
      const newCourse = new this.courseModel(courseData);  // Create a new student document
      return await newCourse.save();  // Save it to the database
  }
   // Get all courses
   async findAll(): Promise<Course[]> {
    let courses= await this.courseModel.find();  // Fetch all students from the database
    return courses
}

// Get a course by ID
async findById(id: string): Promise<Course> {
    return await this.courseModel.findById(id);  // Fetch a student by ID
}

 // Update a course's details by ID
 async update(id: string, updateData: UpdateCourseDTO): Promise<Course> {
  return await this.courseModel.findByIdAndUpdate(id, updateData, { new: true });  // Find and update the student
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
