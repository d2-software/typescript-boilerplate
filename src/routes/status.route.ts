import { Request, Response, Router } from 'express';
import StatusGetController from '../controllers/status/statusGet.controller';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller = container.get('App.controllers.StatusGetController') as StatusGetController;
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
