"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

import Aurora from "./components/Aurora";
import data from "./data";

const SquareChainNoSSR = dynamic(() => import("./components/SquareChain"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fixedContainerRef = useRef<HTMLDivElement>(null);
  const squareChainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLSpanElement>(null);
  const eatRef = useRef<HTMLSpanElement>(null);
  const repeatRef = useRef<HTMLSpanElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const halwaItemRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const numHalwa = Object.keys(data).length;
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);

  // durations in arbitrary units (e.g., seconds)
  const introDuration = 1;
  const halwaDuration = 2;
  const totalDuration = introDuration + numHalwa * halwaDuration;

  // Set the total scroll distance.
  useEffect(() => {
    setTotalScrollDistance(totalDuration * window.innerHeight);
  }, [numHalwa, totalDuration]);

  // Unlock videos on mobile via a user gesture.
  useEffect(() => {
    const unlockVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          // Try to play then immediately pause the video to unlock it.
          video
            .play()
            .then(() => {
              video.pause();
            })
            .catch((err) => {
              console.warn("Video unlock error:", err);
            });
        }
      });
    };

    // Listen for a user gesture (touch or click) once.
    document.addEventListener("touchstart", unlockVideos, { once: true });
    document.addEventListener("click", unlockVideos, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlockVideos);
      document.removeEventListener("click", unlockVideos);
    };
  }, []);

  // Initialize videos and the main GSAP timeline for text/overlays.
  useEffect(() => {
    if (!totalScrollDistance) return;

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
      },
    });

    tl.to(squareChainRef.current, { opacity: 0, duration: 0.2 })
      .to(aboutRef.current, { opacity: 1, duration: 0.2 }, "<")
      .to(aboutRef.current, { opacity: 0, duration: 0.2 })
      .to(heatRef.current, { opacity: 1, duration: 0.1 })
      .to(eatRef.current, { opacity: 1, duration: 0.1 })
      .to(repeatRef.current, { opacity: 1, duration: 0.1 })
      .to(
        [heatRef.current, eatRef.current, repeatRef.current],
        { opacity: 0, duration: 0.1 }
      )
      .to(auroraRef.current, { opacity: 0, duration: 0.4 });

    Object.entries(data).forEach(([, _], index) => {
      const startTime = introDuration + index * halwaDuration;
      tl.to(
        halwaItemRefs.current[index],
        { opacity: 1, duration: 0.2 },
        startTime + 0.25
      ).to(
        halwaItemRefs.current[index],
        { opacity: 0, duration: 0.2 },
        startTime + halwaDuration
      );
    });
  }, [totalScrollDistance]);

  // Global ScrollTrigger to drive video scrubbing.
  useEffect(() => {
    if (!totalScrollDistance) return;

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: `+=${totalScrollDistance}`,
      scrub: true,
      onUpdate: (self) => {
        const globalProgress = self.progress; // from 0 to 1

        // Map the global progress into each video's segment.
        Object.entries(data).forEach(([, _], index) => {
          const segmentStart =
            (introDuration + index * halwaDuration) / totalDuration;
          const segmentEnd =
            (introDuration + (index + 1) * halwaDuration) / totalDuration;
          const video = videoRefs.current[index];

          if (video && video.readyState >= 2) {
            if (globalProgress >= segmentStart && globalProgress <= segmentEnd) {
              const localProgress =
                (globalProgress - segmentStart) / (segmentEnd - segmentStart);
              video.style.opacity = "1";
              video.currentTime = video.duration * localProgress;
            } else {
              video.style.opacity = "0";
            }
          }
        });
      },
    });
  }, [totalScrollDistance, totalDuration]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Fixed full screen container */}
      <div
        ref={fixedContainerRef}
        className="fixed top-0 left-0 w-screen h-screen bg-black/80"
      >
        {/* Intro + Aurora */}
        <div className="absolute inset-0">
          <div ref={auroraRef} className="absolute inset-0">
            <Aurora />
          </div>
          <div ref={squareChainRef} className="squarechain">
            <SquareChainNoSSR />
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
            <span ref={heatRef} style={{ opacity: 0 }} className="text-[#ba9256]">
              HEAT.
            </span>
            <span ref={eatRef} style={{ opacity: 0 }} className="text-[#ba9256]">
              EAT.
            </span>
            <span ref={repeatRef} style={{ opacity: 0 }} className="text-[#ba9256]">
              REPEAT.
            </span>
          </div>
        </div>

        {/* Halwa Menu Section */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          {/* LEFT column: text items */}
          <div className="lg:w-1/2 w-full relative">
            {Object.entries(data).map(([key, item], index) => (
              <div
                key={key}
                ref={(el) => {
                  if (el) halwaItemRefs.current[index] = el;
                }}
                className="absolute inset-0 flex flex-col justify-start lg:justify-center items-start p-8 opacity-0 whitespace-normal break-words lg:pl-24"
              >
                <h2 className="text-[#ba9256] mt-4 font-luloCleanBold text-4xl lg:text-6xl">
                  {item.name}
                </h2>
                <p className="text-[#886a3e] mt-2 text-lg font-afacad lg:text-2xl">
                  {item.description}
                </p>
                {(item.small || item.medium || item.large) && (
                  <div className="mt-4 text-xl lg:text-2xl text-[#ba9256] w-full lg:pr-72 lg:mt-14">
                    {item.small && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center w-full font-luloCleanBold">
                          <span>{item.small.weight}</span>
                          <span className="font-luloClean">₹ {item.small.price}</span>
                        </div>
                        <p className="text-left font-afacad text-[#886a3e]">
                          Serves {item.small.serves}
                        </p>
                      </div>
                    )}
                    {item.medium && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center w-full font-luloCleanBold">
                          <span>{item.medium.weight}</span>
                          <span className="font-luloClean">₹ {item.medium.price}</span>
                        </div>
                        <p className="text-left font-afacad text-[#886a3e]">
                          Serves {item.medium.serves}
                        </p>
                      </div>
                    )}
                    {item.large && (
                      <div>
                        <div className="flex justify-between items-center w-full font-luloCleanBold">
                          <span>{item.large.weight}</span>
                          <span className="font-luloClean">₹ {item.large.price}</span>
                        </div>
                        <p className="text-left font-afacad text-[#886a3e]">
                          Serves {item.large.serves}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT column: video */}
          <div className="lg:w-1/2 w-full relative">
            {Object.entries(data).map(([key, item], index) => (
              <video
                key={key}
                ref={(el) => {
                  if (el && !videoRefs.current[index]) {
                    videoRefs.current[index] = el;
                  }
                }}
                className="absolute inset-0 object-cover opacity-0 -z-50"
                style={{ height: "100vh", width: "auto" }}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
              >
                <source src={item.path} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
      </div>

      {/* Extra scroll space for pinning */}
      <div style={{ height: `${totalScrollDistance}px` }}></div>

      {/* Order here button */}
      <button
        onClick={() =>
          window.open(
            "https://link.zomato.com/xqzv/rshare?id=9508801230563634",
            "_blank"
          )
        }
        className="fixed lg:bottom-8 lg:right-8 bottom-5 right-5 px-5 py-3 rounded-full font-luloCleanBold border border-[#ba9256] text-[#ba9256] lg:text-lg text-xs backdrop-blur-3xl hover:bg-white/10"
      >
        ORDER NOW
      </button>
    </div>
  );
}
