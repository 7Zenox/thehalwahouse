import type { NextConfig } from "next";
const withVideos = require("next-videos");

const nextConfig: NextConfig = withVideos({
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 750, 1080, 1200, 1920], // Define responsive breakpoints
  },
});

export default nextConfig;