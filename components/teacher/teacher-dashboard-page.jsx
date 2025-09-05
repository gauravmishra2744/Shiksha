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
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "content",
      title: "Uploaded new content",
      description: "Chapter 5 - Quadratic Equations",
      timestamp: "Yesterday",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "attendance",
      title: "Marked attendance",
      description: "Class 9 - Mathematics B (25/25 present)",
      timestamp: "1 day ago",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "badges",
      title: "Awarded badges",
      description: "3 students received Math Wizard badge",
      timestamp: "2 days ago",
      icon: Trophy,
      color: "text-amber-600",
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
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Greeting Header */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-white shadow-lg">
              <AvatarImage src={teacherData.avatar} />
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-800">
                {teacherData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                {greeting}, {teacherData.name}! 👋
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-blue-600 dark:text-blue-400 mb-3">
                Ready to inspire young minds today? Here's your classroom
                overview.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link href="/teacher/classrooms">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    View All Classrooms
                  </Button>
                </Link>
                <Link href="/teacher/classrooms/create">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Classroom
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Stats Cards - Following student dashboard pattern */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Total Classrooms */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
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
        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
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
        <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
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
        <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
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
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-orange-500" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/teacher/classrooms/create">
              <Button className="w-full h-12 text-sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Classroom
              </Button>
            </Link>
            <Link href="/teacher/content/add">
              <Button className="w-full h-12 text-sm" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </Link>
            <Link href="/teacher/students/attendance">
              <Button className="w-full h-12 text-sm" variant="outline">
                <CheckSquare className="mr-2 h-4 w-4" />
                Take Attendance
              </Button>
            </Link>
            <Link href="/teacher/content/notice">
              <Button className="w-full h-12 text-sm" variant="outline">
                <Megaphone className="mr-2 h-4 w-4" />
                Add Notice
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
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Home className="h-5 w-5 text-blue-500" />
                  <span>Your Classrooms</span>
                </CardTitle>
                <Dialog
                  open={showClassroomModal}
                  onOpenChange={setShowClassroomModal}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>All Classrooms</DialogTitle>
                      <DialogDescription>
                        Manage your classrooms and view detailed information
                      </DialogDescription>
                    </DialogHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Classroom</TableHead>
                          <TableHead>Students</TableHead>
                          <TableHead>Schedule</TableHead>
                          <TableHead>Next Class</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teacherData.classrooms.map((classroom) => (
                          <TableRow key={classroom.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{classroom.name}</p>
                                <p className="text-sm text-gray-500">
                                  {classroom.subject}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {classroom.students} students
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {classroom.schedule}
                            </TableCell>
                            <TableCell className="text-sm">
                              {classroom.nextClass}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-50 text-green-700 border-green-200">
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
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.classrooms.slice(0, 2).map((classroom) => (
                  <Card
                    key={classroom.id}
                    className="border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {classroom.name}
                          </h3>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{classroom.students} students</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{classroom.schedule}</span>
                            </span>
                          </div>
                          <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-700 font-medium">
                              Next class: {classroom.nextClass}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                            {classroom.status}
                          </Badge>
                          <Link href={`/teacher/classrooms/${classroom.id}`}>
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
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span>Recent Activity</span>
                </CardTitle>
                <Dialog
                  open={showActivityModal}
                  onOpenChange={setShowActivityModal}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>All Recent Activity</DialogTitle>
                      <DialogDescription>
                        Complete timeline of your recent actions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {teacherData.recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50"
                        >
                          <div
                            className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-500">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
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
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                    >
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
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
        <div className="space-y-6">
          {/* Pending Doubts */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-red-500" />
                  <span>Pending Doubts</span>
                </CardTitle>
                <Dialog
                  open={showDoubtsModal}
                  onOpenChange={setShowDoubtsModal}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>All Pending Doubts</DialogTitle>
                      <DialogDescription>
                        Student questions awaiting your response
                      </DialogDescription>
                    </DialogHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Topic</TableHead>
                          <TableHead>Question</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teacherData.pendingDoubtsList.map((doubt) => (
                          <TableRow key={doubt.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{doubt.student}</p>
                                <p className="text-sm text-gray-500">
                                  {doubt.subject}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{doubt.topic}</Badge>
                            </TableCell>
                            <TableCell className="max-w-xs">
                              <p className="text-sm truncate">
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
                            <TableCell className="text-sm">
                              {doubt.timestamp}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Respond
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.pendingDoubtsList.slice(0, 3).map((doubt) => (
                  <div
                    key={doubt.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm">{doubt.student}</p>
                          <Badge
                            className={getPriorityColor(doubt.priority)}
                            variant="outline"
                          >
                            {doubt.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          <span className="font-medium">{doubt.topic}</span> •{" "}
                          {doubt.timestamp}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {doubt.question}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Respond to Doubt
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Performance */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Classes Completed
                  </span>
                  <span className="font-bold text-green-600">
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
                  <span className="text-sm text-gray-500">Avg. Attendance</span>
                  <span className="font-bold text-blue-600">
                    {teacherData.weeklyStats.averageAttendance}%
                  </span>
                </div>
                <Progress
                  value={teacherData.weeklyStats.averageAttendance}
                  className="h-2"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Doubts Resolved</span>
                  <span className="font-bold text-purple-600">
                    {teacherData.weeklyStats.doubtsResolved}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notices */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <span>Recent Notices</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.notices.map((notice) => (
                  <div key={notice.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{notice.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {notice.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {notice.content}
                    </p>
                    <p className="text-xs text-gray-400">{notice.date}</p>
                  </div>
                ))}
                <Link href="/teacher/content/notice">
                  <Button size="sm" className="w-full" variant="outline">
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
