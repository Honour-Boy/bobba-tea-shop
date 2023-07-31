import express from "express";
import dotenv from "dotenv";
import tryCatch from "../middleware/tryCatch";
import { register, login } from "../controllers/users";

dotenv.config();
const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", tryCatch(login));

export default router;