import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.set("trust proxy", 1); // Trust the first proxy (if behind a reverse proxy like Vercel or Nginx)

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "https://scriplty.vercel.app",
  "https://scriptly.paramvirsingh.me",
].filter(Boolean) as string[];

// 1. CORS MUST COME FIRST
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
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
app.get("/", (req, res) => {
  // If an error query parameter is passed (e.g. ?error=state_mismatch), redirect to frontend
  if (req.query.error) {
    const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
    return res.redirect(`${clientOrigin}/?error=${req.query.error}`);
  }
  res.json({ message: "Scriplty Backend API is active." });
});
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
