import "./shims/slowBuffer";
import express from "express";
import dotenv from "dotenv";
import users from "./routes/users";
import carts from "./routes/cart";
import orders from "./routes/orders";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import { setting } from "./config/config";
// Importing the client validates SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY at
// startup and fails fast with a clear message if they are missing.
import "./config/supabase";

dotenv.config();
const app = express();
const port = setting.port || 5000;

app.use(cors());
app.use(express.json());

// Health check — handy for confirming the service is up (e.g. Railway).
app.get("/", (_req, res) => {
    res.send({ status: "ok", service: "bobba-tea-shop api" });
});

app.use("/api/user", users);
app.use("/api/cart", carts);
app.use("/api/orders", orders);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
