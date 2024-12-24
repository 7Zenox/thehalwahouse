"use client";

import { useState, useEffect } from "react";
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

      const secondSectionOffset = document.querySelector(".main-section")?.offsetTop || 0;
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
        className={`sticky top-0 z-10 backdrop-blur-lg bg-opacity-50 text-[#ba9256] px-6 py-4 flex justify-between items-center transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-4xl font-anton">thehalwahouse</h1>
        <p className="text-sm font-luloClean">EXOTIC HOMEMADE HALWAS</p>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen">
        {/* <Image
          src="/path-to-your-hero-image.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="absolute"
        /> */}
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 main-section">
        {/* First Column: Name and Description */}
        <div className="flex items-center justify-center border border-[#ba9256] p-6 rounded-t-full min-h-[90vh]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold uppercase font-luloClean">{halwa.name}</h2>
            <p className="text-sm mt-4 font-afacad">{halwa.description}</p>
          </div>
        </div>

        {/* Second Column: Image */}
        <div className="relative w-full h-full border border-[#ba9256] rounded-3xl min-h-[90vh] flex items-center justify-center">
          {/* <Image
            src={halwa.path} // Replace with the actual image path
            alt={halwa.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          /> */}
        </div>

        {/* Third Column: Weight and Pricing */}
        <div className="flex flex-col items-center justify-center border border-[#ba9256] p-6 rounded-full min-h-[90vh]">
          {halwa.small && (
            <div className="mb-4 text-center">
              <p className="font-bold font-luloCleanBold">{halwa.small.weight}</p>
              <p className="font-luloClean">Rs. {halwa.small.price}</p>
            </div>
          )}
          {halwa.medium && (
            <div className="mb-4 text-center">
              <p className="font-bold font-luloCleanBold">{halwa.medium.weight}</p>
              <p className="font-luloClean">Rs. {halwa.medium.price}</p>
            </div>
          )}
          {halwa.large && (
            <div className="text-center">
              <p className="font-bold font-luloCleanBold">{halwa.large.weight}</p>
              <p className="font-luloClean">Rs. {halwa.large.price}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div
        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 backdrop-blur-sm bg-white/5 px-6 py-4 rounded-full transition-opacity duration-300 flex justify-center space-x-4 ${
          isPaginationVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {halwaKeys.map((key) => (
          <button
            key={key}
            onClick={() => handlePaginationClick(key)}
            className={`px-3 py-2 rounded-md font-afacad text-md transition-colors ${
              key === currentHalwa
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
