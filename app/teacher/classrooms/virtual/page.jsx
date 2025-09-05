"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Video,
  Users,
  Monitor,
  Wifi,
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share,
  Settings,
  PhoneOff,
  MessageSquare,
  Hand,
  MoreVertical,
  Clock,
  Calendar,
  Globe,
  Shield,
  Zap,
  Eye,
  UserCheck,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Circle,
  StopCircle,
  FileText,
  Download,
  Upload,
  Copy,
  Link,
  Presentation,
  BookOpen,
  CheckCircle,
  AlertCircle,
  WifiOff,
} from "lucide-react";

// Dummy data for virtual classrooms
const virtualClassroomsData = [
  {
    id: 1,
    name: "Grade 10 - Mathematics A",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
    studentCount: 28,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    status: "Live",
    sessionId: "MATH10A-001",
    duration: "45 min",
    participants: 25,
    maxParticipants: 30,
    isRecording: true,
    quality: "HD",
    hostName: "Mr. Sharma",
    nextSession: "Today 9:00 AM",
    totalSessions: 45,
    attendanceRate: 89,
    avgDuration: "42 min",
  },
  {
    id: 2,
    name: "Grade 9 - Physics B",
    subject: "Physics",
    grade: "Grade 9",
    section: "B",
    studentCount: 25,
    schedule: "Tue, Thu - 10:30 AM",
    status: "Scheduled",
    sessionId: "PHY9B-002",
    duration: "50 min",
    participants: 0,
    maxParticipants: 30,
    isRecording: false,
    quality: "HD",
    hostName: "Dr. Patel",
    nextSession: "Tomorrow 10:30 AM",
    totalSessions: 38,
    attendanceRate: 92,
    avgDuration: "48 min",
  },
  {
    id: 3,
    name: "Grade 8 - English C",
    subject: "English",
    grade: "Grade 8",
    section: "C",
    studentCount: 30,
    schedule: "Daily - 11:00 AM",
    status: "Ended",
    sessionId: "ENG8C-003",
    duration: "40 min",
    participants: 28,
    maxParticipants: 35,
    isRecording: true,
    quality: "HD",
    hostName: "Ms. Kumar",
    nextSession: "Tomorrow 11:00 AM",
    totalSessions: 52,
    attendanceRate: 95,
    avgDuration: "38 min",
  },
  {
    id: 4,
    name: "Grade 11 - Chemistry",
    subject: "Chemistry",
    grade: "Grade 11",
    section: "A",
    studentCount: 22,
    schedule: "Mon, Wed - 2:00 PM",
    status: "Scheduled",
    sessionId: "CHEM11A-004",
    duration: "60 min",
    participants: 0,
    maxParticipants: 25,
    isRecording: false,
    quality: "HD",
    hostName: "Dr. Singh",
    nextSession: "Today 2:00 PM",
    totalSessions: 35,
    attendanceRate: 87,
    avgDuration: "55 min",
  },
];

// Mock active participants data
const activeParticipants = [
  {
    id: 1,
    name: "Aarav Sharma",
    status: "speaking",
    micOn: true,
    cameraOn: true,
    handRaised: false,
  },
  {
    id: 2,
    name: "Priya Patel",
    status: "listening",
    micOn: false,
    cameraOn: true,
    handRaised: true,
  },
  {
    id: 3,
    name: "Arjun Kumar",
    status: "listening",
    micOn: false,
    cameraOn: false,
    handRaised: false,
  },
  {
    id: 4,
    name: "Sneha Singh",
    status: "listening",
    micOn: false,
    cameraOn: true,
    handRaised: false,
  },
  {
    id: 5,
    name: "Rohan Gupta",
    status: "listening",
    micOn: true,
    cameraOn: true,
    handRaised: false,
  },
];

