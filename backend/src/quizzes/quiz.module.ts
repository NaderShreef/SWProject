import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz, QuizSchema } from './schema/quiz.schema';
<<<<<<< HEAD
import {
  QuestionBank,
  QuestionBankSchema,
} from './schema/question-bank.schema';
=======
import { QuestionBank, QuestionBankSchema } from '../question-bank/schema/question-bank.schema';
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuestionBank.name, schema: QuestionBankSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}