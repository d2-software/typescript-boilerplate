import { NextFunction, Request, Response, Router } from 'express';
import StatusGetController from '../controllers/status/statusGet.controller';
import StatusGetMiddleware from '../middlewares/status/statusGet.middleware';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const middleware = container.get('App.middlewares.StatusGetMiddleware') as StatusGetMiddleware;
  const controller = container.get('App.controllers.StatusGetController') as StatusGetController;
  router.get(
    '/status',
    (req: Request, res: Response, next: NextFunction) => middleware.run(req, res, next),
    (req: Request, res: Response) => controller.run(req, res)
  );
};
