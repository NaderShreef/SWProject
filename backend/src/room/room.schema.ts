// src/room/room.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  userId: string; // Reference to the user who created the room

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
