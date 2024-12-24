import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModuleSchema, Module as ModuleClass } from './modules.schema';
import { CoursesModule } from '../courses/courses.module';  // Import the CoursesModule
import { Course, CourseSchema } from 'src/courses/schemas/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModuleClass.name, schema: ModuleSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    
   forwardRef(() => CoursesModule),   
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}

