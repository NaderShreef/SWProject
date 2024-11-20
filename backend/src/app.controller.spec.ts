import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
<<<<<<< HEAD
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
=======
    it('should return "Hello, MongoDB is connected!"', () => {
      expect(appController.getHello()).toBe('Hello, MongoDB is connected!');
>>>>>>> 36a753f936cff64d35593d8ff60a3ea5c8c2001d
    });
  });
});
