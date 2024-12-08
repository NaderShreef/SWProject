import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress, ProgressSchema } from './progress.schema';  // Import your schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Progress.name, schema: ProgressSchema }]), // Register Progress schema
  ],
  providers: [ProgressService],
  controllers: [ProgressController],
})
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'progress', schema: ProgressSchema }]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}

