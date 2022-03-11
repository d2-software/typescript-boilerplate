import { NextFunction, Request, Response } from 'express';
import { Middleware } from '../middleware';
import Logger from '../../libs/logger';

export default class StatusGetMiddleware implements Middleware {
  constructor(private logger: Logger) { }
  async run(req: Request, res: Response, next: NextFunction) {
    console.log('middleware');
    this.logger.info('middleware');
    next();
  }
}
