"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { Button } from "../ui/button";
import Link from "next/link";
import HorizontalScrollTitle from "./horizontal-scroll-title";
import StackingCards from "./stacking-cards";

const StudentFeaturesComponents = () => {
  const studentFeatures = [
    {
      id: 1,
      title: "Earn Badges While Studying",
      description:
        "Complete learning milestones and achieve academic goals to unlock exclusive badges and rewards that showcase your progress.",
      image: "/l1.png",
      color: "#8ae600",
    },
    {
      id: 2,
      title: "Smart Study Content",
      description:
        "Access AI-powered study materials that adapt to your learning style and provide personalized content recommendations for better understanding.",
      image: "/l2.png",
      color: "#ffffff",
    },
    {
      id: 3,
      title: "Revision Flashcards",
      description:
        "Create and review interactive flashcards to reinforce key concepts and improve retention through spaced repetition techniques.",
      image: "/l3.png",
      color: "#8ae600",
    },
    {
      id: 4,
      title: "Productivity Tools",
      description:
        "Boost your study efficiency with built-in productivity features like Pomodoro timer and todo lists to manage your tasks effectively.",
      image: "/l4.png",
      color: "#ffffff",
    },
    {
      id: 5,
      title: "Educational Games",
      description:
        "Learn through fun and interactive educational games including quizzes that make studying enjoyable and memorable.",
      image: "/l5.png",
      color: "#8ae600",
    },
    {
      id: 6,
      title: "Competitive Battleground",
      description:
        "Form teams with friends and compete in academic challenges and games to test your knowledge in a fun competitive environment.",
      image: "/l6.png",
      color: "#ffffff",
    },
  ];

  return (
    <ReactLenis root>
      <section className="bg-secondary-background border-t-2 border-b-2">
        {/* Horizontal Scrolling Title */}
        <HorizontalScrollTitle />

        {/* Stacking Cards */}
        <StackingCards features={studentFeatures} />

        {/* Call to Action */}
        <div className="py-16 ">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-muted-foreground text-lg sm:text-xl  md:text-2xl mb-8">
                Ready to transform your learning experience?
              </p>
              <Link href="/student/dashboard">
                <Button size="lg" className="px-8 py-4 text-lg cursor-pointer">
                  View Student Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
};

export default StudentFeaturesComponents;
