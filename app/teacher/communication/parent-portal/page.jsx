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
  FileText,
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

  useEffect(() => {
    fetchParents();
  }, []);

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
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8900",
      student: "Alice Smith",
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
      },
      emergencyContact: true,
      preferredContactMethod: "email",
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary.johnson@email.com",
      phone: "+1 234 567 8901",
      student: "Bob Johnson",
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
      },
      emergencyContact: true,
      preferredContactMethod: "phone",
    },
    {
      id: 3,
      name: "Sarah Davis",
      email: "sarah.davis@email.com",
      phone: "+1 234 567 8902",
      student: "Emma Davis",
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
      },
      emergencyContact: false,
      preferredContactMethod: "email",
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 234 567 8903",
      student: "David Brown",
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
      },
      emergencyContact: true,
      preferredContactMethod: "phone",
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
            "Alice has been doing excellent work in mathematics. Keep encouraging her!",
          timestamp: "2 hours ago",
          type: "academic_update",
        },
        {
          id: 2,
          sender: "parent",
          content:
            "Thank you for the update. We're very proud of Alice's progress.",
          timestamp: "1 day ago",
          type: "response",
        },
        {
          id: 3,
          sender: "teacher",
          content:
            "Alice will need to submit her science project by Friday. Please remind her.",
          timestamp: "3 days ago",
          type: "reminder",
        },
      ],
    },
  ];

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

      // Update conversations
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
      // Simulate scheduling
      console.log("Scheduling call for parent:", parentId);
      alert("Call scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
  };

  const handleParentSelect = (parent) => {
    setSelectedParent(parent);
    setShowParentsList(false); // Hide parents list on mobile when parent is selected
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
                    <Users className="w-6 w-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      Parent Portal
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                      Communicate with parents and guardians to support student
                      success
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
                    <span className="hidden sm:inline">Schedule Meeting</span>
                    <span className="sm:hidden">Schedule</span>
                  </Button>
                </div>
              </div>

              {/* Communication Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {parents.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Total Parents</span>
                    <span className="sm:hidden">Parents</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {parents.reduce(
                      (sum, parent) => sum + parent.unreadMessages,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Unread Messages</span>
                    <span className="sm:hidden">Unread</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {parents.reduce(
                      (sum, parent) => sum + parent.meetingsScheduled,
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Meetings Scheduled</span>
                    <span className="sm:hidden">Meetings</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50 col-span-2 lg:col-span-1">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    89%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
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
                Meetings
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Progress Reports</span>
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
                  <div className="flex flex-col gap-4">
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
                                  {parent.name.charAt(0)}
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
                                  {parent.studentClass}
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

                      {/* Parent Information */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12 flex-shrink-0">
                                <AvatarImage src={selectedParent.avatar} />
                                <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                  {selectedParent.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <CardTitle className="text-gray-900 dark:text-gray-100 truncate">
                                  {selectedParent.name}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                  Parent of {selectedParent.student} •{" "}
                                  {selectedParent.studentClass}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => scheduleCall(selectedParent.id)}
                                className="flex-1 sm:flex-none"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 sm:flex-none"
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
                                className="flex-1 sm:flex-none"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Meeting
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

                      {/* Student Performance Summary */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <GraduationCap className="w-5 h-5 text-blue-500" />
                            <span className="truncate">
                              {selectedParent.student}'s Performance Summary
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {selectedParent.studentPerformance.gpa}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                GPA
                              </div>
                            </div>
                            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                              <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                                {selectedParent.studentPerformance.attendance}%
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Attendance
                              </div>
                            </div>
                            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                              <div className="text-sm font-bold text-purple-600 dark:text-purple-400 capitalize">
                                {selectedParent.studentPerformance.behavior}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Behavior
                              </div>
                            </div>
                            <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 col-span-2 lg:col-span-1">
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
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Avg Grade
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
                            Send Message
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
                                  Academic Update
                                </SelectItem>
                                <SelectItem value="behavior_report">
                                  Behavior Report
                                </SelectItem>
                                <SelectItem value="reminder">
                                  Reminder
                                </SelectItem>
                                <SelectItem value="urgent">
                                  Urgent Notice
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Textarea
                              placeholder="Type your message here..."
                              rows={4}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button
                              onClick={sendMessage}
                              disabled={!message.trim()}
                              className="w-full"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Conversations */}
                      <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            Recent Conversations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {getConversation(selectedParent.id)?.messages?.map(
                              (msg) => (
                                <div
                                  key={msg.id}
                                  className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg ${
                                    msg.sender === "teacher"
                                      ? "bg-white dark:bg-gray-900/50"
                                      : "bg-gray-50 dark:bg-gray-800/50"
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
                                      {msg.type}
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
                              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                                No conversations yet. Send a message to start!
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                      <CardContent className="p-8 sm:p-12 text-center">
                        <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                          Select a Parent
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          Choose a parent from the left to view details and
                          start communicating
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="meetings" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Scheduled Meetings
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Upcoming parent-teacher conferences and meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            Parent Conference - Alice Smith
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            with John Smith • Tomorrow at 2:00 PM
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        Join Meeting
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Calendar className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            Academic Review - Emma Davis
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            with Sarah Davis • Friday at 10:00 AM
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Progress Reports
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Generate and send progress reports to parents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Button className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Monthly Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Award className="w-4 h-4 mr-2" />
                        Create Achievement Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Behavioral Assessment
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Recent Reports
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50/50 dark:bg-gray-800/50">
                          <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                            Alice Smith - January Report
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                            Sent
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50/50 dark:bg-gray-800/50">
                          <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                            Bob Johnson - January Report
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                            Draft
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Communication Metrics
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Track your parent engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Response Rate
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          89%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Avg Response Time
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          2.3 hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Messages This Month
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          156
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Meetings Scheduled
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          23
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Parent Engagement Levels
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Overview of parent participation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          High Engagement
                        </span>
                        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                          {
                            parents.filter((p) => p.engagement === "high")
                              .length
                          }{" "}
                          parents
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Medium Engagement
                        </span>
                        <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50">
                          {
                            parents.filter((p) => p.engagement === "medium")
                              .length
                          }{" "}
                          parents
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Low Engagement
                        </span>
                        <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50">
                          {parents.filter((p) => p.engagement === "low").length}{" "}
                          parents
                        </Badge>
                      </div>
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
