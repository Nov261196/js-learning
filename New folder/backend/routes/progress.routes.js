import { Router } from "express";
import { getProgress, updateProgress } from "../controllers/progress.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.get("/", getProgress);
router.put("/", updateProgress);

export default router;
