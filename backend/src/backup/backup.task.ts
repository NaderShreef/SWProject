import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BackupService } from './backup.service';

@Injectable()
export class BackupTask {
  constructor(private readonly backupService: BackupService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Adjust schedule as needed
  async handleBackup() {
    console.log('Running scheduled backup...');
    await this.backupService.backupData();
  }
}
