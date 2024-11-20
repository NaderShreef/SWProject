import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);

  // Log the Mongo URI and database name for debugging purposes
  console.log('Mongo URI:', appService.getMongoUri());
  console.log('Database Name:', appService.getDatabaseName());

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
