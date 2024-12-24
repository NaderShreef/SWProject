import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Create a user
  async createUser(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel({
      ...user,
      role: user.role || 'student',
    });
    return newUser.save();
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Get user by ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
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

  // Get user by email (used for login validation)
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  
  // Track failed login attempts
  async incrementFailedLoginAttempts(userId: string): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { userId },
        {
          $inc: { failedLoginAttempts: 1 }, // Increment failed login attempts by 1
          $set: { lastFailedLoginAttempt: new Date() }, // Set timestamp for the failed login attempt
        },
        { new: true },
      )
      .exec();
  }

  // Reset failed login attempts
  async resetFailedLoginAttempts(userId: string): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { userId },
        {
          $set: { failedLoginAttempts: 0 }, // Reset failed login attempts to 0
        },
        { new: true },
      )
      .exec();
  }

  // Get users with failed login attempts
  async getFailedLoginAttempts(): Promise<any> {
    // This method returns a list of users with failed login attempts.
    return this.userModel.aggregate([
      { $match: { failedLoginAttempts: { $gte: 1 } } },
      { $project: { userId: 1, email: 1, failedLoginAttempts: 1 } },
    ]);
  }
}
