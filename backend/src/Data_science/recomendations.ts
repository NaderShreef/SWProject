import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Recommendation document
export interface IRecommendation extends Document {
  recommendationId: string;
  userId: string;
  recommendedItems: string[];
  generatedAt: Date;
}

// Schema creation
const RecommendationSchema: Schema = new Schema({
  recommendationId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  recommendedItems: { type: [String], required: true }, // Array of strings
  generatedAt: { type: Date, default: Date.now },
});

// Model exporting
export const Recommendation = mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);

