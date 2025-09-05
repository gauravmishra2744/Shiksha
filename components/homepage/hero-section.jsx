"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simple tilt from top - rotateX only
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [45, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  // Letter stagger animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Function to split text into letters
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-background to-main/10  pt-12 sm:py-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Hero Content */}
        <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {/* Hero Text - 3 Lines with Letter Stagger - Responsive */}
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] sm:leading-[1.1] tracking-tighter sm:tracking-tight">
              <motion.span
                className="block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {splitText("Revolutionize Your")}
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-main to-main/80 bg-clip-text text-transparent"
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                {splitText("Education With")}
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
              >
                {splitText("Gamified Experience")}
              </motion.span>
            </h1>
          </div>

          {/* Paragraph - Responsive */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-foreground/80 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl  mx-auto  sm:leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Transform the way you teach and learn with our gamified platform.
            Personalized focus, smart intelligence, and gamified
            experinece tools designed for the future of education.
          </motion.p>

          {/* CTA Buttons - Responsive */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button asChild size="lg" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
              <Link href="/student/dashboard">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="neutral"
              size="lg"
              className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-white text-black w-full sm:w-auto"
            >
              <Link href="/">Watch Demo</Link>
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Image with Simple Top Tilt Effect */}
        <motion.div
          className="relative flex justify-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="relative w-full  max-w-4xl lg:max-w-6xl xl:max-w-[75rem]">
            <motion.div
              className="relative"
              style={{
                rotateX,
                scale,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-main/20 blur-2xl sm:blur-3xl rounded-2xl sm:rounded-3xl transform scale-110 opacity-40"></div>

              {/* Dashboard Image Container */}
              <div className="relative bg-white/95 dark:bg-gray-900/95 rounded-2xl sm:rounded-3xl p-1 sm:p-2 shadow-xl sm:shadow-2xl border border-border/20 backdrop-blur-sm">
                <Image
                  src="/acedimate.png"
                  alt="Dashboard Preview"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--main) 2px, transparent 2px)`,
            backgroundSize: "40px 40px sm:60px 60px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;