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
import {
  Award,
  Star,
  Trophy,
  Medal,
  Crown,
  Zap,
  Heart,
  BookOpen,
  Users,
  Target,
  Lightbulb,
  Shield,
  Gem,
  Search,
  Filter,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Gift,
  Sparkles,
  Plus,
  Eye,
  Trash2,
  Edit,
  Clock,
  Globe,
  Music,
  Palette,
  Code,
  Calculator,
  Atom,
  MapPin,
  Camera,
} from "lucide-react";

// Comprehensive student data with badges
const studentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "2024001",
    email: "aarav.sharma@school.edu",
    class: "Grade 10",
    section: "A",
    avatar: "",
    badges: [
      {
        id: "excellence",
        name: "Excellence",
        earnedDate: "2024-01-10",
        category: "Academic",
      },
      {
        id: "participation",
        name: "Active Participation",
        earnedDate: "2024-01-05",
        category: "Behavioral",
      },
      {
        id: "leadership",
        name: "Leadership",
        earnedDate: "2023-12-20",
        category: "Leadership",
      },
    ],
    totalBadges: 3,
    recentActivity: "Earned Excellence badge for Mathematics",
    performance: 92,
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "2024002",
    email: "priya.patel@school.edu",
    class: "Grade 10",
    section: "A",
    avatar: "",
    badges: [
      {
        id: "improvement",
        name: "Most Improved",
        earnedDate: "2024-01-12",
        category: "Academic",
      },
      {
        id: "creativity",
        name: "Creative Thinking",
        earnedDate: "2024-01-08",
        category: "Creative",
      },
      {
        id: "teamwork",
        name: "Team Player",
        earnedDate: "2024-01-03",
        category: "Collaboration",
      },
      {
        id: "dedication",
        name: "Dedication",
        earnedDate: "2023-12-28",
        category: "Character",
      },
    ],
    totalBadges: 4,
    recentActivity: "Earned Most Improved badge for Science",
    performance: 89,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNumber: "2024003",
    email: "arjun.kumar@school.edu",
    class: "Grade 9",
    section: "B",
    avatar: "",
    badges: [
      {
        id: "sportsmanship",
        name: "Sportsmanship",
        earnedDate: "2024-01-14",
        category: "Sports",
      },
      {
        id: "helping",
        name: "Helping Hand",
        earnedDate: "2024-01-06",
        category: "Character",
      },
    ],
    totalBadges: 2,
    recentActivity: "Earned Sportsmanship badge in Basketball",
    performance: 78,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rollNumber: "2024004",
    email: "sneha.gupta@school.edu",
    class: "Grade 11",
    section: "C",
    avatar: "",
    badges: [
      {
        id: "excellence",
        name: "Excellence",
        earnedDate: "2024-01-13",
        category: "Academic",
      },
      {
        id: "innovation",
        name: "Innovation",
        earnedDate: "2024-01-09",
        category: "Creative",
      },
      {
        id: "leadership",
        name: "Leadership",
        earnedDate: "2024-01-02",
        category: "Leadership",
      },
      {
        id: "mentor",
        name: "Peer Mentor",
        earnedDate: "2023-12-25",
        category: "Leadership",
      },
      {
        id: "research",
        name: "Research Star",
        earnedDate: "2023-12-18",
        category: "Academic",
      },
    ],
    totalBadges: 5,
    recentActivity: "Earned Excellence badge for Physics project",
    performance: 95,
  },
  {
    id: 5,
    name: "Rohit Singh",
    rollNumber: "2024005",
    email: "rohit.singh@school.edu",
    class: "Grade 8",
    section: "A",
    avatar: "",
    badges: [
      {
        id: "participation",
        name: "Active Participation",
        earnedDate: "2024-01-11",
        category: "Behavioral",
      },
      {
        id: "improvement",
        name: "Most Improved",
        earnedDate: "2024-01-04",
        category: "Academic",
      },
    ],
    totalBadges: 2,
    recentActivity: "Earned Active Participation badge",
    performance: 85,
  },
  {
    id: 6,
    name: "Kavya Reddy",
    rollNumber: "2024006",
    email: "kavya.reddy@school.edu",
    class: "Grade 12",
    section: "B",
    avatar: "",
    badges: [
      {
        id: "excellence",
        name: "Excellence",
        earnedDate: "2024-01-15",
        category: "Academic",
      },
      {
        id: "leadership",
        name: "Leadership",
        earnedDate: "2024-01-07",
        category: "Leadership",
      },
      {
        id: "creativity",
        name: "Creative Thinking",
        earnedDate: "2024-01-01",
        category: "Creative",
      },
      {
        id: "community",
        name: "Community Service",
        earnedDate: "2023-12-30",
        category: "Service",
      },
      {
        id: "scholar",
        name: "Scholar",
        earnedDate: "2023-12-22",
        category: "Academic",
      },
      {
        id: "innovation",
        name: "Innovation",
        earnedDate: "2023-12-15",
        category: "Creative",
      },
    ],
    totalBadges: 6,
    recentActivity: "Earned Excellence badge for overall performance",
    performance: 98,
  },
];

