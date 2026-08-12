import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// 1. CORS MUST COME FIRST
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

// 2. BETTER AUTH HANDLER MUST COME BEFORE OTHER BODY/COOKIE PARSERS
// Better Auth reads the raw request stream natively.
app.all("/api/auth/*", toNodeHandler(auth));

// 3. EXPRESS PARSERS (Only for your standard /api routes)
app.use(cookieParser());
app.use(express.json());

// 4. YOUR REGULAR ROUTES
app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Express backend with Prisma & Better Auth is running!",
  });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

export default app;
