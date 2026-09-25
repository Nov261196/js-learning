import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js";
import progressRoutes from "./progress.routes.js";

const router = Router();

router.get("/health", getHealth);
router.use("/auth", authRoutes);
router.use("/progress", progressRoutes);

export default router;
