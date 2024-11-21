import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async createCourse(@Body() createCourseDto: any) {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  async getAllCourses(@Query('category') category?: string) {
    return this.coursesService.getAllCourses(category);
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }
  @Get('search')
  async searchCourses(
    @Query('topic') topic?: string,
    @Query('instructor') instructor?: string,
  ) {
    return this.coursesService.searchCourses(topic, instructor);
  }

  @Patch(':id')
  async updateCourse(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }
}
