"use client";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
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
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Share2,
  QrCode,
  Download,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

// Dummy data for existing classrooms
const existingClassrooms = [
  {
    id: 1,
    name: "Grade 10 - Mathematics A",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
    studentCount: 28,
    description: "Advanced mathematics for Grade 10 students",
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 205",
    status: "Active",
    createdAt: "2024-01-15",
    code: "MATH10A",
    teacher: "Mr. Sharma",
  },
  {
    id: 2,
    name: "Grade 9 - Physics B",
    subject: "Physics",
    grade: "Grade 9",
    section: "B",
    studentCount: 25,
    description: "Introduction to physics concepts",
    schedule: "Tue, Thu - 10:30 AM",
    room: "Room 301",
    status: "Active",
    createdAt: "2024-01-12",
    code: "PHY9B",
    teacher: "Dr. Patel",
  },
  {
    id: 3,
    name: "Grade 8 - English C",
    subject: "English",
    grade: "Grade 8",
    section: "C",
    studentCount: 30,
    description: "English literature and language",
    schedule: "Daily - 11:00 AM",
    room: "Room 102",
    status: "Active",
    createdAt: "2024-01-10",
    code: "ENG8C",
    teacher: "Ms. Kumar",
  },
];

export default function CreateClassroomPage() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState("");
  const [room, setRoom] = useState("");
  const [created, setCreated] = useState(null);
  const [classrooms, setClassrooms] = useState(existingClassrooms);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim() || !subject || !grade) return;

    const newClassroom = {
      id: Date.now(),
      name: name.trim(),
      subject,
      grade,
      section,
      description: description.trim(),
      schedule: schedule.trim(),
      room: room.trim(),
      studentCount: 0,
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
      code: `${subject.substring(0, 3).toUpperCase()}${grade.replace(
        "Grade ",
        ""
      )}${section}`,
      teacher: "You",
    };

    setClassrooms([newClassroom, ...classrooms]);
    setCreated(newClassroom);
    setShowSuccess(true);

    // Reset form
    setName("");
    setSubject("");
    setGrade("");
    setSection("");
    setDescription("");
    setSchedule("");
    setRoom("");

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "Inactive":
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
      case "Archived":
        return "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 flex-shrink-0">
                  <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Create Classroom
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                    Set up a new classroom for your students with detailed
                    information
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                  <Plus className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Quick Setup</span>
                  <span className="sm:hidden">Setup</span>
                </Badge>
                <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                  <Users className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Student Management</span>
                  <span className="sm:hidden">Students</span>
                </Badge>
                <Badge className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                  <BookOpen className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Course Integration</span>
                  <span className="sm:hidden">Course</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          {showSuccess && created && (
            <Card className="border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Classroom created successfully!
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300 truncate">
                      {created.name} is ready for students. Class code:{" "}
                      <strong>{created.code}</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Create Classroom Form */}
            <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span>Classroom Details</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Fill in the information below to create your new classroom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleCreate}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Classroom Name *
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Grade 10 - Mathematics A"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Subject *
                      </Label>
                      <Select
                        value={subject}
                        onValueChange={setSubject}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Geography">Geography</SelectItem>
                          <SelectItem value="Computer Science">
                            Computer Science
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="grade"
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Grade Level *
                      </Label>
                      <Select value={grade} onValueChange={setGrade} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Grade 6">Grade 6</SelectItem>
                          <SelectItem value="Grade 7">Grade 7</SelectItem>
                          <SelectItem value="Grade 8">Grade 8</SelectItem>
                          <SelectItem value="Grade 9">Grade 9</SelectItem>
                          <SelectItem value="Grade 10">Grade 10</SelectItem>
                          <SelectItem value="Grade 11">Grade 11</SelectItem>
                          <SelectItem value="Grade 12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="section"
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Section
                      </Label>
                      <Input
                        id="section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        placeholder="e.g., A, B, C"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="room"
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="e.g., Room 205"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="schedule"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Schedule
                    </Label>
                    <Input
                      id="schedule"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the classroom or course"
                      rows={3}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Classroom
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Preview & Settings */}
            <div className="space-y-4 sm:space-y-6">
              {/* Preview Card */}
              {(name || subject || grade) && (
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Eye className="h-5 w-5 text-green-500" />
                      <span>Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                          {name || "Classroom Name"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {subject && (
                            <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                              {subject}
                            </Badge>
                          )}
                          {grade && (
                            <Badge className="bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50">
                              {grade}
                            </Badge>
                          )}
                          {section && (
                            <Badge className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                              Section {section}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        {schedule && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{schedule}</span>
                          </div>
                        )}
                        {room && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{room}</span>
                          </div>
                        )}
                      </div>

                      {subject && grade && section && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Class Code:
                          </p>
                          <p className="font-mono font-medium text-gray-900 dark:text-gray-100">
                            {`${subject
                              .substring(0, 3)
                              .toUpperCase()}${grade.replace(
                              "Grade ",
                              ""
                            )}${section}`}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <span>After Creation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                      <UserPlus className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Invite Students
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Share class code or send invitations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                      <QrCode className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Generate QR Code
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Easy joining for students
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Add Course Materials
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Upload syllabus and resources
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Existing Classrooms */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Your Classrooms</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Manage and view all your existing classrooms
                  </CardDescription>
                </div>
                <Badge className="bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50">
                  {classrooms.length} classrooms
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {classrooms.map((classroom) => (
                  <Card
                    key={classroom.id}
                    className="border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-shadow bg-white dark:bg-gray-800/50"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-gray-100">
                              {classroom.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 text-xs">
                                {classroom.subject}
                              </Badge>
                              <Badge className="bg-gray-50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50 text-xs">
                                {classroom.grade}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            className={`${getStatusColor(
                              classroom.status
                            )} text-xs flex-shrink-0`}
                          >
                            {classroom.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center justify-between">
                            <span>Students:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {classroom.studentCount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Code:</span>
                            <span className="font-mono font-medium text-gray-900 dark:text-gray-100">
                              {classroom.code}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Created:</span>
                            <span>{classroom.createdAt}</span>
                          </div>
                        </div>

                        {classroom.schedule && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">
                              {classroom.schedule}
                            </span>
                          </div>
                        )}

                        {classroom.room && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{classroom.room}</span>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="neutral"
                                className="w-full text-xs"
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 mx-4">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900 dark:text-gray-100">
                                  {classroom.name}
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 dark:text-gray-400">
                                  Classroom details and management options
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      Subject
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {classroom.subject}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      Grade & Section
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {classroom.grade} - {classroom.section}
                                    </p>
                                  </div>
                                </div>

                                {classroom.description && (
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      Description
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {classroom.description}
                                    </p>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      Class Code
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                      <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-gray-100">
                                        {classroom.code}
                                      </code>
                                      <Button size="sm" variant="ghost">
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      Students
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {classroom.studentCount} enrolled
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                  >
                                    <Share2 className="mr-2 h-3 w-3" />
                                    Share Code
                                  </Button>
                                  <Button
                                    variant="neutral"
                                    size="sm"
                                    className="w-full sm:w-auto"
                                  >
                                    <Edit className="mr-2 h-3 w-3" />
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="w-full sm:w-auto"
                                  >
                                    <Users className="mr-2 h-3 w-3" />
                                    Manage Students
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant=""
                            className="w-full text-xs"
                          >
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
