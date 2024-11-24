import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { Module } from './modules.schema';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async create(@Body() moduleData: Partial<Module>): Promise<Module> {
    return this.modulesService.create(moduleData);
  }

  @Get()
  async findAll(): Promise<Module[]> {
    return this.modulesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') moduleId: string): Promise<Module> {
    return this.modulesService.findById(moduleId);
  }

  @Put(':id')
  async update(
    @Param('id') moduleId: string,
    @Body() updates: Partial<Module>,
  ): Promise<Module> {
    return this.modulesService.update(moduleId, updates);
  }

  @Delete(':id')
  async delete(@Param('id') moduleId: string): Promise<Module> {
    return this.modulesService.delete(moduleId);
  }
}
