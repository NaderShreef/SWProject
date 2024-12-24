import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDTO {
  @IsString()
  @IsNotEmpty()
  noteId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  courseId?: string;

  @IsOptional()
  @IsString()
  moduleId?: string;

  

  @IsString()
  @IsNotEmpty()
  content: string;
    quickNote: boolean;
}
