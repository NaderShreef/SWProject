
// import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
// import { ProgressService } from './progress.service';
// import { CreateProgressDto } from './createprogress.dto';
// import { UpdateProgressDto } from './updateprogress.dto';
// import { Progress } from './progress.schema';
// @Controller('progress')
// export class ProgressController {
//   constructor(private readonly progressService: ProgressService) {}

//   @Post()
//   async create(@Body() createProgressDto: CreateProgressDto): Promise<Progress> {
//     try {
//       return await this.progressService.create(createProgressDto);
//     } catch (error) {
//       console.error('Error in controller while creating progress:', error);
//       throw error;  // Rethrow the error to let Nest handle it
//     }
//   }

//   @Get()
//   findAll() {
//     return this.progressService.findAll();
//   }

//   @Get(':id')
//   findById(@Param('id') id: string) {
//     return this.progressService.findById(id);
//   }

//   @Get('active-users')
//   getActiveUsers() {
//     return this.progressService.getActiveUsers();
//   }

//   // @Get('performance-report')
//   // getPerformanceReport() {
//   //   return this.progressService.getPerformanceReport();
//   // }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateProgressDto: UpdateProgressDto) {
//     return this.progressService.update(id, updateProgressDto);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: string) {
//     return this.progressService.delete(id);
//   }

//   @Get('completion-rate')
//   getCompletionRate() {
//     return this.progressService.getCompletionRate();
//   }

//   @Get('user-completion-rate/:userId')
//   getUserCompletionRate(@Param('userId') userId: string) {
//     return this.progressService.getUserCompletionRate(userId);
//   }

//   @Get('course-completion-rate/:courseId')
//   getCourseCompletionRate(@Param('courseId') courseId: string) {
//     return this.progressService.getCourseCompletionRate(courseId);
//   }
// }
import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  BadRequestException,
  InternalServerErrorException,
  Body,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { isValidObjectId } from 'mongoose';
import { Progress } from './progress.schema';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  // Fetch all progress records
  @Get()
  async findAll() {
    return await this.progressService.findAll();
  }
  @Post()
  async createProgress(@Body() progressData: Progress): Promise<Progress> {
    return await this.progressService.create(progressData);
  }

  // Fetch a progress record by ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid progress ID');
    }
    return await this.progressService.findById(id);
  }

  // Get the overall completion rate across all users
  @Get('completion-rate')
  async getCompletionRate() {
    return await this.progressService.getCompletionRate();
  }

  // Get a specific user's completion rate
  @Get('user/:userId/completion-rate')
  async getUserCompletionRate(@Param('userId') userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    return await this.progressService.getUserCompletionRate(userId);
  }

  // Get a specific course's completion rate
  @Get('course/:courseId/completion-rate')
  async getCourseCompletionRate(@Param('courseId') courseId: string) {
    if (!isValidObjectId(courseId)) {
      throw new BadRequestException('Invalid courseId');
    }
    return await this.progressService.getCourseCompletionRate(courseId);
  }

  // Get the number of active users
  @Get('active-users')
  async getActiveUsers() {
    return await this.progressService.getActiveUsers();
  }

  // Get the performance category of a specific user
  @Get('user/:userId/performance-category')
  async getPerformanceCategory(@Param('userId') userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    return await this.progressService.getPerformanceCategories(userId);
  }

  // Get the dashboard data for a specific user
  @Get('dashboard')
  async getDashboard(@Query('userId') userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    try {
      return await this.progressService.getDashboard(userId);
    } catch (error) {
      console.error('Error in getDashboard:', error);
      throw new InternalServerErrorException('Could not retrieve dashboard data');
    }
  }
}
