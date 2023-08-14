import dotenv from "dotenv";
dotenv.config();

export const setting = {
    secretKey: process.env.ACCESSTOKENSECRET as string,
    connectionString: process.env.CONNECTIONSTRING as string,
    port: process.env.PORT
}