export interface Course{
    _id:string,
    courseId:string,
    title:string,
    description: string,
    category: string,
    difficultyLevel: string,
    createdBy: string,
    createdAt: Date
}
    export interface UserProfile {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        enrolledCourses: Course[];
        completedCourses: Course[];
        averageScore?: number;
      }
      
      export interface AnalyticsReport {
        studentId: string;
        studentName: string;
        enrolledCourses: number;
        completedCourses: number;
        completionRate: number;
      }
      export interface Room {
        _id: string;
        name: string;
        description: string;
      }
     export interface Module {
        _id: string;
        moduleId: string;
        courseId:string;
        title: string;
        content: string;
        resources: string[];
        isOutdated: boolean;
      }
      