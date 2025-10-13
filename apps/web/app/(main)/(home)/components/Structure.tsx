"use client";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { Features } from "./Features";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { User } from "next-auth";

interface StructureProps {
  authData?: User | null;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function Structure({ authData }: StructureProps) {
  return (
    <>
      <Header disableAnimation="" authData={authData} />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
