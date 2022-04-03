import { UserRepository } from '../../../../src/repositories/user.repository';
import UsersGetController from '../../../../src/controllers/users/usersGet.controller';

jest.mock('../../../../src/repositories/user.repository');
jest.mock('../../../../src/controllers/users/usersGet.controller');

describe('usersGet controller', () => {

  it('Should call to repository', () => {
    const req = {},
          res = { send: jest.fn() };

    const userController = new UsersGetController();
    userController.run(req, res)
    expect(UserRepository).toBeCalled();
  });
});
