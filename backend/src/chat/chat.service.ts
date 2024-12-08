// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import mongoose from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(userId: string, roomId: string): Promise<Chat> {
    const newChat = new this.chatModel({ userId, roomId });
    return newChat.save();
  }

  async getAllChats(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async getChatsByRoom(roomId: string): Promise<Chat[]> {
    return this.chatModel.find({ roomId: new mongoose.Types.ObjectId(roomId) }).exec();
}
}

