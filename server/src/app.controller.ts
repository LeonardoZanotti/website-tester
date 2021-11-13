import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  run(@Query('url') url: string, @Res() response: Response): Promise<Response> {
    return this.appService.run(url, response);
  }
}
