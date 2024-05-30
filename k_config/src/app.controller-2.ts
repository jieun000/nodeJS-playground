import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }
  @Get('service-url')
  getServiceUrl(): string {
    const message =  this.configService.get('SERVICE_URL');
    return message;
  }
}
