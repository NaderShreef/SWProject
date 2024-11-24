import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Interaction, InteractionSchema } from './interaction.schema';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interaction.name, schema: InteractionSchema }]),
  ],
  providers: [InteractionsService],
  controllers: [InteractionsController],
})
export class InteractionsModule {}
