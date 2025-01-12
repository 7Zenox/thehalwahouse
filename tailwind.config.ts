import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-gold': '0 0 50px 15px rgba(186,146,86,0.5)',
      },
      fontFamily: {
        "afacad": "var(--font-afacad)",
        "anton": "var(--font-anton)",
        "luloClean": "var(--font-luloClean)",
        "luloCleanBold": "var(--font-luloCleanBold)"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
