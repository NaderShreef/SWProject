import { Document } from 'mongoose';
export declare class Course extends Document {
    courseId: string;
    title: string;
    description: string;
    category: string;
    difficultyLevel: string;
    createdBy: string;
    createdAt: Date;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
}>;
