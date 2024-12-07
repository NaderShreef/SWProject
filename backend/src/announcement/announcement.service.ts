
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnouncementModelName, Announcement } from './schemas/announcement.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(AnnouncementModelName) private readonly announcementModel: Model<Announcement>,
  ) {}

  // Create an announcement
  async create(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    const newAnnouncement = new this.announcementModel(createAnnouncementDto);
    return newAnnouncement.save();
  }

  // Get all announcements
  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().exec();
  }
}
