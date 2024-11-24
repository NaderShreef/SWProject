import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
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
  }
}
