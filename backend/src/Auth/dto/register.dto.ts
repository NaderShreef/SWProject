import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'instructor' | 'admin';
}
