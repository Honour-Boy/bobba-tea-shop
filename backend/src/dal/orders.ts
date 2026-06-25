import { Schema } from "mongoose";
import { Order, orderStructure } from "../models/order";

export const createOrder = async (
  payload: orderStructure
): Promise<orderStructure> => {
  const order = await Order.create(payload);
  return order;
};

export const getOrdersByUser = async (
  user_id: Schema.Types.ObjectId
): Promise<orderStructure[]> => {
  const orders = await Order.find({ user: user_id }).sort({ createdAt: -1 });
  return orders;
};
