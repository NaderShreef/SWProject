import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.gaurd';
import { Roles } from '../auth/roles.decorator';

@Controller('question-banks')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  // Create a question bank
  @Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('instructor') // Only instructors can create question banks
async createQuestionBank(@Body() createQuestionBankDto: CreateQuestionBankDto) {
  return this.questionBankService.createQuestionBank(createQuestionBankDto);
}

}
