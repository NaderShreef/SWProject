"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_service_1 = require("./app.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const appService = app.get(app_service_1.AppService);
    console.log('Mongo URI:', appService.getMongoUri());
    console.log('Database Name:', appService.getDatabaseName());
    app.enableCors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
    });
    await app.listen(3000);
    console.log('Application is running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map