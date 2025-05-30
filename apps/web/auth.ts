
import { prisma } from "@repo/database";
import { loginSchema } from "@repo/zod-input-validation";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError, CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
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

         const email = credentials.email as string | undefined
         const password = credentials.password as string | undefined
         if(!email || !password) throw new CredentialsSignin("provide both email password",{cause:"both required email and password"})
         const validInput = loginSchema.safeParse({ email, password });
         if (!validInput.success) {
           throw new CredentialsSignin(validInput.error.errors[0]?.message,{cause:validInput.error.errors[0]?.message});
         }
         const user = await prisma.user.findUnique({
           where:{
             email
           }
         });
 
         if (!user) {
          throw new CredentialsSignin("Invalid credentials.",{cause:"invalid username"})
        }
         const validPassword = await bcrypt.compare(password!,user?.password!)
          if(!validPassword){
            throw new CredentialsSignin("Invalid password.",{cause:"wrong password"})
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
              throw new Error("Invalid email");
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
        // if set both false no google work or last for credential it also not work
      },
    }
};

const nextAuth = NextAuth(config);

export const handlers = nextAuth.handlers;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const auth: typeof nextAuth.auth = nextAuth.auth;