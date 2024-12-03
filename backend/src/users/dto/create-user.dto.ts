import { IsString, IsEmail, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  passwordHash: string;

  @IsEnum(['student', 'instructor', 'admin'])
  role: string;

  @IsOptional()
  @IsString()
  profilePictureUrl?: string;
}
