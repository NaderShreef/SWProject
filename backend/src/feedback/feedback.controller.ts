import { Controller, Post, Body, Get } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Submit feedback
  @Post()
  submitFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.submitFeedback(createFeedbackDto);
  }

  // Get all feedback
  @Get()
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }
}
