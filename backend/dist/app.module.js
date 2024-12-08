"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");

const progress_Module_1 = require("./progress/progress.Module");

const quiz_module_1 = require("./quizzes/quiz.module");
const responses_module_1 = require("./responses/responses.module");
const user_module_1 = require("./users/user.module");
const progress_module_1 = require("./progress/progress.module");
const notes_module_1 = require("./notes/notes.module");
const modules_module_1 = require("./modules/modules.module");
const interactions_module_1 = require("./Data_science/interactions.module");
const recommendations_module_1 = require("./Data_science/recommendations.module");
const courses_module_1 = require("./courses/courses.module");
const auth_module_1 = require("./auth/auth.module");
const backup_module_1 = require("./backup/backup.module");
const schedule_1 = require("@nestjs/schedule");
const announcement_module_1 = require("./announcement/announcement.module");
const room_module_1 = require("./room/room.module");
const chat_module_1 = require("./chat/chat.module");
const message_module_1 = require("./message/message.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI, {
                dbName: process.env.DATABASE_NAME,
            }),

            progress_Module_1.ProgressModule,

            schedule_1.ScheduleModule.forRoot(),
            quiz_module_1.QuizModule,
            responses_module_1.ResponsesModule,
            user_module_1.UsersModule,
            progress_module_1.ProgressModule,
            notes_module_1.NotesModule,
            modules_module_1.ModulesModule,
            interactions_module_1.InteractionsModule,
            recommendations_module_1.RecommendationsModule,
            courses_module_1.CoursesModule,
            auth_module_1.AuthModule,
            backup_module_1.BackupModule,
            announcement_module_1.AnnouncementModule,
            room_module_1.RoomModule,
            chat_module_1.ChatModule,
            message_module_1.MessageModule,

        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
