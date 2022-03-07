import { Model, model, Schema } from 'mongoose';
import { User } from '../user';

export const USER_COLLECTION = 'User';

export const UserSchema = new Schema<User>(
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

export const UserModel = model<User, Model<User>>(USER_COLLECTION, UserSchema);
