import { supabase } from '../config/supabase';
import { userInput, user } from '../models/users';

export const createUser = async (payload: userInput): Promise<user> => {
  const { data, error } = await supabase
    .from('users')
    .insert({ email: payload.email, password: payload.password })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { _id: data.id, email: data.email, password: data.password };
};

export const findUser = async (email: string): Promise<user | null> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return { _id: data.id, email: data.email, password: data.password };
};
