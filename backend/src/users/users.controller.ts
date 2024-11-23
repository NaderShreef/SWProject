import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: Partial<User>) {
    return this.usersService.createUser(user);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    return this.usersService.findById(userId);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updates: Partial<User>,
  ) {
    return this.usersService.updateUser(userId, updates);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
