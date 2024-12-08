import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UserResponseDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsEnum(['student', 'instructor', 'admin'])
  role: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @IsString()
  createdAt: string;
}
