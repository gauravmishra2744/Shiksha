"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  BookOpen,
  Users,
  Calendar,
  Plus,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Clock,
  MapPin,
  GraduationCap,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  Target,
  BarChart3,
  Star,
  CheckCircle,
  Archive,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Dummy data for classrooms
const classroomsData = [
  {
    id: 1,
    name: "Grade 10 - Mathematics A",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
    studentCount: 28,
    description: "Advanced mathematics for Grade 10 students covering algebra, geometry, and trigonometry",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 205",
    status: "Active",
    createdAt: "2024-01-15",
    code: "MATH10A",
    teacher: "Mr. Sharma",
    lastActivity: "2 hours ago",
    upcomingAssignments: 3,
    averageGrade: 78,
    recentActivity: "Quiz: Quadratic Equations submitted by 25 students",
    color: "blue",
  },
  {
    id: 2,
    name: "Grade 9 - Physics B",
    subject: "Physics",
    grade: "Grade 9",
    section: "B",
    studentCount: 25,
    description: "Introduction to physics concepts including mechanics, thermodynamics, and waves",
    schedule: "Tue, Thu - 10:30 AM",
    room: "Room 301",
    status: "Active",
    createdAt: "2024-01-12",
    code: "PHY9B",
    teacher: "Dr. Patel",
    lastActivity: "5 hours ago",
    upcomingAssignments: 2,
    averageGrade: 82,
    recentActivity: "Lab Report: Motion Analysis graded for 20 students",
    color: "green",
  },
  {
    id: 3,
    name: "Grade 8 - English C",
    subject: "English",
    grade: "Grade 8",
    section: "C",
    studentCount: 30,
    description: "English literature and language focusing on reading comprehension and creative writing",
    schedule: "Daily - 11:00 AM",
    room: "Room 102",
    status: "Active",
    createdAt: "2024-01-10",
    code: "ENG8C",
    teacher: "Ms. Kumar",
    lastActivity: "1 day ago",
    upcomingAssignments: 1,
    averageGrade: 85,
    recentActivity: "Essay: Character Analysis submitted by 28 students",
    color: "purple",
  },
  {
    id: 4,
    name: "Grade 11 - Chemistry",
    subject: "Chemistry",
    grade: "Grade 11",
    section: "A",
    studentCount: 22,
    description: "Organic and inorganic chemistry with practical laboratory sessions",
    schedule: "Mon, Wed - 2:00 PM",
    room: "Lab 1",
    status: "Active",
    createdAt: "2024-01-08",
    code: "CHEM11A",
    teacher: "Dr. Singh",
    lastActivity: "3 hours ago",
    upcomingAssignments: 4,
    averageGrade: 76,
    recentActivity: "Lab: Acid-Base Titration completed by 18 students",
    color: "orange",
  },
  {
    id: 5,
    name: "Grade 12 - Biology",
    subject: "Biology",
    grade: "Grade 12",
    section: "B",
    studentCount: 26,
    description: "Advanced biology covering genetics, ecology, and human physiology",
    schedule: "Tue, Thu, Fri - 1:00 PM",
    room: "Room 403",
    status: "Inactive",
    createdAt: "2024-01-05",
    code: "BIO12B",
    teacher: "Ms. Reddy",
    lastActivity: "1 week ago",
    upcomingAssignments: 0,
    averageGrade: 88,
    recentActivity: "Final exam preparation materials uploaded",
    color: "green",
  },
  {
    id: 6,
    name: "Grade 7 - History",
    subject: "History",
    grade: "Grade 7",
    section: "A",
    studentCount: 24,
    description: "Ancient and medieval history with focus on Indian civilization",
    schedule: "Mon, Thu - 3:00 PM",
    room: "Room 204",
    status: "Active",
    createdAt: "2024-01-03",
    code: "HIST7A",
    teacher: "Mr. Gupta",
    lastActivity: "6 hours ago",
    upcomingAssignments: 2,
    averageGrade: 81,
    recentActivity: "Project: Mughal Empire presentations ongoing",
    color: "amber",
  },
];

