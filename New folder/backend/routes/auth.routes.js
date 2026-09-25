import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, getCurrentUser);

export default router;
