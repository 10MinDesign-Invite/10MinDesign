import * as dotenv from 'dotenv';
dotenv.config();
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@repo/database"

export const auth = betterAuth({
  secret: `${process.env.BETTER_AUTH_SECRET}`,
  trustedOrigins: [`${process.env.FRONTEND_URL}`],
  baseURL: process.env.BACKEND_URL as string,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId:`${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret:`${process.env.GOOGLE_CLIENT_SECRET}`,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
});

export {toNodeHandler} from "better-auth/node"