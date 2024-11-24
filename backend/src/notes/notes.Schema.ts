import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Module({})
export class NotesModule {}
// Define the Note schema using a class and @Prop decorators
@Schema()
export class Note extends Document {
  @Prop({ required: true, unique: true })
  noteId: string; // Unique identifier for the note

  @Prop({ required: true })
  userId: string; // User who created the note

  @Prop({ required: false })
  courseId: string; // Associated course ID (optional)

  @Prop({ required: true })
  content: string; // Content of the note

  @Prop({ required: true, default: Date.now })
  createdAt: Date; // Timestamp of note creation

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date; // Last time the note was updated
}

// Create the Mongoose schema
export const NoteSchema = SchemaFactory.createForClass(Note);
