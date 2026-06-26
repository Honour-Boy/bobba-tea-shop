import { supabase } from "./supabase";

// localStorage keys: the last placed order (for the receipt page) and a
// guest's not-yet-saved order (flushed to their account after they log in).
export const LAST_ORDER_KEY = "bobba_last_order";
export const PENDING_ORDER_KEY = "bobba_pending_order";

// Map a Supabase `orders` row to the shape the UI already expects.
function mapOrder(row) {
  return {
    _id: row.id,
    reference: row.reference,
    items: row.items,
    total: Number(row.total),
    createdAt: row.created_at,
  };
}

export async function createOrder(order) {
  // order: { items: [{ name, count, price }], total, reference? }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      reference: order.reference || makeReference(),
      items: order.items,
      total: order.total,
    })
    .select()
    .single();
  if (error) throw error;
  return mapOrder(data);
}

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapOrder); // [{ _id, reference, items, total, createdAt }]
}

export function readLastOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY)) || null;
  } catch {
    return null;
  }
}

export function makeReference() {
  return `BB-${Date.now().toString(36).toUpperCase()}`;
}
