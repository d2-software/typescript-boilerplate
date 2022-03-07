import { User as UserInterface } from '../models/user.interface';
import { UserModel } from '../models/schemas/user.schema';

export class UserRepository {
  public async find(): Promise<UserInterface[] | undefined> {
    return UserModel.find();
  }

  public async findOneByEmail(email: string): Promise<UserInterface | undefined> {
    return UserModel.findOne({ email });
  }
}
