import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
  ) {}

  // Create a quiz
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const newQuiz = new this.quizModel(createQuizDto);
    return newQuiz.save();
  }

  // Get all quizzes
  async findAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().populate('Module_id').exec(); // Populate the Module_id field if needed
  }

  // Get a quiz by quizId
  async findQuizById(quizId: string): Promise<Quiz | null> {
    const quiz = await this.quizModel.findOne({ quizId }).populate('Module_id').exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }
    return quiz;
  }
  

  // Update a quiz
  async updateQuiz(quizId: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return this.quizModel.findOneAndUpdate({ quizId }, updateQuizDto, { new: true });
  }
}



