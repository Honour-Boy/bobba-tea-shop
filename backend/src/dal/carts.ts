import { supabase } from '../config/supabase';
import { cartStructure, cartFlavour } from '../models/cart';

export const createCart = async (payload: cartStructure): Promise<cartStructure> => {
  const { data, error } = await supabase
    .from('carts')
    .insert({ user_id: payload.user, flavours: payload.flavours ?? [] })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { user: data.user_id, flavours: data.flavours };
};

export const displayCart = async (user_id: string): Promise<cartStructure | null> => {
  const { data, error } = await supabase
    .from('carts')
    .select()
    .eq('user_id', user_id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return { user: data.user_id, flavours: data.flavours };
};

export const updateCart = async (
  user_id: string,
  flavours: cartFlavour[]
): Promise<cartStructure | null> => {
  const { data, error } = await supabase
    .from('carts')
    .update({ flavours, updated_at: new Date().toISOString() })
    .eq('user_id', user_id)
    .select()
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  return { user: data.user_id, flavours: data.flavours };
};
