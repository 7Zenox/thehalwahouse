"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HalwaPage() {
  const [halwaData, setHalwaData] = useState(null);
  const [currentHalwa, setCurrentHalwa] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/assets/data.json"); // Fetch from public folder
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

  if (!halwaData || !currentHalwa) return <p className="text-white text-center mt-10">Loading...</p>;

  const halwa = halwaData[currentHalwa];
  const halwaKeys = Object.keys(halwaData);

  const handlePaginationClick = (key) => {
    setCurrentHalwa(key);
  };

  return (
    <div className="min-h-screen bg-black text-gold">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-6">
        <div>
          <h1 className="text-5xl font-bold font-anton">thehalwahouse</h1>
          <p className="text-xs font-luloClean">EXOTIC HOMEMADE HALWAS</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="hidden md:grid md:grid-cols-2">
          {/* First Column */}
          <div className="">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold mb-4 uppercase font-luloClean">{halwa.name}</h2>
              <p className="text-sm mb-6 font-afacad">{halwa.description}</p>
            </div>
            <div className="flex justify-around gap-8 text-center">
              {halwa.small && (
                <div className="">
                  <p className="font-bold font-luloCleanBold">{halwa.small[0]}</p>
                  <p className="font-luloClean">Rs. {halwa.small[1]}</p>
                </div>
              )}
              {halwa.medium && (
                <div className="">
                  <p className="font-bold font-luloCleanBold">{halwa.medium[0]}</p>
                  <p className="font-luloClean">Rs. {halwa.medium[1]}</p>
                </div>
              )}
              {halwa.large && (
                <div className="">
                  <p className="font-bold font-luloCleanBold">{halwa.large[0]}</p>
                  <p className="font-luloClean">Rs. {halwa.large[1]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-center ">
            <div className="relative w-64 h-64 mb-6  border-gold rounded-md flex items-center justify-center">
              {/* Uncomment and replace `src` when images are available */}
              {/* <Image
                src={halwa.path}
                alt={halwa.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              /> */}
              <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded-md text-sm text-gray-300">
                Placeholder Image
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center font-afacad">
              {halwaKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handlePaginationClick(key)}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    key === currentHalwa
                      ? "bg-gold text-black"
                      : "bg-transparent text-gold hover:bg-gold hover:text-black"
                  }`}
                >
                  {halwaData[key].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="grid md:hidden gap-4 ">
          <div className="">
            <h2 className="text-2xl font-semibold mb-2 uppercase">{halwa.name}</h2>
            <p className="text-sm mb-4">{halwa.description}</p>
          </div>

          <div className="relative w-full h-64  border-gold rounded-md flex items-center justify-center">
            {/* Uncomment and replace `src` when images are available */}
            {/* <Image
              src={halwa.path}
              alt={halwa.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            /> */}
            <div className="w-full h-full bg-gray-700 flex items-center justify-center rounded-md text-sm text-gray-300">
              Placeholder Image
            </div>
          </div>

          <div className="flex justify-start gap-8 text-center ">
            {halwa.small && (
              <div className="">
                <p className="font-bold">{halwa.small[0]}</p>
                <p>Rs. {halwa.small[1]}</p>
              </div>
            )}
            {halwa.medium && (
              <div className="">
                <p className="font-bold">{halwa.medium[0]}</p>
                <p>Rs. {halwa.medium[1]}</p>
              </div>
            )}
            {halwa.large && (
              <div className="">
                <p className="font-bold">{halwa.large[0]}</p>
                <p>Rs. {halwa.large[1]}</p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-center ">
            {halwaKeys.map((key) => (
              <button
                key={key}
                onClick={() => handlePaginationClick(key)}
                className={`px-4 py-2 rounded-md font-afacad text-sm transition-colors ${
                  key === currentHalwa
                    ? "bg-gold text-yellow-700 "
                    : "bg-transparent text-gold hover:bg-gold hover:text-yellow-700"
                }`}
              >
                {halwaData[key].name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}