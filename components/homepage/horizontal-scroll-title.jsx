"use client";

import React, { useRef, useEffect, useState } from "react";
import { animate, scroll } from "motion";

const HorizontalScrollTitle = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      // Get the actual width of the text element
      const width = textRef.current.scrollWidth;
      setTextWidth(width);

      // Calculate the viewport width
      const viewportWidth = window.innerWidth;

      // Calculate the range needed to show full text
      // Start with some text visible (showing part of "ELEVATING")
      const startX = viewportWidth * 0.5; // Show about 30% of the text initially
      const endX = -width;

      if (containerRef.current) {
        // Enhanced horizontal scroll animation with calculated movement
        scroll(
          animate(
            textRef.current,
            {
              x: [startX, endX], // Start with partial visibility
            },
            {
              duration: 1, // Smooth animation duration
              easing: "ease-out",
            }
          ),
          {
            target: containerRef.current,
            offset: ["start start", "end start"],
          }
        );
      }
    }
  }, []);

  // Handle window resize to recalculate animation
  useEffect(() => {
    const handleResize = () => {
      if (textRef.current && containerRef.current) {
        const width = textRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Maintain responsive partial visibility on resize
        const startX = viewportWidth;
        const endX = -width;

        // Re-initialize scroll animation on resize
        scroll(
          animate(
            textRef.current,
            {
              x: [startX, endX],
            },
            {
              duration: 1,
              easing: "ease-out",
            }
          ),
          {
            target: containerRef.current,
            offset: ["start start", "end start"],
          }
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      {" "}
      {/* Increased height for better scroll experience */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-secondary-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50"></div>

        {/* Main Title */}
        <div className="text-center px-4 w-full flex flex-col justify-center h-full">
          <div className="w-full overflow-hidden relative">
            <div ref={textRef} className="whitespace-nowrap w-fit">
              <h1 className="text-[8rem] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[12vw] 2xl:text-[200px] font-bold tracking-tight leading-[0.8] mb-6">
                ELEVATING{" "}
                <span className="bg-main/80 rounded-md px-2 sm:px-3 lg:px-4 py-1 sm:py-2 leading-snug">
                  LEARNERS
                </span>{" "}
                EXPERIENCE
              </h1>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8">
            <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl max-w-5xl mx-auto leading-tight">
              Discover powerful tools and features designed to enhance your
              learning experience and help you achieve academic success.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="animate-bounce">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
            Scroll to explore
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollTitle;
