import { Request, Response, Router } from 'express';
// import container from '../dependency-injection';
import UsersGetController from '../controllers/users/usersGet.controller';

export const register = (router: Router) => {
  // const controller: StatusController = container.get('Apps.mooc.controllers.StatusGetController');
  const controller: UsersGetController = new UsersGetController();
  router.get(
    '/users',
    (req: Request, res: Response) => controller.run(req, res)
  );
};