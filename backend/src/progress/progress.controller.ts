
import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './createprogress.dto';
import { UpdateProgressDto } from './updateprogress.dto';
import { Progress } from './progress.schema';
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(@Body() createProgressDto: CreateProgressDto): Promise<Progress> {
    try {
      return await this.progressService.create(createProgressDto);
    } catch (error) {
      console.error('Error in controller while creating progress:', error);
      throw error;  // Rethrow the error to let Nest handle it
    }
  }

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.progressService.findById(id);
  }

  @Get('active-users')
  getActiveUsers() {
    return this.progressService.getActiveUsers();
  }

  @Get('performance-report')
  getPerformanceReport() {
    return this.progressService.getPerformanceReport();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
    return this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.progressService.delete(id);
  }

  @Get('completion-rate')
  getCompletionRate() {
    return this.progressService.getCompletionRate();
  }

  @Get('user-completion-rate/:userId')
  getUserCompletionRate(@Param('userId') userId: string) {
    return this.progressService.getUserCompletionRate(userId);
  }

  @Get('course-completion-rate/:courseId')
  getCourseCompletionRate(@Param('courseId') courseId: string) {
    return this.progressService.getCourseCompletionRate(courseId);
  }
}