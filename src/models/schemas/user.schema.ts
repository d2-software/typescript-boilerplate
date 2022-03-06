import { Model, model, Schema } from 'mongoose';
import { User as UserInterface } from '../user.interface';

export const USER_COLLECTION = 'User';

export const UserSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
  },
  {
    collection: USER_COLLECTION
  }
);

export const UserModel: Model<UserInterface> = model<UserInterface, Model<UserInterface>>(USER_COLLECTION, UserSchema);
