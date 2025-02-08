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
  const footerRef = useRef<HTMLDivElement>(null);
  const orderNowContainerRef = useRef<HTMLDivElement>(null);
  const zomatoBtnRef = useRef<HTMLButtonElement>(null);
  const directOrderBtnRef = useRef<HTMLButtonElement>(null);
  const numHalwa = Object.keys(data).length;
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // durations in arbitrary units (relative to viewport height)
  const introDuration = 4;
  const halwaDuration = 2;
  const totalDuration = introDuration + numHalwa * halwaDuration;
  const footerDuration = 1; // one full viewport for the footer
  const newTotalDuration = totalDuration + footerDuration;

  // Set the total scroll distance including the footer.
  useEffect(() => {
    setTotalScrollDistance(newTotalDuration * window.innerHeight);
  }, [numHalwa, newTotalDuration]);

  // Unlock videos on mobile via a user gesture.
  useEffect(() => {
    const unlockVideos = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video
            .play()
            .then(() => video.pause())
            .catch((err) => console.warn("Video unlock error:", err));
        }
      });
    };

    document.addEventListener("touchstart", unlockVideos, { once: true });
    document.addEventListener("click", unlockVideos, { once: true });

    return () => {
      document.removeEventListener("touchstart", unlockVideos);
      document.removeEventListener("click", unlockVideos);
    };
  }, []);

  // Hide the popup when clicking outside of the order now container.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        orderNowContainerRef.current &&
        !orderNowContainerRef.current.contains(event.target as Node)
      ) {
        if (showPopup) {
          closePopup();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showPopup]);

  // Popup button handlers (defined only once):
  const handleDirectOrder = () => {
    window.open("https://wa.me/message/R6C63D5WNH7VA1", "_blank");
    closePopup();
  };

  const handleZomatoOrder = () => {
    window.open("https://link.zomato.com/xqzv/rshare?id=9508801230563634", "_blank");
    closePopup();
  };

  const closePopup = () => {
    // Fade out direct order first, then zomato with minimal delay (0.05s)
    gsap.to(directOrderBtnRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
    });
    gsap.to(zomatoBtnRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      delay: 0.10,
      onComplete: () => setShowPopup(false),
    });
  };

  const togglePopup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (showPopup) {
      closePopup();
    } else {
      setShowPopup(true);
    }
  };

  // Animate popup buttons on open.
  useEffect(() => {
    if (showPopup) {
      // On open, fade in Direct Order first, then Zomato with a minimal delay of 0.05s.
      gsap.fromTo(
        directOrderBtnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2 }
      );
      gsap.fromTo(
        zomatoBtnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.2, delay: 0.05 }
      );
    }
  }, [showPopup]);

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
      .to(aboutRef.current, { opacity: 1, duration: 1 }) // hold the about text for an extra time unit
      .to(aboutRef.current, { opacity: 0, duration: 0.2 })
      .to(heatRef.current, { opacity: 1, duration: 0.1 })
      // Delay before "EAT" appears:
      .to(eatRef.current, { opacity: 1, duration: 0.1 }, "+=0.5")
      // Delay before "REPEAT" appears:
      .to(repeatRef.current, { opacity: 1, duration: 0.1 }, "+=0.5")
      .to(
        [heatRef.current, eatRef.current, repeatRef.current],
        { opacity: 0, duration: 0.1 },
        "+=0.5"
      )
      .to(auroraRef.current, { opacity: 0, duration: 0.4 });

    // Animate halwa text items.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const globalProgress = self.progress; // value from 0 to 1
        // Only update videos during the halwa section.
        const halwaSectionFraction = totalDuration / newTotalDuration;
        if (globalProgress < halwaSectionFraction) {
          // Map global progress into a "halwa progress" value (0–1) for this section.
          const halwaProgress = globalProgress * (newTotalDuration / totalDuration);

          // For each video, calculate its segment boundaries.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(data).forEach(([, _], index) => {
            const segmentStart =
              (introDuration + index * halwaDuration) / totalDuration;
            const segmentEnd =
              (introDuration + (index + 1) * halwaDuration) / totalDuration;
            const video = videoRefs.current[index];

            if (video && video.readyState >= 2) {
              if (halwaProgress >= segmentStart && halwaProgress <= segmentEnd) {
                const localProgress =
                  (halwaProgress - segmentStart) / (segmentEnd - segmentStart);
                video.style.opacity = "1";
                video.currentTime = video.duration * localProgress;
              } else {
                video.style.opacity = "0";
              }
            }
          });
        } else {
          // After the halwa section, hide all videos.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(data).forEach(([, _], index) => {
            const video = videoRefs.current[index];
            if (video) {
              video.style.opacity = "0";
            }
          });
        }
      },
    });
  }, [totalScrollDistance, totalDuration, newTotalDuration]);

  // New timeline to crossfade: fade out the fixed halwa container and fade in the footer.
  useEffect(() => {
    if (!totalScrollDistance) return;
    const vh = window.innerHeight;
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: `${totalDuration * vh}px top`,
        end: `+=${footerDuration * vh}`,
        scrub: true,
      },
    })
      .to(fixedContainerRef.current, { opacity: 0, ease: "none" })
      .fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        "<"
      );
  }, [totalScrollDistance, totalDuration, footerDuration]);

  // New ScrollTrigger to disable pointer events on the fixed container when in the footer.
  useEffect(() => {
    const vh = window.innerHeight;
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: `${totalDuration * vh}px top`,
      end: `+=${footerDuration * vh}`,
      onEnter: () => {
        if (fixedContainerRef.current) {
          fixedContainerRef.current.style.pointerEvents = "none";
        }
      },
      onLeaveBack: () => {
        if (fixedContainerRef.current) {
          fixedContainerRef.current.style.pointerEvents = "auto";
        }
      },
    });
  }, [totalScrollDistance, totalDuration, footerDuration]);

  return (
    <div ref={wrapperRef} className="relative overflow-x-hidden">
      {/* Fixed full screen container for intro, halwa menu, videos, etc. */}
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
                  <div className="mt-4 text-xl lg:text-2xl text-[#ba9256] w-full md:pr-96 lg:pr-72 lg:mt-14">
                    {item.small && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center w-full font-luloCleanBold">
                          <span>{item.small.weight}</span>
                          <span className="font-luloClean">
                            ₹ {item.small.price}
                          </span>
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
                          <span className="font-luloClean">
                            ₹ {item.medium.price}
                          </span>
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
                          <span className="font-luloClean">
                            ₹ {item.large.price}
                          </span>
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

      {/* Extra scroll space for pinning (includes halwa section + footer) */}
      <div style={{ height: `${totalScrollDistance}px` }}></div>

      {/* FOOTER: A full-page footer scrolled to at the end with background image */}
      <footer
        ref={footerRef}
        className="pt-24 w-screen h-screen flex flex-col justify-start items-center text-[#ba9256] text-center p-8 opacity-0 bg-cover bg-center bg-no-repeat bg-[url('/footer_mob.webp')] lg:bg-[url('/footer.webp')]"
      >
        <p className="font-luloCleanBold"> Contact Us: </p>
        <p className="font-afacad underline mb-8">
          <a href="tel:+918700309220" className="hover:underline">
            +91 87003 09220
          </a>
        </p>
        <p className="font-luloCleanBold"> Price disclaimer: </p>
        <p className="font-afacad mb-8"> Prices exclude tax and delivery </p>
        <p className="font-afacad">
          Established in 2021, <br /> Gurgaon, Haryana
        </p>
      </footer>

      {/* Order Now button container and popup */}
      <div
        ref={orderNowContainerRef}
        className="fixed lg:bottom-8 lg:right-8 bottom-5 right-5"
      >
        <button
          onClick={togglePopup}
          className="px-5 py-3 rounded-full font-luloCleanBold border border-[#ba9256] text-[#ba9256] lg:text-lg text-xs backdrop-blur-3xl hover:bg-white/10"
        >
          ORDER NOW
        </button>
        {showPopup && (
          <div className="absolute bottom-full mb-2 right-0 w-full flex flex-col space-y-2 items-end">
            <button
              ref={zomatoBtnRef}
              onClick={handleZomatoOrder}
              className="w-5/6 px-5 py-3 rounded-full font-afacad border border-[#ba9256] text-[#ba9256] lg:text-lg text-xs backdrop-blur-3xl hover:bg-white/10"
            >
              ZOMATO
            </button>
            <button
              ref={directOrderBtnRef}
              onClick={handleDirectOrder}
              className="w-5/6 px-5 py-3 rounded-full font-afacad border border-[#ba9256] text-[#ba9256] lg:text-lg text-xs backdrop-blur-3xl hover:bg-white/10"
            >
              DIRECT ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
