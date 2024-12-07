import { Controller, Get, Post, Body, Param, Query,Put, Patch, Delete , UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schemas/courses.schema';
import { CreateCourseDTo } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCousre.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/Auth/roles.gaurd';


@Controller('courses')
@UseGuards(RolesGuard,JwtAuthGuard)
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
   @Roles('instructor')
    @Post()
    async createCourse(@Body()courseData: CreateCourseDTo) {// Get the new student data from the request body
        const newCourse = await this.coursesService.create(courseData);
        return newCourse;
    }
    
      @Get('search')
      async search(@Query('searchTerm') searchTerm: string) {
        return await this.coursesService.search(searchTerm);
      }

      @Get('searchcourse')
      async searchCourses(
        @Query('title') title?: string,
        @Query('createdBy') createdBy?: string,
      ): Promise<Course | []> { // Return a single Course or null if not found
        return this.coursesService.searchCourse(title, createdBy); // Adjusted service call
      }


  @Roles('instructor')
  @Put(':id')
  async updateCourse(@Param('id') id:string,@Body()courseData: UpdateCourseDTO) {
      const updatedCourse = await this.coursesService.update(id, courseData);
      return updatedCourse;      
  }

  @Post(':id/enroll')
  async enrollInCourse(@Param('id') courseId: string, @Body('userId') userId: string): Promise<string> {

    return this.coursesService.enroll(courseId, userId);
  }

  @Get(':id/versions')
  async getCourseVersions(@Param('id') id: string) {
    const versions = await this.coursesService.getCourseVersions(id);
    if (versions.length === 0) {
      return { message: 'No versions found for this course.' };
    }
    return { versions };
  }

  @Roles('admin')
  @Delete(':id')
  async deleteCourse(@Param('id')id:string) {
      const deletedCourse = await this.coursesService.delete(id);
     return deletedCourse;
  }


}
