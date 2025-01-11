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
      {/* Outer wrapper */}
      <div className="h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`halwa-${currentHalwaIndex}`}
            className={`
              container mx-auto
              px-0 md:px-4
              py-12
              /* 
                Single column on mobile, 3 columns on desktop.
                We reduce the horizontal gap on mobile with gap-x-1 
                while preserving md:gap-8 on desktop.
              */
              grid
              grid-cols-1 md:grid-cols-3
              gap-y-4 md:gap-y-8
              gap-x-1 md:gap-x-8
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/*
              MOBILE ORDER:
                1) Image (order-1)
                2) Name+Description (order-2)
                3) Weight+Price+Serves (order-3)
              
              DESKTOP ORDER:
                1) Name+Description
                2) Image
                3) Weight+Price+Serves
            */}

            {/* Column 2: Image => First on mobile, second on desktop */}
            <div
              className="
                order-1 md:order-2
                relative w-full
                h-[60vh] md:h-auto
                rounded-none md:rounded-3xl
                flex items-center justify-center
              "
            >
              <Image
                src={currentHalwa.path}
                alt={currentHalwa.name}
                fill
                priority
                className="
                  object-cover
                  rounded-none md:rounded-3xl
                "
              />
            </div>

            {/* Column 1: Name + Description => Second on mobile, first on desktop */}
            <div
              className="
                order-2 md:order-1
                flex items-center justify-center
                md:border-2 border-[#ba9256] border-2
                md:p-6 p-3
                md:rounded-t-full rounded-full
                min-h-[5vh] md:min-h-[75vh]
              "
            >
              <div className="text-center">
                <h2 className="uppercase font-luloClean text-sm md:text-xl">
                  {currentHalwa.name}
                </h2>
                <p className="md:mt-4 mt-1 font-afacad text-sm md:text-lg">
                  {currentHalwa.description}
                </p>
              </div>
            </div>

            {/* Column 3: Weight + Price + Serves => Third on both mobile & desktop */}
            <div
              className="
                order-3 md:order-3
                pb-12 md:p-6
                border-2 md:border-2 border-[#ba9256]
                md:rounded-full rounded-3xl
                min-h-[20vh] md:min-h-[75vh]
                flex flex-col items-center justify-center
              "
            >
              {(["small", "medium", "large"] as const).map((size, idx) => {
                const weightOption = currentHalwa[size];
                if (!weightOption || typeof weightOption === "string") return null;

                return (
                  <div key={size} className="w-full">
                    <div className="md:border-0 flex flex-col items-center mb-2 md:mb-6">
                      {/* Weight + Price */}
                      <div className="flex items-center justify-center gap-4">
                        <p className="font-luloCleanBold font-bold text-[0.75rem] md:text-base">
                          {weightOption.weight}
                        </p>
                        <div className="h-6 w-[2px] bg-[#ba9256]" />
                        <p className="font-luloClean text-[0.75rem] md:text-base">
                          Rs. {weightOption.price}
                        </p>
                      </div>

                      {/* Spoons + Serves */}
                      <div className="flex items-center justify-center gap-2 mt-1 md:mt-2">
                        {[...Array(
                          size === "small"
                            ? 1
                            : size === "medium"
                            ? 2
                            : 3
                        )].map((_, spoonIndex) => (
                          <FaSpoon
                            key={spoonIndex}
                            className="text-[#ba9256] text-[0.7rem] md:text-xl"
                          />
                        ))}
                        <p className="font-afacad text-[0.7rem] md:text-lg">
                          Serves: {weightOption.serves}
                        </p>
                      </div>
                    </div>

                    {/* Divider between sizes on mobile only, not after the last item */}
                    {idx < 2 && (
                      <div className="block md:hidden my-2 h-[1px] w-full bg-[#ba9256]" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Buttons (unchanged) */}
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
            className={`
              px-3 py-1/2
              rounded-md font-afacad text-md
              transition-colors
              ${
                index === currentHalwaIndex
                  ? "bg-gold text-gray-300 underline-offset-4 underline"
                  : "bg-transparent text-gold hover:text-orange-200"
              }
            `}
          >
            {halwaData[key].name}
          </button>
        ))}
      </div>
    </div>
  );
}
