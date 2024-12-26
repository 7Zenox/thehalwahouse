"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HalwaMenu from "./components/HalwaMenu";
import FeaturesGrid from "./components/BentoFeatures";
import { Halwa } from "./types";

export default function HalwaPage() {
  const [halwaData, setHalwaData] = useState<Record<string, Halwa> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setHalwaData(data);

      // Preload images
      (Object.values(data) as Halwa[]).forEach((halwa) => {
        const img = new window.Image();
        img.src = halwa.path;
      });

      // Simulate loading time and fade out loading screen
      setTimeout(() => setIsLoading(false), 1000);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar as soon as the user starts scrolling
      setIsNavbarVisible(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#ba9256] relative">
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
              <video
                className="w-32 h-32"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/assets/cooking.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <p className="text-xl font-anton">Cooking...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-10 backdrop-blur-xl bg-black/30 text-[#ba9256] px-6 py-4 flex justify-between items-center transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-4xl font-anton">thehalwahouse</h1>
        <p className="text-sm font-luloClean">EXOTIC HOMEMADE HALWAS</p>
      </div>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <div className="relative h-screen bg-black">
              <div className="absolute top-0 w-full h-[70vh]">
                <Image
                  src={"/assets/hero.JPG"}
                  alt="Hero"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-none"
                  priority
                />
              </div>
              <motion.div
                className="absolute bottom-40 left-10 flex space-x-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.5,
                    },
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
            </div>

            {/* Halwa Menu Section */}
            {halwaData && <HalwaMenu halwaData={halwaData} />}

            {/* Features Grid Section */}
            <FeaturesGrid />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
