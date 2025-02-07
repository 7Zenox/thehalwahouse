"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const SquareChain = () => {
  const squares = Array.from({ length: 20 });
  const radius = 160;
  const squareSize = 70;

  const strokeColor = "#ba9256";
  const strokeWidth = 2;

  const squaresRef = useRef<(SVGRectElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    squaresRef.current.forEach((sq) => {
      if (sq) gsap.set(sq, { opacity: 0 });
    });

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

    tl.to(textRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.0");
  }, []);

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
              transform={`rotate(${angle + 45}, ${
                x + squareSize / 2
              }, ${y + squareSize / 2})`}
              // No inline opacity needed, we set it via GSAP
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
