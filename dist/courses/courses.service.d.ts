import { Model } from 'mongoose';
import { Course } from './schemas/courses.schema';
export declare class CoursesService {
    private courseModel;
    constructor(courseModel: Model<Course>);
    createCourse(createCourseDto: any): Promise<Course>;
    getAllCourses(category?: string): Promise<Course[]>;
    getCourseById(id: string): Promise<Course>;
    updateCourse(id: string, updateCourseDto: any): Promise<Course>;
    searchCourses(topic?: string, instructor?: string): Promise<Course[]>;
}