// Comprehensive badge types
const badgeTypes = [
  // Academic Badges
  {
    id: "excellence",
    name: "Excellence",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    category: "Academic",
    description: "Outstanding academic performance across subjects",
    points: 100,
  },
  {
    id: "improvement",
    name: "Most Improved",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    category: "Academic",
    description: "Significant progress and improvement shown",
    points: 75,
  },
  {
    id: "scholar",
    name: "Scholar",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    category: "Academic",
    description: "Consistent high academic achievement",
    points: 90,
  },
  {
    id: "research",
    name: "Research Star",
    icon: Target,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    category: "Academic",
    description: "Excellence in research and investigation",
    points: 85,
  },

  // Leadership Badges
  {
    id: "leadership",
    name: "Leadership",
    icon: Crown,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    category: "Leadership",
    description: "Excellent leadership qualities and initiative",
    points: 95,
  },
  {
    id: "mentor",
    name: "Peer Mentor",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    category: "Leadership",
    description: "Helping and mentoring fellow students",
    points: 80,
  },
  {
    id: "captain",
    name: "Team Captain",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    category: "Leadership",
    description: "Leading teams with excellence",
    points: 85,
  },

  // Creative Badges
  {
    id: "creativity",
    name: "Creative Thinking",
    icon: Lightbulb,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    category: "Creative",
    description: "Innovative and creative problem solving",
    points: 70,
  },
  {
    id: "innovation",
    name: "Innovation",
    icon: Gem,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    category: "Creative",
    description: "Creating innovative solutions and ideas",
    points: 90,
  },
  {
    id: "artist",
    name: "Artist",
    icon: Palette,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    category: "Creative",
    description: "Excellence in visual arts and creativity",
    points: 75,
  },

  // Behavioral Badges
  {
    id: "participation",
    name: "Active Participation",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    category: "Behavioral",
    description: "Great class participation and engagement",
    points: 60,
  },
  {
    id: "punctuality",
    name: "Punctuality",
    icon: Clock,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    category: "Behavioral",
    description: "Consistent punctuality and time management",
    points: 50,
  },
  {
    id: "attendance",
    name: "Perfect Attendance",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    category: "Behavioral",
    description: "Perfect or near-perfect attendance record",
    points: 65,
  },

  // Character Badges
  {
    id: "dedication",
    name: "Dedication",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    category: "Character",
    description: "Showing dedication and commitment",
    points: 70,
  },
  {
    id: "helping",
    name: "Helping Hand",
    icon: Gift,
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    category: "Character",
    description: "Always ready to help others",
    points: 65,
  },
  {
    id: "integrity",
    name: "Integrity",
    icon: Shield,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    category: "Character",
    description: "Demonstrating honesty and integrity",
    points: 80,
  },

  // Collaboration Badges
  {
    id: "teamwork",
    name: "Team Player",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    category: "Collaboration",
    description: "Great collaboration and teamwork skills",
    points: 70,
  },
  {
    id: "communication",
    name: "Great Communicator",
    icon: Globe,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    category: "Collaboration",
    description: "Excellent communication skills",
    points: 75,
  },

  // Sports Badges
  {
    id: "sportsmanship",
    name: "Sportsmanship",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    category: "Sports",
    description: "Excellent sportsmanship and fair play",
    points: 70,
  },
  {
    id: "athlete",
    name: "Star Athlete",
    icon: Medal,
    color: "text-gold-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    category: "Sports",
    description: "Outstanding athletic performance",
    points: 85,
  },

  // Service Badges
  {
    id: "community",
    name: "Community Service",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    category: "Service",
    description: "Contributing to community service",
    points: 80,
  },
  {
    id: "volunteer",
    name: "Volunteer",
    icon: Gift,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    category: "Service",
    description: "Active volunteering and service",
    points: 75,
  },

  // Subject-specific Badges
  {
    id: "math-wizard",
    name: "Math Wizard",
    icon: Calculator,
    color: "text-blue-800",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    category: "Subject",
    description: "Excellence in Mathematics",
    points: 85,
  },
  {
    id: "science-star",
    name: "Science Star",
    icon: Atom,
    color: "text-green-800",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    category: "Subject",
    description: "Outstanding performance in Science",
    points: 85,
  },
  {
    id: "tech-guru",
    name: "Tech Guru",
    icon: Code,
    color: "text-indigo-800",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    category: "Subject",
    description: "Excellence in Technology and Computing",
    points: 90,
  },
];

