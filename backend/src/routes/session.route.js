import express from "express";
import { protectRoute } from "./../middlewares/protectRoute.middleware.js";
import {
  createSession,
  endSession,
  getActiveSession,
  getMyRecentSession,
  getSessionById,
  joinSession,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSession);
router.get("/my-recent", protectRoute, getMyRecentSession);

router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;
