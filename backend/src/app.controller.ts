import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, MongoDB is connected!';
  }
}
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
}