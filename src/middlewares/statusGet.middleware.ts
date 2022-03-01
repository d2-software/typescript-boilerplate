import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware';

export default class StatusGetMiddleware implements Middleware {
  async run(req: Request, res: Response, next: NextFunction) {
    console.log('middleware');
    next();
  }
}
