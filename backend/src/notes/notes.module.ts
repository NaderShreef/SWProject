import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './notes.Schema';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({

    imports : [MongooseModule.forFeature([{name : 'notes', schema : NoteSchema}])],
    controllers : [NotesController],
    providers : [NotesService]
})
export class NotesModule {}
