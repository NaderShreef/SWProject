import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose'; // Import Schema for references


@Schema()
export class Note extends Document {
  @Prop({ required: true, unique: true })
  noteId: string; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  userId: string; 

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'courses', required: true })
  courseId: string; 

  @Prop({ type:MongooseSchema.Types.ObjectId , ref: 'modules',  required:true})
  moduleId:string;

  @Prop({ required: true })
  content: string; 

  @Prop({ required: true, default: Date.now })
  createdAt: Date; 

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date; 
}

export const NoteSchema = SchemaFactory.createForClass(Note);
