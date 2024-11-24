import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
<<<<<<< HEAD

=======
>>>>>>> 46982dbb180db431799082216593b943d95bda3e
