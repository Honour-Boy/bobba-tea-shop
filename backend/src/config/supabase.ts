import { createClient } from "@supabase/supabase-js";
import ws from "ws";
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
    // supabase-js always constructs a realtime client, which needs a WebSocket
    // implementation. Node < 22 has no global WebSocket, so supply `ws`
    // explicitly. We never use realtime, but this keeps startup safe on any
    // Node version (Railway has been running Node 18).
    realtime: { transport: ws as unknown as typeof WebSocket },
});
