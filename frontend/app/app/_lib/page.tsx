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
      
      export interface PerformanceMetrics {
        belowAverage: number;
        average: number;
        aboveAverage: number;
        excellent: number;
      }
      
      export interface EngagementReport {
        enrolledStudents: number;
        completionRate: number;
        performanceMetrics: PerformanceMetrics;
      }
      
      export interface AnalyticsData {
        courseId: string;
        engagementReport: EngagementReport;
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
      
      
     
      export interface Note {
        noteId: string;
        userId: string;
        course?: {
          id: string;
          title: string;
        };
        module?: {
          id: string;
          title: string;
        };
        content: string;
        createdAt: string;
        lastUpdated: string;
      }