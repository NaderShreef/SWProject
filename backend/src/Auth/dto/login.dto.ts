import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()  // Ensures the email is a valid email format
  email: string;

  @IsString()  // Ensures the password is a string
  @MinLength(6)  // Ensures the password is at least 6 characters long
  password: string;
}
