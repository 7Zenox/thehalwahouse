"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpoon } from "react-icons/fa6";
import Image from "next/image";
import { Halwa } from "../types";

interface HalwaMenuProps {
  halwaData: Record<string, Halwa>;
}

export default function HalwaMenu({ halwaData }: HalwaMenuProps) {
  const [currentHalwaIndex, setCurrentHalwaIndex] = useState(0);
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const halwaKeys = Object.keys(halwaData);
  const currentHalwa = halwaData[halwaKeys[currentHalwaIndex]];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Check if the menu section is visible
      const isVisible =
        scrollTop + viewportHeight > containerTop &&
        scrollTop < containerTop + containerHeight;

      setIsPaginationVisible(isVisible);

      // Calculate the active halwa index
      const perHalwaHeight = containerHeight / halwaKeys.length;
      const newIndex = Math.min(
        Math.max(Math.floor((scrollTop - containerTop) / perHalwaHeight), 0),
        halwaKeys.length - 1
      );

      if (newIndex !== currentHalwaIndex) {
        setCurrentHalwaIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentHalwaIndex, halwaKeys]);

  const handlePaginationClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollPosition = (index * container.scrollHeight) / halwaKeys.length + container.offsetTop;
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  };

  return (
    <div ref={scrollContainerRef} className="relative" style={{ height: `${halwaKeys.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`halwa-${currentHalwaIndex}`}
            className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* First Column: Name and Description */}
            <div className="flex items-center justify-center border-2 border-[#ba9256] p-6 rounded-t-full min-h-[75vh]">
              <div className="text-center">
                <h2 className="text-xl uppercase font-luloClean">{currentHalwa.name}</h2>
                <p className="text-lg mt-4 font-afacad">{currentHalwa.description}</p>
              </div>
            </div>

            {/* Second Column: Image */}
            <div className="relative w-full h-full rounded-3xl min-h-[75vh] flex items-center justify-center">
              <Image
                src={currentHalwa.path}
                alt={currentHalwa.name}
                fill
                className="rounded-3xl object-cover"
                priority
              />
            </div>

            {/* Third Column: Weight, Pricing, and Serves */}
            <div className="flex flex-col items-center justify-center border-2 border-[#ba9256] p-6 rounded-full min-h-[75vh]">
              {["small", "medium", "large"].map((size) => {
                const weightOption = currentHalwa[size as keyof Halwa];

                if (!weightOption) return null;

                return (
                  <div key={size} className="flex flex-col items-center my-6">
                    <div className="flex items-center justify-center gap-4">
                      <p className="font-bold font-luloCleanBold">{weightOption.weight}</p>
                      <div className="h-6 w-[2px] bg-[#ba9256]" />
                      <p className="font-luloClean">Rs. {weightOption.price}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 my-2">
                      {[...Array(size === "small" ? 1 : size === "medium" ? 2 : 3)].map((_, index) => (
                        <FaSpoon key={index} className="text-[#ba9256]" />
                      ))}
                      <p className="text-md font-afacad">Serves: {weightOption.serves}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 backdrop-blur-xl bg-black/30 px-6 py-4 rounded-full transition-opacity duration-300 flex justify-center space-x-4 ${isPaginationVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {halwaKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => handlePaginationClick(index)}
            className={`px-3 py-2 rounded-md font-afacad text-md transition-colors ${index === currentHalwaIndex
                ? "bg-gold text-gray-300 underline-offset-4 underline"
                : "bg-transparent text-gold hover:text-orange-200"
              }`}
          >
            {halwaData[key].name}
          </button>
        ))}
      </div>
    </div>
  );
}
