import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './notes.Schema';
import { CreateNoteDTO } from './create-notes.DTo';
import { UpdateNoteDTO } from './update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {}

  // Create a new note
  async create(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const newNote = new this.noteModel(createNoteDTO);
    return newNote.save();
  }
  async getNotesByType(userId: string, quickNote: boolean): Promise<Note[]> {
    return this.noteModel.find({ userId, quickNote }).exec();
  }
  

  // Update an existing note
  async update(noteId: string, updateNoteDTO: UpdateNoteDTO): Promise<Note> {
    const updatedNote = await this.noteModel
      .findOneAndUpdate({ noteId }, updateNoteDTO, { new: true })
      .exec();

    if (!updatedNote) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
    return updatedNote;
  }

  // Delete a note
// Delete a note
async delete(noteId: string): Promise<Note> {
    const deletedNote = await this.noteModel.findOneAndDelete({ noteId }).exec();
  
    if (!deletedNote) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
  
    return deletedNote as unknown as Note; // Explicitly cast to the Note type
  }
  // Get all notes
async getAllNotes(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }
  
  // Function to delete a note by ID
  async deleteNoteById(noteId: string): Promise<Note> {
    const deletedNote = await this.noteModel.findOneAndDelete({ noteId }).exec();
    if (!deletedNote) {
      throw new NotFoundException(`Note with ID ${noteId} not found.`);
    }
    return deletedNote as unknown as Note; // Explicitly cast to Note
  }
}

