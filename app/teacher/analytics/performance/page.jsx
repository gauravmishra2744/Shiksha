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
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
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

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-800">
                    <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Performance Analytics
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Comprehensive insights into student performance and
                      learning outcomes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedTimeRange}
                    onValueChange={setSelectedTimeRange}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-green-600">82.4%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Overall Average
                  </div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +2.3%
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-blue-600">133</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Students
                  </div>
                  <div className="text-xs text-blue-600">5 Classes</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-purple-600">54</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Assignments
                  </div>
                  <div className="text-xs text-purple-600">This Month</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-orange-600">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completion Rate
                  </div>
                  <div className="text-xs text-orange-600 flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +1.2%
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    At Risk
                  </div>
                  <div className="text-xs text-red-600">Need Attention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">By Subject</TabsTrigger>
              <TabsTrigger value="students">Individual</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Top Performers
                    </CardTitle>
                    <CardDescription>
                      Students excelling across subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topPerformers.slice(0, 5).map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : index === 1
                                  ? "bg-gray-100 text-gray-700"
                                  : index === 2
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">
                                {student.score}% avg • {student.badges} badges
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              {student.improvement}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Students Needing Support
                    </CardTitle>
                    <CardDescription>
                      Students who may need additional help
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strugglingStudents.map((student, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border border-red-200 bg-red-50/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-600">
                                {student.score}% avg • {student.engagement}%
                                engagement
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-red-600 border-red-300"
                            >
                              {student.decline}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-red-600">
                              {student.missedAssignments} missed assignments
                            </p>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                Contact
                              </Button>
                              <Button size="sm" className="text-xs">
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    Class Performance Summary
                  </CardTitle>
                  <CardDescription>
                    Performance metrics across all subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classPerformance.map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">
                              {subject.subject.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{subject.subject}</h3>
                            <p className="text-sm text-gray-600">
                              {subject.students} students •{" "}
                              {subject.assignments} assignments •{" "}
                              {subject.engagementRate}% engagement
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {subject.average}%
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              {subject.trend === "up" ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : subject.trend === "down" ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <div className="w-4 h-4 rounded-full bg-gray-300" />
                              )}
                              <span
                                className={
                                  subject.trend === "up"
                                    ? "text-green-600"
                                    : subject.trend === "down"
                                    ? "text-red-600"
                                    : "text-gray-600"
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
              <div className="grid md:grid-cols-2 gap-6">
                {classPerformance.map((subject, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{subject.subject}</span>
                        <Badge
                          variant={
                            subject.trend === "up"
                              ? "default"
                              : subject.trend === "down"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {subject.average}%
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {subject.students} students enrolled
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Class Average</span>
                          <span className="font-medium">
                            {subject.average}%
                          </span>
                        </div>
                        <Progress value={subject.average} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Engagement Rate</span>
                          <span className="font-medium">
                            {subject.engagementRate}%
                          </span>
                        </div>
                        <Progress
                          value={subject.engagementRate}
                          className="h-2"
                        />

                        <div className="grid grid-cols-3 gap-4 text-center text-sm">
                          <div>
                            <div className="font-bold text-green-600">
                              {Math.floor(subject.students * 0.6)}
                            </div>
                            <div className="text-gray-600">Above 80%</div>
                          </div>
                          <div>
                            <div className="font-bold text-yellow-600">
                              {Math.floor(subject.students * 0.3)}
                            </div>
                            <div className="text-gray-600">60-80%</div>
                          </div>
                          <div>
                            <div className="font-bold text-red-600">
                              {Math.floor(subject.students * 0.1)}
                            </div>
                            <div className="text-gray-600">Below 60%</div>
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
                      className={
                        strugglingStudents.includes(student)
                          ? "border-red-200 bg-red-50/20"
                          : ""
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="font-bold text-blue-600">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-sm text-gray-600">
                                {student.score}% average •
                                {student.badges
                                  ? ` ${student.badges} badges`
                                  : ` ${student.missedAssignments} missed assignments`}{" "}
                                •{student.engagement}% engagement
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                student.improvement ? "default" : "destructive"
                              }
                            >
                              {student.improvement || student.decline}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-6">
              {/* Engagement Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Active Students</p>
                        <p className="text-2xl font-bold">
                          {engagementMetrics.overview.activeStudents}/
                          {engagementMetrics.overview.totalStudents}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Avg Session Time
                        </p>
                        <p className="text-2xl font-bold">
                          {engagementMetrics.overview.avgSessionTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Engagement Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {engagementMetrics.overview.engagementRate}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Trend</p>
                        <p className="text-2xl font-bold text-green-600">
                          ↗ +5%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Engagement</CardTitle>
                    <CardDescription>
                      Performance across different learning activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {engagementMetrics.activities.map((activity, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{activity.name}</span>
                            <Badge variant="outline">
                              {activity.engagement}%
                            </Badge>
                          </div>
                          <Progress
                            value={activity.engagement}
                            className="h-2"
                          />
                          <div className="text-sm text-gray-600">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Top Engaged Students</CardTitle>
                    <CardDescription>
                      Students with highest engagement levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.slice(0, 3).map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-100 text-yellow-700"
                                  : index === 1
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <p className="text-sm text-gray-600">
                                {student.activities} activities completed
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              student.engagement >= 90 ? "default" : "secondary"
                            }
                          >
                            {student.engagement}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>
                    Track engagement changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {engagementMetrics.trends.map((trend, index) => (
                      <div
                        key={index}
                        className="text-center p-4 border rounded-lg"
                      >
                        <p className="text-sm text-gray-600">{trend.period}</p>
                        <p className="text-xl font-bold text-blue-600">
                          {trend.engagement}%
                        </p>
                        <p className="text-sm text-gray-500">Engagement</p>
                        <p className="text-lg font-semibold text-green-600">
                          {trend.performance}%
                        </p>
                        <p className="text-xs text-gray-500">Performance</p>
                        {index > 0 &&
                          trend.engagement >
                            engagementMetrics.trends[index - 1].engagement && (
                            <div className="text-xs text-green-600 mt-1">
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
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-blue-500" />
                      Performance Trends
                    </CardTitle>
                    <CardDescription>
                      Track performance changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Performance trend chart</p>
                        <p className="text-sm text-gray-400">
                          Last 6 months data
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-green-500" />
                      Grade Distribution
                    </CardTitle>
                    <CardDescription>
                      Distribution of grades across all subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">
                          Grade distribution chart
                        </p>
                        <p className="text-sm text-gray-400">
                          Current semester
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-purple-500" />
                    Subject Comparison
                  </CardTitle>
                  <CardDescription>
                    Compare performance across different subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <BarChart2 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Subject comparison chart</p>
                      <p className="text-sm text-gray-400">
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
                        ? "border-l-red-500 bg-red-50/30"
                        : insight.type === "Suggestion"
                        ? "border-l-blue-500 bg-blue-50/30"
                        : insight.type === "Recommendation"
                        ? "border-l-purple-500 bg-purple-50/30"
                        : "border-l-green-500 bg-green-50/30"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-gray-500" />
                            <h3 className="font-medium">{insight.title}</h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                insight.priority === "high"
                                  ? "text-red-600 border-red-300"
                                  : insight.priority === "medium"
                                  ? "text-yellow-600 border-yellow-300"
                                  : "text-green-600 border-green-300"
                              }`}
                            >
                              {insight.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {insight.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-green-500" />
                              <span className="text-gray-500">
                                AI Confidence:
                              </span>
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                {insight.confidence}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-blue-500" />
                              <span className="text-gray-500">Affects:</span>
                              <span className="font-medium">
                                {insight.affected} students
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-purple-500" />
                              <span className="text-gray-500">Subject:</span>
                              <span className="font-medium">
                                {insight.subject}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge
                            variant="outline"
                            className={`${
                              insight.priority === "high"
                                ? "text-red-600 border-red-300"
                                : insight.priority === "medium"
                                ? "text-yellow-600 border-yellow-300"
                                : "text-green-600 border-green-300"
                            }`}
                          >
                            {insight.priority} priority
                          </Badge>
                          <Button size="sm">{insight.action}</Button>
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
