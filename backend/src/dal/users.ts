import { User } from '../models/users';
import { userInput, user } from '../models/users';

export const createUser = async (payload: userInput): Promise<user> => {
  const user = await User.create(payload);
  return user;
};

export const findUser = async (email: string ): Promise<userInput|null> => {
  const user = await User.findOne({email});
  return user;
};
