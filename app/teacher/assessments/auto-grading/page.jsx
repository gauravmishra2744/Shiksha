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
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Bot,
  Zap,
  Users,
  Target,
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Play,
  Pause,
  Square,
  Settings,
  TrendingUp,
  PieChart,
  LineChart,
  Activity,
  Brain,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  Timer,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";

// Comprehensive auto-grading assessments data
const assessmentsData = [
  {
    id: 1,
    title: "Mathematics Quiz - Quadratic Equations",
    subject: "Mathematics",
    class: "Grade 10",
    totalSubmissions: 32,
    gradedSubmissions: 32,
    averageScore: 85.6,
    status: "completed",
    gradingType: "auto",
    difficulty: "medium",
    timeLimit: 60,
    totalQuestions: 25,
    createdAt: "2024-01-15T10:30:00Z",
    completedAt: "2024-01-15T16:45:00Z",
    gradingProgress: 100,
    gradingTime: "12 minutes",
    accuracy: 95.8,
    topics: ["Quadratic Equations", "Factorization", "Solving Equations"],
    questionTypes: {
      mcq: 15,
      shortAnswer: 8,
      numerical: 2,
    },
    results: {
      highest: 98,
      lowest: 62,
      median: 87,
      passRate: 87.5,
    },
    distribution: {
      excellent: 12,
      good: 16,
      average: 3,
      poor: 1,
    },
  },
  {
    id: 2,
    title: "Science Test - Photosynthesis & Respiration",
    subject: "Biology",
    class: "Grade 9",
    totalSubmissions: 28,
    gradedSubmissions: 24,
    averageScore: 78.2,
    status: "grading",
    gradingType: "auto",
    difficulty: "hard",
    timeLimit: 90,
    totalQuestions: 30,
    createdAt: "2024-01-16T09:00:00Z",
    completedAt: null,
    gradingProgress: 85.7,
    gradingTime: "Estimated 3 minutes remaining",
    accuracy: 92.1,
    topics: ["Photosynthesis", "Cellular Respiration", "Plant Biology"],
    questionTypes: {
      mcq: 20,
      shortAnswer: 7,
      essay: 3,
    },
    results: {
      highest: 94,
      lowest: 56,
      median: 79,
      passRate: 78.6,
    },
    distribution: {
      excellent: 6,
      good: 14,
      average: 3,
      poor: 1,
    },
  },
  {
    id: 3,
    title: "Physics Quiz - Motion and Forces",
    subject: "Physics",
    class: "Grade 11",
    totalSubmissions: 35,
    gradedSubmissions: 0,
    averageScore: 0,
    status: "pending",
    gradingType: "auto",
    difficulty: "hard",
    timeLimit: 75,
    totalQuestions: 20,
    createdAt: "2024-01-17T14:00:00Z",
    completedAt: null,
    gradingProgress: 0,
    gradingTime: "Not started",
    accuracy: 0,
    topics: ["Newton's Laws", "Kinematics", "Dynamics"],
    questionTypes: {
      mcq: 12,
      numerical: 6,
      shortAnswer: 2,
    },
    results: {
      highest: 0,
      lowest: 0,
      median: 0,
      passRate: 0,
    },
    distribution: {
      excellent: 0,
      good: 0,
      average: 0,
      poor: 0,
    },
  },
  {
    id: 4,
    title: "Chemistry Test - Periodic Table",
    subject: "Chemistry",
    class: "Grade 10",
    totalSubmissions: 30,
    gradedSubmissions: 30,
    averageScore: 91.4,
    status: "completed",
    gradingType: "auto",
    difficulty: "medium",
    timeLimit: 45,
    totalQuestions: 20,
    createdAt: "2024-01-14T11:15:00Z",
    completedAt: "2024-01-14T17:30:00Z",
    gradingProgress: 100,
    gradingTime: "8 minutes",
    accuracy: 98.2,
    topics: ["Periodic Trends", "Element Properties", "Chemical Bonding"],
    questionTypes: {
      mcq: 15,
      shortAnswer: 5,
    },
    results: {
      highest: 100,
      lowest: 74,
      median: 92,
      passRate: 96.7,
    },
    distribution: {
      excellent: 18,
      good: 11,
      average: 1,
      poor: 0,
    },
  },
  {
    id: 5,
    title: "English Literature - Shakespeare Analysis",
    subject: "English",
    class: "Grade 12",
    totalSubmissions: 25,
    gradedSubmissions: 15,
    averageScore: 82.3,
    status: "grading",
    gradingType: "hybrid",
    difficulty: "hard",
    timeLimit: 120,
    totalQuestions: 15,
    createdAt: "2024-01-17T10:00:00Z",
    completedAt: null,
    gradingProgress: 60,
    gradingTime: "Estimated 15 minutes remaining",
    accuracy: 89.4,
    topics: ["Hamlet", "Literary Analysis", "Character Development"],
    questionTypes: {
      mcq: 5,
      shortAnswer: 5,
      essay: 5,
    },
    results: {
      highest: 95,
      lowest: 68,
      median: 83,
      passRate: 86.7,
    },
    distribution: {
      excellent: 4,
      good: 9,
      average: 2,
      poor: 0,
    },
  },
  {
    id: 6,
    title: "History Test - World War II",
    subject: "History",
    class: "Grade 11",
    totalSubmissions: 22,
    gradedSubmissions: 22,
    averageScore: 76.8,
    status: "completed",
    gradingType: "auto",
    difficulty: "medium",
    timeLimit: 60,
    totalQuestions: 25,
    createdAt: "2024-01-13T13:45:00Z",
    completedAt: "2024-01-13T19:20:00Z",
    gradingProgress: 100,
    gradingTime: "10 minutes",
    accuracy: 93.6,
    topics: ["WWII Events", "Historical Analysis", "Timeline"],
    questionTypes: {
      mcq: 20,
      shortAnswer: 5,
    },
    results: {
      highest: 96,
      lowest: 54,
      median: 78,
      passRate: 81.8,
    },
    distribution: {
      excellent: 5,
      good: 13,
      average: 3,
      poor: 1,
    },
  },
];

