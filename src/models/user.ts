import { User as UserInterface } from './user.interface';

export class User {
  readonly #name: string;
  readonly #email: string;
  readonly #avatar: string;

  constructor({ name, email, avatar }: UserInterface) {
    this.#name = name;
    this.#email = email;
    this.#avatar = avatar;
  }

  public static createUser({ name, email, avatar }: UserInterface): User {
    return new User({ name, email, avatar });
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get avatar() {
    return this.#avatar;
  }
}
