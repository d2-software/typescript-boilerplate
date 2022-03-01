import { NextFunction, Request, Response } from 'express';

export interface Middleware {
  run(req: Request, res: Response, next: NextFunction): Promise<void>;
}
