import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Roles } from '../auth/roles.decorator';
import { RegisterDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../Auth/roles.gaurd'; // Correct import path
import { CoursesService } from 'src/courses/courses.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
  ) {}
  @Get(':userId/courses')
  async getUserCourses(@Param('userId') userId: string) {
    return await this.coursesService.getUserCourses(userId);
  }
  // Admin can create a new user
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Post()
  async createUser(@Body() createUserDto: RegisterDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Admin can view all users
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // Admin can view a user by their userId
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    console.log('Fetching user with ID:', userId); // Debug log
    return this.usersService.findById(userId);
  }
  

  // Admin can update a user by their userId
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  // Admin can delete a user by their userId
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }

  // Optional: Admin can view failed login attempts for all users (you can implement this as per your business logic)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Get('failed-login-attempts')
  async getFailedLoginAttempts() {
    return this.usersService.getFailedLoginAttempts();
  }
  @Get('profile')
async getProfile(@Req() req): Promise<User> {
  const userId = req.user.userId; // Assuming `req.user` is populated by the authentication middleware
  return this.usersService.findById(userId);
}
}

