import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';
import { NotFoundException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(Module.name) private moduleModel: Model<ModuleDocument>) {}
  private readonly logger = new Logger(ModulesService.name);

  async create(moduleData: Partial<Module>): Promise<Module> {
    try {
      this.logger.log(`Creating module: ${JSON.stringify(moduleData)}`);
      const newModule = new this.moduleModel(moduleData);
      return await newModule.save();
    } catch (error) {
      this.logger.error(`Error creating module: ${error.message}`);
      throw error; // Re-throw the error for debugging
    }
  }

  async findModuleWithCourse(moduleId: string): Promise<Module | null> {
    return this.moduleModel
      .findOne({ moduleId })
      .populate('courseId') // Populate the linked course data
      .exec();
  }

  async findModulesByCourse(courseId: string, limit = 10, page = 1): Promise<{ data: Module[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit; 
    const [data, total] = await Promise.all([
      this.moduleModel.find({ courseId }).skip(skip).limit(limit).exec(),
      this.moduleModel.countDocuments({ courseId }).exec(),
    ]);
    
    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages };
  }

  async findAll(limit = 10, page = 1): Promise<{ data: Module[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit; 
    const [data, total] = await Promise.all([
      this.moduleModel.find({ isOutdated: false }).skip(skip).limit(limit).exec(),
      this.moduleModel.countDocuments({ isOutdated: false }).exec(),
    ]);
    
    const totalPages = Math.ceil(total / limit);
    return { data, total, totalPages };
  }

  async findById(moduleId: string): Promise<Module | null> {
    const module = await this.moduleModel.findOne({ moduleId }).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }
    return module;
  }

  async update(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
    const module = await this.moduleModel.findOne({ moduleId }).exec();
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }
  
    // Save the current version
    const previousVersion = { ...module.toObject(), updatedAt: new Date() };
    await this.moduleModel.updateOne(
      { moduleId },
      { $push: { versions: previousVersion }, $set: updates },
    );
  
    return this.moduleModel.findOne({ moduleId }).exec();
  }

  async delete(moduleId: string): Promise<{ message: string }> {
    const result = await this.moduleModel.findOneAndDelete({ moduleId }).exec();
    if (!result) {
      throw new NotFoundException('Module not found');
    }
    return { message: 'Module deleted successfully' };
  }

  async markAsOutdated(moduleId: string): Promise<Module | null> {
    return this.moduleModel.findOneAndUpdate(
      { moduleId },
      { isOutdated: true },
      { new: true },
    ).exec();
  }

  async addResource(moduleId: string, fileUrl: string): Promise<Module | null> {
    return this.moduleModel.findOneAndUpdate(
      { moduleId },
      { $push: { resources: fileUrl } },
      { new: true },
    ).exec();
  }

  async updateResources(moduleId: string, resources: string[]): Promise<Module | null> {
    return this.moduleModel.findOneAndUpdate(
      { moduleId },
      { $addToSet: { resources: { $each: resources } } },  // Add resources
      { new: true },
    ).exec();
  }

  async removeResource(moduleId: string, fileUrl: string): Promise<Module | null> {
    return this.moduleModel.findOneAndUpdate(
      { moduleId },
      { $pull: { resources: fileUrl } }, // Remove specific resource
      { new: true },
    ).exec();
  }

  async findByCriteria(criteria: { courseId?: string; title?: string }): Promise<Module[]> {
    const query: any = { isOutdated: false };  // Default to non-outdated modules
    if (criteria.courseId) query.courseId = criteria.courseId;
    if (criteria.title) query.title = { $regex: criteria.title, $options: 'i' };
  
    return this.moduleModel.find(query).exec();
  }

  async findModuleWithDetails(moduleId: string): Promise<Module | null> {
    return this.moduleModel
      .findOne({ moduleId })
      .populate('courseId') // Include course details
      .exec();
  }
}
