import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionBankService } from './question-bank.service';
import { QuestionBankController } from './question-bank.controller';
import { QuestionBank, QuestionBankSchema } from './schema/question-bank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: QuestionBank.name, schema: QuestionBankSchema }]),
  ],
  controllers: [QuestionBankController],
  providers: [QuestionBankService],
})
export class QuestionBankModule {}
