"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Gamepad2, Trophy, Brain, Users } from "lucide-react";

const AboutComponent = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const coreFeatures = [
    "Gamified Learning Experience",
    "AI-Powered Lesson Planning",
    "Interactive Quiz Generation",
    "Real-time Progress Analytics",
    "Virtual Classroom Environment",
    "Smart Grade Management",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-secondary-background border-t-2 border-b-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-left pb-8 sm:pb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3">
            Why Choose{" "}
            <span className="bg-main/80 rounded-md px-3 py-0 leading-snug">
              Acedimate
            </span>
          </h1>
          <p className="text-muted-foreground tracking-wide text-sm sm:text-base max-w-lg sm:max-w-xl leading-snug">
            We're revolutionizing education by gamifying the learning
            experience, making education engaging, interactive, and
            achievement-driven for students.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div
          ref={containerRef}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 sm:mb-16"
        >
          {/* Left Side - Gamified Learning Focus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
              Gamifying Education for Better Outcomes
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              Our platform transforms traditional learning into an exciting
              gaming experience where students earn rewards, compete with peers,
              and unlock achievements. Combined with AI-powered tools for
              educators, we create the perfect learning ecosystem.
            </p>

            <div className="space-y-3">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle className="h-4 w-4 text-main flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Platform Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-main/5 rounded-xl p-4 lg:p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-main/10 p-2 rounded-lg">
                  <Gamepad2 className="h-5 w-5 text-main" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Engaging Gamification
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Turn learning into an adventure with points, badges,
                leaderboards, and interactive challenges.
              </p>
            </div>

            <div className="bg-main/5 rounded-xl p-4 lg:p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-main/10 p-2 rounded-lg">
                  <Brain className="h-5 w-5 text-main" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  AI-Powered Teaching
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Intelligent lesson planning, automated quiz generation, and
                smart analytics for educators.
              </p>
            </div>

            <div className="bg-main/5 rounded-xl p-4 lg:p-5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-main/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-main" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Multi-Portal System
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Dedicated dashboards for students and teachers, with coordinator
                portal coming soon.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Platform Portals */}
        <motion.div
          className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center bg-main/5 rounded-xl p-4 sm:p-6">
            <div className="bg-main/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Gamepad2 className="h-6 w-6 text-main" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Student Portal
            </h4>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Gamified learning with achievements, progress tracking, and
              interactive content.
            </p>
          </div>

          <div className="text-center bg-main/5 rounded-xl p-4 sm:p-6">
            <div className="bg-main/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-main" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Teacher Portal
            </h4>
            <p className="text-muted-foreground text-xs sm:text-sm">
              AI-powered tools for lesson planning, assessment creation, and
              classroom management.
            </p>
          </div>

          <div className="text-center bg-main/5 rounded-xl p-4 sm:p-6">
            <div className="bg-main/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-6 w-6 text-main" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Coordinator Portal
            </h4>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Coming soon - Advanced analytics and institutional management
              features.
            </p>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="text-center bg-gradient-to-r from-main/5 to-main/10 rounded-2xl p-6 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-foreground">
            Our Mission
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            To transform education through gamification and AI technology,
            making learning as engaging as playing your favorite game. We
            empower educators with intelligent tools while inspiring students to
            achieve their goals through interactive, reward-based learning
            experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutComponent;
