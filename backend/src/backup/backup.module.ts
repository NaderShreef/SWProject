import { Module } from '@nestjs/common';
import { UsersModule } from '../users/user.module'; // Import UsersModule
import { CoursesModule } from '../courses/courses.module'; // Import CoursesModule
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';

@Module({
  imports: [UsersModule, CoursesModule], 
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}

