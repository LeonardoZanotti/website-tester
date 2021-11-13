import { Injectable } from '@nestjs/common';
import * as pa11y from 'pa11y';

@Injectable()
export class AppService {
  async run(): Promise<string> {
    await pa11y('https://traversy.dev/').then((results) =>
      console.log(results),
    );
    return 'ok';
  }
}
