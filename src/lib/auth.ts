import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { sendEmail } from "./email.js";
import res from "../components/emailHtml.js";
const isProduction = process.env.NODE_ENV === "production";
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
      "http://localhost:5000",
      "https://scriplty.vercel.app",
      "https://scriplty-backend.vercel.app",
      "https://scriptly.paramvirsingh.me",
    ];
    if (request) {
      const origin =
        request.headers.get("origin") || request.headers.get("referer");
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

  // Cookie configuration dynamically adjusted for Dev vs Prod
  advanced: {
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ url, user }) => {
      /**
       * @args  to - The recipient's email address
       * @args  subject - The subject of the email
       * @args  text - The plain text content of the email or can be html content as well
       *
       */

      await sendEmail(user.email, "Verify your Scriptly account", res(url));
    },

    sendOnSignUp: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google"],
    },
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
