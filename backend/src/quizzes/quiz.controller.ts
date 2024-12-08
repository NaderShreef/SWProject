import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.gaurd';
import { Roles } from '../auth/roles.decorator';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor') // Restrict to instructors
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllQuizzes() {
    return this.quizService.findAllQuizzes();
  }

  @Get(':quizId')
  @UseGuards(JwtAuthGuard)
  async getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.findQuizById(quizId);
  }

  @Post(':quizId/evaluate')
  async evaluateQuiz(
    @Param('quizId') quizId: string,
    @Body() answers: { answers: string[] },
  ): Promise<any> {
    return this.quizService.evaluateQuiz(quizId, answers);
  }

  @Patch(':quizId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor') // Restrict updates to instructors
  async updateQuiz(
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(quizId, updateQuizDto);
  }
 
}
