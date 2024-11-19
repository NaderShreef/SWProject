import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getMongoUri(): string {
    return this.configService.get<string>('MONGO_URI');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }
}
