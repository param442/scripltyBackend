import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import apiRoutes from "./routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

// Better Auth MUST come before express.json()
app.all("/api/auth/*splat", toNodeHandler(auth));

// JSON parser for your normal API routes
app.use(express.json());

app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Express backend with Prisma & Better Auth is running!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
