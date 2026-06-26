import { createClient } from "@supabase/supabase-js";
import { setting } from "./config";

// Server-side Supabase client. Uses the service-role key, so it bypasses
// Row Level Security — keep SUPABASE_SERVICE_ROLE_KEY secret (backend only).
if (!setting.supabaseUrl || !setting.supabaseServiceKey) {
    throw new Error(
        "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the environment"
    );
}

export const supabase = createClient(setting.supabaseUrl, setting.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});
