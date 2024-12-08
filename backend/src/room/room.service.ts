// src/room/room.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  // Create a new room
  async createRoom(userId: string, name: string, description: string): Promise<Room> {
    const newRoom = new this.roomModel({ userId, name, description });
    return newRoom.save();
  }

  // Get all rooms
  async getAllRooms(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  // Get rooms created by a specific user
  async getUserRooms(userId: string): Promise<Room[]> {
    return this.roomModel.find({ userId }).exec();
  }
}
