import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
=======
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);

  // Log the Mongo URI and database name for debugging purposes
  console.log('Mongo URI:', appService.getMongoUri());
  console.log('Database Name:', appService.getDatabaseName());

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
>>>>>>> 36a753f936cff64d35593d8ff60a3ea5c8c2001d
}
bootstrap();
