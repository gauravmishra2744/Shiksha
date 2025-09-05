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
import { Progress } from "@/components/ui/progress";
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
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Eye,
  MessageSquare,
  Mail,
  BarChart3,
  Target,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  FileText,
  Star,
  Zap,
  Brain,
  Trophy,
  Activity,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from "lucide-react";

// Comprehensive student performance data
const studentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "2024001",
    email: "aarav.sharma@school.edu",
    class: "Grade 10",
    section: "A",
    avatar: "",
    overallScore: 92,
    previousScore: 88,
    trend: "up",
    rank: 2,
    previousRank: 5,
    subjects: {
      mathematics: {
        score: 95,
        trend: "up",
        previousScore: 90,
        assignments: 15,
        completionRate: 100,
      },
      physics: {
        score: 88,
        trend: "stable",
        previousScore: 88,
        assignments: 12,
        completionRate: 92,
      },
      chemistry: {
        score: 94,
        trend: "up",
        previousScore: 89,
        assignments: 14,
        completionRate: 100,
      },
      english: {
        score: 89,
        trend: "down",
        previousScore: 92,
        assignments: 10,
        completionRate: 90,
      },
      biology: {
        score: 93,
        trend: "up",
        previousScore: 87,
        assignments: 13,
        completionRate: 100,
      },
    },
    badges: 8,
    attendance: 96,
    behavior: "Excellent",
    parentContact: "2024-01-10",
    strengths: ["Problem Solving", "Leadership", "Mathematics"],
    improvements: ["Time Management"],
    recentActivities: [
      "Scored 98% in Mathematics test",
      "Led science project presentation",
      "Completed all assignments on time",
    ],
    goals: ["Maintain top 3 rank", "Improve English score to 95%"],
    teacherNotes:
      "Exceptional student with strong analytical skills. Shows great potential in STEM subjects.",
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "2024002",
    email: "priya.patel@school.edu",
    class: "Grade 10",
    section: "A",
    avatar: "",
    overallScore: 89,
    previousScore: 85,
    trend: "up",
    rank: 4,
    previousRank: 7,
    subjects: {
      mathematics: {
        score: 87,
        trend: "up",
        previousScore: 82,
        assignments: 15,
        completionRate: 100,
      },
      physics: {
        score: 85,
        trend: "stable",
        previousScore: 85,
        assignments: 12,
        completionRate: 100,
      },
      chemistry: {
        score: 92,
        trend: "up",
        previousScore: 88,
        assignments: 14,
        completionRate: 100,
      },
      english: {
        score: 94,
        trend: "up",
        previousScore: 89,
        assignments: 10,
        completionRate: 100,
      },
      biology: {
        score: 87,
        trend: "down",
        previousScore: 90,
        assignments: 13,
        completionRate: 92,
      },
    },
    badges: 6,
    attendance: 98,
    behavior: "Excellent",
    parentContact: "2024-01-05",
    strengths: ["Creative Writing", "Chemistry", "Collaboration"],
    improvements: ["Mathematics Confidence"],
    recentActivities: [
      "Won school essay competition",
      "Improved Chemistry grade significantly",
      "Active in group discussions",
    ],
    goals: ["Reach top 3 position", "Score 90+ in Mathematics"],
    teacherNotes:
      "Shows remarkable improvement and dedication. Strong in languages and sciences.",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNumber: "2024003",
    email: "arjun.kumar@school.edu",
    class: "Grade 9",
    section: "B",
    avatar: "",
    overallScore: 78,
    previousScore: 82,
    trend: "down",
    rank: 12,
    previousRank: 8,
    subjects: {
      mathematics: {
        score: 75,
        trend: "down",
        previousScore: 80,
        assignments: 15,
        completionRate: 80,
      },
      physics: {
        score: 80,
        trend: "stable",
        previousScore: 79,
        assignments: 12,
        completionRate: 83,
      },
      chemistry: {
        score: 76,
        trend: "down",
        previousScore: 82,
        assignments: 14,
        completionRate: 79,
      },
      english: {
        score: 82,
        trend: "up",
        previousScore: 78,
        assignments: 10,
        completionRate: 90,
      },
      biology: {
        score: 77,
        trend: "down",
        previousScore: 85,
        assignments: 13,
        completionRate: 77,
      },
    },
    badges: 3,
    attendance: 85,
    behavior: "Good",
    parentContact: "2023-12-20",
    strengths: ["Sports", "Team Work", "English"],
    improvements: ["Study Habits", "Assignment Completion", "Attendance"],
    recentActivities: [
      "Participated in basketball tournament",
      "Missed 3 assignments this month",
      "Showed improvement in English",
    ],
    goals: ["Improve overall score to 85%", "Complete all assignments on time"],
    teacherNotes:
      "Talented student but needs better focus on academics. Requires more support and motivation.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rollNumber: "2024004",
    email: "sneha.gupta@school.edu",
    class: "Grade 11",
    section: "C",
    avatar: "",
    overallScore: 95,
    previousScore: 93,
    trend: "up",
    rank: 1,
    previousRank: 1,
    subjects: {
      mathematics: {
        score: 98,
        trend: "up",
        previousScore: 95,
        assignments: 15,
        completionRate: 100,
      },
      physics: {
        score: 96,
        trend: "up",
        previousScore: 94,
        assignments: 12,
        completionRate: 100,
      },
      chemistry: {
        score: 97,
        trend: "stable",
        previousScore: 97,
        assignments: 14,
        completionRate: 100,
      },
      english: {
        score: 91,
        trend: "up",
        previousScore: 88,
        assignments: 10,
        completionRate: 100,
      },
      biology: {
        score: 93,
        trend: "down",
        previousScore: 95,
        assignments: 13,
        completionRate: 100,
      },
    },
    badges: 12,
    attendance: 100,
    behavior: "Outstanding",
    parentContact: "2024-01-15",
    strengths: ["All Subjects", "Leadership", "Research", "Mentoring"],
    improvements: ["Work-Life Balance"],
    recentActivities: [
      "Perfect score in Mathematics Olympiad",
      "Led peer tutoring session",
      "Published research paper in school journal",
    ],
    goals: ["Maintain top position", "Mentor struggling students"],
    teacherNotes:
      "Exceptional all-round student. Natural leader with outstanding academic performance.",
  },
  {
    id: 5,
    name: "Rohit Singh",
    rollNumber: "2024005",
    email: "rohit.singh@school.edu",
    class: "Grade 8",
    section: "A",
    avatar: "",
    overallScore: 85,
    previousScore: 79,
    trend: "up",
    rank: 6,
    previousRank: 9,
    subjects: {
      mathematics: {
        score: 88,
        trend: "up",
        previousScore: 82,
        assignments: 15,
        completionRate: 93,
      },
      physics: {
        score: 82,
        trend: "up",
        previousScore: 76,
        assignments: 12,
        completionRate: 92,
      },
      chemistry: {
        score: 86,
        trend: "up",
        previousScore: 78,
        assignments: 14,
        completionRate: 93,
      },
      english: {
        score: 83,
        trend: "stable",
        previousScore: 83,
        assignments: 10,
        completionRate: 100,
      },
      biology: {
        score: 87,
        trend: "up",
        previousScore: 76,
        assignments: 13,
        completionRate: 92,
      },
    },
    badges: 4,
    attendance: 92,
    behavior: "Good",
    parentContact: "2024-01-08",
    strengths: ["Improvement", "Dedication", "Mathematics"],
    improvements: ["Consistency", "Attendance"],
    recentActivities: [
      "Significant improvement in all subjects",
      "Completed extra practice assignments",
      "Joined study group",
    ],
    goals: ["Reach 90% overall score", "Perfect attendance next month"],
    teacherNotes:
      "Shows remarkable improvement. With continued effort, can achieve excellent results.",
  },
  {
    id: 6,
    name: "Kavya Reddy",
    rollNumber: "2024006",
    email: "kavya.reddy@school.edu",
    class: "Grade 12",
    section: "B",
    avatar: "",
    overallScore: 98,
    previousScore: 96,
    trend: "up",
    rank: 1,
    previousRank: 2,
    subjects: {
      mathematics: {
        score: 99,
        trend: "up",
        previousScore: 97,
        assignments: 15,
        completionRate: 100,
      },
      physics: {
        score: 98,
        trend: "stable",
        previousScore: 98,
        assignments: 12,
        completionRate: 100,
      },
      chemistry: {
        score: 99,
        trend: "up",
        previousScore: 96,
        assignments: 14,
        completionRate: 100,
      },
      english: {
        score: 95,
        trend: "up",
        previousScore: 92,
        assignments: 10,
        completionRate: 100,
      },
      biology: {
        score: 97,
        trend: "up",
        previousScore: 95,
        assignments: 13,
        completionRate: 100,
      },
    },
    badges: 15,
    attendance: 100,
    behavior: "Outstanding",
    parentContact: "2024-01-12",
    strengths: ["All Subjects", "Innovation", "Leadership", "Research"],
    improvements: ["None identified"],
    recentActivities: [
      "Topped district-level science fair",
      "Received scholarship offer",
      "Mentoring junior students",
    ],
    goals: ["Secure admission in top university", "Complete research project"],
    teacherNotes:
      "Exemplary student with outstanding academic and leadership qualities. Future scholar.",
  },
];

