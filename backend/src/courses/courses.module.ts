import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './schemas/courses.schema';
import { UsersModule } from 'src/users/user.module';
import { UserSchema,User } from 'src/users/schemas/user.schema';
import {Module as ModuleClass, ModuleSchema } from 'src/modules/modules.schema';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      {name: User.name, schema: UserSchema},
      {name: Module.name ,  schema : ModuleSchema}
    ]),
    forwardRef(() => UsersModule),  // Forward reference to avoid circular dependency
    forwardRef(() => ModulesModule),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

