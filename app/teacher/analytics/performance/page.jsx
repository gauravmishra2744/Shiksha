"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Activity,
  Eye,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Brain,
  Zap,
  BookOpen,
  PieChart,
  LineChart,
  BarChart2,
  Star,
} from "lucide-react";

export default function PerformanceAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("this-month");
  const [selectedClass, setSelectedClass] = useState("all-classes");
  const [selectedSubject, setSelectedSubject] = useState("all-subjects");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const classPerformance = [
    {
      subject: "Mathematics",
      average: 85.2,
      trend: "up",
      students: 28,
      assignments: 12,
      engagementRate: 78,
    },
    {
      subject: "Physics",
      average: 78.9,
      trend: "up",
      students: 25,
      assignments: 10,
      engagementRate: 72,
    },
    {
      subject: "Chemistry",
      average: 82.1,
      trend: "down",
      students: 26,
      assignments: 8,
      engagementRate: 75,
    },
    {
      subject: "English",
      average: 88.5,
      trend: "up",
      students: 30,
      assignments: 15,
      engagementRate: 85,
    },
    {
      subject: "History",
      average: 76.3,
      trend: "stable",
      students: 24,
      assignments: 9,
      engagementRate: 68,
    },
  ];

  const topPerformers = [
    {
      name: "Alice Johnson",
      score: 94.5,
      improvement: "+5.2%",
      subjects: 5,
      badges: 12,
      engagement: 95,
      activities: 24,
    },
    {
      name: "Bob Smith",
      score: 91.8,
      improvement: "+3.1%",
      subjects: 5,
      badges: 10,
      engagement: 92,
      activities: 22,
    },
    {
      name: "Carol Davis",
      score: 89.2,
      improvement: "+2.8%",
      subjects: 4,
      badges: 8,
      engagement: 88,
      activities: 20,
    },
    {
      name: "David Wilson",
      score: 87.6,
      improvement: "+4.5%",
      subjects: 5,
      badges: 9,
      engagement: 86,
      activities: 19,
    },
    {
      name: "Emma Brown",
      score: 86.1,
      improvement: "+1.9%",
      subjects: 4,
      badges: 7,
      engagement: 84,
      activities: 18,
    },
  ];

  const strugglingStudents = [
    {
      name: "John Doe",
      score: 62.3,
      decline: "-2.1%",
      missedAssignments: 3,
      needsHelp: true,
      engagement: 45,
    },
    {
      name: "Jane Smith",
      score: 65.8,
      decline: "-1.5%",
      missedAssignments: 2,
      needsHelp: true,
      engagement: 52,
    },
    {
      name: "Mike Johnson",
      score: 68.2,
      decline: "-0.8%",
      missedAssignments: 1,
      needsHelp: false,
      engagement: 58,
    },
  ];

  const engagementMetrics = {
    overview: {
      totalStudents: 133,
      activeStudents: 118,
      avgSessionTime: "45 min",
      engagementRate: 83,
    },
    activities: [
      { name: "Video Lectures", views: 245, engagement: 78, completion: 85 },
      { name: "Assignments", submissions: 128, completion: 93, engagement: 87 },
      {
        name: "Discussion Forums",
        posts: 142,
        participation: 67,
        engagement: 72,
      },
      { name: "Quizzes", attempts: 356, avgScore: 82, engagement: 89 },
    ],
    trends: [
      { period: "Week 1", engagement: 75, performance: 78 },
      { period: "Week 2", engagement: 80, performance: 81 },
      { period: "Week 3", engagement: 83, performance: 84 },
      { period: "Week 4", engagement: 85, performance: 87 },
    ],
  };

  const aiInsights = [
    {
      title: "Math Performance Alert",
      description:
        "3 students showing declining performance in algebra. Consider additional practice sessions.",
      type: "Warning",
      confidence: "92%",
      action: "Schedule Review Session",
      priority: "high",
      affected: 3,
      subject: "Mathematics",
    },
    {
      title: "Engagement Opportunity",
      description:
        "Physics class shows high engagement with visual content. Increase multimedia usage.",
      type: "Suggestion",
      confidence: "87%",
      action: "Add More Videos",
      priority: "medium",
      affected: 25,
      subject: "Physics",
    },
    {
      title: "Success Pattern Detected",
      description:
        "Students perform 15% better on assignments given on Tuesdays. Optimal scheduling identified.",
      type: "Insight",
      confidence: "95%",
      action: "Adjust Schedule",
      priority: "low",
      affected: 133,
      subject: "All",
    },
    {
      title: "Learning Style Preference",
      description:
        "Visual learners (68% of class) respond better to diagram-based questions. Adapt content accordingly.",
      type: "Recommendation",
      confidence: "89%",
      action: "Update Materials",
      priority: "medium",
      affected: 90,
      subject: "All",
    },
  ];

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicBreadcrumb />
          <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
            <div className="animate-pulse space-y-4 sm:space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  ></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 flex-shrink-0">
                    <BarChart3 className="w-6 w-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      Performance Analytics
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                      Comprehensive insights into student performance and
                      learning outcomes
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <Select
                    value={selectedTimeRange}
                    onValueChange={setSelectedTimeRange}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Filter</span>
                      <span className="sm:hidden">Filter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Export</span>
                      <span className="sm:hidden">Export</span>
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Refresh</span>
                      <span className="sm:hidden">Refresh</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    82.4%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Overall Average</span>
                    <span className="sm:hidden">Average</span>
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +2.3%
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    133
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Total Students</span>
                    <span className="sm:hidden">Students</span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    5 Classes
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    54
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Assignments
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">
                    This Month
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    89%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Completion Rate</span>
                    <span className="sm:hidden">Completion</span>
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +1.2%
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50 col-span-2 lg:col-span-1">
                  <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                    7
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    At Risk
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400">
                    Need Attention
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="subjects" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">By Subject</span>
                <span className="sm:hidden">Subjects</span>
              </TabsTrigger>
              <TabsTrigger value="students" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Individual</span>
                <span className="sm:hidden">Students</span>
              </TabsTrigger>
              <TabsTrigger value="engagement" className="text-xs sm:text-sm">
                Engagement
              </TabsTrigger>
              <TabsTrigger value="trends" className="text-xs sm:text-sm">
                Trends
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">AI Insights</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="hidden sm:inline">Top Performers</span>
                      <span className="sm:hidden">Top Students</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Students excelling across subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.slice(0, 5).map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                index === 0
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                  : index === 1
                                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  : index === 2
                                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {student.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                {student.score}% avg • {student.badges} badges
                              </p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <Badge className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50 text-xs">
                              {student.improvement}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="hidden sm:inline">
                        Students Needing Support
                      </span>
                      <span className="sm:hidden">Need Support</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Students who may need additional help
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strugglingStudents.map((student, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50/30 dark:bg-red-950/20"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {student.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                {student.score}% avg • {student.engagement}%
                                engagement
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-800/50 flex-shrink-0 ml-2"
                            >
                              {student.decline}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-xs text-red-600 dark:text-red-400">
                              {student.missedAssignments} missed assignments
                            </p>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs flex-1 sm:flex-none"
                              >
                                Contact
                              </Button>
                              <Button
                                size="sm"
                                className="text-xs flex-1 sm:flex-none"
                              >
                                Help Plan
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Class Performance Summary
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Performance metrics across all subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classPerformance.map((subject, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {subject.subject.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                              {subject.subject}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                              {subject.students} students •{" "}
                              {subject.assignments} assignments •{" "}
                              {subject.engagementRate}% engagement
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-center sm:text-right">
                            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                              {subject.average}%
                            </div>
                            <div className="flex items-center justify-center sm:justify-end gap-1 text-sm">
                              {subject.trend === "up" ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : subject.trend === "down" ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
                              )}
                              <span
                                className={
                                  subject.trend === "up"
                                    ? "text-green-600 dark:text-green-400"
                                    : subject.trend === "down"
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-600 dark:text-gray-400"
                                }
                              >
                                {subject.trend === "up"
                                  ? "Improving"
                                  : subject.trend === "down"
                                  ? "Declining"
                                  : "Stable"}
                              </span>
                            </div>
                          </div>
                          <Progress value={subject.average} className="w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {classPerformance.map((subject, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                        <span className="truncate">{subject.subject}</span>
                        <Badge
                          variant={
                            subject.trend === "up"
                              ? "default"
                              : subject.trend === "down"
                              ? "destructive"
                              : "secondary"
                          }
                          className="flex-shrink-0 ml-2"
                        >
                          {subject.average}%
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {subject.students} students enrolled
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Class Average
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {subject.average}%
                          </span>
                        </div>
                        <Progress value={subject.average} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Engagement Rate
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {subject.engagementRate}%
                          </span>
                        </div>
                        <Progress
                          value={subject.engagementRate}
                          className="h-2"
                        />

                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="font-bold text-green-600 dark:text-green-400">
                              {Math.floor(subject.students * 0.6)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">
                              Above 80%
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-yellow-600 dark:text-yellow-400">
                              {Math.floor(subject.students * 0.3)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">
                              60-80%
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-red-600 dark:text-red-400">
                              {Math.floor(subject.students * 0.1)}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">
                              Below 60%
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="grid gap-4">
                {[...topPerformers, ...strugglingStudents].map(
                  (student, index) => (
                    <Card
                      key={index}
                      className={`${
                        strugglingStudents.includes(student)
                          ? "border-red-200 dark:border-red-800/50 bg-red-50/20 dark:bg-red-950/10"
                          : "bg-white dark:bg-gray-900/50"
                      } backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0 flex-1">
                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {student.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                {student.score}% average •
                                {student.badges
                                  ? ` ${student.badges} badges`
                                  : ` ${student.missedAssignments} missed assignments`}{" "}
                                •{student.engagement}% engagement
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <Badge
                              variant={
                                student.improvement ? "default" : "destructive"
                              }
                            >
                              {student.improvement || student.decline}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              className="whitespace-nowrap"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              <span className="hidden sm:inline">
                                View Profile
                              </span>
                              <span className="sm:hidden">View</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4 sm:space-y-6">
              {/* Engagement Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Active Students
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                          {engagementMetrics.overview.activeStudents}/
                          {engagementMetrics.overview.totalStudents}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="hidden sm:inline">
                            Avg Session Time
                          </span>
                          <span className="sm:hidden">Avg Time</span>
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                          {engagementMetrics.overview.avgSessionTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <span className="hidden sm:inline">
                            Engagement Rate
                          </span>
                          <span className="sm:hidden">Engagement</span>
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400 truncate">
                          {engagementMetrics.overview.engagementRate}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Trend
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400 truncate">
                          ↗ +5%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Activity Engagement
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Performance across different learning activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {engagementMetrics.activities.map((activity, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                              {activity.name}
                            </span>
                            <Badge
                              variant="outline"
                              className="flex-shrink-0 ml-2"
                            >
                              {activity.engagement}%
                            </Badge>
                          </div>
                          <Progress
                            value={activity.engagement}
                            className="h-2"
                          />
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {activity.views && `${activity.views} views`}
                            {activity.submissions &&
                              `${activity.submissions} submissions`}
                            {activity.posts && `${activity.posts} posts`}
                            {activity.attempts &&
                              `${activity.attempts} attempts`}
                            {activity.completion &&
                              ` • ${activity.completion}% completion`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Top Engaged Students
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Students with highest engagement levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.slice(0, 3).map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                                index === 0
                                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                  : index === 1
                                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {student.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                                {student.activities} activities completed
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              student.engagement >= 90 ? "default" : "secondary"
                            }
                            className="flex-shrink-0 ml-2"
                          >
                            {student.engagement}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Engagement Trends
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Track engagement changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {engagementMetrics.trends.map((trend, index) => (
                      <div
                        key={index}
                        className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                      >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {trend.period}
                        </p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {trend.engagement}%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Engagement
                        </p>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {trend.performance}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Performance
                        </p>
                        {index > 0 &&
                          trend.engagement >
                            engagementMetrics.trends[index - 1].engagement && (
                            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                              ↗ Improving
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <LineChart className="w-5 h-5 text-blue-500" />
                      Performance Trends
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Track performance changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Performance trend chart
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          Last 6 months data
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <PieChart className="w-5 h-5 text-green-500" />
                      Grade Distribution
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Distribution of grades across all subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Grade distribution chart
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          Current semester
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <BarChart2 className="w-5 h-5 text-purple-500" />
                    Subject Comparison
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Compare performance across different subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                    <div className="text-center">
                      <BarChart2 className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Subject comparison chart
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Interactive comparison across all subjects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4">
                {aiInsights.map((insight, index) => (
                  <Card
                    key={index}
                    className={`border-l-4 ${
                      insight.type === "Warning"
                        ? "border-l-red-500 bg-red-50/30 dark:bg-red-950/20"
                        : insight.type === "Suggestion"
                        ? "border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/20"
                        : insight.type === "Recommendation"
                        ? "border-l-purple-500 bg-purple-50/30 dark:bg-purple-950/20"
                        : "border-l-green-500 bg-green-50/30 dark:bg-green-950/20"
                    } backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                              {insight.title}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`text-xs flex-shrink-0 ${
                                insight.priority === "high"
                                  ? "text-red-600 dark:text-red-400 border-red-300 dark:border-red-800/50"
                                  : insight.priority === "medium"
                                  ? "text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-800/50"
                                  : "text-green-600 dark:text-green-400 border-green-300 dark:border-green-800/50"
                              }`}
                            >
                              {insight.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {insight.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-gray-500 dark:text-gray-400">
                                AI Confidence:
                              </span>
                              <Badge className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                                {insight.confidence}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              <span className="text-gray-500 dark:text-gray-400">
                                Affects:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {insight.affected} students
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-purple-500 flex-shrink-0" />
                              <span className="text-gray-500 dark:text-gray-400">
                                Subject:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {insight.subject}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-center ${
                              insight.priority === "high"
                                ? "text-red-600 dark:text-red-400 border-red-300 dark:border-red-800/50"
                                : insight.priority === "medium"
                                ? "text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-800/50"
                                : "text-green-600 dark:text-green-400 border-green-300 dark:border-green-800/50"
                            }`}
                          >
                            {insight.priority} priority
                          </Badge>
                          <Button size="sm" className="whitespace-nowrap">
                            {insight.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
