import { Controller, Post, Put, Delete, Body, Param, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO } from './create-notes.DTo';
import { UpdateNoteDTO } from './update-note.DTo';
import { Note } from './notes.Schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../Auth/roles.gaurd'; 
import { Roles } from 'src/auth/roles.decorator';
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Create a new note

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('student')
  @Post()
  async createNote(@Body() createNoteDTO: CreateNoteDTO) {
    return this.notesService.create(createNoteDTO);
  }
  @Post('/quick-note')
async createQuickNote(@Body() createNoteDTO: CreateNoteDTO) {
  createNoteDTO.quickNote = true; // Set as a quick note
  return this.notesService.create(createNoteDTO);
}
@Get('/quick-notes/:userId')
async getQuickNotes(@Param('userId') userId: string) {
  return this.notesService.getNotesByType(userId, true); // Fetch quick notes
}
// Update an existing note
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('student')
  @Put(':noteId')
  async updateNote(
    @Param('noteId') noteId: string,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.notesService.update(noteId, updateNoteDTO);
  }

  // Delete a note
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('student')
  @Delete(':noteId')
  async deleteNote(@Param('noteId') noteId: string) {
    return this.notesService.delete(noteId);
  }
  @Get()
async getAllNotes() {
  return this.notesService.getAllNotes();
}
 // Get Note by ID
 @Get(':id')
 async getNoteById(@Param('id') noteId: string): Promise<Note> {
   const note = await this.notesService.findById(noteId);
   if (!note) {
     throw new NotFoundException('Note with ID ${noteId} not found');
   }
   return note;
 }
  // Delete a note by ID
  @Delete(':noteId')
  async deleteNoteById(@Param('noteId') noteId: string) {
    return this.notesService.deleteNoteById(noteId);
  }
  @Get('user/:userId')
  async getNotesByUserId(@Param('userId') userId: string) {
      return this.notesService.getNotesByUserId(userId);
  }
  
}