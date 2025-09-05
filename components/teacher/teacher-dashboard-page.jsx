"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Home,
  Users,
  BookOpen,
  MessageSquare,
  Trophy,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Zap,
  Brain,
  Target,
  Star,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckSquare,
  AlertCircle,
  Bell,
  GraduationCap,
  FileText,
  Video,
  UserCheck,
  Megaphone,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

// Dummy data for teacher dashboard
const teacherData = {
  name: "Ms. Priya Sharma",
  subject: "Mathematics",
  avatar: "/avatars/teacher.jpg",
  totalClasses: 5,
  totalStudents: 120,
  pendingDoubts: 8,
  contentUploaded: 54,
  classrooms: [
    {
      id: 1,
      name: "Class 10 - Mathematics A",
      students: 28,
      subject: "Mathematics",
      schedule: "Mon, Wed, Fri - 9:00 AM",
      nextClass: "Tomorrow at 9:00 AM",
      status: "Active",
    },
    {
      id: 2,
      name: "Class 9 - Mathematics B",
      students: 25,
      subject: "Mathematics",
      schedule: "Tue, Thu - 10:00 AM",
      nextClass: "Today at 2:00 PM",
      status: "Active",
    },
    {
      id: 3,
      name: "Class 8 - Basic Math",
      students: 30,
      subject: "Mathematics",
      schedule: "Mon, Wed - 11:00 AM",
      nextClass: "Wednesday at 11:00 AM",
      status: "Active",
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: "classroom",
      title: "Created new classroom",
      description: "Grade 10 - Mathematics A",
      timestamp: "2 hours ago",
      icon: Home,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 2,
      type: "content",
      title: "Uploaded new content",
      description: "Chapter 5 - Quadratic Equations",
      timestamp: "Yesterday",
      icon: BookOpen,
      color: "text-green-600 dark:text-green-400",
    },
    {
      id: 3,
      type: "attendance",
      title: "Marked attendance",
      description: "Class 9 - Mathematics B (25/25 present)",
      timestamp: "1 day ago",
      icon: UserCheck,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: 4,
      type: "badges",
      title: "Awarded badges",
      description: "3 students received Math Wizard badge",
      timestamp: "2 days ago",
      icon: Trophy,
      color: "text-amber-600 dark:text-amber-400",
    },
  ],
  pendingDoubtsList: [
    {
      id: 1,
      student: "Aarav Sharma",
      subject: "Mathematics",
      topic: "Quadratic Equations",
      question:
        "How to solve complex quadratic equations with imaginary roots?",
      timestamp: "30 mins ago",
      priority: "High",
    },
    {
      id: 2,
      student: "Priya Patel",
      subject: "Mathematics",
      topic: "Trigonometry",
      question: "What's the difference between sin and cos functions?",
      timestamp: "1 hour ago",
      priority: "Medium",
    },
    {
      id: 3,
      student: "Arjun Kumar",
      subject: "Mathematics",
      topic: "Algebra",
      question: "Need help with factorization problems",
      timestamp: "2 hours ago",
      priority: "Low",
    },
  ],
  notices: [
    {
      id: 1,
      title: "Tomorrow's class will be online",
      content:
        "Due to weather conditions, all classes will be conducted online tomorrow.",
      type: "Important",
      date: "Today",
    },
    {
      id: 2,
      title: "Weekly test scheduled",
      content:
        "Mathematics test for all classes on Friday. Covers chapters 4-6.",
      type: "Announcement",
      date: "Yesterday",
    },
  ],
  weeklyStats: {
    classesCompleted: 12,
    totalScheduled: 15,
    averageAttendance: 92,
    doubtsResolved: 25,
  },
};