export default function AutoGradingPage() {
  const [assessments, setAssessments] = useState(assessmentsData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [gradingInProgress, setGradingInProgress] = useState(new Set());

  const startAutoGrading = async (assessmentId) => {
    setGradingInProgress((prev) => new Set([...prev, assessmentId]));

    // Simulate auto-grading process
    try {
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === assessmentId
            ? { ...assessment, status: "grading", gradingProgress: 0 }
            : assessment
        )
      );

      // Simulate progressive grading
      for (let progress = 10; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAssessments((prev) =>
          prev.map((assessment) =>
            assessment.id === assessmentId
              ? { ...assessment, gradingProgress: progress }
              : assessment
          )
        );
      }

      // Complete grading
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === assessmentId
            ? {
                ...assessment,
                status: "completed",
                gradingProgress: 100,
                gradedSubmissions: assessment.totalSubmissions,
                averageScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
                completedAt: new Date().toISOString(),
              }
            : assessment
        )
      );
    } catch (error) {
      console.error("Error during auto-grading:", error);
    } finally {
      setGradingInProgress((prev) => {
        const newSet = new Set(prev);
        newSet.delete(assessmentId);
        return newSet;
      });
    }
  };

  const stopAutoGrading = (assessmentId) => {
    setAssessments((prev) =>
      prev.map((assessment) =>
        assessment.id === assessmentId
          ? { ...assessment, status: "paused" }
          : assessment
      )
    );
    setGradingInProgress((prev) => {
      const newSet = new Set(prev);
      newSet.delete(assessmentId);
      return newSet;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "grading":
        return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
      case "paused":
        return "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50";
      case "failed":
        return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/50";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50";
      case "hard":
        return "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assessment.status === statusFilter;
    const matchesSubject =
      subjectFilter === "all" || assessment.subject === subjectFilter;
    const matchesClass =
      classFilter === "all" || assessment.class === classFilter;

    return matchesSearch && matchesStatus && matchesSubject && matchesClass;
  });

  const getOverallStats = () => {
    const total = assessments.length;
    const completed = assessments.filter(
      (a) => a.status === "completed"
    ).length;
    const grading = assessments.filter((a) => a.status === "grading").length;
    const pending = assessments.filter((a) => a.status === "pending").length;
    const totalSubmissions = assessments.reduce(
      (sum, a) => sum + a.totalSubmissions,
      0
    );
    const totalGraded = assessments.reduce(
      (sum, a) => sum + a.gradedSubmissions,
      0
    );
    const avgAccuracy =
      assessments
        .filter((a) => a.status === "completed")
        .reduce((sum, a) => sum + a.accuracy, 0) / completed || 0;

    return {
      total,
      completed,
      grading,
      pending,
      totalSubmissions,
      totalGraded,
      avgAccuracy,
    };
  };

  const stats = getOverallStats();
  const subjects = [...new Set(assessments.map((a) => a.subject))];
  const classes = [...new Set(assessments.map((a) => a.class))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 flex-shrink-0">
                  <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Auto-Grading System
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                    AI-powered automated assessment grading with intelligent
                    feedback
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                  <Brain className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">AI-Powered</span>
                  <span className="sm:hidden">AI</span>
                </Badge>
                <Badge className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                  <Zap className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">
                    {stats.avgAccuracy.toFixed(1)}% Accuracy
                  </span>
                  <span className="sm:hidden">
                    {stats.avgAccuracy.toFixed(1)}%
                  </span>
                </Badge>
                <Badge className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                  <Activity className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">
                    {stats.totalGraded} Graded
                  </span>
                  <span className="sm:hidden">{stats.totalGraded}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-5">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {stats.total}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      <span className="hidden sm:inline">
                        Total Assessments
                      </span>
                      <span className="sm:hidden">Total</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {stats.completed}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {stats.grading}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      <span className="hidden sm:inline">In Progress</span>
                      <span className="sm:hidden">Progress</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                      {stats.pending}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Pending
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {stats.avgAccuracy.toFixed(0)}%
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      <span className="hidden sm:inline">Avg Accuracy</span>
                      <span className="sm:hidden">Accuracy</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                {/* Search Bar - Full width on mobile */}
                <div className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                    <Input
                      placeholder="Search assessments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                {/* Filters and Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 flex-1">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="grading">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={subjectFilter}
                      onValueChange={setSubjectFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={classFilter} onValueChange={setClassFilter}>
                      <SelectTrigger className="w-full sm:w-40 col-span-2 sm:col-span-1">
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
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="neutral"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Export Report</span>
                      <span className="sm:hidden">Export</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Settings</span>
                      <span className="sm:hidden">Settings</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessments List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-600 dark:text-gray-400">
                  Loading assessments...
                </p>
              </div>
            ) : filteredAssessments.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                  No assessments found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria or create new assessments
                </p>
              </div>
            ) : (
              filteredAssessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  className="border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {/* Assessment Header */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {assessment.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                className={`${getStatusColor(
                                  assessment.status
                                )} border text-xs`}
                                variant="outline"
                              >
                                {assessment.status === "grading" &&
                                  gradingInProgress.has(assessment.id) && (
                                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                  )}
                                {assessment.status}
                              </Badge>
                              <Badge
                                className={`${getDifficultyColor(
                                  assessment.difficulty
                                )} border text-xs`}
                                variant="outline"
                              >
                                {assessment.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center">
                              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="truncate">
                                {assessment.subject}
                              </span>
                            </span>
                            <span className="flex items-center">
                              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="truncate">
                                {assessment.class}
                              </span>
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              <span className="truncate">
                                {new Date(
                                  assessment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </span>
                            <span className="flex items-center">
                              <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {assessment.timeLimit} min
                            </span>
                            <span className="flex items-center col-span-2 sm:col-span-1">
                              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              {assessment.totalQuestions} questions
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                          {assessment.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => startAutoGrading(assessment.id)}
                              disabled={gradingInProgress.has(assessment.id)}
                              className="w-full sm:w-auto"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              <span className="hidden sm:inline">
                                Start Grading
                              </span>
                              <span className="sm:hidden">Start</span>
                            </Button>
                          )}

                          {assessment.status === "grading" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => stopAutoGrading(assessment.id)}
                              className="w-full sm:w-auto"
                            >
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </Button>
                          )}

                          {assessment.status === "completed" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    setSelectedAssessment(assessment)
                                  }
                                  className="w-full sm:w-auto"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">
                                    View Results
                                  </span>
                                  <span className="sm:hidden">Results</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:w-full">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                                    <BarChart3 className="h-5 w-5" />
                                    <span className="truncate">
                                      {assessment.title} - Grading Results
                                    </span>
                                  </DialogTitle>
                                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                                    Detailed analysis and results from
                                    auto-grading
                                  </DialogDescription>
                                </DialogHeader>

                                {selectedAssessment && (
                                  <div className="space-y-6">
                                    {/* Results Overview */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                        <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                          {selectedAssessment.results.highest}%
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                          Highest Score
                                        </div>
                                      </div>
                                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                        <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                                          {selectedAssessment.averageScore.toFixed(
                                            1
                                          )}
                                          %
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                          Average Score
                                        </div>
                                      </div>
                                      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                                        <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                          {selectedAssessment.results.median}%
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                          Median Score
                                        </div>
                                      </div>
                                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                        <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                          {selectedAssessment.results.passRate}%
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                          Pass Rate
                                        </div>
                                      </div>
                                    </div>

                                    {/* Performance Distribution */}
                                    <Card className="bg-white dark:bg-gray-800/50">
                                      <CardHeader>
                                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                                          Performance Distribution
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                          <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                                            <div>
                                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                                {
                                                  selectedAssessment
                                                    .distribution.excellent
                                                }
                                              </div>
                                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Excellent (90%+)
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                            <div>
                                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                                {
                                                  selectedAssessment
                                                    .distribution.good
                                                }
                                              </div>
                                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Good (75-89%)
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                            <div>
                                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                                {
                                                  selectedAssessment
                                                    .distribution.average
                                                }
                                              </div>
                                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Average (60-74%)
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                                            <div>
                                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                                {
                                                  selectedAssessment
                                                    .distribution.poor
                                                }
                                              </div>
                                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Poor (&lt;60%)
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Question Type Analysis */}
                                    <Card className="bg-white dark:bg-gray-800/50">
                                      <CardHeader>
                                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                                          Question Type Breakdown
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                          {Object.entries(
                                            selectedAssessment.questionTypes
                                          ).map(([type, count]) => (
                                            <div
                                              key={type}
                                              className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                                            >
                                              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                {count}
                                              </div>
                                              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {type === "mcq"
                                                  ? "Multiple Choice"
                                                  : type === "shortAnswer"
                                                  ? "Short Answer"
                                                  : type}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>

                                    {/* Topics Covered */}
                                    <Card className="bg-white dark:bg-gray-800/50">
                                      <CardHeader>
                                        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                                          Topics Covered
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedAssessment.topics.map(
                                            (topic, index) => (
                                              <Badge
                                                key={index}
                                                variant="outline"
                                                className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                                              >
                                                {topic}
                                              </Badge>
                                            )
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            <span className="hidden sm:inline">Export</span>
                            <span className="sm:hidden">Export</span>
                          </Button>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                            {assessment.totalSubmissions}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <span className="hidden sm:inline">
                              Total Submissions
                            </span>
                            <span className="sm:hidden">Total</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-400">
                            {assessment.gradedSubmissions}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            Graded
                          </div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                            {assessment.status === "completed"
                              ? `${assessment.averageScore.toFixed(1)}%`
                              : "-"}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <span className="hidden sm:inline">
                              Average Score
                            </span>
                            <span className="sm:hidden">Average</span>
                          </div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                          <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">
                            {assessment.accuracy.toFixed(1)}%
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <span className="hidden sm:inline">
                              AI Accuracy
                            </span>
                            <span className="sm:hidden">Accuracy</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            Grading Progress
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {assessment.gradingProgress}%
                          </span>
                        </div>
                        <Progress
                          value={assessment.gradingProgress}
                          className="h-3"
                        />
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>
                            {assessment.status === "completed"
                              ? "Completed"
                              : assessment.status === "grading"
                              ? "In Progress"
                              : "Not Started"}
                          </span>
                          <span className="truncate ml-2">
                            {assessment.gradingTime}
                          </span>
                        </div>
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