export default function VirtualClassroomPage() {
  const [classrooms, setClassrooms] = useState(virtualClassroomsData);
  const [loading, setLoading] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [sessionControls, setSessionControls] = useState({
    micOn: true,
    cameraOn: true,
    screenSharing: false,
    recording: false,
    chatOpen: false,
    participantsOpen: true,
  });
  const [activeSession, setActiveSession] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "bg-red-50 text-red-700 border-red-200 animate-pulse";
      case "Scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Ended":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case "HD":
        return "text-green-600";
      case "SD":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const toggleControl = (control) => {
    setSessionControls((prev) => ({
      ...prev,
      [control]: !prev[control],
    }));
  };

  const startSession = (classroom) => {
    setActiveSession(classroom);
    setClassrooms((prev) =>
      prev.map((c) =>
        c.id === classroom.id
          ? {
              ...c,
              status: "Live",
              participants: Math.floor(Math.random() * c.studentCount) + 10,
            }
          : c
      )
    );
    setShowStartModal(false);
  };

  const endSession = () => {
    if (activeSession) {
      setClassrooms((prev) =>
        prev.map((c) =>
          c.id === activeSession.id
            ? { ...c, status: "Ended", participants: 0 }
            : c
        )
      );
      setActiveSession(null);
    }
  };

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
                  <Video className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Virtual Classrooms
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Conduct live interactive sessions with advanced video
                    conferencing
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  HD Quality
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  Secure Sessions
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Circle className="w-3 h-3 mr-1" />
                  Auto Recording
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {classrooms.filter((c) => c.status === "Live").length}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Live Sessions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {classrooms.reduce((sum, c) => sum + c.participants, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Active Users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {
                        classrooms.filter((c) => c.status === "Scheduled")
                          .length
                      }
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Scheduled
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Circle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {classrooms.filter((c) => c.isRecording).length}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Recording
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="sessions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="sessions" className="text-xs sm:text-sm">
                <Video className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Live Sessions</span>
              </TabsTrigger>
              <TabsTrigger value="controls" className="text-xs sm:text-sm">
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Session Controls</span>
              </TabsTrigger>
              <TabsTrigger value="participants" className="text-xs sm:text-sm">
                <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Participants</span>
              </TabsTrigger>
            </TabsList>

            {/* Live Sessions Tab */}
            <TabsContent value="sessions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Virtual Classroom Sessions
                </h2>
                <Dialog open={showStartModal} onOpenChange={setShowStartModal}>
                  <DialogTrigger asChild>
                    <Button>
                      <Video className="mr-2 h-4 w-4" />
                      Start New Session
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {classrooms.map((classroom) => (
                  <Card
                    key={classroom.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                              {classroom.name}
                            </h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {classroom.subject}
                              </Badge>
                              <Badge
                                className={`${getStatusColor(
                                  classroom.status
                                )} text-xs`}
                              >
                                {classroom.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Users className="h-3 w-3" />
                              <span>
                                {classroom.participants}/
                                {classroom.maxParticipants}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Wifi
                                className={`h-3 w-3 ${getQualityColor(
                                  classroom.quality
                                )}`}
                              />
                              <span
                                className={getQualityColor(classroom.quality)}
                              >
                                {classroom.quality}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>{classroom.duration}</span>
                            </div>
                            {classroom.isRecording && (
                              <div className="flex items-center space-x-1 text-red-600">
                                <Circle className="h-3 w-3 animate-pulse fill-current" />
                                <span>REC</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Calendar className="h-3 w-3" />
                            <span>{classroom.schedule}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-500 mb-2">
                            Session ID: {classroom.sessionId}
                          </p>
                          <div className="flex space-x-1">
                            {classroom.status === "Live" ? (
                              <>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Eye className="mr-1 h-3 w-3" />
                                  Join
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={endSession}
                                >
                                  <PhoneOff className="h-3 w-3" />
                                </Button>
                              </>
                            ) : classroom.status === "Scheduled" ? (
                              <>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      className="flex-1"
                                      onClick={() =>
                                        setSelectedClassroom(classroom)
                                      }
                                    >
                                      <Play className="mr-1 h-3 w-3" />
                                      Start
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Start Virtual Session
                                      </DialogTitle>
                                      <DialogDescription>
                                        Configure session settings for{" "}
                                        {classroom.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label>Session Duration</Label>
                                        <Select defaultValue="45">
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="30">
                                              30 minutes
                                            </SelectItem>
                                            <SelectItem value="45">
                                              45 minutes
                                            </SelectItem>
                                            <SelectItem value="60">
                                              60 minutes
                                            </SelectItem>
                                            <SelectItem value="90">
                                              90 minutes
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-2">
                                        <Label>Video Quality</Label>
                                        <Select defaultValue="hd">
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="hd">
                                              HD (720p)
                                            </SelectItem>
                                            <SelectItem value="fhd">
                                              Full HD (1080p)
                                            </SelectItem>
                                            <SelectItem value="sd">
                                              SD (480p)
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-2">
                                        <Label className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                          />
                                          <span>Auto-record session</span>
                                        </Label>
                                        <Label className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            defaultChecked
                                          />
                                          <span>Enable waiting room</span>
                                        </Label>
                                        <Label className="flex items-center space-x-2">
                                          <input type="checkbox" />
                                          <span>Require authentication</span>
                                        </Label>
                                      </div>

                                      <div className="flex justify-end space-x-2">
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            setShowStartModal(false)
                                          }
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            startSession(classroom)
                                          }
                                        >
                                          <Video className="mr-2 h-4 w-4" />
                                          Start Session
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button size="sm" variant="outline">
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <FileText className="mr-1 h-3 w-3" />
                                  Recording
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Session Controls Tab */}
            <TabsContent value="controls" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <span>Media Controls</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={sessionControls.micOn ? "default" : "outline"}
                        className="flex items-center justify-center space-x-2 h-12"
                        onClick={() => toggleControl("micOn")}
                      >
                        {sessionControls.micOn ? (
                          <Mic className="h-4 w-4" />
                        ) : (
                          <MicOff className="h-4 w-4" />
                        )}
                        <span>{sessionControls.micOn ? "Mute" : "Unmute"}</span>
                      </Button>

                      <Button
                        variant={
                          sessionControls.cameraOn ? "default" : "outline"
                        }
                        className="flex items-center justify-center space-x-2 h-12"
                        onClick={() => toggleControl("cameraOn")}
                      >
                        {sessionControls.cameraOn ? (
                          <Camera className="h-4 w-4" />
                        ) : (
                          <CameraOff className="h-4 w-4" />
                        )}
                        <span>
                          {sessionControls.cameraOn
                            ? "Stop Video"
                            : "Start Video"}
                        </span>
                      </Button>

                      <Button
                        variant={
                          sessionControls.screenSharing ? "default" : "outline"
                        }
                        className="flex items-center justify-center space-x-2 h-12"
                        onClick={() => toggleControl("screenSharing")}
                      >
                        <Monitor className="h-4 w-4" />
                        <span>
                          {sessionControls.screenSharing
                            ? "Stop Share"
                            : "Share Screen"}
                        </span>
                      </Button>

                      <Button
                        variant={
                          sessionControls.recording ? "destructive" : "outline"
                        }
                        className="flex items-center justify-center space-x-2 h-12"
                        onClick={() => toggleControl("recording")}
                      >
                        {sessionControls.recording ? (
                          <StopCircle className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                        <span>
                          {sessionControls.recording ? "Stop Rec" : "Record"}
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span>Session Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-2 h-12"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Chat</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-2 h-12"
                      >
                        <Hand className="h-4 w-4" />
                        <span>Raise Hand</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-2 h-12"
                      >
                        <Presentation className="h-4 w-4" />
                        <span>Whiteboard</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center justify-center space-x-2 h-12"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Share Files</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Session Settings */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <span>Session Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Video Quality</Label>
                      <Select defaultValue="hd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hd">HD (720p)</SelectItem>
                          <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                          <SelectItem value="sd">SD (480p)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Audio Quality</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Quality</SelectItem>
                          <SelectItem value="medium">Medium Quality</SelectItem>
                          <SelectItem value="low">Low Quality</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Max Participants</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 participants</SelectItem>
                          <SelectItem value="30">30 participants</SelectItem>
                          <SelectItem value="50">50 participants</SelectItem>
                          <SelectItem value="100">100 participants</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Layout Mode</Label>
                      <Select defaultValue="grid">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid View</SelectItem>
                          <SelectItem value="speaker">Speaker View</SelectItem>
                          <SelectItem value="gallery">Gallery View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <span>Active Participants</span>
                      </div>
                      <Badge variant="secondary">
                        {activeParticipants.length} online
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {activeParticipants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {participant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              {participant.status === "speaking" && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {participant.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {participant.status}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {participant.handRaised && (
                              <Hand className="h-4 w-4 text-yellow-500" />
                            )}
                            {participant.micOn ? (
                              <Mic className="h-4 w-4 text-green-600" />
                            ) : (
                              <MicOff className="h-4 w-4 text-gray-400" />
                            )}
                            {participant.cameraOn ? (
                              <Camera className="h-4 w-4 text-green-600" />
                            ) : (
                              <CameraOff className="h-4 w-4 text-gray-400" />
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span>Session Chat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                      <div className="text-xs text-gray-500 text-center">
                        Session chat will appear here
                      </div>
                      <div className="bg-white p-2 rounded text-sm">
                        <span className="font-medium text-blue-600">
                          Teacher:
                        </span>{" "}
                        Welcome to today's session!
                      </div>
                      <div className="bg-white p-2 rounded text-sm">
                        <span className="font-medium text-green-600">
                          Aarav:
                        </span>{" "}
                        Good morning sir!
                      </div>
                      <div className="bg-white p-2 rounded text-sm">
                        <span className="font-medium text-purple-600">
                          Priya:
                        </span>{" "}
                        Can you repeat the last point?
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button size="sm">Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}