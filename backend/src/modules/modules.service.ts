import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Module, ModuleDocument } from './modules.schema';
import { Course } from '../courses/schemas/courses.schema';
import { CreateModuleDto } from './dto/createModule.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class ModulesService {
  private readonly logger = new Logger(ModulesService.name);

  constructor(
    @InjectModel(Module.name) private readonly moduleModel: Model<ModuleDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  // Create a course module and link it to a course
  

 
  async createCourseModule(moduleData: CreateModuleDto): Promise<Module> {
    try {
      // Convert the courseId to ObjectId using the `new` keyword
      const courseId = new Types.ObjectId(moduleData.courseId);  // Correct conversion to ObjectId

      console.log('Creating module with data:', JSON.stringify(moduleData));
      
      // Ensure the course exists by querying the course model using ObjectId
      const course = await this.courseModel.findById(courseId).exec();

      if (!course) {
        throw new Error(`Course with ID ${moduleData.courseId} not found`);
      }

      // Generate the new moduleId by incrementing the last used value (or use default if no modules exist)
      const lastModule = await this.moduleModel
        .find({ courseId: course._id })
        .sort({ moduleId: -1 })  // Sort by moduleId descending
        .limit(1);

      const newModuleId = lastModule.length > 0 ? (parseInt(lastModule[0].moduleId) + 1).toString() : '1';

      // Create the new module
      const newModule = new this.moduleModel({
        ...moduleData,
        moduleId: newModuleId,  // Set the generated moduleId
        courseId: course._id,   // Use ObjectId for courseId
      });

      // Save and return the newly created module
      return await newModule.save();
    } catch (error) {
      console.error('Error creating module:', error.message);
      throw new Error(error.message); // Propagate the error to be caught in the controller
    }
  }
  // Get a single course module by its ID
  async getCourseModule(moduleId: string): Promise<Module> {
    try {
      this.logger.log(`Fetching module with ID: ${moduleId}`);

      const module = await this.moduleModel.findOne({ moduleId }).populate('courseId').exec();

      if (!module) {
        throw new NotFoundException(`Module with ID ${moduleId} not found`);
      }

      return module;
    } catch (error) {
      this.logger.error(`Error fetching module: ${error.message}`);
      throw error;
    }
  }

  // Get all course modules linked to a specific course
  

async getAllCourseModules(courseId: string): Promise<Module[]> {
  console.log("Received courseId:", courseId); // Log the received courseId
  const modules = await this.moduleModel.find({
    courseId: new Types.ObjectId(courseId), // Ensure ObjectId type for comparison
  }).exec();

  console.log("Found modules:", modules); // Log the fetched modules
  if (!modules.length) {
    throw new NotFoundException(`No modules found for course with ID ${courseId}`);
  }

  return modules;
}
async updateModule(moduleId: string, updateData: Partial<Module>): Promise<Module> {
  const module = await this.moduleModel.findOneAndUpdate(
    { moduleId },
    updateData,
    { new: true },
  ).exec();
  if (!module) {
    throw new NotFoundException(`Module with ID ${moduleId} not found`);
  }
  return module;
}

async testEndpoint(): Promise<string> {
  return 'Service is working properly';
}


  // async create(moduleData: Partial<Module>): Promise<Module> {
  //   try {
  //     // this.logger.log(`Creating module: ${JSON.stringify(moduleData)}`);
  //     const newModule = new this.moduleModel(moduleData);
  //     return await newModule.save();
  //   } catch (error) {
  //     this.logger.error(`Error creating module: ${error.message}`);
  //     throw error; // Re-throw the error for debugging
  //   }
  // }

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

  // async update(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
  //   const module = await this.moduleModel.findOne({ moduleId }).exec();
  //   if (!module) {
  //     throw new NotFoundException(`Module with ID ${moduleId} not found`);
  //   }
  
  //   // Save the current version
  //   const previousVersion = { ...module.toObject(), updatedAt: new Date() };
  //   await this.moduleModel.updateOne(
  //     { moduleId },
  //     { $push: { versions: previousVersion }, $set: updates },
  //   );
  
  //   return this.moduleModel.findOne({ moduleId }).exec();
  // }

  // async delete(moduleId: string): Promise<{ message: string }> {
  //   const result = await this.moduleModel.findOneAndDelete({ moduleId }).exec();
  //   if (!result) {
  //     throw new NotFoundException('Module not found');
  //   }
  //   return { message: 'Module deleted successfully' };
  // }

  // async markAsOutdated(moduleId: string): Promise<Module | null> {
  //   return this.moduleModel.findOneAndUpdate(
  //     { moduleId },
  //     { isOutdated: true },
  //     { new: true },
  //   ).exec();
  // }

  // async addResource(moduleId: string, fileUrl: string): Promise<Module | null> {
  //   return this.moduleModel.findOneAndUpdate(
  //     { moduleId },
  //     { $push: { resources: fileUrl } },
  //     { new: true },
  //   ).exec();
  // }

  // async updateResources(moduleId: string, resources: string[]): Promise<Module | null> {
  //   return this.moduleModel.findOneAndUpdate(
  //     { moduleId },
  //     { $addToSet: { resources: { $each: resources } } },  // Add resources
  //     { new: true },
  //   ).exec();
  // }

  // async removeResource(moduleId: string, fileUrl: string): Promise<Module | null> {
  //   return this.moduleModel.findOneAndUpdate(
  //     { moduleId },
  //     { $pull: { resources: fileUrl } }, // Remove specific resource
  //     { new: true },
  //   ).exec();
  // }

  // async findByCriteria(criteria: { courseId?: string; title?: string }): Promise<Module[]> {
  //   const query: any = { isOutdated: false };  // Default to non-outdated modules
  //   if (criteria.courseId) query.courseId = criteria.courseId;
  //   if (criteria.title) query.title = { $regex: criteria.title, $options: 'i' };
  
  //   return this.moduleModel.find(query).exec();
  // }

  // async findModuleWithDetails(moduleId: string): Promise<Module | null> {
  //   return this.moduleModel
  //     .findOne({ moduleId })
  //     .populate('courseId') // Include course details
  //     .exec();
  // }
}
