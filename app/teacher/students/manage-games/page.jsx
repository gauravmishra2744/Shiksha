"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Gamepad,
  Play,
  Pause,
  Eye,
  EyeOff,
  Settings,
  Plus,
  Trash2,
  Edit,
  Users,
  Trophy,
  Target,
  Brain,
  Calculator,
  Book,
  Puzzle,
  Lightbulb,
  Zap,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Globe,
  Wifi,
  WifiOff,
  Save,
  RefreshCw,
  Calendar,
  Award,
  Activity,
  Layers,
  MoreVertical,
} from "lucide-react";

// Comprehensive games data
const gamesData = [
  {
    id: 1,
    name: "Play Quizzes",
    description: "Interactive quizzes across multiple subjects",
    category: "Educational",
    type: "Quiz",
    icon: Brain,
    isActive: true,
    requiresOnline: true,
    difficulty: "Medium",
    estimatedTime: "15-30 minutes",
    subjects: ["Math", "Science", "English", "History"],
    totalPlayers: 1245,
    averageScore: 78,
    completionRate: 85,
    features: ["Multiple Choice", "Timed Questions", "Progress Tracking"],
    ageGroup: "8-18 years",
    language: ["English", "Hindi"],
  },
  {
    id: 2,
    name: "Lab Simulator",
    description: "Virtual science laboratory experiments",
    category: "Simulation",
    type: "Educational",
    icon: Activity,
    isActive: true,
    requiresOnline: false,
    difficulty: "Hard",
    estimatedTime: "30-60 minutes",
    subjects: ["Physics", "Chemistry", "Biology"],
    totalPlayers: 892,
    averageScore: 82,
    completionRate: 76,
    features: ["Virtual Experiments", "Safety Guidelines", "Results Analysis"],
    ageGroup: "12-18 years",
    language: ["English"],
  },
  {
    id: 3,
    name: "Logic Puzzle",
    description: "Brain training puzzles to enhance logical thinking",
    category: "Puzzle",
    type: "Brain Training",
    icon: Puzzle,
    isActive: true,
    requiresOnline: false,
    difficulty: "Medium",
    estimatedTime: "10-20 minutes",
    subjects: ["Logic", "Math"],
    totalPlayers: 2156,
    averageScore: 71,
    completionRate: 92,
    features: ["Progressive Difficulty", "Hints System", "Time Challenge"],
    ageGroup: "6-16 years",
    language: ["English", "Hindi", "Regional"],
  },
  {
    id: 4,
    name: "Math Puzzle",
    description: "Fun mathematical challenges and problem solving",
    category: "Educational",
    type: "Math",
    icon: Calculator,
    isActive: false,
    requiresOnline: false,
    difficulty: "Easy",
    estimatedTime: "5-15 minutes",
    subjects: ["Mathematics"],
    totalPlayers: 1876,
    averageScore: 69,
    completionRate: 88,
    features: ["Visual Math", "Step-by-Step Solutions", "Practice Mode"],
    ageGroup: "6-14 years",
    language: ["English", "Hindi"],
  },
  {
    id: 5,
    name: "Memory Match",
    description: "Memory enhancement game with educational content",
    category: "Memory",
    type: "Cognitive",
    icon: Brain,
    isActive: true,
    requiresOnline: false,
    difficulty: "Easy",
    estimatedTime: "5-10 minutes",
    subjects: ["General Knowledge", "Vocabulary"],
    totalPlayers: 3421,
    averageScore: 74,
    completionRate: 95,
    features: ["Visual Memory", "Audio Cues", "Difficulty Scaling"],
    ageGroup: "4-12 years",
    language: ["English", "Hindi", "Regional"],
  },
  {
    id: 6,
    name: "Word Building",
    description: "Vocabulary building and word formation games",
    category: "Language",
    type: "Educational",
    icon: Book,
    isActive: true,
    requiresOnline: false,
    difficulty: "Medium",
    estimatedTime: "10-25 minutes",
    subjects: ["English", "Vocabulary"],
    totalPlayers: 1654,
    averageScore: 76,
    completionRate: 87,
    features: ["Word Dictionary", "Spelling Check", "Pronunciation Guide"],
    ageGroup: "8-16 years",
    language: ["English", "Hindi"],
  },
  {
    id: 7,
    name: "Flashcards",
    description: "Interactive flashcards for quick revision",
    category: "Study Tool",
    type: "Educational",
    icon: Layers,
    isActive: true,
    requiresOnline: false,
    difficulty: "Easy",
    estimatedTime: "5-20 minutes",
    subjects: ["All Subjects"],
    totalPlayers: 2890,
    averageScore: 81,
    completionRate: 91,
    features: ["Custom Cards", "Spaced Repetition", "Progress Tracking"],
    ageGroup: "6-18 years",
    language: ["English", "Hindi", "Regional"],
  },
  {
    id: 8,
    name: "Compete",
    description: "Multiplayer competitive games and tournaments",
    category: "Competitive",
    type: "Multiplayer",
    icon: Trophy,
    isActive: false,
    requiresOnline: true,
    difficulty: "Hard",
    estimatedTime: "20-45 minutes",
    subjects: ["All Subjects"],
    totalPlayers: 756,
    averageScore: 85,
    completionRate: 73,
    features: ["Real-time Competition", "Leaderboards", "Tournaments"],
    ageGroup: "10-18 years",
    language: ["English", "Hindi"],
  },
];

