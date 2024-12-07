import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { Module } from './modules.schema';
import { CreateModuleDto } from './dto/createModule.dto'; 
import { UpdateModuleDto } from './dto/updateModule.dto'; 
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: 201, description: 'Module created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  
  @Post()
  async create(@Body() moduleData: CreateModuleDto): Promise<Module> {
    console.log('Received Data:', moduleData);
    try {
      return await this.modulesService.create(moduleData);
    } catch (error) {
      console.error('Error:', error.message);
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id/with-course')
  async findModuleWithCourse(@Param('id') moduleId: string): Promise<Module> {
    const module = await this.modulesService.findModuleWithCourse(moduleId);
    if (!module) {
      throw new BadRequestException(`Module with ID ${moduleId} not found`);
    }
    return module;
  }

  @Get('course/:courseId')
  async findModulesByCourse(@Param('courseId') courseId: string): Promise<{ data: Module[]; total: number; totalPages: number }> {
    const modules = await this.modulesService.findModulesByCourse(courseId); // Expecting an object with metadata
    if (!modules.data || modules.data.length === 0) {
      throw new BadRequestException(`No modules found for course with ID ${courseId}`);
    }
    return modules; // Return the full object (data + metadata)
  }

  @ApiOperation({ summary: 'Fetch all modules with pagination' })
  @ApiResponse({ status: 200, description: 'Modules retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ): Promise<{ data: Module[]; total: number; totalPages: number }> {
    return this.modulesService.findAll(limit, page);
  }

  @Get(':id')
  async findById(@Param('id') moduleId: string): Promise<Module> {
    const module = await this.modulesService.findById(moduleId); // Use the service
    if (!module) {
      throw new BadRequestException(`Module with ID ${moduleId} not found`);
    }
    return module;
  }

  @Put(':id')
  async update(
    @Param('id') moduleId: string,
    @Body() updates: UpdateModuleDto,
  ): Promise<Module> {
    const updatedModule = await this.modulesService.update(moduleId, updates);
    if (!updatedModule) {
      throw new BadRequestException(`Failed to update module with ID ${moduleId}`);
    }
    return updatedModule;
  }

  @Delete(':id')
  async delete(@Param('id') moduleId: string): Promise<{ message: string }> {
    return this.modulesService.delete(moduleId);
  }

  @ApiOperation({ summary: 'Mark a module as outdated' })
  @ApiResponse({ status: 200, description: 'Module marked as outdated successfully.' })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  @Put(':id/outdated')
  async markAsOutdated(@Param('id') moduleId: string): Promise<Module> {
    return this.modulesService.markAsOutdated(moduleId);
  }

  @Put(':id/resources')
  async updateResources(
    @Param('id') moduleId: string,
    @Body() { resources }: { resources: string[] },
  ): Promise<Module> {
    const updatedModule = await this.modulesService.updateResources(moduleId, resources);
    if (!updatedModule) {
      throw new BadRequestException(`Module with ID ${moduleId} not found`);
    }
    return updatedModule;
  }

  @Delete(':id/resources')
  async removeResource(
    @Param('id') moduleId: string,
    @Body() { fileUrl }: { fileUrl: string },
  ): Promise<Module> {
    const updatedModule = await this.modulesService.removeResource(moduleId, fileUrl);
    if (!updatedModule) {
      throw new BadRequestException(`Module with ID ${moduleId} not found`);
    }
    return updatedModule;
}

  @Get('filter')
  async findByCriteria(
    @Query('courseId') courseId?: string,
    @Query('title') title?: string,
  ): Promise<Module[]> {
    return this.modulesService.findByCriteria({ courseId, title });
  }

 @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          callback(null, uniqueName);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(pdf|jpeg|png)$/)) {
          return callback(new Error('Only PDF, JPEG, and PNG files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadResource(
    @Param('id') moduleId: string,
    @UploadedFile() file: Multer.File,
  ): Promise<Module> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    const fileUrl = `http://your-server/uploads/${file.filename}`;
    return this.modulesService.addResource(moduleId, fileUrl);
  }


  @Get(':id/details')
  async findModuleWithDetails(@Param('id') moduleId: string): Promise<Module> {
    const module = await this.modulesService.findModuleWithDetails(moduleId);
    if (!module) {
      throw new BadRequestException(`Module with ID ${moduleId} not found`);
    }
    return module;
  }
}
