import { Module } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Module({})
@Schema()
export class ResponsesModule {

@Prop({ required: true, unique: true })
response_id: string;

@Prop({ required: true })
user_id: string;

@Prop({ required: true })
quiz_id: string;

@Prop({ type: [{ question_id: String, answer: String }], required: true })
answers: { question_id: string; answer: string }[];

@Prop({ required: true })
score: number;

@Prop({ required: true })
submitted_at: Date;
}