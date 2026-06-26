import dotenv from "dotenv";
dotenv.config();

export const setting = {
    secretKey: process.env.ACCESSTOKENSECRET as string,
    port: process.env.PORT,
    supabaseUrl: process.env.SUPABASE_URL as string,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
}
