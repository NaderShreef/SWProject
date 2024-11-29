import { Controller, Get, Post, Body, Param, Query,Put, Patch } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schemas/courses.schema';
import { CreateCourseDTo } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCousre.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {

  }

  @Get()
    // Get all course
    async getAllcourses(): Promise<Course[]> {
        return await this.coursesService.findAll();
    }
    @Get(':id')// /courses/:id   // Get a single course by ID
    async getCourseById(@Param('id') id: string) {// Get the student ID from the route parameters
        const course = await this.coursesService.findById(id);
        return course;
    }
    // Create a new course
    @Post()
    async createCourse(@Body()courseData: CreateCourseDTo) {// Get the new student data from the request body
        const newCourse = await this.coursesService.create(courseData);
        return newCourse;
    }


  @Get('search')
  async searchCourses(
    @Query('topic') topic?: string,
    @Query('instructor') instructor?: string,
  ) {
    return this.coursesService.searchCourses(topic, instructor);
  }

  // Update a course's details
  @Put(':id')
  async updateCourse(@Param('id') id:string,@Body()courseData: UpdateCourseDTO) {
      const updatedCourse = await this.coursesService.update(id, courseData);
      return updatedCourse;      
  }
}
