"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpoon, FaBan, FaSeedling, FaGem, FaLeaf, FaHeart, FaGifts } from "react-icons/fa6";
import { PiCookingPotBold } from "react-icons/pi";
import { GiPaperBagFolded } from "react-icons/gi";

import Image from "next/image";
import BentoGrid from "@bentogrid/core";
import { Halwa } from "./types";

export default function HalwaPage() {
  const [halwaData, setHalwaData] = useState<Record<string, Halwa> | null>(null);
  const [currentHalwaIndex, setCurrentHalwaIndex] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setHalwaData(data);

      // Preload images
      Object.values(data).forEach((halwa) => {
        const img = new window.Image();
        img.src = (halwa as Halwa).path;
      });
    }
    fetchData();
  }, []);

  const halwaKeys = halwaData ? Object.keys(halwaData) : [];
  const halwa = halwaKeys.length > 0 ? halwaData![halwaKeys[currentHalwaIndex]] : null;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!scrollContainerRef.current || !halwaKeys.length) return;

      const container = scrollContainerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.scrollHeight;
      const scrollTop = window.scrollY;

      // Navbar visibility based on scroll direction
      if (scrollTop > lastScrollY) {
        setIsNavbarVisible(false); // Scrolling down
      } else {
        setIsNavbarVisible(true); // Scrolling up
      }
      lastScrollY = scrollTop;

      // Calculate the height allocated for each halwa
      const perHalwaHeight = (containerHeight / halwaKeys.length); // Extend visibility window
      const newIndex = Math.min(
        Math.max(Math.floor((scrollTop - containerTop) / perHalwaHeight), 0),
        halwaKeys.length - 1
      );

      if (newIndex !== currentHalwaIndex) {
        setCurrentHalwaIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentHalwaIndex, halwaKeys]);

  useEffect(() => {
    // Ensure the `bentogrid` element exists before initializing BentoGrid
    const bentogridElement = document.querySelector(".bentogrid");
    if (bentogridElement) {
      new BentoGrid({
        target: ".bentogrid",
        columns: 6,
        cellGap: 50,
        breakpoints: {
          1024: { columns: 6, cellGap: 12 },
          768: { columns: 4, cellGap: 6 },
          480: { columns: 2, cellGap: 4 },
        },
      });
    }
  }, [halwaData]);

  if (!halwaData || !halwa) return <p className="text-[#ba9256] text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-[#ba9256] relative">
      {/* Custom Scrollbar */}
      <div className="fixed top-0 right-0 w-[4px] z-10 bg-transparent">
        <motion.div
          className="absolute top-0 w-full"
          style={{
            height: `${(currentHalwaIndex / halwaKeys.length) * 100}%`,
            backgroundColor: "#ba9256",
          }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>

      {/* Navbar */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-xl bg-black/30 text-[#ba9256] px-6 py-4 flex justify-between items-center transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <h1 className="text-4xl font-anton">thehalwahouse</h1>
        <p className="text-sm font-luloClean">EXOTIC HOMEMADE HALWAS</p>
      </div>

      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative h-screen bg-black flex flex-col justify-end items-start">
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
        {/* Animated Text */}
        <motion.div
          className="absolute bottom-40 left-10 flex space-x-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.5, // Delay between words
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


      {/* Main Section */}
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
              <div className="flex items-center justify-center border-2 border-[#ba9256] p-6 rounded-t-full min-h-[90vh]">
                <div className="text-center">
                  <h2 className="text-xl uppercase font-luloClean">{halwa.name}</h2>
                  <p className="text-lg mt-4 font-afacad">{halwa.description}</p>
                </div>
              </div>

              {/* Second Column: Image */}
              <div className="relative w-full h-full rounded-3xl min-h-[90vh] flex items-center justify-center">
                <Image
                  src={halwa.path || "assets/Aata.jpg"}
                  alt={halwa.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
                  priority
                />
              </div>

              {/* Third Column: Weight, Pricing, and Serves */}
              <div className="flex flex-col items-center justify-center border-2 border-[#ba9256] p-6 rounded-full min-h-[90vh]">
                {halwa.small && (
                  <div className="flex flex-col items-center my-6">
                    <div className="flex items-center justify-center gap-4">
                      <p className="font-bold font-luloCleanBold">{halwa.small.weight}</p>
                      <div className="h-6 w-[2px] bg-[#ba9256]" />
                      <p className="font-luloClean">Rs. {halwa.small.price}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 my-2">
                      <FaSpoon className="text-[#ba9256]" />
                      <p className="text-md font-afacad">Serves: {halwa.small.serves}</p>
                    </div>
                  </div>
                )}
                {halwa.medium && (
                  <div className="flex flex-col items-center my-6">
                    <div className="flex items-center justify-center gap-4">
                      <p className="font-bold font-luloCleanBold">{halwa.medium.weight}</p>
                      <div className="h-6 w-[2px] bg-[#ba9256]" />
                      <p className="font-luloClean">Rs. {halwa.medium.price}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 my-2">
                      <FaSpoon className="text-[#ba9256]" />
                      <FaSpoon className="text-[#ba9256]" />
                      <p className="text-md font-afacad">Serves: {halwa.medium.serves}</p>
                    </div>
                  </div>
                )}
                {halwa.large && (
                  <div className="flex flex-col items-center my-6">
                    <div className="flex items-center justify-center gap-4">
                      <p className="font-bold font-luloCleanBold">{halwa.large.weight}</p>
                      <div className="h-6 w-[2px] bg-[#ba9256]" />
                      <p className="font-luloClean">Rs. {halwa.large.price}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 my-2">
                      <FaSpoon className="text-[#ba9256]" />
                      <FaSpoon className="text-[#ba9256]" />
                      <FaSpoon className="text-[#ba9256]" />
                      <p className="text-md font-afacad">Serves: {halwa.large.serves}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bento Grid Section */}
      <div className="min-h-screen bg-black py-12 flex items-center justify-center font-afacad">
        <div className="bentogrid w-full max-w-6xl px-4">
          <div data-bento="2x2" className="feature-item">
            <PiCookingPotBold className="text-[#ba9256]" />
            <p>Freshly Made on Order</p>
          </div>
          <div data-bento="1x1" className="feature-item">
            <FaBan className="text-[#ba9256]" />
            <p>No Preservatives Added</p>
          </div>
          <div data-bento="1x1" className="feature-item">
            <FaSeedling className="text-[#ba9256]" />
            <p>Made from Clean and Fresh Ingredients</p>
          </div>
          <div data-bento="1x2" className="feature-item">
            <FaGem className="text-[#ba9256]" />
            <p>Crafted with Pure Desi Ghee</p>
          </div>
          <div data-bento="1x3" className="feature-item">
            <FaLeaf className="text-[#ba9256]" />
            <p>Rich in Flavor and Texture</p>
          </div>
          <div data-bento="2x1" className="feature-item">
            <FaGifts className="text-[#ba9256]" />
            <p>Perfect for Festive Occasions</p>
          </div>
          <div data-bento="1x1" className="feature-item">
            <FaGem className="text-[#ba9256]" />
            <p>Premium Quality Ingredients</p>
          </div>
          <div data-bento="1x1" className="feature-item">
            <FaHeart className="text-[#ba9256]" />
            <p>Prepared with Love and Care</p>
          </div>
          <div data-bento="1x1" className="feature-item">
            <GiPaperBagFolded className="text-[#ba9256]" />
            <p>Eco-Friendly Packaging</p>
          </div>
          <div data-bento="2x1" className="feature-item">
            <FaSpoon className="text-[#ba9256]" />
            <p>Hand-Crafted in Small Batches</p>
          </div>
        </div>
      </div>
    </div>
  );
}