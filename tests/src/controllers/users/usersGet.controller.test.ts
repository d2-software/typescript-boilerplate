import { Request, Response } from 'express';
import { UserRepository } from '../../../../src/repositories/user.repository';
import { UsersGetController } from '../../../../src/controllers/users/usersGet.controller';

const userRepository: jest.Mocked<UserRepository> = {
  find: jest.fn(),
  findOneByEmail: jest.fn(),
}

describe('usersGet controller', () => {
  it('Should call to repository and returns 200 code', async () => {
    let responseStatus;
    const req = {} as Request;
    const res: Partial<Response> = {
      send: jest.fn(),
      status: jest.fn().mockImplementation((statusCode) => {
        responseStatus = statusCode;
        return res;
      }),
    };

    const userController = new UsersGetController(userRepository);
    await userController.run(req, res as Response);

    expect(userRepository.find).toBeCalled();
    expect(responseStatus).toEqual(200);
  });
});
