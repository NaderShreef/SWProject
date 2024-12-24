import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  moduleId: string; // User-provided module ID

  @IsNotEmpty()
  @IsMongoId()
  courseId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  resources?: string[];
}
