import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Post('generate/:userId/:moduleId')
  async generateQuiz(
    @Param('userId') userId: string,
    @Param('moduleId') moduleId: string,
    @Body('questionCount') questionCount: number,
    @Body('questionType') questionType: 'MCQ' | 'True/False' | 'Both',
  ) {
    return this.quizService.generateQuizBasedOnPerformance(
      userId,
      moduleId,
      questionCount,
      questionType,
    );
  }

  @Patch('question/:moduleId/:questionId')
  async updateQuestionInBank(
    @Param('moduleId') moduleId: string,
    @Param('questionId') questionId: string,
    @Body() updatedQuestion: Partial<CreateQuizDto['questions'][0]>,
  ) {
    return this.quizService.updateQuestionInBank(moduleId, questionId, updatedQuestion);
  }

  @Delete('question/:moduleId/:questionId')
  async deleteQuestionFromBank(
    @Param('moduleId') moduleId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.quizService.deleteQuestionFromBank(moduleId, questionId);
  }

  @Delete(':quizId')
  async deleteQuiz(@Param('quizId') quizId: string) {
    return this.quizService.deleteQuiz(quizId);
  }
}
