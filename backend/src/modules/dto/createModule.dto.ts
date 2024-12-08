import { IsMongoId,IsString, IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  moduleId: string;

  @IsMongoId() // Ensure courseId is a valid MongoDB ObjectId
  courseId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true }) // Validate that each resource is a valid URL
  resources?: string[];
}
