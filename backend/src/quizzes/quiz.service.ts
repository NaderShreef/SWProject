import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schema/quiz.schema';
import { QuestionBank } from '../question-bank/schema/question-bank.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(QuestionBank.name)
    private readonly questionBankModel: Model<QuestionBank>,
  ) {}

  // Create a quiz with random questions
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { moduleId, questionType, questionCount } = createQuizDto;

    // Fetch the module's question bank
    const questionBank = await this.questionBankModel.findOne({ moduleId });
    if (!questionBank) {
      throw new NotFoundException(
        `Question bank for module ${moduleId} not found`,
      );
    }

    // Filter questions by type (MCQ, True/False, or Both)
    let filteredQuestions = questionBank.questions.filter(
      (q) => questionType === 'Both' || q.type === questionType,
    );

    if (filteredQuestions.length < questionCount) {
      throw new NotFoundException(
        'Not enough questions in the question bank to generate the quiz.',
      );
    }

    // Randomly select the requested number of questions
    const selectedQuestions = filteredQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, questionCount);

    const newQuiz = new this.quizModel({
      ...createQuizDto,
      questions: selectedQuestions,
    });

    return newQuiz.save();
  }

  // Get all quizzes
  async findAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Get a quiz by quizId
  async findQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findOne({ quizId }).exec();
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }
    return quiz;
  }

  // Update a quiz
  async updateQuiz(
    quizId: string,
    updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    const updatedQuiz = await this.quizModel.findOneAndUpdate(
      { quizId },
      updateQuizDto,
      { new: true },
    );
    if (!updatedQuiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }
    return updatedQuiz;
  }
}

