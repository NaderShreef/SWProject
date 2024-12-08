import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsEnum(['student', 'instructor', 'admin'])
  role?: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;
}
