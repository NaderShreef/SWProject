// src/message/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  userId: string; // Sender of the message

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Chat', required: true })
  chatId: string; // Chat the message belongs to

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
