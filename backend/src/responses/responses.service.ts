import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { responses } from './responses.schema';
@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(responses.name) private readonly responseModel: Model<responses>,
  ) {}

  async createResponse(responseData: Partial<responses>): Promise<responses> {
    const createdResponse = new this.responseModel(responseData);
    return createdResponse.save();
  }

  async getAllResponses(): Promise<responses[]> {
    return this.responseModel.find().exec();
  }

  async getResponseById(response_id: string): Promise<responses | null> {
    return this.responseModel.findOne({ response_id }).exec();
  }

  async replaceResponse(response_id: string, newResponseData: responses): Promise<responses | null> {
    return this.responseModel.findOneAndReplace(
      { response_id },
      newResponseData,
      { new: true }, 
    );
  }

  async delete(id: string): Promise<responses> { 
    return await this.responseModel.findByIdAndDelete(id); }

 
}
