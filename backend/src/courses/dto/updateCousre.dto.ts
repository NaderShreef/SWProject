export class UpdateCourseDTO {
    title?: string; 
    description?: string; 
    category?: string; 
    difficultyLevel?: 'Beginner' | 'Intermediate' | 'Advanced'; 
    updatedBy: string; // Instructor making the update
    updatedAt: Date; 
  }
  