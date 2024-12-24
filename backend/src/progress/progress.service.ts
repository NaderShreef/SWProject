import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress } from './progress.schema';
import { Course } from 'src/courses/schemas/courses.schema';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async create(progressData: Partial<Progress>): Promise<Progress> {
    const newProgress = new this.progressModel(progressData);
    return await newProgress.save();
  }

  async findAll(): Promise<Progress[]> {
    return await this.progressModel.find().exec();
  }

  async findById(id: string): Promise<Progress> {
    const progress = await this.progressModel.findById(id).exec();
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return progress;
  }

  async update(id: string, updateData: Partial<Progress>): Promise<Progress> {
    const updatedProgress = await this.progressModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updatedProgress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return updatedProgress;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.progressModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
  }

  // **Student Dashboard: Completion Rate**
  async getUserCompletionRate(userId: string): Promise<number> {
    const userProgress = await this.progressModel.find({ userId }).exec();

    if (userProgress.length === 0) return 0;

    const totalCompletion = userProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / userProgress.length;
  }

  // **Student Dashboard: Performance Metrics**
  async getPerformanceCategory(userId: string): Promise<string> {
    const userCompletionRate = await this.getUserCompletionRate(userId);
    const averageCompletionRate = await this.getAverageCompletionRate();

    if (userCompletionRate >= 90) return 'Excellent';
    if (userCompletionRate >= averageCompletionRate) return 'Above Average';
    if (userCompletionRate >= 50) return 'Average';
    return 'Below Average';
  }

  async getAverageCompletionRate(): Promise<number> {
    const totalProgress = await this.progressModel.find().exec();

    if (totalProgress.length === 0) return 0;

    const totalCompletion = totalProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / totalProgress.length;
  }

  // **Instructor Analytics: Engagement**
  async getEnrolledStudentCount(courseId: string): Promise<number> {
    const course = await this.courseModel
      .findById(courseId)
      .select("enrolledUsers")
      .exec(); // Select only enrolledUsers field
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return course.enrolledUsers?.length || 0; // Safely return the count
  }
  

  async getCourseCompletionRate(courseId: string): Promise<number> {
    const courseProgress = await this.progressModel.find({ courseId }).exec();
    if (courseProgress.length === 0) return 0;

    const completedStudents = courseProgress.filter(
        (progress) => progress.completionPercentage === 100,
    ).length;

    return completedStudents; // Return the count instead of percentage
}


async getStudentPerformanceMetrics(courseId: string): Promise<{
  belowAverage: number;
  average: number;
  aboveAverage: number;
  excellent: number;
}> {
  const courseProgress = await this.progressModel.find({ courseId }).exec();

  const metrics = {
    belowAverage: 0,
    average: 0,
    aboveAverage: 0,
    excellent: 0,
  };

  const averageCompletionRate = await this.getAverageCompletionRate();

  courseProgress.forEach((progress) => {
    const { completionPercentage } = progress;
    if (completionPercentage >= 90) {
      metrics.excellent++;
    } else if (completionPercentage >= averageCompletionRate) {
      metrics.aboveAverage++;
    } else if (completionPercentage >= 50) {
      metrics.average++;
    } else {
      metrics.belowAverage++;
    }
  });

  return metrics;
}

  // **Instructor Analytics: Content Effectiveness**
  async getCourseEngagementReport(courseId: string): Promise<any> {
    const enrolledStudents = await this.getEnrolledStudentCount(courseId);
    const completionRate = await this.getCourseCompletionRate(courseId); // Now returns count of students with 100% completion
    const performanceMetrics = await this.getStudentPerformanceMetrics(courseId);

    return {
        enrolledStudents,
        completionRate, // Updated to reflect count instead of percentage
        performanceMetrics,
    };
}
  // **Downloadable Analytics**
  async getDownloadableAnalytics(courseId: string): Promise<any> {
    const engagementReport = await this.getCourseEngagementReport(courseId);

    return {
      report: engagementReport,
      downloadableFormat: JSON.stringify(engagementReport), // Convert to JSON for download
    };
  }

  // **Student Dashboard: User Dashboard**
  async getStudentDashboard(userId: string): Promise<any> {
    // Fetch all courses the user is enrolled in
    const userCourses = await this.courseModel.find({ enrolledUsers: userId }).exec();
  
    if (userCourses.length === 0) {
      throw new NotFoundException(`No enrolled courses found for user ID ${userId}`);
    }
  
    // Fetch progress records for the user
    const userProgress = await this.progressModel.find({ userId }).exec();
  
    // Map courses with progress data
    const dashboardData = userCourses.map((course) => {
      const progress = userProgress.find(
        (record) => record.courseId.toString() === course._id.toString()
      );
  
      return {
        courseTitle: course.title,
        courseDescription: course.description,
        completionPercentage: progress ? progress.completionPercentage : 0,
        averageScore: progress ? progress.averageScore || 0 : 0,
      };
    });
  
    return dashboardData;
  }
  
  async getUserCompletionPercentage(userId: string): Promise<number> {
    const userProgress = await this.progressModel.find({ userId }).exec();

    if (userProgress.length === 0) return 0; // No progress records, return 0

    const totalCompletion = userProgress.reduce(
      (acc, curr) => acc + curr.completionPercentage,
      0,
    );
    return totalCompletion / userProgress.length;
  }
  // async getUserAverageScore(userId: string): Promise<number> {
  //   const userProgress = await this.progressModel.find({ userId }).exec();

  //   if (userProgress.length === 0) return 0; // No progress records, return 0

  //   const totalScores = userProgress.reduce(
  //     (acc, curr) => acc + (curr.averageScore || 0),
  //     0,
  //   );
  //   return totalScores / userProgress.length;
  // }

  // **Instructor Analytics: General Dashboard**
  async getInstructorDashboard(courseId: string): Promise<any> {
    const engagementReport = await this.getCourseEngagementReport(courseId);

    return {
      courseId,
      engagementReport,
    };
  }
  // Add this function in ProgressService
  async getEnrolledCoursesWithProgress(userId: string): Promise<any[]> {
    const progressRecords = await this.progressModel
      .find({ userId })
      .populate('courseId') // Populate course details
      .exec();

    if (!progressRecords.length) {
      throw new NotFoundException(`No enrolled courses found for user ID ${userId}`);
    }
  
    // Map the progress records to include course details, performance metrics, and progress data
    const enrolledCoursesWithMetrics = await Promise.all(
      progressRecords.map(async (record) => {
        // Ensure the course is populated and is an object
        const course = record.courseId as any; // Explicit type assertion to any for populated field
  
        if (!course || typeof course !== 'object') {
          throw new Error(`Course details are missing or invalid for courseId: ${record.courseId}`);
        }
  
        // Ensure course has an _id field
        const courseId = course._id ? course._id.toString() : null;
        if (!courseId) {
          throw new Error(`Course ID is missing in the populated course object.`);
        }
  
        // Fetch performance metrics for the course
        const performanceMetrics = await this.getStudentPerformanceMetrics(courseId);
  
        // Return the mapped object with course details and metrics
        return {
          course, // Populated course object
          completionPercentage: record.completionPercentage,
          lastAccessed: record.lastAccessed,
          performanceMetrics,
        };
      })
    );
  
    return enrolledCoursesWithMetrics;
  }
  

}
