import { Cart, cartStructure } from '../models/cart';

export const createCart = async (payload: cartStructure): Promise<cartStructure> => {
  const cart = await Cart.create(payload)
  return cart;
};

export const displayCart = async (user_id: cartStructure["user"] ): Promise<cartStructure|null> => {
  const cart = await Cart.findOne({user: user_id});
  return cart;
};
