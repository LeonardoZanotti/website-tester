import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as pa11y from 'pa11y';

@Injectable()
export class AppService {
  async run(query: string, res: Response): Promise<Response> {
    console.log('Query url:', query);
    if (query) {
      try {
        const results = await pa11y(query);
        return res.json(results);
      } catch (err) {
        return res.status(404).json({ error: 'Url not found!' });
      }
    }
    return res.status(400).json({ error: 'Url is required!' });
  }
}
