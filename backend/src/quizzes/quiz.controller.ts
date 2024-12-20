<<<<<<< HEAD
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.gaurd';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
=======
import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.gaurd';
import { Roles } from '../auth/roles.decorator';
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Create a new quiz
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
<<<<<<< HEAD
  @Roles('instructor')
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
=======
  @Roles('instructor') // Restrict to instructors
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllQuizzes() {
    return this.quizService.findAllQuizzes();
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
  }

  // Get all quizzes
  @Get()
  async findAllQuizzes() {
    return this.quizService.findAllQuizzes();
  }

  // Get a quiz by quizId
  @Get(':quizId')
<<<<<<< HEAD
=======
  @UseGuards(JwtAuthGuard)
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
  async getQuiz(@Param('quizId') quizId: string) {
    return this.quizService.findQuizById(quizId);
  }

<<<<<<< HEAD
  // Update a quiz by quizId
  @Patch(':quizId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
=======
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
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
  async updateQuiz(
    @Param('quizId') quizId: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizService.updateQuiz(quizId, updateQuizDto);
  }
<<<<<<< HEAD

  // Create a new question bank
  @Post('question-bank')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  async createQuestionBank(
    @Body() createQuestionBankDto: CreateQuestionBankDto,
  ) {
    return this.quizService.createQuestionBank(createQuestionBankDto);
  }
=======
 
>>>>>>> d29a375d0a16a3ee5635b09c2ed28c726275cd98
}
