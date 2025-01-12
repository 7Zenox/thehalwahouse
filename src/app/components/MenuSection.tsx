"use client";

import { FaUtensilSpoon } from "react-icons/fa"; // Import spoon icon
import data from "../assets/data";

export default function MenuSection() {
  const halwa = data.moong_dal_halwa; // Display the first card (Moong Dal Halwa)

  // Helper function to render multiple spoon icons
  const renderSpoons = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <FaUtensilSpoon key={index} className="text-gray-400" />
    ));
  };

  return (
    <div className="menu-card w-4/5 h-4/5 bg-black/60 backdrop-blur-lg shadow-[0_0_50px_15px_rgba(186,146,86,0.4)] rounded-3xl overflow-hidden flex p-10">
      {/* Image Section */}
      <div className="w-1/2 h-full">
        <img
          src={halwa.path}
          alt={halwa.name}
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Content Section */}
      <div className="w-1/2 h-full p-10 text-white flex flex-col justify-center">
        <h2 className="text-3xl font-luloCleanBold mb-6 text-[#ba9256]">{halwa.name}</h2>
        <p className="mb-6 font-afacad text-[#ba9256]">{halwa.description}</p>

        {/* Line Divider */}
        <div className="border-t border-[#ba9256] mb-6"></div>

        <div className="space-y-6">
          {halwa.small && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-luloCleanBold text-[#ba9256]">
                  {halwa.small.weight}
                </span>
                <span className="text-lg font-luloClean text-gray-300">
                  ₹{halwa.small.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-afacad text-gray-400">
                  Serves {halwa.small.serves}
                </span>
                <FaUtensilSpoon className="text-gray-400" />
              </div>
            </div>
          )}
          {halwa.medium && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-luloCleanBold text-[#ba9256]">
                  {halwa.medium.weight}
                </span>
                <span className="text-lg font-luloClean text-gray-300">
                  ₹{halwa.medium.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-afacad text-gray-400">
                  Serves {halwa.medium.serves}
                </span>
                <div className="flex gap-1">{renderSpoons(2)}</div>
              </div>
            </div>
          )}
          {halwa.large && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-luloCleanBold text-[#ba9256]">
                  {halwa.large.weight}
                </span>
                <span className="text-lg font-luloClean text-gray-300">
                  ₹{halwa.large.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-afacad text-gray-400">
                  Serves {halwa.large.serves}
                </span>
                <div className="flex gap-1">{renderSpoons(3)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
