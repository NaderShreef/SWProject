import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteNoteDTO {
  @IsString()
  @IsNotEmpty()
  noteId: string;
}
