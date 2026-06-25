import express from "express";
import tryCatch from "../middleware/tryCatch";
import { auth } from "../middleware/auth";
import { create, list } from "../controllers/orders";

const router = express.Router();

router.post("/", auth, tryCatch(create));
router.get("/", auth, tryCatch(list));

export default router;
