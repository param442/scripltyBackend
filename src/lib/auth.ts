import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  // 1. Ensure trustedOrigins includes both your frontend AND any local/preview origins
  trustedOrigins: [
    process.env.CLIENT_ORIGIN!,
    "http://localhost:5173", // Add local dev if applicable
  ],

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // 2. Configure cross-site cookies for decoupled Frontend/Backend
  advanced: {
    useSecureCookies: true, // Force HTTPS secure flag in production
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: "none", // Required for cross-origin OAuth redirects
      secure: true,
      partitioned: true, // Modern browser CHIPS support
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
