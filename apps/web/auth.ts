import { loginSchema } from "@repo/zod-input-validation";
import axios from "axios";
import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password)
          throw new CredentialsSignin("provide both email password", {
            cause: "both required email and password",
          });
        const validInput = loginSchema.safeParse({ email, password });
        if (!validInput.success) {
          throw new CredentialsSignin(validInput.error.errors[0]?.message, {
            cause: validInput.error.errors[0]?.message + "....",
          });
        }

        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_Backend_URL}/verify/user`,
          { email },
        );

        if (!user) {
          throw new CredentialsSignin("Invalid credentials.", {
            cause: "invalid credential",
          });
        }
        const validPassword = await bcrypt.compare(
          password!,
          user?.data?.password!,
        );
        if (!validPassword) {
          throw new CredentialsSignin("Invalid password.", {
            cause: "invalid credential",
          });
        }

        return {
          id: user?.data?.id.toString(),
          name: user?.data?.name,
          email: user?.data?.email.toString(),
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account, email, profile }) => {
      if (account?.provider === "google") {
        // try {
        const { email, id, name, image } = user;

        if (!email) {
          throw new Error("Invalid email");
        }
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_Backend_URL}/add/user`,
          { email, id, name, image },
        );
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }

        // return true  //allow google login
        // } catch (error) {
        //   throw new AuthError("error while login");
        // }
      }
      return true; // i got error remember always allow non google git oauth providers also
      // if set both false no google work or last for credential it also not work
    },
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token.id && session.user) {
        session.user.id = token.id.toString();
      }
      return session;
    },
    async jwt({ token }) {
      const existing_user = await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/verify/user`,
        { email: token.email, customeData: "select only id and role" },
      );
      if (!existing_user) return token;

      token.role = existing_user?.data?.role;
      token.id = existing_user?.data?.id;
      return token;
    },
  },

  // custome cookie for my error in be req.cookie is null cheking this work orr noy 

  useSecureCookies: process.env.NODE_ENV === "development" ? false : true,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        path: "/",
        secure: process.env.NODE_ENV === "development" ? false : true,
        domain:
          process.env.NODE_ENV === "development"
            ? undefined
            : ".10mindesigns.shop",
      },
    },
  },
};

const nextAuth = NextAuth(config);

export const handlers = nextAuth.handlers;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const auth: typeof nextAuth.auth = nextAuth.auth;
