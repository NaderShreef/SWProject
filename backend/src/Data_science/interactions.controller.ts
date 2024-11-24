import { Controller, Get, Post, Body } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Interaction } from './interaction.schema';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  async create(@Body() data: Partial<Interaction>) {
    return this.interactionsService.create(data);
  }

  @Get()
  async findAll() {
    return this.interactionsService.findAll();
  }
}
