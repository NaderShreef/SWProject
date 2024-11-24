import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interaction } from './interaction.schema';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name) private interactionModel: Model<Interaction>,
  ) {}

  async create(data: Partial<Interaction>): Promise<Interaction> {
    const interaction = new this.interactionModel(data);
    return interaction.save();
  }

  async findAll(): Promise<Interaction[]> {
    return this.interactionModel.find().exec();
  }
}
