import { Router } from "express";
import { requireAuth } from "../middleware/middleware";
import userRoutes from "./user";

const router = Router();

// Protected application routes (require valid Better Auth session)
router.use("/user", requireAuth, userRoutes);

export default router;
