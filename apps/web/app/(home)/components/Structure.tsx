"use client";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { Features } from "./Features";
import { Header } from "./Header";
import { Hero } from "./Hero";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function Structure() {

  return (
    <>
      <Header disableAnimation="" />
      <Hero />
      <Features />
    </>
  );
}
