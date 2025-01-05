"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HalwaMenu from "./components/HalwaMenu";
import FeaturesGrid from "./components/BentoFeatures";
import data from "./assets/data";
import { Halwa } from "./types";

export default function HalwaPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);

  // Refs to track the hero and menu sections
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Define scrollToMenu here
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* Preload images & simulate loading */
  useEffect(() => {
    Object.values(data).forEach((halwa: Halwa) => {
      const img = new window.Image();
      img.src = halwa.path;
    });
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // ... IntersectionObservers for Hero & Menu (unchanged) ...
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsNavbarVisible(false);
        else setIsNavbarVisible(true);
      });
    }, { threshold: 0.7 });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsPaginationVisible(true);
        else setIsPaginationVisible(false);
      });
    }, { threshold: 0.7 });
    observer.observe(menuRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-[#ba9256]">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <video className="w-32 h-32" autoPlay loop muted playsInline>
                <source src="/cooking.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <p className="text-xl font-luloCleanBold">Cooking...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-10 backdrop-blur-xl bg-black/30 text-[#ba9256]
          px-6 py-4 flex justify-between items-center transition-transform duration-300
          ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <h1 className="text-4xl font-anton">thehalwahouse</h1>
        <p className="text-sm font-luloClean">EXOTIC HOMEMADE HALWAS</p>
      </div>

      {/* Snap-Scroll Container */}
      <div className="snap-y snap-mandatory overflow-y-scroll h-full">
        {/* Hero Section */}
        <section ref={heroRef} className="snap-start h-screen relative bg-black">
          <div className="absolute top-0 w-full h-[70vh]">
            <Image
              src="/hero.jpg"
              alt="Hero"
              layout="fill"
              objectFit="cover"
              className="rounded-none"
              priority
            />
          </div>

          {/* HEAT EAT REPEAT animation only after loading */}
          {!isLoading && (
            <motion.div
              className="absolute bottom-40 left-10 flex space-x-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.5 },
                },
              }}
            >
              {["HEAT.", "EAT.", "REPEAT."].map((word, index) => (
                <motion.div
                  key={index}
                  className="text-[#ba9256] text-5xl font-luloCleanBold uppercase"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Halwa Menu Section */}
        <section ref={menuRef} className="snap-start h-screen">
          {/* Pass scrollToMenu as a prop so HalwaMenu can call it */}
          <HalwaMenu halwaData={data} scrollToMenu={scrollToMenu} />
        </section>

        {/* Features Section */}
        <section className="snap-start h-screen">
          <FeaturesGrid />
        </section>
      </div>

      {/* Pagination shown only when menu section is in view */}
      {isPaginationVisible && (
        <div className="pagination">
          {/* Your pagination here */}
        </div>
      )}

      {/* "Order Here" Button */}
      <div
        className="
          fixed bottom-4 right-4 z-10
          px-6 py-4
          bg-[rgba(0,0,0,0.3)]
          backdrop-filter
          backdrop-blur-[10px]
          border
          border-[#ba9256]
          rounded-full
        "
      >
        <a
          href="https://link.zomato.com/xqzv/rshare?id=9508801230563634"
          target="_blank"
          rel="noopener noreferrer"
          className="font-luloCleanBold text-md transition-colors bg-transparent text-gold hover:text-orange-200 px-3 py-2 rounded-md"
        >
          order here
        </a>
      </div>
    </div>
  );
}