const TeacherDashboardPage = () => {
  const [showClassroomModal, setShowClassroomModal] = useState(false);
  const [showDoubtsModal, setShowDoubtsModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? "Good Morning"
      : currentTime < 17
      ? "Good Afternoon"
      : "Good Evening";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
      case "Low":
        return "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  const getNoticeTypeColor = (type) => {
    switch (type) {
      case "Important":
        return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      case "Announcement":
        return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-2">
      {/* Greeting Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800/50 shadow-sm">
        <CardContent className="p-4 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0">
              <AvatarImage src={teacherData.avatar} alt={teacherData.name} />
              <AvatarFallback className="text-lg sm:text-xl lg:text-2xl font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {teacherData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight mb-2 text-gray-900 dark:text-gray-100">
                {greeting}, {teacherData.name}! 👋
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-blue-600 dark:text-blue-400 mb-4">
                Ready to inspire young minds today? Here's your classroom
                overview.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href="/teacher/classrooms" className="w-full sm:w-auto">
                  <Button
                    size="sm"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-0"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">
                      View All Classrooms
                    </span>
                    <span className="sm:hidden">All Classrooms</span>
                  </Button>
                </Link>
                <Link
                  href="/teacher/classrooms/create"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="sm"
                    variant="neutral"
                    className="w-full sm:w-auto border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Create Classroom</span>
                    <span className="sm:hidden">Create</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Total Classrooms */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24 lg:h-28">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                <Home className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                  {teacherData.totalClasses}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Classrooms
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Students */}
        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24 lg:h-28">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                  {teacherData.totalStudents}
                </p>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                  Students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Doubts */}
        <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-20 sm:h-24 lg:h-28">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                  {teacherData.pendingDoubts}
                </p>
                <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                  Pending Doubts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Uploaded */}
        <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-20 sm:h-24 lg:h-28">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                  {teacherData.contentUploaded}
                </p>
                <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                  Content Items
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 h-32 justify-center">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
            <Zap className="h-5 w-5 text-orange-500" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/teacher/classrooms/create" className="w-full">
              <Button className="w-full text-sm" variant="" size={"sm"}>
                <Plus className=" h-4 w-4" />
                <span className="hidden sm:inline">Create Classroom</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </Link>
            <Link href="/teacher/content/add" className="w-full">
              <Button className="w-full text-sm" variant=""  size={"sm"}>
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Add Content</span>
                <span className="sm:hidden">Content</span>
              </Button>
            </Link>
            <Link href="/teacher/students/attendance" className="w-full">
              <Button className="w-full  text-sm" variant=""  size={"sm"}>
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Take Attendance</span>
                <span className="sm:hidden">Attendance</span>
              </Button>
            </Link>
            <Link href="/teacher/content/notice" className="w-full">
              <Button className="w-full  text-sm" variant=""  size={"sm"}>
                <Megaphone className=" h-4 w-4" />
                <span className="hidden sm:inline">Add Notice</span>
                <span className="sm:hidden">Notice</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Left Column - Classrooms and Activity */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Your Classrooms */}
          <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Home className="h-5 w-5 text-blue-500" />
                  <span>Your Classrooms</span>
                </CardTitle>
                <Dialog
                  open={showClassroomModal}
                  onOpenChange={setShowClassroomModal}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="neutral"
                      className="w-full sm:w-auto"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 mx-4">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        All Classrooms
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Manage your classrooms and view detailed information
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Classroom
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Students
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 hidden md:table-cell">
                              Schedule
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                              Next Class
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Status
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teacherData.classrooms.map((classroom) => (
                            <TableRow key={classroom.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {classroom.name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {classroom.subject}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                                  {classroom.students} students
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700 dark:text-gray-300 hidden md:table-cell">
                                {classroom.schedule}
                              </TableCell>
                              <TableCell className="text-sm text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                                {classroom.nextClass}
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                                  {classroom.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.classrooms.slice(0, 2).map((classroom) => (
                  <Card
                    key={classroom.id}
                    className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex-1 w-full">
                          <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100 mb-2">
                            {classroom.name}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{classroom.students} students</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span className="hidden sm:inline">
                                {classroom.schedule}
                              </span>
                              <span className="sm:hidden">Schedule</span>
                            </span>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/50">
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                              Next class: {classroom.nextClass}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                          <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 justify-center">
                            {classroom.status}
                          </Badge>
                          <Link
                            href={`/teacher/classrooms/${classroom.id}`}
                            className="w-full lg:w-auto"
                          >
                            <Button size="sm" className="w-full">
                              Enter
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span>Recent Activity</span>
                </CardTitle>
                <Dialog
                  open={showActivityModal}
                  onOpenChange={setShowActivityModal}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant=""
                      className="w-full sm:w-auto"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 mx-4">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        All Recent Activity
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Complete timeline of your recent actions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {teacherData.recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {activity.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.recentActivity.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Pending Doubts */}
          <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <MessageSquare className="h-5 w-5 text-red-500" />
                  <span>Pending Doubts</span>
                </CardTitle>
                <Dialog
                  open={showDoubtsModal}
                  onOpenChange={setShowDoubtsModal}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant=""
                      className="w-full sm:w-auto"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 mx-4">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        All Pending Doubts
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Student questions awaiting your response
                      </DialogDescription>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Student
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Topic
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 hidden md:table-cell">
                              Question
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Priority
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                              Time
                            </TableHead>
                            <TableHead className="text-gray-900 dark:text-gray-100">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teacherData.pendingDoubtsList.map((doubt) => (
                            <TableRow key={doubt.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-gray-100">
                                    {doubt.student}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {doubt.subject}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50">
                                  {doubt.topic}
                                </Badge>
                              </TableCell>
                              <TableCell className="max-w-xs hidden md:table-cell">
                                <p className="text-sm truncate text-gray-700 dark:text-gray-300">
                                  {doubt.question}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getPriorityColor(doubt.priority)}
                                >
                                  {doubt.priority}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                                {doubt.timestamp}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-0"
                                >
                                  Respond
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.pendingDoubtsList.slice(0, 3).map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                            {doubt.student}
                          </p>
                          <Badge className={getPriorityColor(doubt.priority)}>
                            {doubt.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">{doubt.topic}</span> •{" "}
                          {doubt.timestamp}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                          {doubt.question}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
                    >
                      Respond to Doubt
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Performance */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Classes Completed
                  </span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {teacherData.weeklyStats.classesCompleted}/
                    {teacherData.weeklyStats.totalScheduled}
                  </span>
                </div>
                <Progress
                  value={
                    (teacherData.weeklyStats.classesCompleted /
                      teacherData.weeklyStats.totalScheduled) *
                    100
                  }
                  className="h-2"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Avg. Attendance
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {teacherData.weeklyStats.averageAttendance}%
                  </span>
                </div>
                <Progress
                  value={teacherData.weeklyStats.averageAttendance}
                  className="h-2"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Doubts Resolved
                  </span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">
                    {teacherData.weeklyStats.doubtsResolved}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notices */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Bell className="h-5 w-5 text-orange-500" />
                <span>Recent Notices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.notices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {notice.title}
                      </h4>
                      <Badge className={getNoticeTypeColor(notice.type)}>
                        {notice.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {notice.content}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {notice.date}
                    </p>
                  </div>
                ))}
                <Link href="/teacher/content/notice" className="w-full">
                  <Button size="sm" className="w-full" variant="neutral">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Notice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
