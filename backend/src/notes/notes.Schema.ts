import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop({ required: true, unique: true })
  noteId: string; 

  @Prop({ required: true })
  userId: string; 

  @Prop({ required: false })
  courseId: string; 

  @Prop({ required: true })
  content: string; 

  @Prop({ required: true, default: Date.now })
  createdAt: Date; 

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date; 
}

export const NoteSchema = SchemaFactory.createForClass(Note);
