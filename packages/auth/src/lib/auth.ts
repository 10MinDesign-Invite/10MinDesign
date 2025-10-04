import { prisma } from "@repo/database";
import axios from 'axios';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession, emailOTP } from 'better-auth/plugins';
import * as dotenv from 'dotenv';
dotenv.config();

export const auth = betterAuth({
  secret: `${process.env.BETTER_AUTH_SECRET}`,
  trustedOrigins: [`https://www.10mindesigns.shop`],
  // baseURL: `https://www.10mindesigns.shop`,
  baseURL: `https://www.10mindesigns.shop`,
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
                  
                    // await axios.post(`https://one0mindesignbackend-auth.onrender.com/auth/send-otp`,{email,otp,type})
                    await axios.post(`http://localhost:8080/auth/send-otp`,{email,otp,type})

                } 
            }, 
        }),
        
    ]

});

export { fromNodeHeaders, toNodeHandler } from "better-auth/node";
export {toNextJsHandler} from "better-auth/next-js"