// src/message/message.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';
import mongoose from 'mongoose';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async sendMessage(userId: string, chatId: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ userId, chatId, content });
    return newMessage.save();
  }

  async getAllMessages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getMessagesByChat(chatId: string): Promise<Message[]> {
    return this.messageModel.find({ chatId: new mongoose.Types.ObjectId(chatId) }).exec();
}
}
