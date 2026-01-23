import express from "express";
import { protectRoute } from "../middlewares/protectRoute.middleware.js";
import { createStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/token", protectRoute, createStreamToken);

export default router;
