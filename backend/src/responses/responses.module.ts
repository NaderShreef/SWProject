import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { responses, ResponsesSchema } from './responses.Schema';

@Module({
    imports :[ MongooseModule.forFeature([{name :responses.name, schema :ResponsesSchema}])], 
    controllers : [ResponsesController],
    providers : [ResponsesService]

})
export class ResponsesModule {
}
