import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import QuizSchema from './quiz.schema';
@Module({
 
  imports :[ MongooseModule.forFeature([{name :'Quiz', schema :QuizSchema}])], 
  providers: [QuizService],
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { QuestionBank, QuestionBankSchema } from '../question-bank/schema/question-bank.schema';

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

