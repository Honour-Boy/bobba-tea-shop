import "./shims/slowBuffer";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import users from "./routes/users";
import carts from "./routes/cart";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import {setting} from "./config/config";

dotenv.config();
const app = express();

const connectDb = async (): Promise<void> => {
    try {
        let connectionString = setting.connectionString;

        // No connection string configured: fall back to an in-memory MongoDB
        // so the server can run locally without an external database.
        if (!connectionString) {
            const { MongoMemoryServer } = await import("mongodb-memory-server");
            const mongod = await MongoMemoryServer.create();
            connectionString = mongod.getUri();
            console.log("No CONNECTIONSTRING set, using in-memory MongoDB at", connectionString);
        }

        const connect = await mongoose.connect(connectionString);
        console.log("Connected to", connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDb();
const port = setting.port || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", users);
app.use("/api/cart", carts);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
