"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const ScrollingFeatures = () => {
  const featurePairs = [
    {
      id: 1,
      features: [
        {
          title: "Modern Dashboard",
          description:
            "Access a comprehensive and intuitive dashboard that provides real-time insights into your classes, student performance, and teaching analytics.",
          image: "/t1.png",
        },
        {
          title: "AI Lesson Planner",
          description:
            "Create intelligent, personalized lesson plans with AI assistance that adapts to your teaching style and curriculum requirements.",
          image: "/t2.png",
        },
      ],
      bgColor: "bg-main",
      textColor: "text-black",
    },
    {
      id: 2,
      features: [
        {
          title: "View All classes",
          description:
            "Manage and view all your classes in one place with easy navigation, scheduling, and class organization tools.",
          image: "/t3.png",
        },
        {
          title: "Content Management",
          description:
            "Add, Upload and manage all your teaching materials, resources, and digital content in a centralize way for students.",
          image: "/t4.png",
        },
      ],
      bgColor: "bg-white",
      textColor: "text-black",
    },
    {
      id: 3,
      features: [
        {
          title: "Create Assessmemts",
          description:
            "Design and create various types of assessments, quizzes, and tests with customizable question formats and grading rubrics.",
          image: "/t5.png",
        },
        {
          title: "Parent Portal",
          description:
            "Connect with parents through a dedicated portal providing updates on student progress, announcements, and communication tools.",
          image: "/t6.png",
        },
      ],
      bgColor: "bg-main",
      textColor: "text-black",
    },
  ];

  return (
    <ReactLenis root>
      <main>
        <article>
          {/* Hero Section */}
          <section className=" h-screen w-full grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold tracking-tight leading-[110%] mb-4 sm:mb-6 lg:mb-8">
                Empowering{" "}
                <span className="bg-main/80 rounded-md px-3 py-0 leading-snug">
                  Teachers
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl  max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed">
                Advanced tools and AI-powered features designed to enhance
                classroom management and student engagement.
              </p>
            </div>
          </section>

          {/* Feature Sections */}
          {featurePairs.map((pair, index) => (
            <section
              key={pair.id}
              className={`${pair.bgColor} ${
                pair.textColor
              } h-screen w-full flex items-center justify-center sticky top-0 ${
                index > 0 ? "rounded-tr-2xl rounded-tl-2xl" : ""
              } overflow-hidden py-6 sm:py-8 lg:py-12`}
            >
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

              <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-20 items-center">
                  {pair.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="space-y-2 sm:space-y-3 lg:space-y-4"
                    >
                      <div className="relative h-44 sm:h-40 md:h-56 lg:h-60 xl:h-64 2xl:h-80 rounded-lg lg:rounded-xl overflow-hidden group border border-border/50">
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundColor: "#8ae600" }}
                        ></div>
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-fill group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        />

                        {/* Feature Number */}
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center ">
                          <span className="font-bold text-xs sm:text-sm lg:text-base text-white">
                            {String(index * 2 + featureIndex + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Feature Content */}
                      <div className="space-y-1 sm:space-y-2 lg:space-y-3">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-tight">
                          <span>{feature.title}</span>
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* Final CTA Section */}
          <section className=" min-h-screen w-full flex items-center justify-center sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden py-12 sm:py-16 lg:py-20 bg-secondary-background">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl  font-bold tracking-tight leading-[110%] mb-4 sm:mb-6 lg:mb-8">
                Ready to Transform Your
                <br className="hidden sm:block" />
                <span style={{ color: "#8ae600" }}>Teaching Experience</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
                Empower your teaching with advanced tools and AI-powered
                features designed to enhance classroom management and student
                engagement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link href="/teacher/dashboard" target="_blank">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold border-0 text-black hover:opacity-90 transition-opacity"
                  >
                    View Teacher Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </ReactLenis>
  );
};

export default ScrollingFeatures;
