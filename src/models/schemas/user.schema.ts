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

UserSchema.methods.toJson = function () {
  return {
    name: this.get('name'),
    email: this.get('email'),
    avatar: this.get('avatar')
  };
};

export const UserModel = model<UserInterface, Model<UserInterface>>(USER_COLLECTION, UserSchema);
