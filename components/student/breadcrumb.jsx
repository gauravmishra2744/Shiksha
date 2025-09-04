"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");

    const breadcrumbs = [];

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Format segment for display
      const formatSegment = (seg) => {
        return seg
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };

      // Custom labels for specific routes
      const customLabels = {
        student: "Student Portal",
        dashboard: "Dashboard",
        subjects: "Subjects",
        notebook: "Notebook",
        "make-notes": "Make Notes",
        "view-notes": "View Notes",
        flashcard: "Flashcards",
        productivity: "Productivity",
        "to-do": "To-Do List",
        pomodoro: "Pomodoro Timer",
        game: "Games",
        quiz: "Quiz",
        flashcards: "Flashcards",
        compete: "Compete",
        doubts: "Ask Doubts",
        classrooms: "Classrooms",
        badges: "Badges",
        mathematics: "Mathematics",
        physics: "Physics",
        chemistry: "Chemistry",
        biology: "Biology",
        "computer-science": "Computer Science",
        english: "English",
      };

      const label = customLabels[segment] || formatSegment(segment);

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {crumb.isLast ? (
                <BreadcrumbPage className="flex items-center gap-2">
                  {crumb.icon}
                  {crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={crumb.href}
                  className="flex items-center gap-2 hover:text-main transition-colors"
                >
                  {crumb.icon}
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!crumb.isLast && (
              <BreadcrumbSeparator
                className={index === 0 ? "hidden md:block" : ""}
              />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};

export default DynamicBreadcrumb;
