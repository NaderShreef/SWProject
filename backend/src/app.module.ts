import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProgressModule } from './progress/progress.Module';
import { ProgressSchema } from './progress/progress.schema';

import { QuizModule } from './quizzes/quiz.module';
import { ResponsesModule } from './responses/responses.module';
import { UsersModule } from './users/user.module';
import { NotesModule } from './notes/notes.module';
import { ModulesModule } from './modules/modules.module';
import { InteractionsModule } from './Data_science/interactions.module';
import { RecommendationsModule } from './Data_science/recommendations.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { BackupModule } from './backup/backup.module';
import { ScheduleModule } from '@nestjs/schedule'; // Import ScheduleModule
import { AnnouncementModule } from './announcement/announcement.module'; // Import AnnouncementModule
import { RoomModule } from './room/room.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    ScheduleModule.forRoot(), // Enable scheduling
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
    BackupModule, // Register BackupModule
    AnnouncementModule, // Register AnnouncementModule
    RoomModule,
    ChatModule,
    MessageModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}