import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException, NotFoundException, Req } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { Module } from './modules.schema';
import { CreateModuleDto } from './dto/createModule.dto'; 
import { UpdateModuleDto } from './dto/updateModule.dto'; 
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/Auth/roles.gaurd';
import { UseGuards } from '@nestjs/common';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
async createCourseModule(@Body() moduleData: CreateModuleDto) {
  try {
    return await this.modulesService.createCourseModule(moduleData);
  } catch (error) {
    console.error('Error creating course module:', error);
    throw new BadRequestException(error.message);
  }
}


  @Get(':id')
  async getCourseModule(@Param('id') moduleId: string): Promise<Module> {
    return await this.modulesService.getCourseModule(moduleId);
  }

  @Get('course/:courseId')
  async getAllCourseModules(@Param('courseId') courseId: string): Promise<Module[]> {
    return await this.modulesService.getAllCourseModules(courseId);
  }
  @Put(':id')
  async updateModule(
    @Param('id') moduleId: string,
    @Body() updateData: UpdateModuleDto,
  ): Promise<Module> {
    return await this.modulesService.updateModule(moduleId, updateData);
  }

  @Get('test')
  async testEndpoint(): Promise<string> {
    return this.modulesService.testEndpoint();
  }

  // @Post()
  // async create(@Body() moduleData: CreateModuleDto): Promise<Module> {
  //   console.log('Received Data:', moduleData);
  //   try {
  //     return await this.modulesService.create(moduleData);
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // @Get(':id/with-course')
  // // @ApiOperation({ summary: 'Find module with associated course' })
  // // @Roles('admin', 'instructor')  // Restrict to admin and instructor
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // async findModuleWithCourse(@Param('id') moduleId: string): Promise<Module> {
  //   const module = await this.modulesService.findModuleWithCourse(moduleId);
  //   if (!module) {
  //     throw new BadRequestException(`Module with ID ${moduleId} not found`);
  //   }
  //   return module;
  // }

  // @Get('course/:courseId')
  // // @ApiOperation({ summary: 'Find modules by course ID' })
  // // @Roles('admin', 'instructor')  // Only allow admin and instructor to access
  // // @UseGuards(JwtAuthGuard, RolesGuard)
  // async findModulesByCourse(@Param('courseId') courseId: string): Promise<{ data: Module[]; total: number; totalPages: number }> {
  //   const modules = await this.modulesService.findModulesByCourse(courseId); // Expecting an object with metadata
  //   if (!modules.data || modules.data.length === 0) {
  //     throw new BadRequestException(`No modules found for course with ID ${courseId}`);
  //   }
  //   return modules; // Return the full object (data + metadata)
  // }

  // @ApiOperation({ summary: 'Fetch all modules with pagination' })
  // @ApiResponse({ status: 200, description: 'Modules retrieved successfully.' })
  // @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  // @Get()
  // async findAll(
  //   @Query('limit') limit?: number,
  //   @Query('page') page?: number,
  // ): Promise<{ data: Module[]; total: number; totalPages: number }> {
  //   return this.modulesService.findAll(limit, page);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Find a module by its ID' })
  // @Roles('admin', 'instructor') 
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async findById(@Param('id') moduleId: string): Promise<Module> {
  //   const module = await this.modulesService.findById(moduleId); // Use the service
  //   if (!module) {
  //     throw new BadRequestException(`Module with ID ${moduleId} not found`);
  //   }
  //   return module;
  // }

  // @Put(':id')
  // @ApiOperation({ summary: 'Update a module by its ID' })
  // @Roles('admin', 'instructor')  // Only admin and instructor can update a module
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async update(
  //   @Param('id') moduleId: string,
  //   @Body() updates: UpdateModuleDto,
  // ): Promise<Module> {
  //   const updatedModule = await this.modulesService.update(moduleId, updates);
  //   if (!updatedModule) {
  //     throw new BadRequestException(`Failed to update module with ID ${moduleId}`);
  //   }
  //   return updatedModule;
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a module by its ID' })
  // @Roles('admin')  // Only admin can delete a module
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async delete(@Param('id') moduleId: string): Promise<{ message: string }> {
  //   return this.modulesService.delete(moduleId);
  // }

  // @Put(':id/outdated')
  // @ApiOperation({ summary: 'Mark a module as outdated' })
  // @ApiResponse({ status: 200, description: 'Module marked as outdated successfully.' })
  // @ApiResponse({ status: 404, description: 'Module not found.' })
  // @Roles('admin')  // Only admin can mark a module as outdated
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async markAsOutdated(@Param('id') moduleId: string): Promise<Module> {
  //   return this.modulesService.markAsOutdated(moduleId);
  // }

  // @Put(':id/resources')
  // @ApiOperation({ summary: 'Update module resources' })
  // @Roles('admin', 'instructor')  // Only admin and instructor can update resources
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async updateResources(
  //   @Param('id') moduleId: string,
  //   @Body() { resources }: { resources: string[] },
  // ): Promise<Module> {
  //   const updatedModule = await this.modulesService.updateResources(moduleId, resources);
  //   if (!updatedModule) {
  //     throw new BadRequestException(`Module with ID ${moduleId} not found`);
  //   }
  //   return updatedModule;
  // }

//   @Delete(':id/resources')
//   @ApiOperation({ summary: 'Remove module resources' })
//   @Roles('admin', 'instructor')  // Only admin and instructor can remove resources
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   async removeResource(
//     @Param('id') moduleId: string,
//     @Body() { fileUrl }: { fileUrl: string },
//   ): Promise<Module> {
//     const updatedModule = await this.modulesService.removeResource(moduleId, fileUrl);
//     if (!updatedModule) {
//       throw new BadRequestException(`Module with ID ${moduleId} not found`);
//     }
//     return updatedModule;
// }

//   @Get('filter')
//   @ApiOperation({ summary: 'Find modules by criteria' })
//   async findByCriteria(
//     @Query('courseId') courseId?: string,
//     @Query('title') title?: string,
//   ): Promise<Module[]> {
//     return this.modulesService.findByCriteria({ courseId, title });
//   }

//   @Post(':id/upload')
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads',
//         filename: (req, file, callback) => {
//           const uniqueName = `${Date.now()}-${file.originalname}`;
//           callback(null, uniqueName);
//         },
//       }),
//       limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB file size limit
//       fileFilter: (req, file, callback) => {
//         if (!file.mimetype.match(/\/(pdf|jpeg|png)$/)) {
//           return callback(new Error('Only PDF, JPEG, and PNG files are allowed'), false);
//         }
//         callback(null, true);
//       },
//     }),
//   )
//   @ApiOperation({ summary: 'Upload a resource for a module' })
//   @Roles('admin', 'instructor')  // Only admin and instructor can upload resources
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   async uploadResource(
//     @Param('id') moduleId: string,
//     @UploadedFile() file: Multer.File,
//   ): Promise<Module> {
//     if (!file) {
//       throw new BadRequestException('No file uploaded');
//     }
    
//     const fileUrl = `http://your-server/uploads/${file.filename}`;
//     return this.modulesService.addResource(moduleId, fileUrl);
//   }


//   @Get(':id/details')
//   @ApiOperation({ summary: 'Find module details' })
//   @Roles('admin', 'instructor')  // Only admin and instructor can view details
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   async findModuleWithDetails(@Param('id') moduleId: string): Promise<Module> {
//     const module = await this.modulesService.findModuleWithDetails(moduleId);
//     if (!module) {
//       throw new BadRequestException(`Module with ID ${moduleId} not found`);
//     }
//     return module;
//   }
}
