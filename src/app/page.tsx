"use client";

import { useState, useEffect } from "react";
import { FaUtensilSpoon } from "react-icons/fa";
import Image from "next/image";
import { Halwa } from "./types";

export default function HalwaPage() {
  const [halwaData, setHalwaData] = useState<Record<string, Halwa> | null>(null);
  const [currentHalwa, setCurrentHalwa] = useState<string>("");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isPaginationVisible, setIsPaginationVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json"); // Fetch from public folder
      const data = await response.json();
      setHalwaData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (halwaData) {
      setCurrentHalwa(Object.keys(halwaData)[0]); // Set the first key after data is loaded
    }
  }, [halwaData]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      const secondSectionOffset = (document.querySelector(".main-section") as HTMLElement)?.offsetTop || 0;
      setIsPaginationVisible(window.scrollY >= secondSectionOffset);

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!halwaData || !currentHalwa) return <p className="text-[#ba9256] text-center mt-10">Loading...</p>;

  const halwa = halwaData[currentHalwa];
  const halwaKeys = Object.keys(halwaData);

  const handlePaginationClick = (key: string) => {
    setCurrentHalwa(key);
  };

  return (
    <div className="min-h-screen bg-black text-[#ba9256]">
      {/* Navbar */}
      <div
        className={`sticky top-0 z-10 backdrop-blur-xl bg-black/30 text-[#ba9256] px-6 py-4 flex justify-between items-center transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"
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
            alt={halwa.name}
            layout="fill"
            objectFit="cover"
            className="rounded-none"
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 main-section">
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
            src={halwa.path || "assets/Aata.jpg"} // Replace with the actual image path
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
              {/* Row 1: Weight, Divider, and Price */}
              <div className="flex items-center justify-center w-full px-10 gap-4">
                <p className="font-bold font-luloCleanBold">{halwa.small.weight}</p>
                <div className="h-6 w-[2px] bg-[#ba9256]" />
                <p className="font-luloClean">Rs. {halwa.small.price}</p>
              </div>

              {/* Row 2: Serves */}
              <div className="flex items-center justify-center gap-2 my-4">
                <FaUtensilSpoon className="text-[#ba9256]" />
                <p className="text-md font-afacad">Serves: {halwa.small.serves}</p>
              </div>
            </div>
          )}
          {halwa.medium && (
            <div className="flex flex-col items-center my-10">
              {/* Row 1: Weight, Divider, and Price */}
              <div className="flex items-center justify-center w-full px-10 gap-4">
                <p className="font-bold font-luloCleanBold">{halwa.medium.weight}</p>
                <div className="h-6 w-[2px] bg-[#ba9256]" />
                <p className="font-luloClean">Rs. {halwa.medium.price}</p>
              </div>

              {/* Row 2: Serves */}
              <div className="flex items-center justify-center gap-2 my-4">
                <FaUtensilSpoon className="text-[#ba9256]" />
                <FaUtensilSpoon className="text-[#ba9256]" />
                <p className="text-md font-afacad">Serves: {halwa.medium.serves}</p>
              </div>
            </div>
          )}
          {halwa.large && (
            <div className="flex flex-col items-center my-10">
              {/* Row 1: Weight, Divider, and Price */}
              <div className="flex items-center justify-center w-full px-10 gap-4">
                <p className="font-bold font-luloCleanBold">{halwa.large.weight}</p>
                <div className="h-6 w-[2px] bg-[#ba9256]" />
                <p className="font-luloClean">Rs. {halwa.large.price}</p>
              </div>

              {/* Row 2: Serves */}
              <div className="flex items-center justify-center gap-2 my-4">
                <FaUtensilSpoon className="text-[#ba9256]" />
                <FaUtensilSpoon className="text-[#ba9256]" />
                <FaUtensilSpoon className="text-[#ba9256]" />
                <p className="text-md font-afacad">Serves: {halwa.large.serves}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 backdrop-blur-xl bg-black/30 px-6 py-4 rounded-full transition-opacity duration-300 flex justify-center space-x-4 ${isPaginationVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {halwaKeys.map((key) => (
          <button
            key={key}
            onClick={() => handlePaginationClick(key)}
            className={`px-3 py-2 rounded-md font-afacad text-md transition-colors ${key === currentHalwa
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
