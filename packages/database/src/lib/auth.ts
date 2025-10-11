import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";

export const auth = betterAuth({
  secret:process.env.AUTH_SECRET?.toString(),
  trustedOrigins:[`https://www.10mindesigns.shop`],
  baseURL: `https://api.10mindesigns.shop`,  

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

  crossSubDomainCookies: {
    enabled: true,
    domain: "www.10mindesigns.shop",
  },
});

export { toNodeHandler } from "better-auth/node";
