// src/chat/chat.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: { userId: string; roomId: string }) {
    return this.chatService.createChat(createChatDto.userId, createChatDto.roomId);
  }

  @Get()
  async getAllChats() {
    return this.chatService.getAllChats();
  }

  @Get('room/:roomId')
  async getChatsByRoom(@Param('roomId') roomId: string) {
    return this.chatService.getChatsByRoom(roomId);
  }
}
