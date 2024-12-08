import { CoursesService } from './courses.service';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    createCourse(createCourseDto: any): Promise<import("./schemas/courses.schema").Course>;
    getAllCourses(category?: string): Promise<import("./schemas/courses.schema").Course[]>;
    getCourseById(id: string): Promise<import("./schemas/courses.schema").Course>;
    searchCourses(topic?: string, instructor?: string): Promise<import("./schemas/courses.schema").Course[]>;
    updateCourse(id: string, updateCourseDto: any): Promise<import("./schemas/courses.schema").Course>;
}
