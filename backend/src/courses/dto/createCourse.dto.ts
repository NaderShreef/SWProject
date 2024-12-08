export class CreateCourseDTo {
    courseId: string; 
    title: string; 
    description: string; 
    category: string; 
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced'; 
    createdBy: string; // Instructor who created the course
    createdAt: Date; 
  }
  