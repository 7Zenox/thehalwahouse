// page.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SquareChain from "./components/SquareChain";
import data from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  // Wrapper ref that holds the fixed content and the spacer.
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Ref for our fixed content container.
  const fixedContainerRef = useRef<HTMLDivElement>(null);

  // Refs for the intro elements.
  const squareChainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLSpanElement>(null);
  const eatRef = useRef<HTMLSpanElement>(null);
  const repeatRef = useRef<HTMLSpanElement>(null);

  // Refs for the halwa items.
  const halwaItemRefs = useRef<HTMLDivElement[]>([]);

  // Calculate the number of halwa items.
  const numHalwa = Object.keys(data).length;
  // Total scroll distance = 100vh for intro + 100vh for each halwa item.
  const totalScrollDistance = (1 + numHalwa) * window.innerHeight;

  useEffect(() => {
    // Create one unified timeline that drives the entire animation.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        scrub: true,
        pin: false, // We're not pinning the wrapper here because our fixed container is always visible.
        markers: true, // Remove or set to false after debugging.
      },
    });

    // --- Intro Animations (first 100vh) ---
    tl.to(squareChainRef.current, { opacity: 0, duration: 1, ease: "power2.out" })
      .to(aboutRef.current, { opacity: 1, duration: 1, ease: "power2.out" }, "<")
      .to(aboutRef.current, { opacity: 0, duration: 1, ease: "power2.out" })
      // Fade in each word sequentially.
      .to(heatRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(eatRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(repeatRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" })
      // Once we scroll past the words, fade them out together.
      .to([heatRef.current, eatRef.current, repeatRef.current], { opacity: 0, duration: 0.5, ease: "power2.out" });

    // --- Halwa Items Animations ---
    Object.entries(data).forEach(([, item], index) => {
      // Each halwa item gets 100vh of scroll.
      // Animate: fade in over 1 second, then fade out over 1 second.
      tl.to(halwaItemRefs.current[index], { opacity: 1, duration: 1, ease: "power2.out" })
        .to(halwaItemRefs.current[index], { opacity: 0, duration: 1, ease: "power2.out" });
    });
  }, [numHalwa, totalScrollDistance]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Fixed Container: Always visible in the viewport */}
      <div ref={fixedContainerRef} className="fixed top-0 left-0 w-screen h-screen bg-black">
        {/* Intro Section */}
        <div className="absolute inset-0">
          <div ref={squareChainRef} className="squarechain">
            <SquareChain />
          </div>
          <div
            ref={aboutRef}
            style={{ opacity: 0 }}
            className="absolute inset-0 flex justify-center items-center p-8 text-white text-xl lg:m-56"
          >
            <p className="font-afacad text-[#ba9256]">
              We craft homemade halwas that blend tradition with unique flavors,
              delivering an authentic and delightful experience in every bite.
              Meticulously prepared for quality and taste for you to...
            </p>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white lg:text-8xl gap-4 text-4xl font-luloCleanBold">
            <span ref={heatRef} style={{ opacity: 0 }} className="text-[#ba9256]">HEAT.</span>
            <span ref={eatRef} style={{ opacity: 0 }} className="text-[#ba9256]">EAT.</span>
            <span ref={repeatRef} style={{ opacity: 0 }} className="text-[#ba9256]">REPEAT.</span>
          </div>
        </div>

        {/* Halwa Showcase Section (split viewport in half) */}
        <div className="absolute inset-0 flex">
          {/* Left Half: Render halwa items one at a time */}
          <div className="w-1/2 relative">
            {Object.entries(data).map(([key, item], index) => (
              <div
                key={key}
                ref={(el) => {
                  if (el) halwaItemRefs.current[index] = el;
                }}
                // Debug styles: red border and light blue background.
                className="absolute inset-0 flex flex-col justify-center items-start pl-8 opacity-0 border border-red-500 bg-blue-100"
              >
                <h2 className="text-[#ba9256] font-bold text-4xl lg:text-6xl">
                  {item.name}
                </h2>
                <p className="mt-4 text-xl lg:text-2xl text-white">{item.description}</p>
                {(item.small || item.medium || item.large) && (
                  <div className="mt-4">
                    <h3 className="text-white font-semibold text-xl">Sizes:</h3>
                    {item.small && (
                      <p className="text-white">
                        Small: {item.small.weight}, Price: {item.small.price}, Serves: {item.small.serves}
                      </p>
                    )}
                    {item.medium && (
                      <p className="text-white">
                        Medium: {item.medium.weight}, Price: {item.medium.price}, Serves: {item.medium.serves}
                      </p>
                    )}
                    {item.large && (
                      <p className="text-white">
                        Large: {item.large.weight}, Price: {item.large.price}, Serves: {item.large.serves}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Right Half: Remains empty */}
          <div className="w-1/2"></div>
        </div>
      </div>

      {/* Spacer element to drive scrolling */}
      <div style={{ height: `${totalScrollDistance}px` }}></div>
    </div>
  );
}
