"use client";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { Features } from "./Features";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
interface propType{
  session?: {
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    };
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
           } | null
}
export function Structure({session}:propType) {
  return (
    <>
      <Header disableAnimation="" session={session} />
      <Hero />
      <Features />
      <Footer/>
    </>
  );
}
