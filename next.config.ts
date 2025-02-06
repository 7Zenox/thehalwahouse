// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 640, 750, 1080, 1200, 1920],
  },
};

export default nextConfig;
