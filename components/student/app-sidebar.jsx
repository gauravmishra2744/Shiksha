"use client";

import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  Book,
  BookOpen,
  Bot,
  Brain,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  Gamepad,
  GpuIcon,
  HandHelping,
  HelpCircle,
  Home,
  HomeIcon,
  LogOut,
  Map,
  MoreHorizontal,
  Notebook,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  SwatchBook,
  Target,
  Trash2,
  User2,
  UserPen,
  
} from "lucide-react";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
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

export function AppSidebar({ ...props }) {
  const { isMobile } = useSidebar();
  const { t } = useTranslation();
  const pathname = usePathname();

  // Dynamic data with translations
  const data = {
    user: {
      name: t('user.student'),
      email: "student@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acedimate",
        logo: User2,
        plan: t('user.student') + " Portal",
      },
    ],
    navMain: [
      {
        title: t('common.dashboard'),
        icon: Home,
        items: [
          {
            title: t('common.home'),
            url: "/student/dashboard",
          },
          {
            title: t('classrooms.classrooms'),
            url: "/student/classrooms",
          },
          {
            title: t('classrooms.badges'),
            url: "/student/badges",
          },
        ],
      },
      {
        title: t('common.courses'),
        icon: BookOpen,
        items: [
          {
            title: t('courses.myCourses'),
            url: "/student/courses",
          },
        ],
      },
      {
        title: t('common.study'),
        icon: Book,
        items: [
          {
            title: t('subjects.subjects'),
            url: "/student/subjects",
            hasDropdown: true,
            subjects: [
              { name: t('subjects.mathematics'), url: "/student/subjects/mathematics" },
              { name: t('subjects.physics'), url: "/student/subjects/physics" },
              { name: t('subjects.chemistry'), url: "/student/subjects/chemistry" },
              { name: t('subjects.biology'), url: "/student/subjects/biology" },
              {
                name: t('subjects.computerScience'),
                url: "/student/subjects/computer-science",
              },
              { name: t('subjects.english'), url: "/student/subjects/english" },
            ],
          },
          {
            title: t('subjects.askYourDoubts'),
            url: "/student/doubts",
          },
        ],
      },
      {
        title: t('common.notebook'),
        icon: Notebook,
        items: [
          {
            title: t('notebook.makeNotes'),
            url: "/student/notebook/make-notes",
          },
          {
            title: t('notebook.flashcards'),
            url: "/student/notebook/flashcard",
          },
          {
            title: t('notebook.viewNotes'),
            url: "/student/notebook/view-notes",
          },
        ],
      },
      {
        title: t('common.productivity'),
        icon: Target,
        items: [
          {
            title: t('productivity.todoList'),
            url: "/student/productivity/to-do",
          },
          {
            title: t('productivity.pomodoro'),
            url: "/student/productivity/pomodoro",
          },
        ],
      },
      {
        title: t('Counselling'),
        icon: HandHelping,
        items: [
          {
            title: t('Stream selection'),
            url: "/student/counselling/stream-selection",
          },
          {
            title: t('Subjects Guide'),
            url: "/student/counselling/subjects-guide",
          },
        ],
      },
      {
        title: t('Schemes'),
        icon: SwatchBook,
        items: [
          {
            title: t('Scheme Finder'),
            url: "/student/schemes/scheme-finder",
          },
        ],
      },
      {
        title: t('common.games'),
        icon: Gamepad,
        items: [
          {
            title: t('games.playQuizzes'),
            url: "/student/games/quiz",
          },
          {
            title: t('games.labSimulator'),
            url: "/student/games/lab-simulator",
          },
          {
            title: t('games.logicPuzzle'),
            url: "/student/games/logic-puzzle",
          },
          {
            title: t('games.mathPuzzle'),
            url: "/student/games/math-puzzle",
          },
          {
            title: t('games.memoryMatch'),
            url: "/student/games/memory-match",
          },
          {
            title: t('games.wordBuilding'),
            url: "/student/games/word-building",
          },
          {
            title: t('notebook.flashcards'),
            url: "/student/games/flashcards",
          },
          {
            title: t('games.compete'),
            url: "/student/games/compete",
          },
         
        ],
      },
    ],
  };

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);

  // State to track which sections are open
  const [openSections, setOpenSections] = React.useState({});

  // Determine which section should be open based on current pathname
  const getActiveSectionFromPath = React.useCallback((path) => {
    for (const item of data.navMain) {
      if (
        item.items?.some((subItem) => {
          if (subItem.hasDropdown && subItem.subjects) {
            return (
              subItem.subjects.some((subject) =>
                path.startsWith(subject.url)
              ) || path.startsWith(subItem.url)
            );
          }
          return path.startsWith(subItem.url);
        })
      ) {
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

  if (!activeTeam) {
    return null;
  }

  const isActiveLink = (url) => {
    return pathname === url;
  };

  const isSectionActive = (item) => {
    return item.items?.some((subItem) => {
      if (subItem.hasDropdown && subItem.subjects) {
        return (
          subItem.subjects.some((subject) =>
            pathname.startsWith(subject.url)
          ) || pathname.startsWith(subItem.url)
        );
      }
      return pathname.startsWith(subItem.url);
    });
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
                <SidebarMenuButton
                  size=""
                  className="data-[state=open]:bg-main data-[state=open]:text-main-foreground data-[state=open]:outline-border data-[state=open]:outline-2 py-5 pb-[1.4rem] bg-main outline-border/80 dark:text-background "
                >
                  <div className="flex aspect-square  items-center justify-center rounded-base">
                    <activeTeam.logo className="size-4 " />
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
      <SidebarContent className={""}>
        <SidebarGroup className={"border-b-0"}>
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
                      <SidebarMenuButton
                        className="data-[state=open]:bg-main data-[state=open]: data-[state=open]:text-main-foreground mb-2"
                        tooltip={item.title}
                      >
                        {item.icon && <item.icon />}
                        <span className="">{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            {subItem.hasDropdown ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <SidebarMenuSubButton
                                    className={`w-full justify-between ${
                                      isActiveLink(subItem.url)
                                        ? "bg-main text-main-foreground"
                                        : ""
                                    }`}
                                  >
                                    <span>{subItem.title}</span>
                                    <ChevronRight className="h-4 w-4" />
                                  </SidebarMenuSubButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  side="right"
                                  align="start"
                                  className="w-48"
                                >
                                  {subItem.subjects?.map((subject) => (
                                    <DropdownMenuItem
                                      key={subject.name}
                                      asChild
                                    >
                                      <Link
                                        href={subject.url}
                                        className={`${
                                          isActiveLink(subject.url)
                                            ? "bg-main text-main-foreground"
                                            : ""
                                        }`}
                                      >
                                        <Book className="h-4 w-4 mr-2" />
                                        {subject.name}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : (
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
                            )}
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
        <div className="p-2">
          <LanguageSwitcher />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="group-data-[state=collapsed]:hover:outline-0 group-data-[state=collapsed]:hover:bg-transparent overflow-visible group-data-[collapsible=icon]:hover:bg-transparent"
                  size="lg"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png?size=40"
                      alt="CN"
                    />
                    <AvatarFallback>CN</AvatarFallback>
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
                        alt="CN"
                      />
                      <AvatarFallback>CN</AvatarFallback>
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
                <DropdownMenuGroup>
                  <Link
                    href={"/student/profile"}
                    className="inline-flex gap-2 w-full"
                  >
                    <DropdownMenuItem className={"w-full"}>
                      <UserPen />
                      {t('user.manageProfile')}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={"/"} className="inline-flex gap-2 w-full">
                    <DropdownMenuItem className={"w-full"}>
                      <HomeIcon />
                      {t('user.homepage')}
                    </DropdownMenuItem>
                  </Link>
                   <Link href={"/teacher/dashboard"} className="inline-flex gap-2 w-full">
                    <DropdownMenuItem className={"w-full"}>
                      <GpuIcon />
                      {t('user.teacher')}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  {t('common.logout')}
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
