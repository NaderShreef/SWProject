import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.gaurd';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Create a new quiz
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  async updateQuiz(
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(quizId, updateQuizDto);
  }

  // Create a new question bank
  @Post('question-bank')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  async createQuestionBank(
    @Body() createQuestionBankDto: CreateQuestionBankDto,
  ) {
    return this.quizService.createQuestionBank(createQuestionBankDto);
  }
}
