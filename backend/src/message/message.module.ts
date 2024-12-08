// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './message.schema';
import { Chat, ChatSchema } from 'src/chat/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
