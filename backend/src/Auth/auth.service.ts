import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    // Create user
    const user = await this.usersService.createUser({
      ...registerDto,
      passwordHash,
      userId: registerDto.email,
    });

    // Generate JWT token
    const payload = {
      sub: user._id,
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

    // Validate password using the new method
    const isPasswordValid = await this.validatePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = {
      sub: user._id,
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

  // validatePassword method is now public
  public async validatePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    // Compare provided password with the stored password hash
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
