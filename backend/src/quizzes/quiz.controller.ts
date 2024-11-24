import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.interface';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() quizData: Quiz): Promise<Quiz> {
    return this.quizService.createQuiz(quizData);
  }

  @Get(':quizId')
  async getQuiz(@Param('quizId') quizId: string): Promise<Quiz | null> {
    return this.quizService.findQuizById(quizId);
  }
}
