import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../../controller';
import { UserRepository } from '../../../repositories/user.repository';
import { Token } from '../../../libs/token';

export class LoginPostController implements Controller {
  async run(req: Request, res: Response) {
    const { email } = req.body;

    const userRepository = new UserRepository();
    const user = await userRepository.findOneByEmail(email);

    const token = Token.generate({
      userEmail: user.email
    });

    res.status(httpStatus.OK).send({
      data: {
        ...user.toJson(),
        token
      }
    });
  }
}