// Class data for filtering
const classesData = [
  { id: "all", name: "All Classes", students: 1250 },
  { id: "grade-6", name: "Grade 6", students: 150 },
  { id: "grade-7", name: "Grade 7", students: 145 },
  { id: "grade-8", name: "Grade 8", students: 140 },
  { id: "grade-9", name: "Grade 9", students: 135 },
  { id: "grade-10", name: "Grade 10", students: 130 },
  { id: "grade-11", name: "Grade 11", students: 125 },
  { id: "grade-12", name: "Grade 12", students: 120 },
];

export default function AddGamesPage() {
  const [games, setGames] = useState(gamesData);
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [selectedGame, setSelectedGame] = useState(null);

  const toggleGameStatus = async (gameId) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setGames((prev) =>
        prev.map((game) =>
          game.id === gameId ? { ...game, isActive: !game.isActive } : game
        )
      );

      const game = games.find((g) => g.id === gameId);
      setMessage(
        `Game "${game.name}" ${
          game.isActive ? "disabled" : "enabled"
        } successfully!`
      );
      setMessageType("success");
    } catch (error) {
      console.error("Error toggling game status:", error);
      setMessage("Error updating game status. Please try again.");
      setMessageType("error");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateGameForClass = async (gameId, classId, isEnabled) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update game class availability logic here
      setMessage(
        `Game access ${isEnabled ? "granted" : "revoked"} for ${
          classesData.find((c) => c.id === classId)?.name
        }!`
      );
      setMessageType("success");
    } catch (error) {
      console.error("Error updating game for class:", error);
      setMessage("Error updating game access. Please try again.");
      setMessageType("error");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const getGameStats = () => {
    const totalGames = games.length;
    const activeGames = games.filter((game) => game.isActive).length;
    const inactiveGames = totalGames - activeGames;
    const onlineGames = games.filter((game) => game.requiresOnline).length;
    const offlineGames = totalGames - onlineGames;

    return {
      totalGames,
      activeGames,
      inactiveGames,
      onlineGames,
      offlineGames,
    };
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || game.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(games.map((game) => game.category))];
  const stats = getGameStats();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 pt-0">
          {/* Header Section - Enhanced Mobile */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="p-2 sm:p-3 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-800 flex-shrink-0 self-start sm:self-auto">
                  <Gamepad className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight break-words">
                    Game Management
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Control student access to educational games and activities
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                >
                  <Gamepad className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden xs:inline">
                    {stats.totalGames} Total Games
                  </span>
                  <span className="xs:hidden">{stats.totalGames}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 text-xs"
                >
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden xs:inline">
                    {stats.activeGames} Active
                  </span>
                  <span className="xs:hidden">{stats.activeGames}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 border-gray-200 text-xs"
                >
                  <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden xs:inline">
                    {stats.inactiveGames} Inactive
                  </span>
                  <span className="xs:hidden">{stats.inactiveGames}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200 text-xs"
                >
                  <Wifi className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden xs:inline">
                    {stats.onlineGames} Online
                  </span>
                  <span className="xs:hidden">{stats.onlineGames}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats - Enhanced Responsive Grid */}
          <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
              <CardContent className="p-2 sm:p-3 md:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-3 flex-shrink-0">
                    <Gamepad className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {stats.totalGames}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Games
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
              <CardContent className="p-2 sm:p-3 md:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-3 flex-shrink-0">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {stats.activeGames}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-green-700 dark:text-green-300 font-medium">
                      Active Games
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800/50 h-20 sm:h-24">
              <CardContent className="p-2 sm:p-3 md:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/50 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-3 flex-shrink-0">
                    <Pause className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-gray-200 truncate">
                      {stats.inactiveGames}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Inactive Games
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-20 sm:h-24">
              <CardContent className="p-2 sm:p-3 md:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-2.5 lg:p-3 flex-shrink-0">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {classesData.find((c) => c.id === "all")?.students || 0}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Total Students
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls and Filters - Mobile Optimized */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {/* Search Bar - Full width on mobile */}
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classesData.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden xs:inline">Export</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden xs:inline">Analytics</span>
                    </Button>
                  </div>
                </div>

                {/* Message Display */}
                {message && (
                  <div
                    className={`flex items-center space-x-2 p-2 sm:p-3 rounded-lg text-sm ${
                      messageType === "success"
                        ? "text-green-600 bg-green-50"
                        : messageType === "error"
                        ? "text-red-600 bg-red-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {messageType === "success" ? (
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    ) : messageType === "error" ? (
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Gamepad className="h-4 w-4 flex-shrink-0" />
                    )}
                    <span className="break-words">{message}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs - Mobile Responsive */}
          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto bg-white dark:bg-gray-800 border shadow-sm p-1">
              <TabsTrigger
                value="manage"
                className="text-[10px] xs:text-xs sm:text-sm py-2 px-1"
              >
                <Settings className="mr-0.5 xs:mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden">Manage</span>
                <span className="hidden sm:inline">Manage Games</span>
                <span className="sm:hidden">Mgmt</span>
              </TabsTrigger>
              <TabsTrigger
                value="classes"
                className="text-[10px] xs:text-xs sm:text-sm py-2 px-1"
              >
                <Users className="mr-0.5 xs:mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden">Classes</span>
                <span className="hidden sm:inline">Class Access</span>
                <span className="sm:hidden">Class</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="text-[10px] xs:text-xs sm:text-sm py-2 px-1"
              >
                <BarChart3 className="mr-0.5 xs:mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden">Stats</span>
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            {/* Manage Games Tab - Mobile Responsive */}
            <TabsContent
              value="manage"
              className="space-y-3 sm:space-y-4 mt-3 sm:mt-4"
            >
              <Card className="border-0 shadow-sm">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Gamepad className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    <span>Game Control Panel</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Enable or disable games for students and manage game
                    settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {filteredGames.map((game) => {
                      const Icon = game.icon;
                      return (
                        <div
                          key={game.id}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors space-y-3 sm:space-y-0"
                        >
                          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                            <div
                              className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                                game.isActive
                                  ? "bg-green-100 dark:bg-green-900/50"
                                  : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <Icon
                                className={`h-5 w-5 sm:h-6 sm:w-6 ${
                                  game.isActive
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-400"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-start sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                <h3 className="font-semibold text-sm sm:text-base break-words">
                                  {game.name}
                                </h3>
                                {game.requiresOnline && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] xs:text-xs"
                                  >
                                    <Wifi className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                                    Online
                                  </Badge>
                                )}
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] xs:text-xs"
                                >
                                  {game.category}
                                </Badge>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 break-words">
                                {game.description}
                              </p>
                              <div className="grid grid-cols-2 sm:flex sm:items-center gap-1 sm:gap-4 text-[10px] xs:text-xs text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {game.totalPlayers} players
                                  </span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {game.estimatedTime}
                                  </span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Target className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {game.averageScore}% avg
                                  </span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Trophy className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">
                                    {game.completionRate}% done
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-shrink-0">
                            <div className="text-center sm:text-left">
                              <Badge
                                variant={
                                  game.isActive ? "default" : "secondary"
                                }
                                className="mb-1 text-xs"
                              >
                                {game.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <div className="text-[10px] xs:text-xs text-gray-500">
                                {game.isActive
                                  ? "Students can play"
                                  : "Hidden from students"}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 justify-center sm:justify-start">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="neutral"
                                    className="flex-1 sm:flex-none"
                                  >
                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    <span className="hidden xs:inline">
                                      Details
                                    </span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                                      <span className="break-words">
                                        {game.name}
                                      </span>
                                    </DialogTitle>
                                    <DialogDescription className="text-xs sm:text-sm">
                                      Detailed information and settings for{" "}
                                      {game.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 sm:gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                      <div>
                                        <h4 className="font-medium mb-2 text-sm sm:text-base">
                                          Game Information
                                        </h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                          <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                              Category:
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {game.category}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Type:
                                            </span>
                                            <span className="text-right break-words">
                                              {game.type}
                                            </span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                              Difficulty:
                                            </span>
                                            <Badge
                                              variant={
                                                game.difficulty === "Easy"
                                                  ? "secondary"
                                                  : game.difficulty === "Medium"
                                                  ? "default"
                                                  : "destructive"
                                              }
                                              className="text-xs"
                                            >
                                              {game.difficulty}
                                            </Badge>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Age Group:
                                            </span>
                                            <span className="text-right break-words">
                                              {game.ageGroup}
                                            </span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                              Connectivity:
                                            </span>
                                            <Badge
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {game.requiresOnline ? (
                                                <>
                                                  <Wifi className="w-2.5 h-2.5 mr-1" />
                                                  Online
                                                </>
                                              ) : (
                                                <>
                                                  <WifiOff className="w-2.5 h-2.5 mr-1" />
                                                  Offline
                                                </>
                                              )}
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-medium mb-2 text-sm sm:text-base">
                                          Performance Stats
                                        </h4>
                                        <div className="space-y-2 text-xs sm:text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Total Players:
                                            </span>
                                            <span className="font-medium">
                                              {game.totalPlayers}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Average Score:
                                            </span>
                                            <span className="font-medium">
                                              {game.averageScore}%
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Completion Rate:
                                            </span>
                                            <span className="font-medium">
                                              {game.completionRate}%
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Time Required:
                                            </span>
                                            <span className="font-medium text-right break-words">
                                              {game.estimatedTime}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2 text-sm sm:text-base">
                                        Subjects Covered
                                      </h4>
                                      <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {game.subjects.map((subject, index) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {subject}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2 text-sm sm:text-base">
                                        Features
                                      </h4>
                                      <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {game.features.map((feature, index) => (
                                          <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs"
                                          >
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2 text-sm sm:text-base">
                                        Languages Available
                                      </h4>
                                      <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {game.language.map((lang, index) => (
                                          <Badge
                                            key={index}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            <Globe className="w-2.5 h-2.5 mr-1" />
                                            {lang}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <div className="flex items-center justify-center">
                                <Switch
                                  checked={game.isActive}
                                  onCheckedChange={() =>
                                    toggleGameStatus(game.id)
                                  }
                                  disabled={loading}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Class Access Tab - Mobile Responsive */}
            <TabsContent
              value="classes"
              className="space-y-3 sm:space-y-4 mt-3 sm:mt-4"
            >
              <Card className="border-0 shadow-sm">
                <CardHeader className="p-3 sm:p-4 md:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span>Class-wise Game Access</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Configure which games are available to specific classes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
                  <div className="grid gap-4 sm:gap-6">
                    {classesData.slice(1).map((classItem) => (
                      <Card
                        key={classItem.id}
                        className="border border-border/50 bg-secondary-background shadow-sm"
                      >
                        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                          <CardTitle className="text-sm sm:text-base md:text-lg flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                              <span className="break-words">
                                {classItem.name}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {classItem.students} students
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant=""
                              className="w-full sm:w-auto"
                            >
                              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              Configure All
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 sm:p-4 pt-0">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {games
                              .filter((game) => game.isActive)
                              .map((game) => {
                                const Icon = game.icon;
                                return (
                                  <div
                                    key={game.id}
                                    className="flex items-center justify-between p-2 sm:p-3 border rounded-lg bg-gray-50 dark:bg-gray-800/50"
                                  >
                                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                                      <div className="min-w-0">
                                        <p className="font-medium text-xs sm:text-sm truncate">
                                          {game.name}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-1">
                                          <Badge
                                            variant="outline"
                                            className="text-[10px]"
                                          >
                                            {game.category}
                                          </Badge>
                                          {game.requiresOnline && (
                                            <Badge
                                              variant="outline"
                                              className="text-[10px]"
                                            >
                                              <Wifi className="w-2 h-2 mr-0.5" />
                                              Online
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <Switch
                                      defaultChecked={Math.random() > 0.3}
                                      onCheckedChange={(checked) =>
                                        updateGameForClass(
                                          game.id,
                                          classItem.id,
                                          checked
                                        )
                                      }
                                      disabled={loading}
                                      className="flex-shrink-0"
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab - Mobile Responsive */}
            <TabsContent
              value="analytics"
              className="space-y-3 sm:space-y-4 mt-3 sm:mt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {games.map((game) => {
                  const Icon = game.icon;
                  return (
                    <Card key={game.id} className="border-0 shadow-sm">
                      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                        <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                          <span className="break-words flex-1 min-w-0">
                            {game.name}
                          </span>
                          <Badge
                            variant={game.isActive ? "default" : "secondary"}
                            className="text-[10px] xs:text-xs flex-shrink-0"
                          >
                            {game.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 pt-0">
                        <div className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="text-center">
                              <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
                                {game.totalPlayers}
                              </div>
                              <div className="text-[10px] xs:text-xs text-gray-600">
                                Total Players
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                                {game.averageScore}%
                              </div>
                              <div className="text-[10px] xs:text-xs text-gray-600">
                                Avg Score
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                              <span>Completion Rate</span>
                              <span className="font-medium">
                                {game.completionRate}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                              <div
                                className="bg-green-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                                style={{ width: `${game.completionRate}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="pt-2 space-y-2">
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-gray-600">Category:</span>
                              <Badge
                                variant="outline"
                                className="text-[10px] xs:text-xs"
                              >
                                {game.category}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-gray-600">Difficulty:</span>
                              <Badge
                                variant={
                                  game.difficulty === "Easy"
                                    ? "secondary"
                                    : game.difficulty === "Medium"
                                    ? "default"
                                    : "destructive"
                                }
                                className="text-[10px] xs:text-xs"
                              >
                                {game.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
