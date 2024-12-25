"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaSpoon } from "react-icons/fa6";
import Image from "next/image";
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
      const perHalwaHeight = containerHeight / halwaKeys.length;

      // Determine the current halwa index
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

  if (!halwaData || !halwa) return <p className="text-[#ba9256] text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-[#ba9256] relative">
      {/* Custom Scrollbar */}
      <div
        className="fixed top-0 right-0 w-[4px] z-10 bg-transparent"
        style={{
          height: "100vh",
          backgroundColor: "transparent",
        }}
      >
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
        className={`sticky top-0 z-10 backdrop-blur-xl bg-black/30 text-[#ba9256] px-6 py-4 flex justify-between items-center transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-4xl font-anton">thehalwahouse</h1>
        <p className="text-sm font-luloClean">EXOTIC HOMEMADE HALWAS</p>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen bg-black">
        <div className="absolute top-0 w-full h-[70vh]">
          <Image
            src={"/assets/hero.JPG"} // Replace with the actual image path
            alt="Hero"
            layout="fill"
            objectFit="cover"
            className="rounded-none"
          />
        </div>
      </div>

      {/* Main Section */}
      <div
        ref={scrollContainerRef}
        className="relative"
        style={{ height: `${halwaKeys.length * 100}vh` }} // Ensure height includes all halwas
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
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
              />
            </div>

            {/* Third Column: Weight, Pricing, and Serves */}
            <div className="flex flex-col items-center justify-center border-2 border-[#ba9256] p-6 rounded-full min-h-[90vh]">
              {halwa.small && (
                <div className="flex flex-col items-center my-10">
                  <div className="flex items-center justify-center w-full px-10 gap-4">
                    <p className="font-bold font-luloCleanBold">{halwa.small.weight}</p>
                    <div className="h-6 w-[2px] bg-[#ba9256]" />
                    <p className="font-luloClean">Rs. {halwa.small.price}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 my-4">
                    <FaSpoon className="text-[#ba9256]" />
                    <p className="text-md font-afacad">Serves: {halwa.small.serves}</p>
                  </div>
                </div>
              )}
              {halwa.medium && (
                <div className="flex flex-col items-center my-10">
                  <div className="flex items-center justify-center w-full px-10 gap-4">
                    <p className="font-bold font-luloCleanBold">{halwa.medium.weight}</p>
                    <div className="h-6 w-[2px] bg-[#ba9256]" />
                    <p className="font-luloClean">Rs. {halwa.medium.price}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 my-4">
                    <FaSpoon className="text-[#ba9256]" />
                    <FaSpoon className="text-[#ba9256]" />
                    <p className="text-md font-afacad">Serves: {halwa.medium.serves}</p>
                  </div>
                </div>
              )}
              {halwa.large && (
                <div className="flex flex-col items-center my-10">
                  <div className="flex items-center justify-center w-full px-10 gap-4">
                    <p className="font-bold font-luloCleanBold">{halwa.large.weight}</p>
                    <div className="h-6 w-[2px] bg-[#ba9256]" />
                    <p className="font-luloClean">Rs. {halwa.large.price}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 my-4">
                    <FaSpoon className="text-[#ba9256]" />
                    <FaSpoon className="text-[#ba9256]" />
                    <FaSpoon className="text-[#ba9256]" />
                    <p className="text-md font-afacad">Serves: {halwa.large.serves}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bento Grid Section */}
      <div className="bg-black py-12">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {halwaKeys.map((key) => (
            <motion.div
              key={key}
              className="relative group overflow-hidden rounded-lg border border-[#ba9256]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={halwaData![key].path || "/assets/default.jpg"}
                alt={halwaData![key].name}
                layout="responsive"
                width={200}
                height={200}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-center text-[#ba9256] font-bold">{halwaData![key].name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
