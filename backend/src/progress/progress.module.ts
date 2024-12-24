import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress, ProgressSchema } from './progress.schema';
import { Course, CourseSchema } from 'src/courses/schemas/courses.schema'
import { CoursesModule } from 'src/courses/courses.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    CoursesModule
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
