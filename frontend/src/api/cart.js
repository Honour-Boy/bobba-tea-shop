import { supabase } from "./supabase";

// The signed-in user's cart lives in the `carts` table (one row per user,
// keyed by user_id). Row Level Security ensures a user only ever touches
// their own row.

export async function getCart() {
  const { data, error } = await supabase
    .from("carts")
    .select("flavours")
    .maybeSingle();
  if (error) throw error;
  return { flavours: data?.flavours ?? [] }; // { flavours: [{ name, count }] }
}

export async function updateCart(flavours) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("carts")
    .upsert(
      { user_id: user.id, flavours, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    )
    .select("flavours")
    .single();
  if (error) throw error;
  return { flavours: data?.flavours ?? [] };
}
