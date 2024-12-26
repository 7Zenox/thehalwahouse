"use client";

import { useEffect } from "react";
import { PiCookingPotBold } from "react-icons/pi";
import { FaBan, FaSeedling, FaGem, FaLeaf, FaHeart, FaGifts, FaDroplet } from "react-icons/fa6";
import { GiPaperBagFolded } from "react-icons/gi";
import BentoGrid from "@bentogrid/core";

export default function FeaturesGrid() {
  useEffect(() => {
    // Initialize BentoGrid
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
  }, []);

  return (
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
          <FaDroplet className="text-[#ba9256]" />
          <p>Made in Pure Desi Ghee</p>
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
          <FaBan className="text-[#ba9256]" />
          <p>Hand-Crafted in Small Batches</p>
        </div>
      </div>
    </div>
  );
}
