"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SquareChain from "./components/SquareChain";
import data from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const squareChainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLSpanElement>(null);
  const eatRef = useRef<HTMLSpanElement>(null);
  const repeatRef = useRef<HTMLSpanElement>(null);

  const halwaItemRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const numHalwa = Object.keys(data).length;
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);

  const introDuration = 1;
  const halwaDuration = 2;

  useEffect(() => {
    // Calculate total scroll distance
    setTotalScrollDistance(
      (introDuration + numHalwa * halwaDuration) * window.innerHeight
    );
  }, [numHalwa]);

  useEffect(() => {
    if (!totalScrollDistance) return;

    // Reset videos
    videoRefs.current.forEach((video) => {
      if (video) {
        video.currentTime = 0;
        video.pause();
        video.onloadedmetadata = () => ScrollTrigger.refresh();
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        scrub: true,
        pin: false,
        markers: true,
      },
    });

    // Intro animations
    tl.to(squareChainRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
      .to(aboutRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" }, "<")
      .to(aboutRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
      .to(heatRef.current, { opacity: 1, duration: 0.1, ease: "power2.out" })
      .to(eatRef.current, { opacity: 1, duration: 0.1, ease: "power2.out" })
      .to(repeatRef.current, { opacity: 1, duration: 0.1, ease: "power2.out" })
      .to([heatRef.current, eatRef.current, repeatRef.current], {
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      });

    // Halwa fade in/out
    Object.entries(data).forEach(([, item], index) => {
      const startTime = introDuration + index * halwaDuration;
      tl.to(
        halwaItemRefs.current[index],
        { opacity: 1, duration: 0.2, ease: "power2.out" },
        startTime + 0.25
      ).to(
        halwaItemRefs.current[index],
        { opacity: 0, duration: 0.2, ease: "power2.out" },
        startTime + 2
      );
    });
  }, [totalScrollDistance]);

  // Per-item ScrollTriggers for video scrubbing
  useEffect(() => {
    if (!totalScrollDistance) return;
    const vh = window.innerHeight;

    Object.entries(data).forEach(([, item], index) => {
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: `${(introDuration + index * halwaDuration) * vh} top`,
        end: `${(introDuration + index * halwaDuration + halwaDuration) * vh} top`,
        scrub: true,
        markers: true,
        onEnter: () => {
          videoRefs.current[index].style.opacity = "1";
          videoRefs.current.forEach((v, i) => {
            if (i !== index) v.style.opacity = "0";
          });
        },
        onEnterBack: () => {
          videoRefs.current[index].style.opacity = "1";
          videoRefs.current.forEach((v, i) => {
            if (i !== index) v.style.opacity = "0";
          });
        },
        onLeave: () => {
          videoRefs.current[index].style.opacity = "0";
        },
        onLeaveBack: () => {
          videoRefs.current[index].style.opacity = "0";
        },
        onUpdate: (self) => {
          const video = videoRefs.current[index];
          if (video && video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        },
      });
    });
  }, [totalScrollDistance]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Fixed full screen container */}
      <div
        ref={fixedContainerRef}
        className="fixed top-0 left-0 w-screen h-screen bg-black"
      >
        {/* Intro stuff */}
        <div className="absolute inset-0">
          <div ref={squareChainRef} className="squarechain">
            <SquareChain />
          </div>
          <div
            ref={aboutRef}
            style={{ opacity: 0 }}
            className="absolute inset-0 flex justify-center items-center p-8 text-white text-xl lg:m-56"
          >
            <p className="font-afacad text-[#ba9256] lg:text-5xl text-3xl">
              We craft homemade halwas that blend tradition with modernization,
              delivering an authentic and delightful experience in every bite.
              Meticulously prepared for quality and taste for you to...
            </p>
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white lg:text-9xl gap-4 text-5xl font-luloCleanBold">
            <span
              ref={heatRef}
              style={{ opacity: 0 }}
              className="text-[#ba9256]"
            >
              HEAT.
            </span>
            <span
              ref={eatRef}
              style={{ opacity: 0 }}
              className="text-[#ba9256]"
            >
              EAT.
            </span>
            <span
              ref={repeatRef}
              style={{ opacity: 0 }}
              className="text-[#ba9256]"
            >
              REPEAT.
            </span>
          </div>
        </div>

        {/* 
          Halwa section: 
          - On desktop, two columns 
          - On mobile, stack them, 
            with video behind the text overlay 
        */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          {/* LEFT COLUMN (Text on desktop) 
              On mobile, this becomes an absolute overlay 
          */}
          <div
            className={`
              // Normal half on desktop:
              lg:w-1/2 
              lg:relative

              // On mobile, fill entire screen & overlay
              w-full
              absolute
              inset-0
              z-10

              // We only want it "absolute" below lg:
              lg:static
            `}
          >
            {/* Each item absolutely placed (for fade in/out) 
                inside this half on desktop, 
                or covering the screen on mobile 
            */}
            {Object.entries(data).map(([key, item], index) => (
              <div
                key={key}
                ref={(el) => {
                  if (el) halwaItemRefs.current[index] = el;
                }}
                className="
                  absolute 
                  inset-0 
                  flex 
                  flex-col 
                  justify-center 
                  items-start 
                  p-8 
                  opacity-0
                  whitespace-normal 
                  break-words
                "
              >
                <h2 className="text-[#ba9256] font-bold text-4xl lg:text-6xl">
                  {item.name}
                </h2>
                <p className="mt-4 text-xl lg:text-2xl text-white">
                  {item.description}
                </p>
                {(item.small || item.medium || item.large) && (
                  <div className="mt-4">
                    <h3 className="text-white font-semibold text-xl">
                      Sizes:
                    </h3>
                    {item.small && (
                      <p className="text-white">
                        Small: {item.small.weight}, Price: {item.small.price},
                        Serves: {item.small.serves}
                      </p>
                    )}
                    {item.medium && (
                      <p className="text-white">
                        Medium: {item.medium.weight}, Price:{" "}
                        {item.medium.price}, Serves: {item.medium.serves}
                      </p>
                    )}
                    {item.large && (
                      <p className="text-white">
                        Large: {item.large.weight}, Price: {item.large.price},
                        Serves: {item.large.serves}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN (Video on desktop) 
              On mobile, this is the first stacked item, 
              filling screen behind the absolute text
          */}
          <div
            className={`
              lg:w-1/2 
              w-full 
              relative
            `}
          >
            {Object.entries(data).map(([key, item], index) => (
              <video
                key={key}
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                src={item.path}
                className="absolute inset-0 object-cover opacity-0"
                style={{ height: "100vh", width: "auto" }}
                muted
                playsInline
                preload="auto"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll spacer */}
      <div style={{ height: `${totalScrollDistance}px` }}></div>
    </div>
  );
}
