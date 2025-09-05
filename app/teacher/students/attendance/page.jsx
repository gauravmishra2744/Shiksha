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
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  CalendarDays,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  FileText,
  RefreshCw,
  Save,
  History,
  Target,
  Award,
  Settings,
} from "lucide-react";

// Dummy data for students
const studentsData = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "2024001",
    email: "aarav.sharma@school.edu",
    phone: "+91-9876543210",
    class: "Grade 10",
    section: "A",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "present",
      "2024-01-13": "late",
      "2024-01-12": "present",
      "2024-01-11": "absent",
    },
    overallAttendance: 92,
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNumber: "2024002",
    email: "priya.patel@school.edu",
    phone: "+91-9876543212",
    class: "Grade 10",
    section: "A",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "present",
      "2024-01-13": "present",
      "2024-01-12": "present",
      "2024-01-11": "present",
    },
    overallAttendance: 96,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    rollNumber: "2024003",
    email: "arjun.kumar@school.edu",
    phone: "+91-9876543214",
    class: "Grade 9",
    section: "B",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "absent",
      "2024-01-13": "present",
      "2024-01-12": "late",
      "2024-01-11": "present",
    },
    overallAttendance: 88,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    rollNumber: "2024004",
    email: "sneha.gupta@school.edu",
    phone: "+91-9876543216",
    class: "Grade 11",
    section: "C",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "present",
      "2024-01-13": "present",
      "2024-01-12": "present",
      "2024-01-11": "late",
    },
    overallAttendance: 94,
  },
  {
    id: 5,
    name: "Rohit Singh",
    rollNumber: "2024005",
    email: "rohit.singh@school.edu",
    phone: "+91-9876543218",
    class: "Grade 8",
    section: "A",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "present",
      "2024-01-13": "absent",
      "2024-01-12": "present",
      "2024-01-11": "present",
    },
    overallAttendance: 90,
  },
  {
    id: 6,
    name: "Kavya Reddy",
    rollNumber: "2024006",
    email: "kavya.reddy@school.edu",
    phone: "+91-9876543220",
    class: "Grade 12",
    section: "B",
    avatar: "",
    attendanceHistory: {
      "2024-01-15": "present",
      "2024-01-14": "present",
      "2024-01-13": "present",
      "2024-01-12": "present",
      "2024-01-11": "present",
    },
    overallAttendance: 98,
  },
];

export default function AttendancePage() {
  const [students, setStudents] = useState(studentsData);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  useEffect(() => {
    loadAttendanceForDate();
  }, [selectedDate]);

  const loadAttendanceForDate = () => {
    // Load existing attendance for selected date from student history
    const dateAttendance = {};
    students.forEach((student) => {
      if (student.attendanceHistory[selectedDate]) {
        dateAttendance[student.id] = student.attendanceHistory[selectedDate];
      }
    });
    setAttendance(dateAttendance);
  };

  const markAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const markAllPresent = () => {
    const allPresent = {};
    filteredStudents.forEach((student) => {
      allPresent[student.id] = "present";
    });
    setAttendance((prev) => ({ ...prev, ...allPresent }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update student attendance history
      setStudents((prev) =>
        prev.map((student) => ({
          ...student,
          attendanceHistory: {
            ...student.attendanceHistory,
            [selectedDate]: attendance[student.id] || "absent",
          },
        }))
      );

      setMessage("Attendance saved successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error saving attendance:", error);
      setMessage("Error saving attendance. Please try again.");
      setMessageType("error");
    }

    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const getAttendanceStats = () => {
    const total = filteredStudents.length;
    const present = Object.values(attendance).filter(
      (status) => status === "present"
    ).length;
    const absent = Object.values(attendance).filter(
      (status) => status === "absent"
    ).length;
    const late = Object.values(attendance).filter(
      (status) => status === "late"
    ).length;
    const unmarked = total - present - absent - late;

    return { total, present, absent, late, unmarked };
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 85) return "text-blue-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-50 text-green-700 border-green-200";
      case "absent":
        return "bg-red-50 text-red-700 border-red-200";
      case "late":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const stats = getAttendanceStats();
  const classes = [...new Set(students.map((s) => s.class))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-200 dark:border-green-800">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Attendance
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Mark and track student attendance for{" "}
                    {new Date(selectedDate).toLocaleDateString()}
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
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {stats.present} Present
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-700 border-red-200"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  {stats.absent} Absent
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-700 border-orange-200"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {stats.late} Late
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-5">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {stats.total}
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
                      {stats.present}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Present
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <XCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                      {stats.absent}
                    </p>
                    <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                      Absent
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {stats.late}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Late
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-gray-200 truncate">
                      {stats.unmarked}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Unmarked
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls and Filters */}
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
                    value={selectedClass}
                    onValueChange={setSelectedClass}
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

                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllPresent}
                    disabled={filteredStudents.length === 0}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark All Present
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Attendance Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-green-500" />
                    <span>
                      Mark Attendance -{" "}
                      {new Date(selectedDate).toLocaleDateString()}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Click on the buttons to mark attendance for each student
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
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
                        <Calendar className="h-4 w-4" />
                      )}
                      <span>{message}</span>
                    </div>
                  )}
                  <Button
                    onClick={saveAttendance}
                    disabled={saving || Object.keys(attendance).length === 0}
                    className="flex items-center space-x-2"
                  >
                    {saving ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{saving ? "Saving..." : "Save Attendance"}</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No students found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or class filter
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
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
                        <div className="flex-1">
                          <h3 className="font-medium">{student.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Roll: {student.rollNumber}</span>
                            <span>
                              {student.class} - {student.section}
                            </span>
                            <span
                              className={`${getAttendanceColor(
                                student.overallAttendance
                              )} font-medium`}
                            >
                              Overall: {student.overallAttendance}%
                            </span>
                          </div>
                        </div>
                        {attendance[student.id] && (
                          <Badge
                            className={`${getStatusColor(
                              attendance[student.id]
                            )} border`}
                            variant="outline"
                          >
                            {attendance[student.id]}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={
                            attendance[student.id] === "present"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => markAttendance(student.id, "present")}
                          className={
                            attendance[student.id] === "present"
                              ? "bg-green-600 hover:bg-green-700"
                              : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            attendance[student.id] === "late"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => markAttendance(student.id, "late")}
                          className={
                            attendance[student.id] === "late"
                              ? "bg-orange-600 hover:bg-orange-700"
                              : "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                          }
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Late
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            attendance[student.id] === "absent"
                              ? "destructive"
                              : "outline"
                          }
                          onClick={() => markAttendance(student.id, "absent")}
                          className={
                            attendance[student.id] !== "absent"
                              ? "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                              : ""
                          }
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
