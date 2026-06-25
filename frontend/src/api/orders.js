import client from "./client";

// localStorage keys: the last placed order (for the receipt page) and a
// guest's not-yet-saved order (flushed to their account after they log in).
export const LAST_ORDER_KEY = "bobba_last_order";
export const PENDING_ORDER_KEY = "bobba_pending_order";

export async function createOrder(order) {
  // order: { items: [{ name, count, price }], total }
  const res = await client.post("/orders", order);
  return res.data;
}

export async function getOrders() {
  const res = await client.get("/orders");
  return res.data; // [{ _id, reference, items, total, createdAt }]
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
