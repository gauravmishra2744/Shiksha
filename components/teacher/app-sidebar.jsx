"use client";

import {
  Bell,
  BookOpen,
  ChevronRight,
  Folder,
  Home,
  LogOut,
  MoreHorizontal,
  Notebook,
  PieChart,
  User2,
  Map,
  Settings2,
  BadgeCheck,
  CreditCard,
  Sparkles,
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
      name: "Faculty",
      logo: User2,
      plan: "Teacher Portal",
    },
  ],
  navMain: [
    {
      title: "Overview",
      icon: Home,
      isActive: true,
      items: [{ title: "Overview", url: "/teacher/dashboard" }],
    },
    {
      title: "Classrooms",
      icon: BookOpen,
      items: [
        { title: "Create a Classroom", url: "/teacher/classrooms/create" },
        { title: "View all classrooms", url: "/teacher/classrooms" },
      ],
    },
    {
      title: "Content",
      icon: Folder,
      items: [
        { title: "Add content", url: "/teacher/content/add" },
        { title: "Upload Notes", url: "/teacher/content/notes" },
        { title: "Add Notice", url: "/teacher/content/notice" },
        { title: "Clear Doubts", url: "/teacher/doubts" },
      ],
    },
    {
      title: "Students",
      icon: User2,
      items: [
        { title: "View students", url: "/teacher/students" },
        { title: "Upload study content", url: "/teacher/students/upload" },
        { title: "CRUD on students", url: "/teacher/students/manage" },
        { title: "Give Badges", url: "/teacher/students/badges" },
        { title: "Attendance / Report Card", url: "/teacher/students/attendance" },
        { title: "Make a student Coordinate", url: "/teacher/students/coordinate" },
        { title: "Fun tasks / Daily missions", url: "/teacher/students/missions" },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [{ title: "Account", url: "/teacher/settings" }],
    },
  ],
};

export function AppSidebar(props) {
  const { isMobile } = useSidebar();
  const [activeTeam] = React.useState(data.teams[0]);
  const pathname = usePathname();

  if (!activeTeam) return null;

  const isActiveLink = (url) => pathname === url;

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
                    <span className="truncate font-heading">{activeTeam.name}</span>
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
            {data.navMain.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
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
                            <Link href={subItem.url} className={`${isActiveLink(subItem.url) ? "bg-main text-main-foreground" : ""}`}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
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
                    <AvatarImage src="https://github.com/shadcn.png?size=40" alt="T" />
                    <AvatarFallback>T</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-heading">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
                <DropdownMenuLabel className="p-0 font-base">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png?size=40" alt="T" />
                      <AvatarFallback>T</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-heading">{data.user.name}</span>
                      <span className="truncate text-xs">{data.user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
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
