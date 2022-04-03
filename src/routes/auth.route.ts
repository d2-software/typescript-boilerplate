import { Request, Response, Router } from 'express';
import { container } from '../dependency-injection';
import { LoginPostController } from '../controllers/auth/login/loginPost.controller';

export const register = (router: Router) => {
  const controller: LoginPostController = container.get('App.controllers.LoginPostController');
  router.post('/auth/login', (req: Request, res: Response) => controller.run(req, res));
};
