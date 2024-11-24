import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.interface';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

  async createQuiz(data: Quiz): Promise<Quiz> {
    const newQuiz = new this.quizModel(data);
    return newQuiz.save();
  }

  async findQuizById(quizId: string): Promise<Quiz | null> {
    return this.quizModel.findOne({ quizId });
  }
}

