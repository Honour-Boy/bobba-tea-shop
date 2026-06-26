import { supabase } from "../config/supabase";
import { orderStructure } from "../models/order";

const mapOrder = (row: any): orderStructure => ({
  _id: row.id,
  user: row.user_id,
  reference: row.reference,
  items: row.items,
  total: Number(row.total),
  createdAt: row.created_at,
});

export const createOrder = async (
  payload: orderStructure
): Promise<orderStructure> => {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: payload.user,
      reference: payload.reference,
      items: payload.items,
      total: payload.total,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return mapOrder(data);
};

export const getOrdersByUser = async (
  user_id: string
): Promise<orderStructure[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapOrder);
};
