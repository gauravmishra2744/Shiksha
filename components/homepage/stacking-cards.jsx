"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const StackingCards = ({ features }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative"
      style={{ height: `${features.length * 100}vh` }}
    >
      {features.map((feature, i) => {
        const targetScale = 1 - (features.length - i) * 0.05;
        const range = [i * (1 / features.length), 1];

        return (
          <StackCard
            key={`stack_${i}`}
            i={i}
            feature={feature}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
            totalCards={features.length}
          />
        );
      })}
    </div>
  );
};

const StackCard = ({
  i,
  feature,
  progress,
  range,
  targetScale,
  totalCards,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Better Y positioning
  const y = useTransform(progress, range, [0, -50]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: feature.color,
          scale,
          y,
          zIndex: totalCards - i,
          top: `calc(-0vh + ${i * 25}px)`,
        }}
        className="flex flex-col lg:flex-row relative h-[420px] sm:h-[470px] w-[90%]  rounded-2xl overflow-hidden shadow-2xl origin-top border border-border/50 dark:text-black"
      >
        <div className="w-full lg:w-[40%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            {feature.title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed">
            {feature.description}
          </p>
          <div className="flex items-center gap-3 cursor-pointer hover:gap-4 transition-all duration-300">
            <span className="text-sm sm:text-base font-semibold">
              Learn More
            </span>
            <svg width="20" height="12" viewBox="0 0 22 12" fill="none">
              <path
                d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        <div className="w-full lg:w-[70%] h-full relative overflow-hidden">
          <motion.div className="w-full h-full" style={{ scale: imageScale }}>
            <Image
              fill
              src={feature.image}
              alt={feature.title}
              className="object-fill"
              priority={i < 2}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StackingCards;
