import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  console.log('Mongo URI:', appService.getMongoUri());
  console.log('Database Name:', appService.getDatabaseName());
  
  // Enable CORS with proper configuration
  app.enableCors({
    origin: 'http://localhost:3000',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true
  });
  app.use(cookieParser());
  const port = 5001;
  await app.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}
bootstrap();
