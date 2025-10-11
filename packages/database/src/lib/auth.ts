import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";

export const auth = betterAuth({
  secret:process.env.AUTH_SECRET?.toString(),
  trustedOrigins:[`${process.env.FRONTEND_URL}`],
  baseURL: `${process.env.BACKEND_URL}`,  

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: `${process.env.AUTH_GOOGLE_ID}`,
      clientSecret: `${process.env.AUTH_GOOGLE_SECRET}`,
    },
  },
});

export { toNodeHandler } from "better-auth/node";
