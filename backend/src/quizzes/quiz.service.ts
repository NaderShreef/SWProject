import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schema/quiz.schema';
import { QuestionBank } from './schema/question-bank.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Progress } from '../progress/progress.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(QuestionBank.name)
    private readonly questionBankModel: Model<QuestionBank>,
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
  ) {}

  async getQuiz(quizId: string): Promise<Quiz> {
    try {
      const quiz = await this.quizModel.findOne({ _id: quizId }).exec();
      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${quizId} not found`);
      }
      return quiz;
    } catch (error) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  // Create a question bank
  async createQuestionBank(
    questionBankDto: CreateQuestionBankDto,
  ): Promise<QuestionBank> {
    const newQuestionBank = new this.questionBankModel(questionBankDto);
    return newQuestionBank.save();
  }

  // Update a question in the question bank
  async updateQuestionInBank(
    moduleId: string,
    questionId: string,
    updatedQuestion: Partial<QuestionBank['questions'][0]>,
  ): Promise<QuestionBank> {
    const questionBank = await this.questionBankModel.findOneAndUpdate(
      { moduleId, 'questions._id': questionId },
      { $set: { 'questions.$': updatedQuestion } },
      { new: true },
    );
    if (!questionBank) {
      throw new NotFoundException(`Question with ID ${questionId} not found.`);
    }
    return questionBank;
  }

  // Delete a question from the question bank
  async deleteQuestionFromBank(
    moduleId: string,
    questionId: string,
  ): Promise<QuestionBank> {
    const questionBank = await this.questionBankModel.findOneAndUpdate(
      { moduleId },
      { $pull: { questions: { _id: questionId } } },
      { new: true },
    );
    if (!questionBank) {
      throw new NotFoundException(`Question with ID ${questionId} not found.`);
    }
    return questionBank;
  }
  async deleteQuiz(quizId: string): Promise<void> {
    const quiz = await this.quizModel.findOne({ quizId });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    const studentQuizzesExist = await this.progressModel.exists({ quizId });
    if (studentQuizzesExist) {
      throw new BadRequestException(
        'Cannot delete a quiz that has been initiated by students',
      );
    }

    await this.quizModel.deleteOne({ quizId });
  }

  // Create a quiz with instructor-defined criteria
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { moduleId, questionType, questionCount } = createQuizDto;

    const questionBank = await this.questionBankModel.findOne({ moduleId });
    if (!questionBank) {
      throw new NotFoundException(
        `Question bank for module ${moduleId} not found.`,
      );
    }

    // Filter questions based on type
    const filteredQuestions = questionBank.questions.filter(
      (q) => questionType === 'Both' || q.type === questionType,
    );

    if (filteredQuestions.length < questionCount) {
      throw new BadRequestException(
        'Not enough questions in the question bank to create the quiz.',
      );
    }

    // Randomly select questions
    const selectedQuestions = this.getRandomQuestions(
      filteredQuestions,
      questionCount,
    );

    const newQuiz = new this.quizModel({
      moduleId,
      questionType,
      questionCount,
      questions: selectedQuestions,
    });

    return newQuiz.save();
  }

  // Generate a quiz dynamically based on student performance
  async generateQuizBasedOnPerformance(
    userId: string,
    moduleId: string,
    questionCount: number,
    questionType: 'MCQ' | 'True/False' | 'Both',
  ): Promise<Quiz> {
    const performanceMetrics = await this.getStudentPerformanceMetrics(
      userId,
      moduleId,
    );

    const targetDifficulty =
      this.getDifficultyForPerformance(performanceMetrics);

    const questionBank = await this.questionBankModel.findOne({ moduleId });
    if (!questionBank) {
      throw new NotFoundException(
        `Question bank for module ${moduleId} not found.`,
      );
    }

    const eligibleQuestions = questionBank.questions.filter(
      (q) =>
        (questionType === 'Both' || q.type === questionType) &&
        q.difficulty === targetDifficulty,
    );

    if (eligibleQuestions.length < questionCount) {
      throw new BadRequestException(
        'Not enough questions available to generate the quiz.',
      );
    }

    const selectedQuestions = this.getRandomQuestions(
      eligibleQuestions,
      questionCount,
    );

    const newQuiz = new this.quizModel({
      moduleId,
      questionType,
      questionCount,
      questions: selectedQuestions,
    });

    return newQuiz.save();
  }

  private getDifficultyForPerformance(performance: any): string {
    if (performance.excellent > 0) return 'excellent';
    if (performance.aboveAverage > 0) return 'aboveAverage';
    if (performance.average > 0) return 'average';
    return 'belowAverage';
  }

  private async getStudentPerformanceMetrics(userId: string, moduleId: string) {
    const progress = await this.progressModel.findOne({ userId, moduleId });
    if (!progress) {
      throw new NotFoundException(`Progress for user ${userId} not found.`);
    }

    const completionPercentage = progress.completionPercentage;

    return {
      excellent: completionPercentage >= 90 ? 1 : 0,
      aboveAverage: completionPercentage >= 75 ? 1 : 0,
      average: completionPercentage >= 50 ? 1 : 0,
      belowAverage: completionPercentage < 50 ? 1 : 0,
    };
  }

  private getRandomQuestions(questions: any[], count: number): any[] {
    return questions.sort(() => Math.random() - 0.5).slice(0, count);
  }
}