export default function StudentPerformancePage() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rank");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPerformanceColor = (score) => {
    if (score >= 95) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 85) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 75) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getPerformanceLabel = (score) => {
    if (score >= 95) return "Excellent";
    if (score >= 85) return "Good";
    if (score >= 75) return "Average";
    return "Needs Improvement";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === "all" || student.class === classFilter;
    const matchesPerformance =
      performanceFilter === "all" ||
      (performanceFilter === "excellent" && student.overallScore >= 95) ||
      (performanceFilter === "good" &&
        student.overallScore >= 85 &&
        student.overallScore < 95) ||
      (performanceFilter === "average" &&
        student.overallScore >= 75 &&
        student.overallScore < 85) ||
      (performanceFilter === "poor" && student.overallScore < 75);

    return matchesSearch && matchesClass && matchesPerformance;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "rank":
        return a.rank - b.rank;
      case "score":
        return b.overallScore - a.overallScore;
      case "name":
        return a.name.localeCompare(b.name);
      case "improvement":
        return (
          b.overallScore - b.previousScore - (a.overallScore - a.previousScore)
        );
      default:
        return 0;
    }
  });

  const getOverallStats = () => {
    const total = students.length;
    const excellent = students.filter((s) => s.overallScore >= 95).length;
    const good = students.filter(
      (s) => s.overallScore >= 85 && s.overallScore < 95
    ).length;
    const average = students.filter(
      (s) => s.overallScore >= 75 && s.overallScore < 85
    ).length;
    const poor = students.filter((s) => s.overallScore < 75).length;
    const avgScore =
      students.reduce((sum, s) => sum + s.overallScore, 0) / total;
    const improving = students.filter(
      (s) => s.overallScore > s.previousScore
    ).length;

    return { total, excellent, good, average, poor, avgScore, improving };
  };

  const stats = getOverallStats();
  const classes = [...new Set(students.map((s) => s.class))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-200 dark:border-purple-800">
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Student Performance
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Track and analyze individual student academic progress and
                    achievements
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {stats.total} Students
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  {stats.avgScore.toFixed(1)}% Avg Score
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stats.improving} Improving
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-5">
            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {stats.excellent}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Excellent (95%+)
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
                      {stats.good}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Good (85-94%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                      {stats.average}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Average (75-84%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                      {stats.poor}
                    </p>
                    <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                      Need Help (&lt;75%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {stats.improving}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Improving
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
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

                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Classes" />
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

                  <Select
                    value={performanceFilter}
                    onValueChange={setPerformanceFilter}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Performance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Performance</SelectItem>
                      <SelectItem value="excellent">
                        Excellent (95%+)
                      </SelectItem>
                      <SelectItem value="good">Good (85-94%)</SelectItem>
                      <SelectItem value="average">Average (75-84%)</SelectItem>
                      <SelectItem value="poor">Need Help (&lt;75%)</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rank">Rank</SelectItem>
                      <SelectItem value="score">Score</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students Performance List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p>Loading student performance data...</p>
              </div>
            ) : sortedStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No students found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              sortedStudents.map((student) => (
                <Card
                  key={student.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Student Info */}
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="h-14 w-14">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1">
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0 h-5 bg-white"
                            >
                              #{student.rank}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">
                              {student.name}
                            </h3>
                            {getTrendIcon(student.trend)}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {student.rollNumber} • {student.class} -{" "}
                            {student.section}
                          </p>
                          <div className="flex items-center space-x-3 text-sm">
                            <Badge
                              className={`${getPerformanceColor(
                                student.overallScore
                              )} border`}
                              variant="outline"
                            >
                              {student.overallScore}% Overall
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 border-yellow-200"
                            >
                              <Award className="w-3 h-3 mr-1" />
                              {student.badges} badges
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {student.attendance}% attendance
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Performance Indicators */}
                      <div className="flex-1 max-w-md">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              Overall Performance
                            </span>
                            <span className="font-medium">
                              {getPerformanceLabel(student.overallScore)}
                            </span>
                          </div>
                          <Progress
                            value={student.overallScore}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Previous: {student.previousScore}%</span>
                            <span
                              className={`flex items-center ${
                                student.overallScore > student.previousScore
                                  ? "text-green-600"
                                  : student.overallScore < student.previousScore
                                  ? "text-red-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {student.overallScore > student.previousScore
                                ? "+"
                                : ""}
                              {student.overallScore - student.previousScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subject Performance (Top 3) */}
                      <div className="flex-1 max-w-sm">
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(student.subjects)
                            .slice(0, 3)
                            .map(([subject, data]) => (
                              <div key={subject} className="text-center">
                                <div className="text-xs text-gray-600 capitalize mb-1">
                                  {subject}
                                </div>
                                <div className="flex items-center justify-center space-x-1">
                                  <span className="text-sm font-medium">
                                    {data.score}%
                                  </span>
                                  {getTrendIcon(data.trend)}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <GraduationCap className="h-5 w-5" />
                                <span>
                                  {student.name} - Detailed Performance Report
                                </span>
                              </DialogTitle>
                              <DialogDescription>
                                Comprehensive academic performance and progress
                                analysis
                              </DialogDescription>
                            </DialogHeader>

                            {selectedStudent && (
                              <div className="space-y-6">
                                {/* Student Overview */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">
                                        Student Information
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex items-center space-x-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src={selectedStudent.avatar}
                                          />
                                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                                            {selectedStudent.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="text-xl font-semibold">
                                            {selectedStudent.name}
                                          </h3>
                                          <p className="text-gray-600">
                                            {selectedStudent.rollNumber}
                                          </p>
                                          <p className="text-gray-600">
                                            {selectedStudent.class} -{" "}
                                            {selectedStudent.section}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                                          <div className="text-lg font-bold text-blue-600">
                                            #{selectedStudent.rank}
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            Current Rank
                                          </div>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 rounded-lg">
                                          <div className="text-lg font-bold text-green-600">
                                            {selectedStudent.overallScore}%
                                          </div>
                                          <div className="text-sm text-gray-600">
                                            Overall Score
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">
                                        Quick Stats
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                          Attendance:
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="bg-green-50 text-green-700"
                                        >
                                          {selectedStudent.attendance}%
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                          Behavior:
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="bg-blue-50 text-blue-700"
                                        >
                                          {selectedStudent.behavior}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                          Badges Earned:
                                        </span>
                                        <Badge
                                          variant="outline"
                                          className="bg-yellow-50 text-yellow-700"
                                        >
                                          {selectedStudent.badges}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                          Last Parent Contact:
                                        </span>
                                        <span className="text-sm">
                                          {new Date(
                                            selectedStudent.parentContact
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Subject Performance */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                      <BookOpen className="h-5 w-5" />
                                      <span>Subject Performance</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {Object.entries(
                                        selectedStudent.subjects
                                      ).map(([subject, data]) => (
                                        <div
                                          key={subject}
                                          className="p-4 border rounded-lg"
                                        >
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium capitalize">
                                              {subject}
                                            </h4>
                                            {getTrendIcon(data.trend)}
                                          </div>
                                          <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                              <span>Current Score:</span>
                                              <span className="font-medium">
                                                {data.score}%
                                              </span>
                                            </div>
                                            <Progress
                                              value={data.score}
                                              className="h-2"
                                            />
                                            <div className="flex justify-between text-xs text-gray-600">
                                              <span>
                                                Previous: {data.previousScore}%
                                              </span>
                                              <span>
                                                Completion:{" "}
                                                {data.completionRate}%
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>

                                {/* Strengths and Improvements */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg flex items-center space-x-2">
                                        <Sparkles className="h-5 w-5 text-green-500" />
                                        <span>Strengths</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        {selectedStudent.strengths.map(
                                          (strength, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="bg-green-50 text-green-700 border-green-200 mr-2 mb-2"
                                            >
                                              {strength}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg flex items-center space-x-2">
                                        <Target className="h-5 w-5 text-blue-500" />
                                        <span>Areas for Improvement</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-2">
                                        {selectedStudent.improvements.map(
                                          (improvement, index) => (
                                            <Badge
                                              key={index}
                                              variant="outline"
                                              className="bg-blue-50 text-blue-700 border-blue-200 mr-2 mb-2"
                                            >
                                              {improvement}
                                            </Badge>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Recent Activities and Goals */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg flex items-center space-x-2">
                                        <Activity className="h-5 w-5 text-purple-500" />
                                        <span>Recent Activities</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-3">
                                        {selectedStudent.recentActivities.map(
                                          (activity, index) => (
                                            <div
                                              key={index}
                                              className="flex items-start space-x-2"
                                            >
                                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                              <span className="text-sm">
                                                {activity}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg flex items-center space-x-2">
                                        <Lightbulb className="h-5 w-5 text-orange-500" />
                                        <span>Goals</span>
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="space-y-3">
                                        {selectedStudent.goals.map(
                                          (goal, index) => (
                                            <div
                                              key={index}
                                              className="flex items-start space-x-2"
                                            >
                                              <Target className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                              <span className="text-sm">
                                                {goal}
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Teacher Notes */}
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                      <FileText className="h-5 w-5 text-gray-500" />
                                      <span>Teacher Notes</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                      {selectedStudent.teacherNotes}
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Message
                        </Button>

                        <Button size="sm" variant="outline">
                          <Mail className="w-3 h-3 mr-1" />
                          Parent
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
