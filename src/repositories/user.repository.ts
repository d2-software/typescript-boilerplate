import { User } from '../models/user';
import { UserModel } from '../models/schemas/user.schema';

export class UserRepository {
  public async find(): Promise<User[] | undefined> {
    return UserModel.find();
  }
}
