import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { response } from 'express';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose'; 
@Schema()
export class responses {

@Prop({ required: true, unique: true })
response_id: string;

@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'quizzes', required: true })
  quizId: string;

@Prop({ type: [{ question_id: String, answer: String }], required: true })
answers: { question_id: string; answer: string }[];

@Prop({ required: true })
score: number;

@Prop({ required: true })
submitted_at: Date;
}
export const ResponsesSchema = SchemaFactory.createForClass(responses);