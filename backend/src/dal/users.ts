import { User } from '../models/users';
import { userInput } from '../models/users';

export const createVolunteer = async (payload: userInput): Promise<userInput> => {
  const user = await User.create(payload)
  return user;
};

export const findVolunteer = async (email: string ): Promise<userInput|null> => {
  const user = await User.findOne({email});
  return user;
};
