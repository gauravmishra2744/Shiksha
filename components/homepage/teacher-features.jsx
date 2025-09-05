"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const TeacherFeatures = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const teacherFeatures = [
    {
      id: 1,
      title: "Modern Dashboard",
      description:
        "Access a comprehensive and intuitive dashboard that provides real-time insights into your classes, student performance, and teaching analytics.",
      image: "/t1.png",
    },
    {
      id: 2,
      title: "AI Lesson Planner",
      description:
        "Create intelligent, personalized lesson plans with AI assistance that adapts to your teaching style and curriculum requirements.",
      image: "/t2.png",
    },
    {
      id: 3,
      title: "View All classes",
      description:
        "Manage and view all your classes in one place with easy navigation, scheduling, and class organization tools.",
      image: "/t3.png",
    },
    {
      id: 4,
      title: "Content Management",
      description:
        "Add, Upload and manage all your teaching materials, resources, and digital content in a centralize way for students.",
      image: "/t4.png",
    },
    {
      id: 5,
      title: "Create Assessmemts",
      description:
        "Design and create various types of assessments, quizzes, and tests with customizable question formats and grading rubrics.",
      image: "/t5.png",
    },
    {
      id: 6,
      title: "Parent Portal",
      description:
        "Connect with parents through a dedicated portal providing updates on student progress, announcements, and communication tools.",
      image: "/t6.png",
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
    <section className="py-16 sm:py-20 lg:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Left Aligned */}
        <motion.div
          className="text-left pb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
            Empowering{" "}
            <span className="bg-main/80 rounded-md px-3 py-0 leading-snug">
              Teachers
            </span>
          </h1>
          <p className="text-muted-foreground tracking-wide pt-1 text-sm sm:text-base max-w-lg sm:max-w-xl leading-snug">
            Empower your teaching with advanced tools and AI-powered features
            designed to enhance classroom management and student engagement.
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
          {teacherFeatures.map((feature, index) => (
            <motion.div key={feature.id} variants={cardVariants}>
              <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-border/20 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
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
            Ready to revolutionize your teaching experience?
          </p>
          <Link href={"/teacher/dashboard"} target="_blank">
            <Button size={"lg"}>View Teacher Dashboard</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeacherFeatures;
