import { IsString, IsOptional } from 'class-validator';

export class UpdateNoteDTO {
  @IsString()
  @IsOptional()
  courseId?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
