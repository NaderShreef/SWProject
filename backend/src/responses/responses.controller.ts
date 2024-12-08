import { Controller } from '@nestjs/common';
import {  Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { responses } from './responses.schema';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/Auth/roles.gaurd';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}


  @Post()
  async createResponse(@Body() responseData: Partial<responses>): Promise<responses> {
    return this.responsesService.createResponse(responseData);
  }

  @Get()
  async getAllResponses(): Promise<responses[]> {
    return this.responsesService.getAllResponses();
  }

  @Get(':response_id')
  async getResponseById(@Param('response_id') id: string): Promise<responses | null> {
    return this.responsesService.getResponseById(id);
  }

  @Put(':response_id')
  async updateResponse(
    @Param('response_id') id: string,
    @Body() updateData: responses,
  ): Promise<responses | null> {
    return this.responsesService.replaceResponse(id, updateData);
  }


  @Delete(':response_id') async deleteCourse(@Param('response_id')id:string) { 
    const deletedResponses = await this.responsesService.delete(id);
     return deletedResponses; }
}
