
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
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress } from './progress.schema';
import { Response } from 'express';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
  @Post()
  async createProgress(@Body() progressData: Partial<Progress>): Promise<Progress> {
    try {
      return await this.progressService.create(progressData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create progress', error.message);
    }
  }
  
  @Get()
  async getAllProgress(): Promise<Progress[]> {
    return await this.progressService.findAll();
  }
  
  @Get(':id')
  async getProgressById(@Param('id') id: string): Promise<Progress> {
    return await this.progressService.findById(id);
  }
  
  @Put(':id')
  async updateProgress(
    @Param('id') id: string,
    @Body() updateData: Partial<Progress>,
  ): Promise<Progress> {
    return await this.progressService.update(id, updateData);
  }
  
  @Delete(':id')
  async deleteProgress(@Param('id') id: string): Promise<void> {
    return await this.progressService.delete(id);
  }
  
  // **Student Dashboard Endpoints**
  
  @Get('dashboard/student/:userId')
  async getStudentDashboard(@Param('userId') userId: string): Promise<any> {
    return await this.progressService.getStudentDashboard(userId);
  }
  
  // **Instructor Analytics Endpoints**
  
  @Get('dashboard/instructor/:courseId')
  async getInstructorDashboard(@Param('courseId') courseId: string): Promise<any> {
    return await this.progressService.getInstructorDashboard(courseId);
  }
  
  @Get('analytics/download/:courseId')
  async downloadAnalytics(
    @Param('courseId') courseId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const analytics = await this.progressService.getDownloadableAnalytics(courseId);
      res.setHeader('Content-Disposition', `attachment; filename=course-${courseId}-analytics.json`);
      res.setHeader('Content-Type', 'application/json');
      res.send(analytics.downloadableFormat);
    } catch (error) {
      throw new InternalServerErrorException('Failed to download analytics', error.message);
    }
  }
  
  // **Additional Instructor Metrics**
  
  @Get('engagement/course/:courseId')
  async getCourseEngagementReport(@Param('courseId') courseId: string): Promise<any> {
    return await this.progressService.getCourseEngagementReport(courseId);
  }
  
  @Get('metrics/performance/:courseId')
  async getStudentPerformanceMetrics(@Param('courseId') courseId: string): Promise<any> {
    return await this.progressService.getStudentPerformanceMetrics(courseId);
  }
  
  @Get('completion-rate/course/:courseId')
  async getCourseCompletionRate(@Param('courseId') courseId: string): Promise<number> {
    return await this.progressService.getCourseCompletionRate(courseId);
  }
  
  @Get('completion-rate/student/:userId')
  async getStudentCompletionRate(@Param('userId') userId: string): Promise<number> {
    return await this.progressService.getUserCompletionRate(userId);
  }
  @Get('student/enrolled-courses/:userId')
async getEnrolledCoursesAndProgress(
  @Param('userId') userId: string,
): Promise<any> {
  return this.progressService.getEnrolledCoursesWithProgress(userId);
}
}  