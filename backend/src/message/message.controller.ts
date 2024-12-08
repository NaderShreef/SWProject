// src/message/message.controller.ts
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Body() sendMessageDto: { userId: string; chatId: string; content: string },
  ) {
    return this.messageService.sendMessage(
      sendMessageDto.userId,
      sendMessageDto.chatId,
      sendMessageDto.content,
    );
  }

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }

  @Get('chat/:chatId')
  async getMessagesByChat(@Param('chatId') chatId: string) {
    return this.messageService.getMessagesByChat(chatId);
  }
}

