// announcement.schema.ts
import { Schema, Document } from 'mongoose';

export interface Announcement extends Document {
  title: string;
  message: string;
  userId: string;  // ID of the user who created the announcement
  createdAt: Date;
}

export const AnnouncementSchema = new Schema<Announcement>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model name as a string
export const AnnouncementModelName = 'Announcement';
