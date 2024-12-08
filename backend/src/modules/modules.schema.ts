import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose'; // Import Schema for references

export type ModuleDocument = Module & Document;

@Schema({ timestamps: true }) 
export class Module {
  @Prop({ required: true, unique: true })
  moduleId: string; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  courseId: string; // Reference to the Course schema 

  @Prop({ required: true })
  title: string; 

  @Prop({ required: true })
  content: string; 

  @Prop({ type: [String], default: [] })
  resources: string[]; 

  @Prop({ default: false })
  isOutdated: boolean; 

  @Prop({ type: [{ type: String, ref: 'Question' }] })
  questions: string[];

  @Prop({ type: [Object], default: [] })
  versions: Record<string, any>[];

}

export const ModuleSchema = SchemaFactory.createForClass(Module);
