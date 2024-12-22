import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/schemas/user.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service'; // Import UsersService
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Inject UsersService
  ) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the user has failed login attempts
    if (user.failedLoginAttempts && user.failedLoginAttempts >= 3) {
      throw new UnauthorizedException(
        'Account locked due to too many failed login attempts',
      );
    }

    // Validate the user's password (Assuming you have password validation in your auth service)
    const isPasswordValid = await this.authService.validatePassword(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      // Increment failed login attempts if password is incorrect
      await this.usersService.incrementFailedLoginAttempts(user.userId);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed login attempts if login is successful
    await this.usersService.resetFailedLoginAttempts(user.userId);

    // Proceed with generating JWT token after successful login
    return this.authService.login(user.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
