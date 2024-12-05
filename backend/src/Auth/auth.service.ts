import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    userDto: Partial<User>,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userDto.passwordHash, saltRounds);

    // Create user
    const user = await this.usersService.createUser({
      ...userDto,
      passwordHash,
      userId: userDto.email,
    });

    // Generate JWT token
    const payload = {
      sub: user.userId,
      email: user.email,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);

    // Remove sensitive information before returning
    const { passwordHash: _, ...userResponse } = user.toObject();

    return {
      user: userResponse,
      access_token,
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      sub: user.userId,
      email: user.email,
      role: user.role,
    };
    const access_token = this.jwtService.sign(payload);

    // Remove sensitive information before returning
    const { passwordHash: _, ...userResponse } = user.toObject();

    return {
      user: userResponse,
      access_token,
    };
  }
}
