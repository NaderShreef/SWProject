import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressSchema } from './progress.schema';
import { ProgressController } from './progress.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'progress', schema: ProgressSchema }]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
