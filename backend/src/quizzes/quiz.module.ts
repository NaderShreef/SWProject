import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import {
  QuestionBank,
  QuestionBankSchema,
} from './schema/question-bank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuestionBank.name, schema: QuestionBankSchema },
    ]),
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
