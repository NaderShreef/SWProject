import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateNoteDTO {
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
