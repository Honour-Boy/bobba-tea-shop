import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surfaces a clear message in the console instead of a cryptic runtime error
  // if the build was produced without the Supabase env vars.
  console.error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — auth and data will not work."
  );
}

export const supabase = createClient(url, anonKey);
