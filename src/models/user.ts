import { User as UserInterface } from './user.interface';

export class User {
  name: string;
  email: string;
  avatar: string;

  constructor({ name, email, avatar }: UserInterface) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }

  public static createUser(userData: UserInterface): User {
    return new User(userData);
  }

  public toJson(): object {
    return {
      name: this.name,
      email: this.email,
      avatar: this.avatar
    };
  }
}
