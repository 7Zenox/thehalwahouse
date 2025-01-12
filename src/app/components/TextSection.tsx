"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function TextSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in "the" and "art" with small delay
    const introTimeline = gsap.timeline();
    introTimeline
      .fromTo(".word-the", { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(".word-art", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "+=0.2");

    // Section 1 Animation - Fade out "art" and fly up "halwa"
    const section2Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-2",
        start: "top 70%",
        end: "top top",
        scrub: true,
      },
    });
    section2Timeline
      .to(".word-art", { opacity: 0, duration: 0.3 })
      .fromTo(".word-halwa", { y: "100vh", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8 })
      .fromTo(
        ".phrase-for-days",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

    // Section 2 - Fade out "for days"
    gsap.to(".phrase-for-days", {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".section-3",
        start: "top 95%",
        end: "top 50%",
        scrub: true,
      },
    });

    // Section 3 Animation - Fly up "house" and fade in "that feels like home"
    const section3Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-3",
        start: "top 60%",
        end: "top top",
        scrub: true,
      },
    });
    section3Timeline
      .fromTo(".word-house", { y: "100vh", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8 })
      .fromTo(
        ".phrase-home",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );
  }, []);

  return (
    <div className="fixed top-0 left-0 w-[15%] h-screen bg-black text-white flex flex-col justify-start p-4 border-2">
      <div className="text-4xl font-bold leading-none">
        {/* "the" */}
        <div className="relative">
          <span className="word-the font-anton text-[#ba9256]">the</span>
          <span className="absolute top-0 left-12 ml-2 word-art font-anton text-gray-200">
            art of tradition
          </span>
        </div>

        {/* "halwa" */}
        <div className="relative">
          <span className="word-halwa font-anton text-[#ba9256]">halwa</span>
          <span className="absolute top-0 left-24 phrase-for-days font-anton text-gray-200">
            for everyone
          </span>
        </div>

        {/* "house" */}
        <div className="relative">
          <span className="word-house font-anton text-[#ba9256]">house</span>
          <span className="absolute top-0 left-24 phrase-home font-anton text-gray-200">
            of values, purity & love
          </span>
        </div>
      </div>
    </div>
  );
}
