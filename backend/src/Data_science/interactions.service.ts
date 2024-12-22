import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';

@Injectable()
export class InteractionsService {
  private interactions = [];

  create(createInteractionDto: CreateInteractionDto) {
    const newInteraction = { id: Date.now(), ...createInteractionDto };
    this.interactions.push(newInteraction);
    return newInteraction;
  }

  findAll() {
    return this.interactions;
  }

  findOne(id: string) {
    return this.interactions.find((item) => item.id === Number(id));
  }

  update(id: string, updateInteractionDto: UpdateInteractionDto) {
    const interaction = this.findOne(id);
    if (interaction) {
      Object.assign(interaction, updateInteractionDto);
    }
    return interaction;
  }

  remove(id: string) {
    this.interactions = this.interactions.filter((item) => item.id !== Number(id));
    return { deleted: true };
  }
}
