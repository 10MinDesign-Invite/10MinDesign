import * as dotenv from 'dotenv';
dotenv.config();
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@repo/database"
import { customSession, emailOTP } from 'better-auth/plugins';
import axios from 'axios';
export const auth = betterAuth({
  secret: `${process.env.BETTER_AUTH_SECRET}`,
  trustedOrigins: [`${process.env.FRONTEND_URL}`],
  baseURL: `${process.env.BACKEND_URL}`,
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
  
    plugins: [
        customSession(async ({ user, session }) => {
          const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {       
            role: true 
          },
        });
            return {
                user: {
                    ...user,
                    role:dbUser?.role
                },
                session
            };
        }),

        // this is for email 
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type }) { 
                if (type === "sign-in") { 
                    // Send the OTP for sign in
                } else if (type === "email-verification") { 
                    // Send the OTP for email verification
                } else { 
                  
                    await axios.post(`${process.env.BACKEND_URL}/auth/send-otp`,{email,otp,type})

                } 
            }, 
        }) 
    ]

});

export {toNodeHandler,fromNodeHeaders} from "better-auth/node"