export default function AllClassrooms() {
  const [classrooms, setClassrooms] = useState(classroomsData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredClassrooms = classrooms.filter((classroom) => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || classroom.status.toLowerCase() === statusFilter;
    const matchesSubject = subjectFilter === "all" || classroom.subject === subjectFilter;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border-green-200";
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Archived":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "bg-blue-50 text-blue-700 border-blue-200",
      Physics: "bg-green-50 text-green-700 border-green-200",
      Chemistry: "bg-orange-50 text-orange-700 border-orange-200",
      Biology: "bg-emerald-50 text-emerald-700 border-emerald-200",
      English: "bg-purple-50 text-purple-700 border-purple-200",
      History: "bg-amber-50 text-amber-700 border-amber-200",
    };
    return colors[subject] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const subjects = [...new Set(classrooms.map(c => c.subject))];
  const activeClassrooms = classrooms.filter(c => c.status === "Active").length;
  const totalStudents = classrooms.reduce((sum, c) => sum + c.studentCount, 0);
  const avgGrade = Math.round(classrooms.reduce((sum, c) => sum + c.averageGrade, 0) / classrooms.length);

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicBreadcrumb />
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
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
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Classrooms</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Manage and monitor all your classroom activities
                  </p>
                </div>
                <Link href="/teacher/classrooms/create">
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Create Classroom</span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {activeClassrooms} Active
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Users className="w-3 h-3 mr-1" />
                  {totalStudents} Students
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Award className="w-3 h-3 mr-1" />
                  {avgGrade}% Avg Grade
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
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {classrooms.length}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Classes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {totalStudents}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Total Students
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
                      {avgGrade}%
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
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {classrooms.reduce((sum, c) => sum + c.upcomingAssignments, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Assignments Due
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
                      placeholder="Search classrooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
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
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classrooms Grid/List */}
          {filteredClassrooms.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== "all" || subjectFilter !== "all" 
                    ? "No classrooms found" 
                    : "No classrooms yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== "all" || subjectFilter !== "all"
                    ? "Try adjusting your search criteria"
                    : "Create your first classroom to get started"}
                </p>
                <Link href="/teacher/classrooms/create">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Classroom
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
              : "space-y-4"}>
              {filteredClassrooms.map((classroom) => (
                <Card key={classroom.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className={viewMode === "grid" ? "p-4" : "p-4"}>
                    {viewMode === "grid" ? (
                      // Grid View
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base line-clamp-2 mb-1">
                              {classroom.name}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getSubjectColor(classroom.subject)} variant="outline">
                                {classroom.subject}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {classroom.grade}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Badge className={getStatusColor(classroom.status)} variant="outline">
                              {classroom.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Users className="h-3 w-3" />
                              <span>{classroom.studentCount} students</span>
                            </div>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                              {classroom.code}
                            </span>
                          </div>
                          
                          {classroom.schedule && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">{classroom.schedule}</span>
                            </div>
                          )}
                          
                          {classroom.room && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs">{classroom.room}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Last activity: {classroom.lastActivity}</span>
                            <span>Avg: {classroom.averageGrade}%</span>
                          </div>
                          
                          {classroom.upcomingAssignments > 0 && (
                            <div className="flex items-center space-x-2 text-xs text-orange-600">
                              <FileText className="h-3 w-3" />
                              <span>{classroom.upcomingAssignments} assignments due</span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <BookOpen className="mr-2 h-3 w-3" />
                            Enter Class
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{classroom.name}</DialogTitle>
                                <DialogDescription>
                                  Classroom overview and quick actions
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Subject</p>
                                    <p>{classroom.subject}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Grade & Section</p>
                                    <p>{classroom.grade} - {classroom.section}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Students</p>
                                    <p>{classroom.studentCount} enrolled</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Average Grade</p>
                                    <p className="font-semibold">{classroom.averageGrade}%</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                                  <p className="text-sm text-gray-600">{classroom.description}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium text-gray-500 mb-1">Recent Activity</p>
                                  <p className="text-sm text-gray-600">{classroom.recentActivity}</p>
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Share2 className="mr-2 h-3 w-3" />
                                    Share Code
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Settings className="mr-2 h-3 w-3" />
                                    Settings
                                  </Button>
                                  <Button size="sm">
                                    <BookOpen className="mr-2 h-3 w-3" />
                                    Enter Class
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-base">{classroom.name}</h3>
                            <Badge className={getSubjectColor(classroom.subject)} variant="outline">
                              {classroom.subject}
                            </Badge>
                            <Badge variant="outline">{classroom.grade}</Badge>
                            <Badge className={getStatusColor(classroom.status)} variant="outline">
                              {classroom.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{classroom.studentCount} students</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{classroom.schedule}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{classroom.room}</span>
                            </span>
                            <span>Code: {classroom.code}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm">
                            <BookOpen className="mr-2 h-3 w-3" />
                            Enter Class
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
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