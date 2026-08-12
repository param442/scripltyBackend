import { Router } from "express";
// import { requireAuth } from "../middleware/middleware";
import userRoutes from "./user";

const router = Router();

// Protected application routes (require valid Better Auth session)
router.use("/user", userRoutes);

export default router;
