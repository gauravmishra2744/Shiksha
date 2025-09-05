"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Users,
  BookOpen,
  Brain,
  Target,
  Award,
  Sparkles,
  Mail,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  UserCheck,
  BarChart3,
  FileText,
  Video,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teachersOpen, setTeachersOpen] = useState(false);
  const [studentsOpen, setStudentsOpen] = useState(false);

  const teacherFeatures = [
    {
      title: "AI Lesson Planner",
      description:
        "Create intelligent, personalized lesson plans with AI assistance",
      icon: Brain,
    },
    {
      title: "Quiz Generator",
      description: "Generate smart quizzes and assessments automatically",
      icon: FileText,
    },
    {
      title: "Class Analytics",
      description: "Track student progress with detailed analytics",
      icon: BarChart3,
    },
    {
      title: "Virtual Classroom",
      description: "Conduct interactive online classes seamlessly",
      icon: Video,
    },
    {
      title: "Grade Management",
      description: "Efficient grading and feedback system",
      icon: Award,
    },
    {
      title: "Communication Hub",
      description: "Connect with students and parents easily",
      icon: MessageSquare,
    },
  ];

  const studentFeatures = [
    {
      title: "Interactive Learning",
      description: "Engaging courses with AI-powered personalization",
      icon: Sparkles,
    },
    {
      title: "Smart Study Plans",
      description: "AI-generated study schedules based on your progress",
      icon: Target,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed insights",
      icon: TrendingUp,
    },
    {
      title: "Live Classes",
      description: "Join interactive sessions with expert teachers",
      icon: Video,
    },
    {
      title: "Assignments & Quizzes",
      description: "Complete assignments and practice with smart quizzes",
      icon: BookOpen,
    },
    {
      title: "Peer Collaboration",
      description: "Connect and study with fellow learners",
      icon: Users,
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setTeachersOpen(false);
    setStudentsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-white dark:bg-white dark:border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-xl bg-main/80 px-4 py-1.5 rounded-md border border-border/20 uppercase dark:text-black">
                Acedimate
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu className="bg-main/80 py-0 border border-border/20 rounded-md">
              <NavigationMenuList>
                {/* For Teachers Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                    For Teachers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-main dark:bg-main/80 border border-border/20 ">
                    <div className="grid gap-3 p-6 w-[600px] grid-cols-2 ">
                      {teacherFeatures.map((feature) => (
                        <NavigationMenuLink key={feature.title} asChild>
                          <Link
                            href="/teacher/dashboard"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/20 dark:hover:bg-black/20 focus:bg-white/20 dark:focus:bg-black/20 group"
                          >
                            <div className="flex items-center space-x-2">
                              <feature.icon className="h-4 w-4  group-hover:scale-110 transition-transform" />
                              <div className="text-sm font-medium leading-none ">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug ">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* For Students Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                    For Students
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-main/80 dark:bg-main/80 border border-border/20">
                    <div className="grid gap-3 p-6 w-[600px] grid-cols-2">
                      {studentFeatures.map((feature) => (
                        <NavigationMenuLink key={feature.title} asChild>
                          <Link
                            href="/student/dashboard"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/20 dark:hover:bg-black/20 focus:bg-white/20 dark:focus:bg-black/20 group"
                          >
                            <div className="flex items-center space-x-2 ">
                              <feature.icon className="h-4 w-4  group-hover:scale-110 transition-transform" />
                              <div className="text-sm font-medium leading-none ">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug ">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Feature Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link
                      href="/feature"
                      className="bg-transparent hover:bg-accent/50"
                    >
                      Feature
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link
                      href="/about"
                      className="bg-transparent hover:bg-accent/50"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link
                      href="/contact"
                      className="bg-transparent hover:bg-accent/50"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side - Get Started, Mode Toggle, and Mobile Menu */}
          <div className="flex items-center space-x-3 ">
            <Button asChild size="sm" className="hidden lg:flex">
              <Link href="/login">Get Started</Link>
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant=""
              size="sm"
              className="lg:hidden bg-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className=" " />
              ) : (
                <Menu className="" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <ModeToggle />

            
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/20  dark:text-black">
            <div className="pt-2 pb-3 space-y-1">
              {/* Mobile Teachers Dropdown */}
              <Collapsible open={teachersOpen} onOpenChange={setTeachersOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium  hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors">
                  For Teachers
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      teachersOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  {teacherFeatures.map((feature) => (
                    <Link
                      key={feature.title}
                      href="/teacher/dashboard"
                      className="flex items-center space-x-3 px-3 py-2 text-sm  hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <feature.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-xs text-gray-800">
                          {feature.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile Students Dropdown */}
              <Collapsible open={studentsOpen} onOpenChange={setStudentsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors text-black">
                  For Students
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      studentsOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 space-y-1">
                  {studentFeatures.map((feature) => (
                    <Link
                      key={feature.title}
                      href="/student/dashboard"
                      className="flex items-center space-x-3 px-3 py-2 text-sm  hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <feature.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-xs text-gray-800">
                          {feature.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile Regular Links */}
              <Link
                href="/feature"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-white/20 dark:hover:bg-black/20 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              {/* Mobile Get Started Button */}
              <div className="pt-2">
                <Button asChild className="w-full" onClick={closeMobileMenu}>
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
