"use client";

import { useRef } from "react";
import TextSection from "./components/TextSection";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white">
      {/* Top-left text */}
      <TextSection />

      {/* Sections */}
      <div>
        <HeroSection />
        <section className="section section-2 h-screen relative">
          <div className="absolute right-0 w-[85%] h-full bg-black/20 text-white flex items-center justify-center">
            <MenuSection />
          </div>
        </section>
        <section className="section section-3 h-screen relative">
          <div className="absolute right-0 w-[85%] h-full bg-black/20 text-white flex items-center justify-center">
            <h1 className="text-6xl font-bold">Section 3</h1>
          </div>
        </section>
      </div>
    </div>
  );
}
