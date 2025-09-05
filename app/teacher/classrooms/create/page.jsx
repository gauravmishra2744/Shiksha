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
        return "bg-green-50 text-green-700 border-green-200";
      case "Inactive":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Archived":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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
                  <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Create Classroom
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Set up a new classroom for your students with detailed
                    information
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Quick Setup
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Users className="w-3 h-3 mr-1" />
                  Student Management
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  Course Integration
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          {showSuccess && created && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">
                      Classroom created successfully!
                    </p>
                    <p className="text-sm text-green-600">
                      {created.name} is ready for students. Class code:{" "}
                      <strong>{created.code}</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Create Classroom Form */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span>Classroom Details</span>
                </CardTitle>
                <CardDescription>
                  Fill in the information below to create your new classroom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Classroom Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Grade 10 - Mathematics A"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={subject}
                        onValueChange={setSubject}
                        required
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="grade">Grade Level *</Label>
                      <Select value={grade} onValueChange={setGrade} required>
                        <SelectTrigger>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="section">Section</Label>
                      <Input
                        id="section"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        placeholder="e.g., A, B, C"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="room">Room Number</Label>
                      <Input
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="e.g., Room 205"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input
                      id="schedule"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the classroom or course"
                      rows={3}
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
            <div className="space-y-6">
              {/* Preview Card */}
              {(name || subject || grade) && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-green-500" />
                      <span>Preview</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {name || "Classroom Name"}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {subject && (
                            <Badge variant="secondary">{subject}</Badge>
                          )}
                          {grade && <Badge variant="outline">{grade}</Badge>}
                          {section && (
                            <Badge variant="outline">Section {section}</Badge>
                          )}
                        </div>
                      </div>

                      {description && (
                        <p className="text-sm text-gray-600">{description}</p>
                      )}

                      <div className="space-y-1 text-sm text-gray-500">
                        {schedule && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3" />
                            <span>{schedule}</span>
                          </div>
                        )}
                        {room && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span>{room}</span>
                          </div>
                        )}
                      </div>

                      {subject && grade && section && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-500">Class Code:</p>
                          <p className="font-mono font-medium">
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
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <span>After Creation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <UserPlus className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Invite Students</p>
                        <p className="text-xs text-gray-500">
                          Share class code or send invitations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <QrCode className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Generate QR Code</p>
                        <p className="text-xs text-gray-500">
                          Easy joining for students
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Add Course Materials
                        </p>
                        <p className="text-xs text-gray-500">
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
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span>Your Classrooms</span>
                  </CardTitle>
                  <CardDescription>
                    Manage and view all your existing classrooms
                  </CardDescription>
                </div>
                <Badge variant="outline">{classrooms.length} classrooms</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {classrooms.map((classroom) => (
                  <Card
                    key={classroom.id}
                    className="border hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2">
                              {classroom.name}
                            </h3>
                            <div className="flex items-center space-x-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {classroom.subject}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {classroom.grade}
                              </Badge>
                            </div>
                          </div>
                          <Badge
                            className={`${getStatusColor(
                              classroom.status
                            )} text-xs`}
                          >
                            {classroom.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-xs text-gray-500">
                          <div className="flex items-center justify-between">
                            <span>Students:</span>
                            <span className="font-medium">
                              {classroom.studentCount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Code:</span>
                            <span className="font-mono font-medium">
                              {classroom.code}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Created:</span>
                            <span>{classroom.createdAt}</span>
                          </div>
                        </div>

                        {classroom.schedule && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{classroom.schedule}</span>
                          </div>
                        )}

                        {classroom.room && (
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{classroom.room}</span>
                          </div>
                        )}

                        <div className="flex space-x-1 pt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{classroom.name}</DialogTitle>
                                <DialogDescription>
                                  Classroom details and management options
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">
                                      Subject
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                      {classroom.subject}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">
                                      Grade & Section
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                      {classroom.grade} - {classroom.section}
                                    </p>
                                  </div>
                                </div>

                                {classroom.description && (
                                  <div>
                                    <Label className="text-sm font-medium">
                                      Description
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                      {classroom.description}
                                    </p>
                                  </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">
                                      Class Code
                                    </Label>
                                    <div className="flex items-center space-x-2">
                                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                        {classroom.code}
                                      </code>
                                      <Button size="sm" variant="ghost">
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">
                                      Students
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                      {classroom.studentCount} enrolled
                                    </p>
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Share2 className="mr-2 h-3 w-3" />
                                    Share Code
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-3 w-3" />
                                    Edit
                                  </Button>
                                  <Button size="sm">
                                    <Users className="mr-2 h-3 w-3" />
                                    Manage Students
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
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
