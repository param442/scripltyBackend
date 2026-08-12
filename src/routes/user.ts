import { Router, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// GET /api/user/me — Protected route returning user data
router.get("/me", (req, res: Response) => {
  const authReq = req as AuthenticatedRequest;
  res.json({
    status: "success",
    user: authReq.user,
    session: authReq.session,
  });
});

export default router;
