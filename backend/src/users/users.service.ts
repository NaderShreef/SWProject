import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a user
  async createUser(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Get user by ID
  async findById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).exec();
  }

  // Update user by ID
  async updateUser(
    userId: string,
    updates: Partial<User>,
  ): Promise<User | null> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ userId }, updates, { new: true })
      .exec();
    return updatedUser as User | null;
  }

  // Delete user by ID
  async deleteUser(userId: string): Promise<User | null> {
    const deletedUser = await this.userModel
      .findOneAndDelete({ userId })
      .exec();
    return deletedUser as unknown as User | null;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
