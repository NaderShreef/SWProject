import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RegisterDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../Auth/roles.gaurd'; // Correct import path

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Admin can create a new user
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createUser(@Body() createUserDto: RegisterDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Admin can view all users
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Get users by name
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'instructor')
  @Get('search')
  async findByName(@Query('name') name: string) {
    return this.usersService.findByName(name);
  }

  // Admin can view a user by their userId
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    return this.usersService.findById(userId);
  }

  // Admin can update a user by their userId
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  // Admin can delete a user by their userId
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }

  // Optional: Admin can view failed login attempts for all users (you can implement this as per your business logic)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('failed-login-attempts')
  async getFailedLoginAttempts() {
    return this.usersService.getFailedLoginAttempts();
  }
}
