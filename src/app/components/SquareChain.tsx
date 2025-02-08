"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const SquareChain = () => {
  // Create an array for 20 squares.
  const squares = Array.from({ length: 20 });
  // State variables for square size and radius.
  const [squareSize, setSquareSize] = useState(70);
  const [radius, setRadius] = useState(160);

  const strokeColor = "#ba9256";
  const strokeWidth = 2;

  const squaresRef = useRef<(SVGRectElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  // Update squareSize and radius based on the window width.
  useEffect(() => {
    const updateSizes = () => {
      if (window.innerWidth < 768) {
        setSquareSize(50); // Smaller square on mobile.
        // Keep the same ratio: 160/70 ≈ 2.2857. So for 50, radius ≈ 50*2.2857.
        setRadius(50 * (160 / 70));
      } else {
        setSquareSize(70);
        setRadius(160);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initially set all squares to zero opacity.
    squaresRef.current.forEach((sq) => {
      if (sq) gsap.set(sq, { opacity: 0 });
    });

    // Sequentially update the opacity of the squares.
    squaresRef.current.forEach((square, i) => {
      if (!square) return;

      tl.add(() => {
        if (i > 0 && squaresRef.current[i - 1]) {
          gsap.set(squaresRef.current[i - 1], { opacity: 0.25 });
        }
        gsap.set(square, { opacity: 0.65 });
      }, `+=0.07`);
    });

    tl.add(() => {
      const lastIdx = squaresRef.current.length - 1;
      const lastSquare = squaresRef.current[lastIdx];
      if (lastSquare) gsap.set(lastSquare, { opacity: 0.25 });
    }, "+=0.2");

    tl.to(
      textRef.current,
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      "+=0.0"
    );
  }, [squareSize, radius]); // Re-run when squareSize or radius change.

  return (
    <div className="relative w-screen h-screen bg-black/50 flex justify-center items-center">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        className="absolute overflow-visible"
      >
        {squares.map((_, i) => {
          const angle = (i / squares.length) * 360;
          // Calculate the x and y positions using the current radius and squareSize.
          const x =
            150 + radius * Math.cos((angle * Math.PI) / 180) - squareSize / 2;
          const y =
            150 + radius * Math.sin((angle * Math.PI) / 180) - squareSize / 2;

          return (
            <rect
              key={i}
              ref={(el) => {
                squaresRef.current[i] = el;
              }}
              x={x}
              y={y}
              width={squareSize}
              height={squareSize}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              transform={`rotate(${angle + 45}, ${x + squareSize / 2}, ${
                y + squareSize / 2
              })`}
            />
          );
        })}
      </svg>

      <div
        ref={textRef}
        className="absolute flex flex-col items-center"
        style={{ opacity: 0 }}
      >
        <Image src="/LogoBrown.png" alt="Logo" width={100} height={100} priority />
        <div className="text-[#ba9256] lg:text-5xl text-4xl font-anton mt-2">
          thehalwahouse
        </div>
        <div className="self-start text-left text-[#ba9256] text-[11px] mt-1 w-full max-w-[300px] font-luloClean">
          exotic home-made halwas
        </div>
      </div>
    </div>
  );
};

export default SquareChain;
