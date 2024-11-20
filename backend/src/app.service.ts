import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
<<<<<<< HEAD
  getHello(): string {
    return 'Hello World!';
=======
  private mongoUri = 'mongodb://localhost:27017';
  private databaseName = 'myDatabase';

  getHello(): string {
    return 'Hello, MongoDB is connected!';
  }

  getMongoUri(): string {
    return this.mongoUri;
  }

  getDatabaseName(): string {
    return this.databaseName;
>>>>>>> 36a753f936cff64d35593d8ff60a3ea5c8c2001d
  }
}
