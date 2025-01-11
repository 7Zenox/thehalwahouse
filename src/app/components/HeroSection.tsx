"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function HeroSection() {
  useEffect(() => {
    gsap.registerPlugin();

    // Animate "Heat. Eat. Repeat." under hero image on render
    const introTimeline = gsap.timeline();
    introTimeline
      .fromTo(
        ".word-heat",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.5 }
      )
      .fromTo(
        ".word-eat",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        "+=0.2"
      )
      .fromTo(
        ".word-repeat",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5 },
        "+=0.2"
      );
  }, []);

  return (
    <section id="hero" className="section section-1 h-screen relative w-[85%] ml-auto">
      <div className="w-full h-[80%]">
        <img
          src="/hero.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-28 left-0 text-left text-2xl md:text-4xl font-luloCleanBold text-[#ba9256] flex gap-2">
        <span className="word-heat">Heat.</span>
        <span className="word-eat">Eat.</span>
        <span className="word-repeat">Repeat.</span>
      </div>
    </section>
  );
}
