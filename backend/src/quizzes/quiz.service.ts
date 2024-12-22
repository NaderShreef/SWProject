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
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(QuestionBank.name)
    private readonly questionBankModel: Model<QuestionBank>,
  ) {}

  // Create a question bank
  async createQuestionBank(
    questionBankDto: CreateQuestionBankDto,
  ): Promise<QuestionBank> {
    const newQuestionBank = new this.questionBankModel(questionBankDto);
    return newQuestionBank.save();
  }

  // Create a quiz with random questions
  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { moduleId, questionType, questionCount, questions } = createQuizDto;

    if (questions.length !== questionCount) {
      throw new BadRequestException(
        'The number of questions provided does not match the questionCount.',
      );
    }

    // Fetch the module's question bank
    const questionBank = await this.questionBankModel.findOne({ moduleId });
    if (!questionBank) {
      throw new NotFoundException(
        `Question bank for module ${moduleId} not found`,
      );
    }

    // Validate question types based on quiz type
    for (const question of questions) {
      if (questionType === 'MCQ' && question.type !== 'MCQ') {
        throw new BadRequestException(
          'All questions must be MCQ for an MCQ quiz.',
        );
      }
      if (questionType === 'True/False' && question.type !== 'True/False') {
        throw new BadRequestException(
          'All questions must be True/False for a True/False quiz.',
        );
      }
    }

    const newQuiz = new this.quizModel({
      moduleId,
      questionType,
      questionCount,
      questions,
    });

    return newQuiz.save();
  }

  // Get all quizzes
  async findAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find().populate('moduleId').exec(); // Populate the Module_id field if needed
  }

  // Get a quiz by quizId
  async findQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel
      .findOne({ quizId })
      .populate('moduleId')
      .exec();
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
    const { moduleId, questionType, questionCount, questions } = updateQuizDto;

    if (questions && questions.length !== questionCount) {
      throw new BadRequestException(
        'The number of questions provided does not match the questionCount.',
      );
    }

    if (questions) {
      for (const question of questions) {
        if (questionType === 'MCQ' && question.type !== 'MCQ') {
          throw new BadRequestException(
            'All questions must be MCQ for an MCQ quiz.',
          );
        }
        if (questionType === 'True/False' && question.type !== 'True/False') {
          throw new BadRequestException(
            'All questions must be True/False for a True/False quiz.',
          );
        }
      }
    }

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

  // Evaluate quiz and provide feedback
  async evaluateQuiz(
    quizId: string,
    answers: { answers: string[] },
  ): Promise<any> {
    const quiz = await this.quizModel.findOne({ quizId });
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.answer === answers.answers[index]) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;
    const feedback =
      score >= 50
        ? 'Good job! Keep it up.'
        : 'You need to review the module content. Study it again and try the quiz.';

    return {
      score,
      feedback,
      correctAnswers,
      totalQuestions: quiz.questions.length,
    };
  }
}
