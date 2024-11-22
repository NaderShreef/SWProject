import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the UserInteraction document
export interface IUserInteraction extends Document {
  interactionId: string;
  userId: string;
  courseId: string;
  score: number;
  timeSpentMinutes: number;
  lastAccessed: Date;
}

// Schema creation
const UserInteractionSchema: Schema = new Schema({
  interactionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  score: { type: Number, required: true },
  timeSpentMinutes: { type: Number, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

// ModelExporting
export const UserInteraction = mongoose.model<IUserInteraction>('UserInteraction', UserInteractionSchema);

