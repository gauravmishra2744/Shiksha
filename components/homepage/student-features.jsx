"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const StudentFeaturesComponents = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const studentFeatures = [
    {
      id: 1,
      title: "Earn Badges While Studying",
      description:
        "Complete learning milestones and achieve academic goals to unlock exclusive badges and rewards that showcase your progress.",
      image: "/l1.png",
    },
    {
      id: 2,
      title: "Smart Study Content",
      description:
        "Access AI-powered study materials that adapt to your learning style and provide personalized content recommendations for better understanding.",
      image: "/l2.png",
    },
    {
      id: 3,
      title: "Revision Flashcards",
      description:
        "Create and review interactive flashcards to reinforce key concepts and improve retention through spaced repetition techniques.",
      image: "/l3.png",
    },
    {
      id: 4,
      title: "Productivity Tools",
      description:
        "Boost your study efficiency with built-in productivity features like Pomodoro timer and todo lists to manage your tasks effectively.",
      image: "/l4.png",
    },
    {
      id: 5,
      title: "Engaging Educational Games ",
      description:
        "Learn through fun and interactive educational games including quizzes that make studying enjoyable and memorable.",
      image: "/l5.png",
    },
    {
      id: 6,
      title: "Competative Battleground",
      description:
        "Form teams with friends and compete in academic challenges and games to test your knowledge in a fun competitive environment.",
      image: "/l6.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-secondary-background border-t-2 border-b-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Left Aligned */}
        <motion.div
          className="text-left pb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
            Elevating {" "}
            <span className="bg-main/80 rounded-md px-3 py-0 leading-snug">
              Learners
            </span>
          </h1>
          <p className="text-muted-foreground tracking-wide pt-1 text-sm sm:text-base max-w-lg sm:max-w-xl leading-snug">
            Discover powerful tools and features designed to enhance your
            learning experience and help you achieve academic success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {studentFeatures.map((feature, index) => (
            <motion.div key={feature.id} variants={cardVariants}>
              <div className="bg-gray-100/5 dark:bg-gray-900/50 rounded-2xl border border-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                {/* Feature Image */}
                <div className="relative h-48 sm:h-52 lg:h-60 overflow-hidden bg-gradient-to-br from-main/10 to-main/20">
                  {/* Placeholder gradient - replace with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-main/30 via-main/20 to-main/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent)]" />
                  </div>
                  {/* You can uncomment this when you have actual images */}
                  
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-fill"
                  />
                 
                </div>

                {/* Feature Content */}
                <div className="p-6 lg:p-7 border-t-2 border-border/50">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-muted-foreground text-sm sm:text-lg md:text-xl mb-6">
            Ready to transform your learning experience?
          </p>
          <Link href={"/student/dashboard"} target="_blank">
            <Button size={"lg"}>View Student Dashboard</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentFeaturesComponents;
