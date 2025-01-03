import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quizzes/quiz.module';
import { ResponsesModule } from './responses/responses.module';
import { UsersModule } from './users/user.module';
import { NotesModule } from './notes/notes.module';
import { ModulesModule } from './modules/modules.module';
import { InteractionsModule } from './Data_science/interactions.module';
import { RecommendationsModule } from './Data_science/recommendations.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { QuestionBankModule } from './question-bank/question-bank.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    QuizModule,
    ResponsesModule,
    UsersModule,
    ProgressModule,
    NotesModule,
    ModulesModule,
    InteractionsModule,
    RecommendationsModule,
    CoursesModule,
    AuthModule,
    QuestionBankModule,
    MessageModule,
    ChatModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
