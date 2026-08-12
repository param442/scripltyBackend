import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";

export interface AuthenticatedRequest extends Request {
  user?: typeof auth.$Infer.Session.user;
  session?: typeof auth.$Infer.Session.session;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({
        error: "Unauthorized: Please log in",
      });
    }

    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(500).json({
      error: "Authentication middleware error",
    });
  }
};
