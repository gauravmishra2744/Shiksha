"use client";

import { useState, useEffect, useRef } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  Users,
  Send,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Search,
  Filter,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  PhoneOff,
  FileText,
  Download,
  Share,
  MoreHorizontal,
  UserCheck,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Activity,
  BookOpen,
  Target,
  Award,
  Bell,
  Settings,
  ArrowLeft,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  FileImage,
  Eye,
} from "lucide-react";

export default function ParentPortal() {
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [messageType, setMessageType] = useState("general");
  const [showParentsList, setShowParentsList] = useState(true);

  // Video call states
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showReportCard, setShowReportCard] = useState(false);

  const teacherVideoRef = useRef(null);
  const parentVideoRef = useRef(null);
  const callTimerRef = useRef(null);

  useEffect(() => {
    fetchParents();
  }, []);

  useEffect(() => {
    if (isVideoCallActive) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isVideoCallActive]);

  const fetchParents = async () => {
    try {
      setTimeout(() => {
        setParents(mockParents);
        setConversations(mockConversations);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching parents:", error);
      setParents(mockParents);
      setConversations(mockConversations);
      setLoading(false);
    }
  };

  const mockParents = [
    {
      id: 1,
      name: "Rajesh Kumar Sharma",
      email: "rajesh.sharma@email.com",
      phone: "+91 9876543210",
      student: "Ananya Sharma",
      studentId: "ST001",
      studentClass: "10A",
      studentGrade: "10th Grade",
      lastContact: "2024-01-15",
      unreadMessages: 2,
      status: "active",
      engagement: "high",
      meetingsScheduled: 3,
      avatar: "/api/placeholder/32/32",
      studentPerformance: {
        gpa: 3.8,
        attendance: 95,
        behavior: "excellent",
        recentGrades: [85, 92, 88, 94],
        subjects: {
          mathematics: 92,
          science: 88,
          english: 85,
          hindi: 90,
          socialScience: 87,
        },
      },
      emergencyContact: true,
      preferredContactMethod: "email",
      address: "123, Model Town, New Delhi - 110009",
      occupation: "Software Engineer",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      student: "Arjun Patel",
      studentId: "ST002",
      studentClass: "10A",
      studentGrade: "10th Grade",
      lastContact: "2024-01-14",
      unreadMessages: 0,
      status: "active",
      engagement: "medium",
      meetingsScheduled: 1,
      avatar: "/api/placeholder/32/32",
      studentPerformance: {
        gpa: 3.2,
        attendance: 88,
        behavior: "good",
        recentGrades: [78, 82, 75, 80],
        subjects: {
          mathematics: 78,
          science: 82,
          english: 80,
          hindi: 85,
          socialScience: 75,
        },
      },
      emergencyContact: true,
      preferredContactMethod: "phone",
      address: "456, Satellite, Ahmedabad - 380015",
      occupation: "Doctor",
    },
    {
      id: 3,
      name: "Sunita Gupta",
      email: "sunita.gupta@email.com",
      phone: "+91 9876543212",
      student: "Kavya Gupta",
      studentId: "ST003",
      studentClass: "10B",
      studentGrade: "10th Grade",
      lastContact: "2024-01-12",
      unreadMessages: 1,
      status: "active",
      engagement: "high",
      meetingsScheduled: 2,
      avatar: "/api/placeholder/32/32",
      studentPerformance: {
        gpa: 3.9,
        attendance: 97,
        behavior: "excellent",
        recentGrades: [95, 88, 92, 96],
        subjects: {
          mathematics: 95,
          science: 93,
          english: 91,
          hindi: 96,
          socialScience: 89,
        },
      },
      emergencyContact: false,
      preferredContactMethod: "email",
      address: "789, Koramangala, Bangalore - 560034",
      occupation: "Teacher",
    },
    {
      id: 4,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 9876543213",
      student: "Ishaan Singh",
      studentId: "ST004",
      studentClass: "10B",
      studentGrade: "10th Grade",
      lastContact: "2024-01-10",
      unreadMessages: 0,
      status: "inactive",
      engagement: "low",
      meetingsScheduled: 0,
      avatar: "/api/placeholder/32/32",
      studentPerformance: {
        gpa: 2.8,
        attendance: 82,
        behavior: "needs improvement",
        recentGrades: [65, 70, 68, 72],
        subjects: {
          mathematics: 68,
          science: 72,
          english: 70,
          hindi: 75,
          socialScience: 65,
        },
      },
      emergencyContact: true,
      preferredContactMethod: "phone",
      address: "321, Janakpuri, New Delhi - 110058",
      occupation: "Business Owner",
    },
  ];

  const mockConversations = [
    {
      id: 1,
      parentId: 1,
      messages: [
        {
          id: 1,
          sender: "teacher",
          content:
            "Ananya has been doing excellent work in mathematics. Keep encouraging her!",
          timestamp: "2 hours ago",
          type: "academic_update",
        },
        {
          id: 2,
          sender: "parent",
          content:
            "Thank you for the update. We're very proud of Ananya's progress.",
          timestamp: "1 day ago",
          type: "response",
        },
        {
          id: 3,
          sender: "teacher",
          content:
            "Ananya will need to submit her science project by Friday. Please remind her.",
          timestamp: "3 days ago",
          type: "reminder",
        },
      ],
    },
  ];

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startVideoCall = async (parentId) => {
    try {
      setIsVideoCallActive(true);
      setIsVideoEnabled(true);
      setIsAudioEnabled(true);
      setCallDuration(0);

      // Mock getting user media
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (teacherVideoRef.current) {
          teacherVideoRef.current.srcObject = stream;
        }
      }
    } catch (error) {
      console.error("Error starting video call:", error);
      alert("Unable to access camera/microphone. Please check permissions.");
    }
  };

  const endVideoCall = () => {
    setIsVideoCallActive(false);
    setIsVideoEnabled(true);
    setIsAudioEnabled(true);
    setIsScreenSharing(false);

    if (teacherVideoRef.current && teacherVideoRef.current.srcObject) {
      const tracks = teacherVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      teacherVideoRef.current.srcObject = null;
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (teacherVideoRef.current && teacherVideoRef.current.srcObject) {
      const videoTracks = teacherVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach((track) => (track.enabled = !isVideoEnabled));
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (teacherVideoRef.current && teacherVideoRef.current.srcObject) {
      const audioTracks = teacherVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach((track) => (track.enabled = !isAudioEnabled));
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        if (teacherVideoRef.current) {
          teacherVideoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
      } else {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (teacherVideoRef.current) {
          teacherVideoRef.current.srcObject = userStream;
        }
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Error toggling screen share:", error);
    }
  };

  const shareReportCard = (parentId) => {
    setShowReportCard(true);
  };

  const downloadReportCard = (studentId) => {
    // Mock download functionality
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8,Digital Report Card"
    );
    element.setAttribute("download", `${studentId}_report_card.pdf`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedParent) return;

    try {
      const newMessage = {
        id: Date.now(),
        sender: "teacher",
        content: message,
        timestamp: "Just now",
        type: messageType,
      };

      const updatedConversations = conversations.map((conv) => {
        if (conv.parentId === selectedParent.id) {
          return {
            ...conv,
            messages: [newMessage, ...conv.messages],
          };
        }
        return conv;
      });

      if (
        !updatedConversations.find(
          (conv) => conv.parentId === selectedParent.id
        )
      ) {
        updatedConversations.push({
          id: Date.now(),
          parentId: selectedParent.id,
          messages: [newMessage],
        });
      }

      setConversations(updatedConversations);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scheduleCall = async (parentId) => {
    try {
      console.log("Scheduling call for parent:", parentId);
      alert("Call scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
  };

  const handleParentSelect = (parent) => {
    setSelectedParent(parent);
    setShowParentsList(false);
  };

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.studentClass.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || parent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getConversation = (parentId) => {
    return conversations.find((conv) => conv.parentId === parentId);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicBreadcrumb />
          <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
            <div className="animate-pulse space-y-4 sm:space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
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
                  <div className="p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/50 flex-shrink-0">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      Parent Communication Hub
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                      Connect, communicate, and collaborate with parents for
                      student success
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Notifications</span>
                      <span className="sm:hidden">Alerts</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Settings</span>
                      <span className="sm:hidden">Settings</span>
                    </Button>
                  </div>
                  <Button size="sm" className="w-full sm:w-auto">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">
                      Schedule Parent Meet
                    </span>
                    <span className="sm:hidden">Schedule</span>
                  </Button>
                </div>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border border-purple-200 dark:border-purple-800/50">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {parents.length}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                    <span className="hidden sm:inline">Total Parents</span>
                    <span className="sm:hidden">Parents</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200 dark:border-blue-800/50">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {parents.reduce(
                      (sum, parent) => sum + parent.unreadMessages,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    <span className="hidden sm:inline">Unread Messages</span>
                    <span className="sm:hidden">Unread</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border border-green-200 dark:border-green-800/50">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {parents.reduce(
                      (sum, parent) => sum + parent.meetingsScheduled,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                    <span className="hidden sm:inline">Meetings Scheduled</span>
                    <span className="sm:hidden">Meetings</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border border-orange-200 dark:border-orange-800/50 col-span-2 lg:col-span-1">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    94%
                  </div>
                  <div className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                    <span className="hidden sm:inline">Response Rate</span>
                    <span className="sm:hidden">Response</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="communications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger
                value="communications"
                className="text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Communications</span>
                <span className="sm:hidden">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="meetings" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Video Meetings</span>
                <span className="sm:hidden">Meetings</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Digital Reports</span>
                <span className="sm:hidden">Reports</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="communications"
              className="space-y-4 sm:space-y-6"
            >
              {/* Search and Filters */}
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        placeholder="Search parents or students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Parents</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Parents List */}
                <Card
                  className={`bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 ${
                    !showParentsList && selectedParent ? "hidden lg:block" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span className="hidden sm:inline">
                        Parents & Guardians
                      </span>
                      <span className="sm:hidden">Parents</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Select a parent to view details and communicate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredParents.map((parent) => (
                        <div
                          key={parent.id}
                          className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            selectedParent?.id === parent.id
                              ? "border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-950/20"
                              : ""
                          }`}
                          onClick={() => handleParentSelect(parent)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <Avatar className="flex-shrink-0">
                                <AvatarImage src={parent.avatar} />
                                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                  {parent.name
                                    .split(" ")
                                    .map((n) => n.charAt(0))
                                    .join("")
                                    .substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {parent.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  Parent of {parent.student}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Class {parent.studentClass} •{" "}
                                  {parent.occupation}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                              {parent.unreadMessages > 0 && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  {parent.unreadMessages}
                                </Badge>
                              )}
                              <Badge
                                variant={
                                  parent.engagement === "high"
                                    ? "default"
                                    : parent.engagement === "medium"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {parent.engagement}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span className="truncate">
                              Last contact: {parent.lastContact}
                            </span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {parent.emergencyContact && (
                                <AlertCircle className="w-3 h-3 text-red-500" />
                              )}
                              {parent.preferredContactMethod === "email" ? (
                                <Mail className="w-3 h-3" />
                              ) : (
                                <Phone className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Details and Communication */}
                <div
                  className={`lg:col-span-2 ${
                    showParentsList && !selectedParent ? "hidden lg:block" : ""
                  }`}
                >
                  {selectedParent ? (
                    <div className="space-y-4">
                      {/* Back button for mobile */}
                      <div className="lg:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowParentsList(true)}
                          className="mb-4"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Parents
                        </Button>
                      </div>

                      {/* Enhanced Parent Information */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-16 h-16 flex-shrink-0">
                                <AvatarImage src={selectedParent.avatar} />
                                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-lg font-semibold">
                                  {selectedParent.name
                                    .split(" ")
                                    .map((n) => n.charAt(0))
                                    .join("")
                                    .substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <CardTitle className="text-gray-900 dark:text-gray-100 truncate text-xl">
                                  {selectedParent.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                  Parent of {selectedParent.student} • Class{" "}
                                  {selectedParent.studentClass}
                                </CardDescription>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {selectedParent.occupation} •{" "}
                                  {selectedParent.address}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => scheduleCall(selectedParent.id)}
                                className="flex-1"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">Call</span>
                                <span className="sm:hidden">Call</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  startVideoCall(selectedParent.id)
                                }
                                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">
                                  Video Call
                                </span>
                                <span className="sm:hidden">Video</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">
                                  Schedule
                                </span>
                                <span className="sm:hidden">Schedule</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  shareReportCard(selectedParent.id)
                                }
                                className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                              >
                                <Share className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">
                                  Share Report
                                </span>
                                <span className="sm:hidden">Report</span>
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Student ID:
                              </p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {selectedParent.studentId}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Grade:
                              </p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {selectedParent.studentGrade}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Email:
                              </p>
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {selectedParent.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Phone:
                              </p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {selectedParent.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Preferred Contact:
                              </p>
                              <div className="flex items-center gap-1">
                                {selectedParent.preferredContactMethod ===
                                "email" ? (
                                  <Mail className="w-3 h-3" />
                                ) : (
                                  <Phone className="w-3 h-3" />
                                )}
                                <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                                  {selectedParent.preferredContactMethod}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Emergency Contact:
                              </p>
                              <div className="flex items-center gap-1">
                                {selectedParent.emergencyContact ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-red-500" />
                                )}
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {selectedParent.emergencyContact
                                    ? "Yes"
                                    : "No"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Enhanced Student Performance Summary */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <GraduationCap className="w-5 h-5 text-blue-500" />
                            <span className="truncate">
                              {selectedParent.student}'s Academic Performance
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Overall Performance Metrics */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="text-center p-3 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {selectedParent.studentPerformance.gpa}
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">
                                  GPA
                                </div>
                              </div>
                              <div className="text-center p-3 border border-green-200 dark:border-green-700 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                                <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                                  {selectedParent.studentPerformance.attendance}
                                  %
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">
                                  Attendance
                                </div>
                              </div>
                              <div className="text-center p-3 border border-purple-200 dark:border-purple-700 rounded-lg bg-purple-50/50 dark:bg-purple-900/20">
                                <div className="text-sm font-bold text-purple-600 dark:text-purple-400 capitalize">
                                  {selectedParent.studentPerformance.behavior}
                                </div>
                                <div className="text-sm text-purple-700 dark:text-purple-300">
                                  Behavior
                                </div>
                              </div>
                              <div className="text-center p-3 border border-orange-200 dark:border-orange-700 rounded-lg bg-orange-50/50 dark:bg-orange-900/20 col-span-2 lg:col-span-1">
                                <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                                  {Math.round(
                                    selectedParent.studentPerformance.recentGrades.reduce(
                                      (a, b) => a + b,
                                      0
                                    ) /
                                      selectedParent.studentPerformance
                                        .recentGrades.length
                                  )}
                                </div>
                                <div className="text-sm text-orange-700 dark:text-orange-300">
                                  Avg Grade
                                </div>
                              </div>
                            </div>

                            {/* Subject-wise Performance */}
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                                Subject-wise Performance
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(
                                  selectedParent.studentPerformance.subjects
                                ).map(([subject, score]) => (
                                  <div
                                    key={subject}
                                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                                  >
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                      {subject
                                        .replace(/([A-Z])/g, " $1")
                                        .trim()}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-gray-900 dark:text-gray-100">
                                        {score}
                                      </span>
                                      {score >= 85 ? (
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                      ) : score >= 70 ? (
                                        <Activity className="w-4 h-4 text-orange-500" />
                                      ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Send Message */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <Send className="w-5 h-5 text-green-500" />
                            Send Message to {selectedParent.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Select
                              value={messageType}
                              onValueChange={setMessageType}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Communication
                                </SelectItem>
                                <SelectItem value="academic_update">
                                  Academic Progress Update
                                </SelectItem>
                                <SelectItem value="behavior_report">
                                  Behavior Report
                                </SelectItem>
                                <SelectItem value="attendance_concern">
                                  Attendance Concern
                                </SelectItem>
                                <SelectItem value="assignment_reminder">
                                  Assignment Reminder
                                </SelectItem>
                                <SelectItem value="achievement">
                                  Achievement Recognition
                                </SelectItem>
                                <SelectItem value="urgent">
                                  Urgent Notice
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Textarea
                              placeholder={`Type your message to ${selectedParent.name} here...`}
                              rows={4}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={sendMessage}
                                disabled={!message.trim()}
                                className="flex-1"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  shareReportCard(selectedParent.id)
                                }
                                className="flex-1"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Attach Report
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Conversations */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            Recent Conversations with {selectedParent.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {getConversation(selectedParent.id)?.messages?.map(
                              (msg) => (
                                <div
                                  key={msg.id}
                                  className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
                                    msg.sender === "teacher"
                                      ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50"
                                      : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50"
                                  }`}
                                >
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <MessageSquare
                                      className={`w-4 h-4 ${
                                        msg.sender === "teacher"
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-green-600 dark:text-green-400"
                                      }`}
                                    />
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {msg.sender === "teacher"
                                        ? "You"
                                        : selectedParent.name}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {msg.type.replace("_", " ")}
                                    </Badge>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {msg.content}
                                  </p>
                                </div>
                              )
                            ) || (
                              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                <p className="text-lg font-medium mb-1">
                                  No conversations yet
                                </p>
                                <p className="text-sm">
                                  Send a message to start communicating with{" "}
                                  {selectedParent.name}!
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                      <CardContent className="p-8 sm:p-12 text-center">
                        <Users className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          Select a Parent to Connect
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          Choose a parent from the list to view their child's
                          details and start communicating
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Video Meetings Tab */}
            <TabsContent value="meetings" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Video className="w-5 h-5 text-blue-500" />
                    Video Meetings & Conferences
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Schedule and conduct video meetings with parents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Upcoming Meetings */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Upcoming Meetings
                      </h4>
                      <div className="grid gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="flex-shrink-0">
                              <Avatar>
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  RS
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                Parent-Teacher Conference
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                with Rajesh Kumar Sharma • Tomorrow at 2:00 PM
                              </p>
                              <p className="text-xs text-blue-600 dark:text-blue-400">
                                Regarding Ananya's Academic Progress
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-1" />
                              Reschedule
                            </Button>
                            <Button size="sm" onClick={() => startVideoCall(1)}>
                              <Video className="w-4 h-4 mr-1" />
                              Join Now
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-green-200 dark:border-green-700 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="flex-shrink-0">
                              <Avatar>
                                <AvatarFallback className="bg-green-100 text-green-600">
                                  SG
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                Academic Review Meeting
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                with Sunita Gupta • Friday at 10:00 AM
                              </p>
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Kavya's Excellent Performance Review
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button className="h-20 flex-col gap-2">
                        <Video className="w-6 h-6" />
                        <span>Schedule New Meeting</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Calendar className="w-6 h-6" />
                        <span>View Calendar</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col gap-2">
                        <Settings className="w-6 h-6" />
                        <span>Meeting Settings</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Digital Reports Tab */}
            <TabsContent value="reports" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <FileText className="w-5 h-5 text-green-500" />
                    Digital Report Cards & Progress Reports
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Generate, view, and share digital report cards with parents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Quick Actions
                      </h4>
                      <div className="space-y-3">
                        <Button className="w-full justify-start h-12">
                          <FileText className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">
                              Generate Monthly Report
                            </p>
                            <p className="text-xs opacity-70">
                              Create comprehensive progress report
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12"
                        >
                          <Award className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Achievement Report</p>
                            <p className="text-xs opacity-70">
                              Highlight student achievements
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12"
                        >
                          <Target className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Behavioral Assessment</p>
                            <p className="text-xs opacity-70">
                              Detailed behavior evaluation
                            </p>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12"
                        >
                          <BookOpen className="w-5 h-5 mr-3" />
                          <div className="text-left">
                            <p className="font-medium">Subject-wise Analysis</p>
                            <p className="text-xs opacity-70">
                              Individual subject performance
                            </p>
                          </div>
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Recent Reports
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                Ananya Sharma - Q3 Report Card
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Generated on Jan 15, 2024
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Shared
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                Arjun Patel - Progress Report
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Generated on Jan 14, 2024
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              variant="outline"
                              className="text-orange-600 border-orange-200"
                            >
                              Draft
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                Kavya Gupta - Excellence Report
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Generated on Jan 12, 2024
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Delivered
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Communication Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Track your parent engagement and communication
                      effectiveness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Response Rate
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            94%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Avg Response Time
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            1.8 hours
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Messages This Month
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            168
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Video Meetings
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            12
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Reports Shared
                          </span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            45
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Parent Engagement Overview
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Distribution of parent participation levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            High Engagement
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {
                              parents.filter((p) => p.engagement === "high")
                                .length
                            }
                          </span>
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                            Active
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Medium Engagement
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {
                              parents.filter((p) => p.engagement === "medium")
                                .length
                            }
                          </span>
                          <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50">
                            Moderate
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Low Engagement
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {
                              parents.filter((p) => p.engagement === "low")
                                .length
                            }
                          </span>
                          <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50">
                            Needs Attention
                          </Badge>
                        </div>
                      </div>

                      {/* Engagement Insights */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Insights
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Most parents prefer email communication
                          </li>
                          <li className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            Peak response times: 6-9 PM
                          </li>
                          <li className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            Video meeting adoption increased by 45%
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Video Call Dialog */}
        <Dialog
          open={isVideoCallActive}
          onOpenChange={(open) => !open && endVideoCall()}
        >
          <DialogContent className="max-w-6xl md:max-w-7xl h-[80vh] p-0 bg-gray-900 border-gray-700">
            <DialogHeader className="p-4 bg-gray-800 border-b border-gray-700">
              <DialogTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Video Call with {selectedParent?.name}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-green-400 border-green-400"
                  >
                    {formatCallDuration(callDuration)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {isScreenSharing && (
                    <Badge className="bg-blue-600">Screen Sharing</Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => shareReportCard(selectedParent?.id)}
                    className="text-white hover:bg-gray-700"
                  >
                    <Share className="w-4 h-4 mr-1" />
                    Share Report
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 relative bg-gray-900">
              {/* Main Video Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-2 p-2">
                {/* Teacher's Video */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={teacherVideoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: isVideoEnabled ? "block" : "none" }}
                  />
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <div className="text-center text-white">
                        <CameraOff className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Camera is off</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      You (Teacher)
                    </span>
                  </div>
                  {!isAudioEnabled && (
                    <div className="absolute top-4 right-4">
                      <MicOff className="w-6 h-6 text-red-400" />
                    </div>
                  )}
                </div>

                {/* Parent's Video */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <video
                    ref={parentVideoRef}
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                  {/* Mock parent video - placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
                    <div className="text-center text-white">
                      <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white">
                        <AvatarFallback className="bg-purple-500 text-white text-2xl">
                          {selectedParent?.name
                            ?.split(" ")
                            .map((n) => n.charAt(0))
                            .join("")
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-lg font-medium">
                        {selectedParent?.name}
                      </p>
                      <p className="text-sm opacity-75">
                        Parent of {selectedParent?.student}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {selectedParent?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleAudio}
                    className={`w-12 h-12 rounded-full ${
                      isAudioEnabled
                        ? "bg-gray-600 hover:bg-gray-500 text-white"
                        : "bg-red-600 hover:bg-red-500 text-white"
                    }`}
                  >
                    {isAudioEnabled ? (
                      <Mic className="w-5 h-5" />
                    ) : (
                      <MicOff className="w-5 h-5" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleVideo}
                    className={`w-12 h-12 rounded-full ${
                      isVideoEnabled
                        ? "bg-gray-600 hover:bg-gray-500 text-white"
                        : "bg-red-600 hover:bg-red-500 text-white"
                    }`}
                  >
                    {isVideoEnabled ? (
                      <Camera className="w-5 h-5" />
                    ) : (
                      <CameraOff className="w-5 h-5" />
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleScreenShare}
                    className={`w-12 h-12 rounded-full ${
                      isScreenSharing
                        ? "bg-blue-600 hover:bg-blue-500 text-white"
                        : "bg-gray-600 hover:bg-gray-500 text-white"
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => shareReportCard(selectedParent?.id)}
                    className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-500 text-white"
                  >
                    <FileText className="w-5 h-5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={endVideoCall}
                    className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Digital Report Card Sharing Dialog */}
        <Dialog open={showReportCard} onOpenChange={setShowReportCard}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Digital Report Card - {selectedParent?.student}
              </DialogTitle>
              <DialogDescription>
                Share {selectedParent?.student}'s digital report card with{" "}
                {selectedParent?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Report Card Preview */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800/50">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">
                    Digital Report Card
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    Academic Session 2024-25 • Term 3
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Student Information */}
                  <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800/50">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Student Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Student Name:
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedParent?.student}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Student ID:
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedParent?.studentId}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Class:
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedParent?.studentClass}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Roll Number:
                        </p>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          15
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Performance */}
                  <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800/50">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Academic Performance
                    </h3>
                    <div className="space-y-3">
                      {selectedParent?.studentPerformance?.subjects &&
                        Object.entries(
                          selectedParent.studentPerformance.subjects
                        ).map(([subject, score]) => (
                          <div
                            key={subject}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  score >= 85
                                    ? "bg-green-500"
                                    : score >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                                {subject.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">{score}</span>
                              <span className="text-gray-500 dark:text-gray-400">
                                / 100
                              </span>
                              <Badge
                                variant={
                                  score >= 85
                                    ? "default"
                                    : score >= 70
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {score >= 85
                                  ? "Excellent"
                                  : score >= 70
                                  ? "Good"
                                  : "Needs Improvement"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Overall Statistics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/50">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedParent?.studentPerformance?.gpa}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Overall GPA
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedParent?.studentPerformance?.attendance}%
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Attendance
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800/50">
                      <div className="text-sm font-bold text-purple-600 dark:text-purple-400 capitalize">
                        {selectedParent?.studentPerformance?.behavior}
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">
                        Behavior
                      </div>
                    </div>
                  </div>

                  {/* Teacher's Comments */}
                  <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-blue-200 dark:border-blue-800/50">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Teacher's Comments
                    </h3>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <p>
                        <strong>{selectedParent?.student}</strong> has shown
                        remarkable improvement this term.
                        {selectedParent?.studentPerformance?.gpa >= 3.5
                          ? " Excellent academic performance with consistent effort across all subjects."
                          : " Good progress with room for improvement in some areas."}
                      </p>
                      <p>
                        Attendance has been{" "}
                        {selectedParent?.studentPerformance?.attendance >= 90
                          ? "excellent"
                          : "satisfactory"}
                        and behavior is{" "}
                        {selectedParent?.studentPerformance?.behavior}. Continue
                        encouraging regular study habits and participation in
                        class activities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => downloadReportCard(selectedParent?.studentId)}
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => {
                    // Simulate sharing
                    alert(
                      `Report card shared with ${selectedParent?.name} via ${selectedParent?.preferredContactMethod}`
                    );
                    setShowReportCard(false);
                  }}
                  className="flex-1"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share with Parent
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowReportCard(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
