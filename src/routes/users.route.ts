import { NextFunction, Request, Response, Router } from 'express';
// import container from '../dependency-injection';
import UsersGetController from '../controllers/users/usersGet.controller';
import AuthenticationMiddleware from '../middlewares/common/authentication.middleware';

export const register = (router: Router) => {
  // const controller: StatusController = container.get('Apps.mooc.controllers.StatusGetController');
  const controller: UsersGetController = new UsersGetController();
  const middleware: AuthenticationMiddleware = new AuthenticationMiddleware();
  router.get(
    '/users',
    (req: Request, res: Response, next: NextFunction) => middleware.run(req, res, next),
    (req: Request, res: Response) => controller.run(req, res)
  );
};
