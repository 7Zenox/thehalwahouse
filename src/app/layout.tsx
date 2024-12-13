import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const afacad = localFont({
  src: "./fonts/Afacad-VariableFont_wght.ttf",
  variable: "--font-afacad",
  weight: "100 900",
});

const anton = localFont({
  src: "./fonts/Anton-Regular.ttf",
  variable: "--font-anton",
  weight: "100 900",
});

const luloClean = localFont({
  src: "./fonts/Lulo Clean One.otf",
  variable: "--font-luloClean",
  weight: "100 900",
});

const luloCleanBold = localFont({
  src: "./fonts/Lulo Clean One Bold.otf",
  variable: "--font-luloCleanBold",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "thehalwahouse",
  description: "Exotic Homemade Halwas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${afacad.variable} ${anton.variable} ${luloClean.variable} ${luloCleanBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
