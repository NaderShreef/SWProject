
import { Types } from 'mongoose';

export class CreateCourseDto {
  courseId: string;

  title: string;

  description: string;

  category: string;


  difficultyLevel: string; // Should match ['Beginner', 'Intermediate', 'Advanced']

  
  createdBy: string; // ID of the creator
  enrolledUsers?: Types.ObjectId[]; // Array of user IDs (optional)
}
