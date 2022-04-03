import { NextFunction, Request, Response, Router } from 'express';
import container from '../dependency-injection';
import { UsersGetController } from '../controllers/users/usersGet.controller';
import { AuthenticationMiddleware } from '../middlewares/common/authentication.middleware';

export const register = (router: Router) => {
  const controller: UsersGetController = container.get('App.controllers.UsersGetController');
  const middleware: AuthenticationMiddleware = container.get('App.middlewares.AuthenticationMiddleware');
  router.get(
    '/users',
    (req: Request, res: Response, next: NextFunction) => middleware.run(req, res, next),
    (req: Request, res: Response) => controller.run(req, res)
  );
};
