// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // 👈 extend User with 'role'
  }

  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // 👈 extend Session's user
    };
  }

  interface JWT {
    role?: string; // 👈 extend JWT as well if using JWT callbacks
  }
}


