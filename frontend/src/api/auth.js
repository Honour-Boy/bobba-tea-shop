import client from "./client";

export async function register(email, password) {
  const res = await client.post("/user/register", { email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await client.post("/user/login", { email, password });
  return res.data; // { Status, Access_Token }
}
