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
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  GraduationCap,
  Eye,
  MessageSquare,
  UserPlus,
  Grid,
  List,
  Download,
  Upload,
  Settings,
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  FileText,
  Home,
  User,
  Smartphone,
} from "lucide-react";

// Dummy data for students
const studentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "2024001",
    email: "aarav.sharma@school.edu",
    phone: "+91-9876543210",
    parentPhone: "+91-9876543211",
    class: "Grade 10",
    section: "A",
    address: "123 Main Street, Delhi",
    dateOfBirth: "2008-05-15",
    joinDate: "2022-04-01",
    status: "active",
    attendance: 92,
    performance: 85,
    avatar: "",
    parentName: "Mr. Rajesh Sharma",
    parentEmail: "rajesh.sharma@email.com",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    lastLogin: "2024-01-15",
    totalAssignments: 24,
    completedAssignments: 22,
    grade: "A",
    isStarred: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "2024002",
    email: "priya.patel@school.edu",
    phone: "+91-9876543212",
    parentPhone: "+91-9876543213",
    class: "Grade 10",
    section: "A",
    address: "456 Park Avenue, Mumbai",
    dateOfBirth: "2008-08-22",
    joinDate: "2022-04-01",
    status: "active",
    attendance: 96,
    performance: 92,
    avatar: "",
    parentName: "Mrs. Meera Patel",
    parentEmail: "meera.patel@email.com",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    lastLogin: "2024-01-14",
    totalAssignments: 24,
    completedAssignments: 24,
    grade: "A+",
    isStarred: false,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNumber: "2024003",
    email: "arjun.kumar@school.edu",
    phone: "+91-9876543214",
    parentPhone: "+91-9876543215",
    class: "Grade 9",
    section: "B",
    address: "789 Garden Road, Bangalore",
    dateOfBirth: "2009-03-10",
    joinDate: "2023-04-01",
    status: "active",
    attendance: 88,
    performance: 78,
    avatar: "",
    parentName: "Mr. Suresh Kumar",
    parentEmail: "suresh.kumar@email.com",
    subjects: ["Mathematics", "Science", "English", "Hindi"],
    lastLogin: "2024-01-13",
    totalAssignments: 20,
    completedAssignments: 18,
    grade: "B+",
    isStarred: true,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rollNumber: "2024004",
    email: "sneha.gupta@school.edu",
    phone: "+91-9876543216",
    parentPhone: "+91-9876543217",
    class: "Grade 11",
    section: "C",
    address: "321 Lake View, Chennai",
    dateOfBirth: "2007-12-05",
    joinDate: "2021-04-01",
    status: "active",
    attendance: 94,
    performance: 89,
    avatar: "",
    parentName: "Dr. Amit Gupta",
    parentEmail: "amit.gupta@email.com",
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
    lastLogin: "2024-01-15",
    totalAssignments: 28,
    completedAssignments: 26,
    grade: "A",
    isStarred: false,
  },
  {
    id: 5,
    name: "Rohit Singh",
    rollNumber: "2024005",
    email: "rohit.singh@school.edu",
    phone: "+91-9876543218",
    parentPhone: "+91-9876543219",
    class: "Grade 8",
    section: "A",
    address: "654 River Side, Kolkata",
    dateOfBirth: "2010-01-18",
    joinDate: "2024-04-01",
    status: "active",
    attendance: 90,
    performance: 82,
    avatar: "",
    parentName: "Mrs. Sunita Singh",
    parentEmail: "sunita.singh@email.com",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    lastLogin: "2024-01-12",
    totalAssignments: 16,
    completedAssignments: 15,
    grade: "A-",
    isStarred: false,
  },
  {
    id: 6,
    name: "Kavya Reddy",
    rollNumber: "2024006",
    email: "kavya.reddy@school.edu",
    phone: "+91-9876543220",
    parentPhone: "+91-9876543221",
    class: "Grade 12",
    section: "B",
    address: "987 Hill Station, Hyderabad",
    dateOfBirth: "2006-09-30",
    joinDate: "2020-04-01",
    status: "active",
    attendance: 98,
    performance: 95,
    avatar: "",
    parentName: "Mr. Venkat Reddy",
    parentEmail: "venkat.reddy@email.com",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    lastLogin: "2024-01-15",
    totalAssignments: 32,
    completedAssignments: 32,
    grade: "A+",
    isStarred: true,
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(studentsData);
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, classFilter, statusFilter, performanceFilter, students]);

  const filterStudents = () => {
    let filtered = students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "all" || student.class === classFilter;
      const matchesStatus =
        statusFilter === "all" || student.status === statusFilter;

      let matchesPerformance = true;
      if (performanceFilter === "excellent")
        matchesPerformance = student.performance >= 90;
      else if (performanceFilter === "good")
        matchesPerformance =
          student.performance >= 75 && student.performance < 90;
      else if (performanceFilter === "average")
        matchesPerformance =
          student.performance >= 60 && student.performance < 75;
      else if (performanceFilter === "poor")
        matchesPerformance = student.performance < 60;

      return (
        matchesSearch && matchesClass && matchesStatus && matchesPerformance
      );
    });

    setFilteredStudents(filtered);
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "bg-green-50 text-green-700 border-green-200";
    if (performance >= 75) return "bg-blue-50 text-blue-700 border-blue-200";
    if (performance >= 60)
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 85) return "text-blue-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-green-50 text-green-700 border-green-200";
      case "A":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "A-":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "B+":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "B":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const toggleStar = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isStarred: !student.isStarred }
          : student
      )
    );
  };

  const classes = [...new Set(students.map((s) => s.class))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-800">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Students
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    View and manage all students in your classes
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {students.filter((s) => s.status === "active").length} Active
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {students.filter((s) => s.performance >= 90).length} Excellent
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {students.length} Total Students
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {students.length}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Students
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {Math.round(
                        students.reduce((sum, s) => sum + s.attendance, 0) /
                          students.length
                      )}
                      %
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Avg Attendance
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
                      {Math.round(
                        students.reduce((sum, s) => sum + s.performance, 0) /
                          students.length
                      )}
                      %
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Avg Performance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {students.filter((s) => s.performance >= 90).length}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Top Performers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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

                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Class" />
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

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={performanceFilter}
                    onValueChange={setPerformanceFilter}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Performance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Performance</SelectItem>
                      <SelectItem value="excellent">
                        Excellent (90%+)
                      </SelectItem>
                      <SelectItem value="good">Good (75-89%)</SelectItem>
                      <SelectItem value="average">Average (60-74%)</SelectItem>
                      <SelectItem value="poor">Poor (&lt;60%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm ||
                  classFilter !== "all" ||
                  statusFilter !== "all" ||
                  performanceFilter !== "all"
                    ? "No students found"
                    : "No students yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ||
                  classFilter !== "all" ||
                  statusFilter !== "all" ||
                  performanceFilter !== "all"
                    ? "Try adjusting your search criteria"
                    : "Students will appear here once they're enrolled"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  : "space-y-4"
              }
            >
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className={viewMode === "grid" ? "p-4" : "p-4"}>
                    {viewMode === "grid" ? (
                      // Grid View
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
                              <Badge
                                className={`${getGradeColor(
                                  student.grade
                                )} border text-xs mt-1`}
                                variant="outline"
                              >
                                Grade {student.grade}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStar(student.id)}
                            className={
                              student.isStarred ? "text-yellow-500" : ""
                            }
                          >
                            <Star
                              className={`h-4 w-4 ${
                                student.isStarred ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Class:</span>
                            <span className="font-medium">
                              {student.class} - {student.section}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Attendance:</span>
                            <span
                              className={`font-medium ${getAttendanceColor(
                                student.attendance
                              )}`}
                            >
                              {student.attendance}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Performance:</span>
                            <Badge
                              className={`${getPerformanceColor(
                                student.performance
                              )} border text-xs`}
                              variant="outline"
                            >
                              {student.performance}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Assignments:</span>
                            <span className="font-medium">
                              {student.completedAssignments}/
                              {student.totalAssignments}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Phone className="h-3 w-3" />
                            <span>{student.phone}</span>
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
                                <DialogTitle>Student Details</DialogTitle>
                                <DialogDescription>
                                  Complete information about {student.name}
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
                                    <Badge
                                      className={`${getGradeColor(
                                        student.grade
                                      )} border mt-1`}
                                      variant="outline"
                                    >
                                      Grade {student.grade}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Personal Information
                                    </h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        <span>
                                          DOB:{" "}
                                          {new Date(
                                            student.dateOfBirth
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{student.email}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{student.phone}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{student.address}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Academic Information
                                    </h4>
                                    <div className="space-y-2">
                                      <div>
                                        Class: {student.class} -{" "}
                                        {student.section}
                                      </div>
                                      <div>
                                        Attendance:{" "}
                                        <span
                                          className={getAttendanceColor(
                                            student.attendance
                                          )}
                                        >
                                          {student.attendance}%
                                        </span>
                                      </div>
                                      <div>
                                        Performance: {student.performance}%
                                      </div>
                                      <div>
                                        Assignments:{" "}
                                        {student.completedAssignments}/
                                        {student.totalAssignments}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Parent Information
                                  </h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>Name: {student.parentName}</div>
                                    <div>Email: {student.parentEmail}</div>
                                    <div>Phone: {student.parentPhone}</div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="flex items-center space-x-4">
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
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-sm">
                              {student.name}
                            </h3>
                            <Badge
                              className={`${getGradeColor(
                                student.grade
                              )} border text-xs`}
                              variant="outline"
                            >
                              {student.grade}
                            </Badge>
                            {student.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>Roll: {student.rollNumber}</span>
                            <span>
                              {student.class} - {student.section}
                            </span>
                            <span
                              className={getAttendanceColor(student.attendance)}
                            >
                              Attendance: {student.attendance}%
                            </span>
                            <Badge
                              className={`${getPerformanceColor(
                                student.performance
                              )} border`}
                              variant="outline"
                            >
                              {student.performance}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStar(student.id)}
                            className={
                              student.isStarred ? "text-yellow-500" : ""
                            }
                          >
                            <Star
                              className={`h-4 w-4 ${
                                student.isStarred ? "fill-current" : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
