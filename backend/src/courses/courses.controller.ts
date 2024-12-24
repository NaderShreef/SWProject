import { Controller, Get, Post, Body, Param, Query,Put, Patch, Delete , UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schemas/courses.schema';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDTO } from './dto/updateCousre.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/Auth/roles.gaurd';
import { UsersService } from 'src/users/users.service';
import { ModulesService } from 'src/modules/modules.service';



@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService, // Inject the UsersService
    private readonly modulesService: ModulesService 
  ) {}

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
  //   @UseGuards(RolesGuard,JwtAuthGuard)
  //  @Roles('instructor')
  @Post()
async createCourse(@Body() courseData: CreateCourseDto) {
  const newCourse = await this.coursesService.create(courseData);
  return newCourse;
}

    
      @Get('search')
      async search(@Query('searchTerm') searchTerm: string) {
        return await this.coursesService.search(searchTerm);
      }

  //     @Get('searchcourse')
  // async searchCourses(
  //   @Query('title') title?: string,
  //   @Query('createdBy') createdBy?: string,
  // ): Promise<Course[]> {
  //   const courses = await this.coursesService.searchCourse(title, createdBy);
  //   return courses; // Return an empty array if no results
  // }
  @Get('searchcourse')
  async searchCourseModules(@Query('title') title: string) {
    try {
      // Find the course by title
      const course = await this.coursesService.searchCourseByTitle(title);
      if (!course) {
        throw new NotFoundException(`Course with title "${title}" not found.`);
      }
  
      // Fetch the modules using the course's `_id`
      return await this.modulesService.getAllCourseModules(course._id.toString());
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to fetch course modules.');
    }
  }

  // @UseGuards(RolesGuard,JwtAuthGuard)
  // @Roles('instructor')
  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() courseData: UpdateCourseDTO) {
      try {
          const updatedCourse = await this.coursesService.update(id, courseData);
          return updatedCourse;
      } catch (error) {
          console.error('Error in updateCourse controller:', error);
          throw new Error('Failed to update course');
      }
  }

  @Post(':courseId/enroll/:userId')
  async enroll(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
  ) {
    const result = await this.coursesService.enroll(courseId, userId);
    return result;
  }

  @Get(':id/versions')
  async getCourseVersions(@Param('id') id: string) {
    const versions = await this.coursesService.getCourseVersions(id);
    if (versions.length === 0) {
      return { message: 'No versions found for this course.' };
    }
    return { versions };
  }
  // @UseGuards(RolesGuard,JwtAuthGuard)
  // @Roles('admin')
  @Delete(':id')
  async deleteCourse(@Param('id')id:string) {
      const deletedCourse = await this.coursesService.delete(id);
     return deletedCourse;
  }


}
