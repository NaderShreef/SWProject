import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(['student', 'instructor', 'admin'])
  role: 'student' | 'instructor' | 'admin';
}

