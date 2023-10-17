import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!   Please try out our APIs in postman or any other such tools';
  }
}
