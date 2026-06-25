import client from "./client";

export async function getCart() {
  const res = await client.get("/cart/user");
  return res.data; // { user, flavours: [{ name, count }] }
}

export async function updateCart(flavours) {
  const res = await client.put("/cart/user", { flavours });
  return res.data;
}
