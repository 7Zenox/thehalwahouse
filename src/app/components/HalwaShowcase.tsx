// components/HalwaShowcase.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function HalwaShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    Object.values(data).forEach((_, index) => {
      const video = videoRefs.current[index];
      const text = textRefs.current[index];

      if (video && text) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: video,
            start: "top center",
            end: "bottom center",
            scrub: true,
            pin: true,
            onUpdate: (self) => {
              if (video.duration) {
                video.currentTime = video.duration * self.progress;
              }
            },
          },
        });

        tl.to(text, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5")
          .to(text, { opacity: 0, duration: 1, ease: "power2.out" }, "+=1");
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-screen bg-black">
      {Object.entries(data).map(([key, item], index) => (
        <div key={key} className="relative h-screen flex justify-center items-center">
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el!)}
            src={item.path}
            className="absolute max-h-screen w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />

          {/* Text Overlay */}
          <div
            ref={(el) => (textRefs.current[index] = el!)}
            className="absolute text-center text-white text-4xl opacity-0 transition-opacity duration-500"
          >
            <h2 className="text-[#ba9256] font-bold lg:text-6xl">{item.name}</h2>
            <p className="lg:text-2xl mt-4">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
