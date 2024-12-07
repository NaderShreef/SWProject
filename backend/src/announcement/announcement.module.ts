import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementSchema, AnnouncementModelName } from './schemas/announcement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AnnouncementModelName, schema: AnnouncementSchema }]),
  ],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
})
export class AnnouncementModule {}

