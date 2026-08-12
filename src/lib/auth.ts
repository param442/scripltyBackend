import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, // Must be https://scriplty-backend.vercel.app

  trustedOrigins: [
    "https://scriplty.vercel.app", // Your frontend production URL
    "http://localhost:5173", // Your frontend local dev URL
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ENABLE CROSS-DOMAIN COOKIES
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: {
      sameSite: "none", // REQUIRED for cross-site OAuth redirects
      secure: true,
      partitioned: true,
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
