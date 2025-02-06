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
  const halwaShowcaseRef = useRef<HTMLDivElement>(null);
  const squareChainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<HTMLSpanElement>(null);
  const eatRef = useRef<HTMLSpanElement>(null);
  const repeatRef = useRef<HTMLSpanElement>(null);
  const halwaItemRefs = useRef<HTMLDivElement[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const numHalwa = Object.keys(data).length;
  const [videoDurations, setVideoDurations] = useState<number[]>([]);
  const [halwaScrollDistances, setHalwaScrollDistances] = useState<number[]>([]);
  const [totalScrollDistance, setTotalScrollDistance] = useState<number>(0);
  const [scrollMultiplier, setScrollMultiplier] = useState<number>(0);

  useEffect(() => {
    setScrollMultiplier(window.innerHeight / 5);
  }, []);

  const handleLoadedMetadata = (index: number, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const duration = event.currentTarget.duration;
    setVideoDurations((prev) => {
      const newDurations = [...prev];
      newDurations[index] = duration;
      return newDurations;
    });
  };

  useEffect(() => {
    if (videoDurations.filter((d) => d !== undefined).length !== numHalwa) {
      const fallbackDuration = 10;
      const distances = Array(numHalwa).fill(fallbackDuration * scrollMultiplier);
      setHalwaScrollDistances(distances);
      const introScroll = window.innerHeight;
      const total = introScroll + distances.reduce((sum, d) => sum + d, 0);
      setTotalScrollDistance(total);
      return;
    }
    const distances = videoDurations.map((duration) => duration * scrollMultiplier);
    setHalwaScrollDistances(distances);
    const introScroll = window.innerHeight;
    const total = introScroll + distances.reduce((sum, d) => sum + d, 0);
    setTotalScrollDistance(total);
  }, [videoDurations, numHalwa, scrollMultiplier]);

  useEffect(() => {
    if (totalScrollDistance === 0) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        scrub: true,
        markers: true
      }
    });
    tl.to(squareChainRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" })
      .to(aboutRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "<")
      .to(aboutRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" })
      .to(heatRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      .to(eatRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      .to(repeatRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
      .to([heatRef.current, eatRef.current, repeatRef.current], { opacity: 0, duration: 0.25, ease: "power2.out" })
      .to(halwaShowcaseRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
    halwaScrollDistances.forEach((segmentDistance, index) => {
      const fadeVideoIn = segmentDistance * 0.2;
      const fadeTextIn = segmentDistance * 0.1;
      const textVisible = segmentDistance * 0.4;
      const fadeTextOut = segmentDistance * 0.1;
      const fadeVideoOut = segmentDistance * 0.2;
      tl.to(videoRefs.current[index], { opacity: 1, duration: fadeVideoIn, ease: "power2.out" })
        .to(halwaItemRefs.current[index], { opacity: 1, duration: fadeTextIn, ease: "power2.out" }, ">")
        .to(halwaItemRefs.current[index], { opacity: 0, duration: fadeTextOut, ease: "power2.out" }, `+=${textVisible}`)
        .to(videoRefs.current[index], { opacity: 0, duration: fadeVideoOut, ease: "power2.out" }, `+=${fadeTextOut}`);
    });
  }, [totalScrollDistance, halwaScrollDistances]);

  useEffect(() => {
    if (totalScrollDistance === 0) return;
    let cumulativeScroll = window.innerHeight;
    halwaScrollDistances.forEach((segmentDistance, index) => {
      const start = cumulativeScroll;
      const end = cumulativeScroll + segmentDistance;
      cumulativeScroll = end;
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: `${start}px top`,
        end: `${end}px top`,
        scrub: true,
        onUpdate: (self) => {
          const video = videoRefs.current[index];
          if (video && video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        }
      });
    });
  }, [totalScrollDistance, halwaScrollDistances]);

  return (
    <div ref={wrapperRef} className="relative">
      <div ref={fixedContainerRef} className="fixed top-0 left-0 w-screen h-screen bg-black">
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
        <div
          ref={halwaShowcaseRef}
          style={{ opacity: 0 }}
          className="absolute inset-0 flex"
        >
          <div className="w-1/2 relative">
            {Object.entries(data).map(([key, item], index) => (
              <div
                key={key}
                ref={(el) => {
                  if (el) halwaItemRefs.current[index] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center items-start pl-8 opacity-0"
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
          <div className="w-1/2 relative">
            {Object.entries(data).map(([key, item], index) => (
              <video
                key={key}
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                src={item.path}
                className="absolute inset-0 object-cover opacity-0"
                style={{ height: "100vh", width: "auto" }}
                muted
                playsInline
                autoPlay
                preload="auto"
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: `${totalScrollDistance}px` }}></div>
      {totalScrollDistance === 0 && (
        <div className="fixed top-0 left-0 p-4 text-white">
          Calculating scroll height...
        </div>
      )}
    </div>
  );
}
