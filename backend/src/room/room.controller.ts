// src/room/room.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // Create a new room
  @Post()
async createRoom(
  @Body() createRoomDto: { userId: string; name: string; description: string },
) {
  console.log("Incoming Room Data:", createRoomDto);
  try {
    return await this.roomService.createRoom(
      createRoomDto.userId,
      createRoomDto.name,
      createRoomDto.description,
    );
  } catch (error) {
    console.error("Error in createRoom:", error.message);
    throw error; // Ensure the error gets logged properly
  }
}

  // Get all rooms
  @Get()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  // Get rooms for a specific user
  @Get(':userId')
  async getUserRooms(@Param('userId') userId: string) {
    return this.roomService.getUserRooms(userId);
  }
}
