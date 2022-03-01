import { NextFunction, Request, Response, Router } from 'express';
// import container from '../dependency-injection';
import StatusGetController from '../controllers/statusGet.controller';
import StatusGetMiddleware from '../middlewares/statusGet.middleware';

export const register = (router: Router) => {
  // const controller: StatusController = container.get('Apps.mooc.controllers.StatusGetController');
  const controller: StatusGetController = new StatusGetController();
  const middleware: StatusGetMiddleware = new StatusGetMiddleware();
  router.get(
    '/status',
    (req: Request, res: Response, next: NextFunction) => middleware.run(req, res, next),
    (req: Request, res: Response) => controller.run(req, res)
  );
};
