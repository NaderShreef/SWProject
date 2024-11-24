import { Module } from '@nestjs/common';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponsesSchema } from './responses.Schema';

@Module({
    imports :[ MongooseModule.forFeature([{name :'responses', schema :ResponsesSchema}])], 
    controllers : [ResponsesController],
    providers : [ResponsesService]

})
export class ResponsesModule {
}
