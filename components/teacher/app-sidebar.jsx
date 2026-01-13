"use client";

import {
  BookOpen,
  ChevronRight,
  Folder,
  Home,
  LogOut,
  User2,
  Brain,
  MessageSquare,
  BarChart3,
  CheckSquare,
  HomeIcon,
  UserPen,
  School,
} from "lucide-react";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

// Teacher-specific sidebar data (keeps student sidebar untouched)
const data = {
  user: {
    name: "Teacher",
    email: "teacher@example.com",
    avatar: "/avatars/teacher.jpg",
  },
  teams: [
    {
      name: "Acedimate",
      logo: User2,
      plan: "Teacher Portal",
    },
  ],
  navMain: [
    {
      title: "Overview",
      icon: Home,
      items: [{ title: "Overview", url: "/teacher/dashboard" }],
    },
    {
      title: "AI Assistant",
      icon: Brain,
      items: [
        { title: "Lesson Planner", url: "/teacher/ai/lesson-planner" },
        { title: "Quiz Generator", url: "/teacher/ai/quiz-generator" },
        { title: "Grading Assistant", url: "/teacher/ai/grading" },
      ],
    },
    {
      title: "Classrooms",
      icon: BookOpen,
      items: [
        { title: "Create a Classroom", url: "/teacher/classrooms/create" },
        { title: "View all classrooms", url: "/teacher/classrooms" },
        { title: "Virtual Sessions", url: "/teacher/classrooms/virtual" },
      ],
    },
    {
      title: "Content",
      icon: Folder,
      items: [
        { title: "Add content", url: "/teacher/content/add" },
        { title: "Upload Notes", url: "/teacher/content/notes" },
        { title: "Add Notice", url: "/teacher/content/notice" },
        { title: "Clear Doubts", url: "/teacher/content/doubts" },
      ],
    },
    {
      title: "Students",
      icon: User2,
      items: [
        { title: "View Students", url: "/teacher/students" },
        { title: "Performance", url: "/teacher/students/performance" },
        { title: "Attendance", url: "/teacher/students/attendance" },
        { title: "Give Badges", url: "/teacher/students/badges" },
        { title: "Manage Games", url: "/teacher/students/manage-games" },
      ],
    },
    {
      title: "Assessments",
      icon: CheckSquare,
      items: [
        { title: "Create Assessment", url: "/teacher/assessments/create" },
        { title: "Auto-Grading", url: "/teacher/assessments/auto-grading" },
        { title: "Question Bank", url: "/teacher/assessments/question-bank" },
      ],
    },
    {
      title: "Analytics",
      icon: BarChart3,
      items: [
        {
          title: "Performance Analytics",
          url: "/teacher/analytics/performance",
        },
        { title: "Engagement Metrics", url: "/teacher/analytics/engagement" },
      ],
    },
    {
      title: "Communication",
      icon: MessageSquare,
      items: [
        { title: "Discussion Forums", url: "/teacher/communication/forums" },
        { title: "Parent Portal", url: "/teacher/communication/parent-portal" },
      ],
    },
  ],
};

export function AppSidebar(props) {
  const { isMobile } = useSidebar();
  const [activeTeam] = React.useState(data.teams[0]);
  const pathname = usePathname();

  // State to track which sections are open
  const [openSections, setOpenSections] = React.useState({});

  // Determine which section should be open based on current pathname
  const getActiveSectionFromPath = React.useCallback((path) => {
    for (const item of data.navMain) {
      if (item.items?.some((subItem) => path.startsWith(subItem.url))) {
        return item.title;
      }
    }
    return null;
  }, []);

  // Initialize open sections based on current path
  React.useEffect(() => {
    const activeSection = getActiveSectionFromPath(pathname);
    if (activeSection) {
      setOpenSections((prev) => ({
        ...prev,
        [activeSection]: true,
      }));
    }
  }, [pathname, getActiveSectionFromPath]);

  if (!activeTeam) return null;

  const isActiveLink = (url) => pathname === url;

  const isSectionActive = (item) => {
    return item.items?.some((subItem) => pathname.startsWith(subItem.url));
  };

  const handleSectionToggle = (sectionTitle, currentState) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !currentState,
    }));
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
                <SidebarMenuButton className="py-5 pb-[1.4rem] bg-main outline-border/80 dark:text-background ">
                  <div className="flex aspect-square items-center justify-center rounded-base">
                    <activeTeam.logo className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-heading uppercase">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const isOpen = openSections[item.title] || isSectionActive(item);

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  open={isOpen}
                  onOpenChange={(open) =>
                    handleSectionToggle(item.title, isOpen)
                  }
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="mb-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.url}
                                className={`${
                                  isActiveLink(subItem.url)
                                    ? "bg-main text-main-foreground"
                                    : ""
                                }`}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png?size=40"
                      alt="T"
                    />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-heading">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-base">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png?size=40"
                        alt="T"
                      />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-heading">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link
                  href={"/teacher/profile"}
                  className="inline-flex gap-2 w-full"
                >
                  <DropdownMenuItem className={"w-full"}>
                    <UserPen />
                    Manage Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={"/"} className="inline-flex gap-2 w-full">
                  <DropdownMenuItem className={"w-full"}>
                    <HomeIcon />
                    Homepage
                  </DropdownMenuItem>
                </Link>
                 <Link href={"/student/dashboard"} className="inline-flex gap-2 w-full">
                    <DropdownMenuItem className={"w-full"}>
                      <School />
                      Student
                    </DropdownMenuItem>
                  </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
