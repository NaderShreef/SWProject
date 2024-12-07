import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Create a new quiz
  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  // Get all quizzes
  @Get()
  async findAllQuizzes() {
    return this.quizService.findAllQuizzes();
  }

  // Get a quiz by quizId
  @Get(':quizId')
  async getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.findQuizById(quizId);
  }

  // Update a quiz by quizId
  @Patch(':quizId')
  async updateQuiz(
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(quizId, updateQuizDto);
  }
}

