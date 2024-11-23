import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModuleSchema, Module as ModuleClass } from './modules.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ModuleClass.name, schema: ModuleSchema }])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