export default function BadgesPage() {
  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  const awardBadge = async () => {
    if (!selectedStudent || !selectedBadge) {
      setMessage("Please select both student and badge");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const badge = badgeTypes.find((b) => b.id === selectedBadge);
      const newBadge = {
        id: selectedBadge,
        name: badge.name,
        earnedDate: new Date().toISOString().split("T")[0],
        category: badge.category,
      };

      // Update student badges
      setStudents((prev) =>
        prev.map((student) =>
          student.id.toString() === selectedStudent
            ? {
                ...student,
                badges: [...student.badges, newBadge],
                totalBadges: student.totalBadges + 1,
                recentActivity: `Earned ${badge.name} badge`,
              }
            : student
        )
      );

      setMessage(`Badge "${badge.name}" awarded successfully!`);
      setMessageType("success");
      setSelectedStudent("");
      setSelectedBadge("");
    } catch (error) {
      console.error("Error awarding badge:", error);
      setMessage("Error awarding badge. Please try again.");
      setMessageType("error");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const removeBadge = (studentId, badgeId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              badges: student.badges.filter((b) => b.id !== badgeId),
              totalBadges: student.totalBadges - 1,
            }
          : student
      )
    );
    setMessage("Badge removed successfully");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const getBadgeIcon = (badgeId) => {
    const badge = badgeTypes.find((b) => b.id === badgeId);
    return badge ? badge.icon : Award;
  };

  const getBadgeDetails = (badgeId) => {
    return badgeTypes.find((b) => b.id === badgeId);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === "all" || student.class === classFilter;

    return matchesSearch && matchesClass;
  });

  const getBadgeStats = () => {
    const totalBadges = students.reduce(
      (sum, student) => sum + student.totalBadges,
      0
    );
    const categoryStats = {};

    badgeTypes.forEach((badge) => {
      if (!categoryStats[badge.category]) {
        categoryStats[badge.category] = 0;
      }
    });

    students.forEach((student) => {
      student.badges.forEach((badge) => {
        if (categoryStats[badge.category] !== undefined) {
          categoryStats[badge.category]++;
        }
      });
    });

    return { totalBadges, categoryStats };
  };

  const stats = getBadgeStats();
  const classes = [...new Set(students.map((s) => s.class))];
  const categories = [...new Set(badgeTypes.map((b) => b.category))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-200 dark:border-yellow-800">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Student Badges
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Reward students with achievement badges and track their
                    progress
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {stats.totalBadges} Total Badges
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {students.length} Students
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {badgeTypes.length} Badge Types
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                      {stats.totalBadges}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Total Badges
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {stats.categoryStats.Academic || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Academic
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Crown className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {stats.categoryStats.Leadership || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Leadership
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {stats.categoryStats.Creative || 0}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Creative
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="award" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="award" className="text-xs sm:text-sm">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Award Badges</span>
                <span className="sm:hidden">Award</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm">
                <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Manage Students</span>
                <span className="sm:hidden">Students</span>
              </TabsTrigger>
              <TabsTrigger value="badges" className="text-xs sm:text-sm">
                <Award className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Badge Types</span>
                <span className="sm:hidden">Badges</span>
              </TabsTrigger>
            </TabsList>

            {/* Award Badges Tab */}
            <TabsContent value="award" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-yellow-500" />
                      <span>Award Badge</span>
                    </CardTitle>
                    <CardDescription>
                      Select a student and badge to award
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Select Student
                      </label>
                      <Select
                        value={selectedStudent}
                        onValueChange={setSelectedStudent}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a student" />
                        </SelectTrigger>
                        <SelectContent>
                          {students.map((student) => (
                            <SelectItem
                              key={student.id}
                              value={student.id.toString()}
                            >
                              <div className="flex items-center space-x-2">
                                <span>{student.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {student.rollNumber}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {student.totalBadges} badges
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Select Badge
                      </label>
                      <Select
                        value={selectedBadge}
                        onValueChange={setSelectedBadge}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a badge" />
                        </SelectTrigger>
                        <SelectContent>
                          {badgeTypes.map((badge) => (
                            <SelectItem key={badge.id} value={badge.id}>
                              <div className="flex items-center space-x-2">
                                <badge.icon
                                  className={`w-4 h-4 ${badge.color}`}
                                />
                                <span>{badge.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {badge.category}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedBadge && (
                      <div
                        className={`p-4 rounded-lg border ${
                          getBadgeDetails(selectedBadge)?.bgColor
                        } ${getBadgeDetails(selectedBadge)?.borderColor}`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          {(() => {
                            const badge = getBadgeDetails(selectedBadge);
                            const Icon = badge?.icon || Award;
                            return (
                              <Icon className={`w-6 h-6 ${badge?.color}`} />
                            );
                          })()}
                          <div>
                            <h3 className="font-medium">
                              {getBadgeDetails(selectedBadge)?.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {getBadgeDetails(selectedBadge)?.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {getBadgeDetails(selectedBadge)?.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {getBadgeDetails(selectedBadge)?.points} points
                          </Badge>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 pt-4">
                      <Button
                        onClick={awardBadge}
                        disabled={loading || !selectedStudent || !selectedBadge}
                        className="flex items-center space-x-2"
                      >
                        {loading ? (
                          <Clock className="h-4 w-4 animate-spin" />
                        ) : (
                          <Award className="h-4 w-4" />
                        )}
                        <span>{loading ? "Awarding..." : "Award Badge"}</span>
                      </Button>

                      {message && (
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            messageType === "success"
                              ? "text-green-600"
                              : messageType === "error"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {messageType === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : messageType === "error" ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <Award className="h-4 w-4" />
                          )}
                          <span>{message}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Badge Awards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {students.slice(0, 5).map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {student.recentActivity}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {student.totalBadges} badges
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Manage Students Tab */}
            <TabsContent value="manage" className="space-y-4">
              {/* Search and Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-1 items-center space-x-2">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select
                        value={classFilter}
                        onValueChange={setClassFilter}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          {classes.map((className) => (
                            <SelectItem key={className} value={className}>
                              {className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Students List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">
                                {student.name}
                              </h3>
                              <p className="text-xs text-gray-600">
                                Roll: {student.rollNumber}
                              </p>
                              <p className="text-xs text-gray-600">
                                {student.class} - {student.section}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Total Badges:</span>
                            <Badge variant="outline">
                              {student.totalBadges}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Performance:</span>
                            <span className="font-medium">
                              {student.performance}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-600">
                            Recent Badges:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {student.badges.slice(0, 6).map((badge, index) => {
                              const badgeDetails = getBadgeDetails(badge.id);
                              const Icon = getBadgeIcon(badge.id);
                              return (
                                <div key={index} className="relative group">
                                  <Icon
                                    className={`h-5 w-5 ${
                                      badgeDetails?.color || "text-gray-500"
                                    }`}
                                  />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {badge.name}
                                  </div>
                                </div>
                              );
                            })}
                            {student.badges.length > 6 && (
                              <Badge variant="secondary" className="text-xs">
                                +{student.badges.length - 6}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  {student.name} - Badge Details
                                </DialogTitle>
                                <DialogDescription>
                                  Complete badge information for {student.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                                      {student.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-semibold">
                                      {student.name}
                                    </h3>
                                    <p className="text-gray-600">
                                      Roll Number: {student.rollNumber}
                                    </p>
                                    <p className="text-gray-600">
                                      {student.class} - {student.section}
                                    </p>
                                    <Badge variant="outline" className="mt-1">
                                      {student.totalBadges} Total Badges
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-3">
                                    Earned Badges
                                  </h4>
                                  <div className="grid grid-cols-1 gap-2">
                                    {student.badges.map((badge, index) => {
                                      const badgeDetails = getBadgeDetails(
                                        badge.id
                                      );
                                      const Icon = getBadgeIcon(badge.id);
                                      return (
                                        <div
                                          key={index}
                                          className={`flex items-center justify-between p-3 rounded-lg border ${badgeDetails?.bgColor} ${badgeDetails?.borderColor}`}
                                        >
                                          <div className="flex items-center space-x-3">
                                            <Icon
                                              className={`h-6 w-6 ${badgeDetails?.color}`}
                                            />
                                            <div>
                                              <p className="font-medium text-sm">
                                                {badge.name}
                                              </p>
                                              <div className="flex items-center space-x-2">
                                                <Badge
                                                  variant="outline"
                                                  className="text-xs"
                                                >
                                                  {badge.category}
                                                </Badge>
                                                <span className="text-xs text-gray-600">
                                                  {new Date(
                                                    badge.earnedDate
                                                  ).toLocaleDateString()}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                  Remove Badge
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Are you sure you want to
                                                  remove the "{badge.name}"
                                                  badge from {student.name}?
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                  Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                  onClick={() =>
                                                    removeBadge(
                                                      student.id,
                                                      badge.id
                                                    )
                                                  }
                                                >
                                                  Remove
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Badge Types Tab */}
            <TabsContent value="badges" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Available Badge Types</CardTitle>
                  <CardDescription>
                    All available badges organized by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 h-auto bg-gray-100 dark:bg-gray-800">
                      <TabsTrigger value="all" className="text-xs">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="Academic" className="text-xs">
                        Academic
                      </TabsTrigger>
                      <TabsTrigger value="Leadership" className="text-xs">
                        Leadership
                      </TabsTrigger>
                      <TabsTrigger value="Creative" className="text-xs">
                        Creative
                      </TabsTrigger>
                      <TabsTrigger value="Character" className="text-xs">
                        Character
                      </TabsTrigger>
                      <TabsTrigger value="Sports" className="text-xs">
                        Sports
                      </TabsTrigger>
                    </TabsList>

                    {["all", ...categories].map((category) => (
                      <TabsContent
                        key={category}
                        value={category}
                        className="mt-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {badgeTypes
                            .filter(
                              (badge) =>
                                category === "all" ||
                                badge.category === category
                            )
                            .map((badge) => (
                              <div
                                key={badge.id}
                                className={`flex items-center space-x-4 p-4 border rounded-lg ${badge.bgColor} ${badge.borderColor}`}
                              >
                                <badge.icon
                                  className={`w-12 h-12 ${badge.color}`}
                                />
                                <div className="flex-1">
                                  <h3 className="font-medium">{badge.name}</h3>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {badge.description}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {badge.category}
                                    </Badge>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {badge.points} pts
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
