import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionBank } from './schema/question-bank.schema';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectModel(QuestionBank.name)
    private readonly questionBankModel: Model<QuestionBank>,
  ) {}

  // Create a question bank
  async createQuestionBank(createQuestionBankDto: CreateQuestionBankDto): Promise<QuestionBank> {
    const newQuestionBank = new this.questionBankModel(createQuestionBankDto);
    return newQuestionBank.save();
  }
}
