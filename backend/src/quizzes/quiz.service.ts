import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.interface';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

  async createQuiz(data: CreateQuizDto): Promise<Quiz> {
    const newQuiz = new this.quizModel(data);
    return newQuiz.save();
  }

  async findQuizById(quizId: string): Promise<Quiz | null> {
    return this.quizModel.findOne({ quizId });
  }

  async updateQuiz(quizId: string, data: UpdateQuizDto): Promise<Quiz | null> {
    return this.quizModel.findOneAndUpdate({ quizId }, data, { new: true });
  }
}


