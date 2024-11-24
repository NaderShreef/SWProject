import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';

@Injectable()
export class ModulesService {
  constructor(@InjectModel(Module.name) private moduleModel: Model<ModuleDocument>) {}

  async create(moduleData: Partial<Module>): Promise<Module> {
    const newModule = new this.moduleModel(moduleData);
    return newModule.save();
  }

  async findAll(): Promise<Module[]> {
    return this.moduleModel.find().exec();
  }

  async findById(moduleId: string): Promise<Module | null> {
    return this.moduleModel.findOne({ moduleId }).exec();
  }

  async update(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
    const result = await this.moduleModel.findOneAndUpdate({ moduleId }, updates, {
      new: true, 
    }).exec();

    return result && result instanceof this.moduleModel ? result.toObject() : null;
  }

  async delete(moduleId: string): Promise<Module | null> {
    const result = await this.moduleModel.findOneAndDelete({ moduleId }).exec();

    return result && result instanceof this.moduleModel ? result.toObject() : null;
  }
}
