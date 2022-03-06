import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../controller';
import { UserRepository } from '../../repositories/user.repository';

export default class UsersGetController implements Controller {
  async run(req: Request, res: Response) {
    const userRepository = new UserRepository();

    const users = await userRepository.find();

    res.status(httpStatus.OK).send({ data: users });
  }
}
