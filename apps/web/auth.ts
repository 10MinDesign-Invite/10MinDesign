import { prisma } from "@repo/database";
import { loginSchema } from "@repo/zod-input-validation";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        const email = credentials.email as string
        const password = credentials.password as string

        const validInput = loginSchema.safeParse({ email, password });
        if (!validInput.success) {
          throw new Error(validInput.error.errors[0]?.message, { cause: "Invalid email or password format" });
        }
        const user = await prisma.user.findUnique({
          where:{
            email
          }
        });

        if (!user) {
          throw new Error("User not found", { cause: "No user with this email" });
        }
        const validPassword = await bcrypt.compare(password,user?.password!)
        if(!validPassword) {
          throw new Error("Invalid password", { cause: "Password is incorrect" });
        }
        
        return {
          id: user?.id.toString(),
          name: user?.name,
          email: user?.email,
        }
          
        
      },
    })],
  pages: {
    signIn: "/login"
  },
  callbacks:{
    signIn:async ({user,account,email,profile})=>{
        if(account?.provider === "google"){
          try {
            const {email,id,name,image} = user;
            
            if(!email) {
              throw new Error("Invalid email", { cause: "invalid email" });
            }
            const userAlreadyExist = await prisma.user.findUnique({
              where:{
                email:email
              }
            });

            if(!userAlreadyExist){
              await prisma.user.create({
                data:{
                  name,
                  email,
                  image,
                  googleId:id?.toString(),
                }
              })
            }

            return true  //allow google login  
          } catch (error) {
            throw new AuthError("error while login")
          }
        }
        return true // i got error remember always allow non google git oauth providers also
        // if set both false no google work or last for credential it alsonot work
      },
    }
};

const nextAuth = NextAuth(config);

export const handlers = nextAuth.handlers;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const auth: typeof nextAuth.auth = nextAuth.auth;
