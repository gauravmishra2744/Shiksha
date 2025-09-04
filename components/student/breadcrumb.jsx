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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

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

      // Format segment for display - automatic conversion
      const formatSegment = (seg) => {
        // Handle URL encoded segments
        const decoded = decodeURIComponent(seg);

        // Convert kebab-case, snake_case, and camelCase to Title Case
        return decoded
          .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
          .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters in camelCase
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      };

      const label = formatSegment(segment);

      breadcrumbs.push({
        label,
        href: currentPath,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="flex h-15 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-2 dark:border-border mb-2 sticky top-0 backdrop-blur-sm z-50 bg-main/15">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />

        {pathname === "/" ? (
          <div className="flex items-center justify-end w-full">
            <ModeToggle />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <ShadcnBreadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbItem
                      className={index === 0 ? "hidden md:block" : ""}
                    >
                      {crumb.isLast ? (
                        <BreadcrumbPage className="flex items-center gap-2 text-foreground dark:text-foreground">
                          {crumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={crumb.href}
                          className="flex items-center gap-2 hover:text-main dark:hover:text-main transition-colors"
                        >
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

            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  );
};

export default DynamicBreadcrumb;
