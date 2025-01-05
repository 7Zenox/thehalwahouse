// HalwaMenu.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpoon } from "react-icons/fa6";
import Image from "next/image";
import { Halwa } from "../types";

interface HalwaMenuProps {
  halwaData: Record<string, Halwa>;
  scrollToMenu?: () => void;
}

export default function HalwaMenu({ halwaData, scrollToMenu }: HalwaMenuProps) {
  const [currentHalwaIndex, setCurrentHalwaIndex] = useState(0);

  const halwaKeys = Object.keys(halwaData);
  const currentHalwa = halwaData[halwaKeys[currentHalwaIndex]];

  const handlePaginationClick = (index: number) => {
    setCurrentHalwaIndex(index);
    scrollToMenu?.();
  };

  return (
    <div className="relative min-h-screen bg-black">
      <div className="h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`halwa-${currentHalwaIndex}`}
            className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Column 1: Name + Description */}
            <div
              className="
                flex items-center justify-center
                border-[#ba9256]
                md:p-6 p-3
                md:rounded-t-full rounded-full
                min-h-[5vh] md:min-h-[75vh]
              "
            >
              <div className="text-center">
                {/* On mobile: text-sm, on desktop: text-xl */}
                <h2 className="uppercase font-luloClean text-sm md:text-xl">
                  {currentHalwa.name}
                </h2>
                {/* On mobile: text-sm, on desktop: text-lg */}
                <p className="md:mt-4 mt-1 font-afacad text-sm md:text-lg">
                  {currentHalwa.description}
                </p>
              </div>
            </div>

            {/* Column 2: Image */}
            <div
              className="
                relative w-full h-full
                rounded-3xl
                min-h-[30vh] md:min-h-[75vh]
                flex items-center justify-center
              "
            >
              <Image
                src={currentHalwa.path}
                alt={currentHalwa.name}
                fill
                className="rounded-3xl object-cover"
                priority
              />
            </div>

            {/* Column 3: Weight + Price + Serves */}
            <div
              className="
                flex flex-col items-center justify-center
                md:border-2 border-[#ba9256]
                p-6 
                md:rounded-full rounded-3xl
                min-h-[20vh] md:min-h-[75vh]
              "
            >
              {(["small", "medium", "large"] as const).map((size) => {
                const weightOption = currentHalwa[size];
                if (!weightOption || typeof weightOption === "string") return null;

                return (
                  <div key={size} className="flex flex-col items-center md:my-6 my-3">
                    <div className="flex items-center justify-center gap-4">
                      {/* Weight text: extra small on mobile, base on desktop */}
                      <p className="font-luloCleanBold font-bold text-[0.75rem] md:text-base">
                        {weightOption.weight}
                      </p>

                      <div className="h-6 w-[2px] bg-[#ba9256]" />

                      {/* Price text: extra small on mobile, base on desktop */}
                      <p className="font-luloClean text-[0.75rem] md:text-base">
                        Rs. {weightOption.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:my-6 my-1">
                      {[...Array(
                        size === "small"
                          ? 1
                          : size === "medium"
                          ? 2
                          : 3
                      )].map((_, index) => (
                        /* Spoons: smaller on mobile, bigger on desktop */
                        <FaSpoon
                          key={index}
                          className="text-[#ba9256] text-[0.7rem] md:text-xl"
                        />
                      ))}

                      {/* Serves text: even smaller on mobile, bigger on desktop */}
                      <p className="font-afacad text-[0.7rem] md:text-lg">
                        Serves: {weightOption.serves}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Buttons */}
      <div
        className="
          fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10
          bg-black/30 backdrop-blur-xl
          flex flex-wrap items-center justify-center
          w-[90vw] md:w-auto
          px-4 py-2 md:px-6 md:py-4
          gap-1 md:gap-4
          rounded-full
          overflow-x-auto
        "
      >
        {halwaKeys.map((key, index) => (
          <button
            key={key}
            onClick={() => handlePaginationClick(index)}
            className={`px-3 py-1/2 rounded-md font-afacad text-md transition-colors ${
              index === currentHalwaIndex
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
