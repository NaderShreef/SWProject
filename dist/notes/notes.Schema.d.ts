import { Document } from 'mongoose';
export declare class NotesModule {
}
export declare class Note extends Document {
    noteId: string;
    userId: string;
    courseId: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;
}
export declare const NoteSchema: import("mongoose").Schema<Note, import("mongoose").Model<Note, any, any, any, Document<unknown, any, Note> & Note & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Note, Document<unknown, {}, import("mongoose").FlatRecord<Note>> & import("mongoose").FlatRecord<Note> & {
    _id: import("mongoose").Types.ObjectId;
}>;
