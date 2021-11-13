import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Redirect('/api/test', 200)
  helloWorld(): string {
    return this.appService.helloWorld();
  }

  @Get('/api/test')
  run(@Query('url') url: string, @Res() response: Response): Promise<Response> {
    return this.appService.run(url, response);
  }
}
