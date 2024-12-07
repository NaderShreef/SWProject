import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UsersService } from '../users/users.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class BackupService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}

  async backupData(): Promise<void> {
    const userBackup = await this.usersService.findAll();
    const courseBackup = await this.coursesService.findAll();

    const backup = {
      timestamp: new Date().toISOString(),
      users: userBackup,
      courses: courseBackup,
    };

    const backupPath = path.join(__dirname, '../../backups');
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath);
    }

    fs.writeFileSync(
      `${backupPath}/backup-${Date.now()}.json`,
      JSON.stringify(backup, null, 2),
    );

    console.log('Backup created successfully!');
  }

  // Adding the performBackup method
  async performBackup(): Promise<string> {
    try {
      await this.backupData();
      return 'Backup completed successfully!';
    } catch (error) {
      console.error('Backup failed:', error);
      throw new Error('Backup process failed. Please try again.');
    }
  }
}

