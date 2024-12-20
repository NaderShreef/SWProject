import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Progress } from './progress.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
  ) {}

  @Cron('0 0 * * *') // Every midnight
  async handleCron() {
    try {
      await this.backupProgressData();
      this.logger.log('Scheduled backup completed.');
    } catch (error) {
      this.logger.error('Error during scheduled backup:', error.message);
    }
  }

  async backupProgressData(): Promise<void> {
    const progressData = await this.progressModel.find().exec();
    const backupPath = `./backups/progress_backup_${Date.now()}.json`;
    fs.writeFileSync(backupPath, JSON.stringify(progressData, null, 2));
    this.logger.log(`Backup saved to ${backupPath}`);
  }
}

