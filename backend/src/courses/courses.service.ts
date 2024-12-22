import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course } from './schemas/courses.schema';
import { UpdateCourseDTO } from './dto/updateCousre.dto';
import { CreateCourseDto } from './dto/createCourse.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  private courseVersions = new Map<string, any[]>();


  async getUserCourses(userId: string): Promise<Course[]> {
    return await this.courseModel.find({ enrolledUsers: userId }).exec();
  }
 
    // create a course
    async create(courseData: CreateCourseDto): Promise<Course> {
      const course = new this.courseModel({
        ...courseData,
        createdAt: new Date(), // Add any missing properties here
      });
      return course.save();
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
    return this.courseModel.find({
      $text: {$search: searchTerm} // Search on the indexed texts
    }).exec()
  }
  
  async enroll(courseId: string, userId: string) {
    // Find the course
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    // Find the user
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if the user is already enrolled
    if (course.enrolledUsers.includes(userId)) {
      return { message: 'User is already enrolled in this course' };
    }

    // Push the user._id into course.enrolledUsers
    course.enrolledUsers.push(userId);

    // Push the course._id into user.enrolledCourses
    user.enrolledCourses.push(courseId);

    // Save the updates
    await course.save();
    await user.save();

    return { message: 'User successfully enrolled in the course' };
  }
      // Update a course and track versions in-memory
  async update(id: string, updateData: UpdateCourseDTO): Promise<Course> {
    const course = await this.courseModel.findById(id);
    const updatedcourse = {
      title: course.title,
      description: course.description,
      category: course.category,
      difficultyLevel: course.difficultyLevel,
      createdBy: course.createdBy,
      createdAt: course.createdAt,
      updatedAt: new Date(),
    };

    // Track the snapshot of this course version in memory
    if (!this.courseVersions.has(id)) {
      this.courseVersions.set(id, []);
    }
    this.courseVersions.get(id).push(updatedcourse); // Add the current version to the list

    course.__v = course.__v + 1;
    
    // Apply the update to the course
    Object.assign(course, updateData);
    return await course.save();
  }

  // Method to retrieve course versions (for in-memory tracking)
  async getCourseVersions(id: string): Promise<any[]> {
    return this.courseVersions.get(id) || [];
  }

  // Delete a course by ID
  async delete(id: string): Promise<Course> {
    return await this.courseModel.findByIdAndDelete(id);  // Find and delete the student
}



  }
  



