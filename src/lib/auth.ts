import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Add it to your .env file or Vercel project environment variables.",
  );
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || clientOrigin,
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: (request?: Request) => {
    const origins = [
      clientOrigin,
      "http://localhost:5173",
      "https://scriplty.vercel.app",
      "https://scriplty-backend.vercel.app",
    ];
    if (request) {
      const origin = request.headers.get("origin") || request.headers.get("referer");
      if (origin) {
        try {
          const url = new URL(origin);
          if (url.hostname.endsWith(".vercel.app")) {
            origins.push(url.origin);
          }
        } catch {}
      }
    }
    return origins;
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Standard first-party cookie configuration
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: true,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
