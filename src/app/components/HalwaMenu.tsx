"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpoon } from "react-icons/fa6";
import Image from "next/image";
import { Halwa, WeightOption } from "../types";

interface HalwaMenuProps {
    halwaData: Record<string, Halwa>;
}

export default function HalwaMenu({ halwaData }: HalwaMenuProps) {
    const [currentHalwaIndex, setCurrentHalwaIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const halwaKeys = Object.keys(halwaData);
    const halwa = halwaData[halwaKeys[currentHalwaIndex]];

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const containerTop = container.offsetTop;
            const containerHeight = container.scrollHeight;
            const scrollTop = window.scrollY;

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
                        <div className="flex items-center justify-center border-2 border-[#ba9256] p-6 rounded-t-full min-h-[80vh]">
                            <div className="text-center">
                                <h2 className="text-xl uppercase font-luloClean">{halwa.name}</h2>
                                <p className="text-lg mt-4 font-afacad">{halwa.description}</p>
                            </div>
                        </div>

                        {/* Second Column: Image */}
                        <div className="relative w-full h-full rounded-3xl min-h-[80vh] flex items-center justify-center">
                            <Image
                                src={halwa.path}
                                alt={halwa.name}
                                fill
                                className="rounded-3xl object-cover"
                                priority
                            />
                        </div>

                        {/* Third Column: Weight, Pricing, and Serves */}
                        <div className="flex flex-col items-center justify-center border-2 border-[#ba9256] p-6 rounded-full min-h-[80vh]">
                            {["small", "medium", "large"].map((size) => {
                                const weightOption = halwa[size as keyof Halwa] as WeightOption | undefined;

                                if (!weightOption) return null;

                                return (
                                    <div key={size} className="flex flex-col items-center my-6">
                                        <div className="flex items-center justify-center gap-4">
                                            <p className="font-bold font-luloCleanBold">{weightOption.weight}</p>
                                            <div className="h-6 w-[2px] bg-[#ba9256]" />
                                            <p className="font-luloClean">Rs. {weightOption.price}</p>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 my-2">
                                            {[...Array(size === "small" ? 1 : size === "medium" ? 2 : 3)].map(
                                                (_, index) => (
                                                    <FaSpoon key={index} className="text-[#ba9256]" />
                                                )
                                            )}
                                            <p className="text-md font-afacad">Serves: {weightOption.serves}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
