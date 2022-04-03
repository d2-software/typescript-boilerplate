import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../controller';
import { UserRepository } from '../../repositories/user.repository';

export class UsersGetController implements Controller {
  constructor(private readonly userRepository: UserRepository) {
  }

  async run(req: Request, res: Response) {
    const users = await this.userRepository.find();

    res.status(httpStatus.OK).send({data: users});
  }
}
