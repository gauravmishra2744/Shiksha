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
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="col-span-2 h-96 bg-gray-200 rounded-lg"></div>
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

        <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-200 dark:border-purple-800">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Parent Portal
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Communicate with parents and guardians to support student
                      success
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </div>

              {/* Communication Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-purple-600">
                    {parents.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Parents
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-blue-600">
                    {parents.reduce(
                      (sum, parent) => sum + parent.unreadMessages,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Unread Messages
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-green-600">
                    {parents.reduce(
                      (sum, parent) => sum + parent.meetingsScheduled,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Meetings Scheduled
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50">
                  <div className="text-2xl font-bold text-orange-600">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Response Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="communications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="reports">Progress Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="communications" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
                      <SelectTrigger className="w-40">
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Parents List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-500" />
                      Parents & Guardians
                    </CardTitle>
                    <CardDescription>
                      Select a parent to view details and communicate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredParents.map((parent) => (
                        <div
                          key={parent.id}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedParent?.id === parent.id
                              ? "border-purple-500 bg-purple-50"
                              : ""
                          }`}
                          onClick={() => setSelectedParent(parent)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={parent.avatar} />
                                <AvatarFallback>
                                  {parent.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{parent.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Parent of {parent.student}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {parent.studentClass}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
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
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Last contact: {parent.lastContact}</span>
                            <div className="flex items-center gap-1">
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
                <div className="lg:col-span-2">
                  {selectedParent ? (
                    <div className="space-y-4">
                      {/* Parent Information */}
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={selectedParent.avatar} />
                                <AvatarFallback>
                                  {selectedParent.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle>{selectedParent.name}</CardTitle>
                                <CardDescription>
                                  Parent of {selectedParent.student} •{" "}
                                  {selectedParent.studentClass}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => scheduleCall(selectedParent.id)}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <Video className="w-4 h-4 mr-2" />
                                Video Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <Calendar className="w-4 h-4 mr-2" />
                                Meeting
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Student ID:</p>
                              <p className="font-medium">
                                {selectedParent.studentId}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Grade:</p>
                              <p className="font-medium">
                                {selectedParent.studentGrade}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Email:</p>
                              <p className="font-medium">
                                {selectedParent.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Phone:</p>
                              <p className="font-medium">
                                {selectedParent.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">
                                Preferred Contact:
                              </p>
                              <div className="flex items-center gap-1">
                                {selectedParent.preferredContactMethod ===
                                "email" ? (
                                  <Mail className="w-3 h-3" />
                                ) : (
                                  <Phone className="w-3 h-3" />
                                )}
                                <span className="font-medium capitalize">
                                  {selectedParent.preferredContactMethod}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-600">
                                Emergency Contact:
                              </p>
                              <div className="flex items-center gap-1">
                                {selectedParent.emergencyContact ? (
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-3 h-3 text-red-500" />
                                )}
                                <span className="font-medium">
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
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-500" />
                            {selectedParent.student}'s Performance Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 border rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {selectedParent.studentPerformance.gpa}
                              </div>
                              <div className="text-sm text-gray-600">GPA</div>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                              <div className="text-2xl font-bold text-green-600">
                                {selectedParent.studentPerformance.attendance}%
                              </div>
                              <div className="text-sm text-gray-600">
                                Attendance
                              </div>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                              <div className="text-sm font-bold text-purple-600 capitalize">
                                {selectedParent.studentPerformance.behavior}
                              </div>
                              <div className="text-sm text-gray-600">
                                Behavior
                              </div>
                            </div>
                            <div className="text-center p-3 border rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">
                                {Math.round(
                                  selectedParent.studentPerformance.recentGrades.reduce(
                                    (a, b) => a + b,
                                    0
                                  ) /
                                    selectedParent.studentPerformance
                                      .recentGrades.length
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                Avg Grade
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Send Message */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
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
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
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
                                  className={`p-3 border rounded-lg ${
                                    msg.sender === "teacher" ? "" : "bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare
                                      className={`w-4 h-4 ${
                                        msg.sender === "teacher"
                                          ? "text-blue-600"
                                          : "text-green-600"
                                      }`}
                                    />
                                    <span className="text-sm font-medium">
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
                                    <span className="text-xs text-gray-500 ml-auto">
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                  <p className="text-sm">{msg.content}</p>
                                </div>
                              )
                            ) || (
                              <div className="text-center text-gray-500 py-4">
                                No conversations yet. Send a message to start!
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Select a Parent
                        </h3>
                        <p className="text-gray-600">
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
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Meetings</CardTitle>
                  <CardDescription>
                    Upcoming parent-teacher conferences and meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">
                            Parent Conference - Alice Smith
                          </h3>
                          <p className="text-sm text-gray-600">
                            with John Smith • Tomorrow at 2:00 PM
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Join Meeting
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-green-500" />
                        <div>
                          <h3 className="font-medium">
                            Academic Review - Emma Davis
                          </h3>
                          <p className="text-sm text-gray-600">
                            with Sarah Davis • Friday at 10:00 AM
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Reports</CardTitle>
                  <CardDescription>
                    Generate and send progress reports to parents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
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
                      <h4 className="font-medium">Recent Reports</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">
                            Alice Smith - January Report
                          </span>
                          <span className="text-xs text-gray-500">Sent</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">
                            Bob Johnson - January Report
                          </span>
                          <span className="text-xs text-gray-500">Draft</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Metrics</CardTitle>
                    <CardDescription>
                      Track your parent engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Response Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Response Time</span>
                        <span className="font-medium">2.3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Messages This Month</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Meetings Scheduled</span>
                        <span className="font-medium">23</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Parent Engagement Levels</CardTitle>
                    <CardDescription>
                      Overview of parent participation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High Engagement</span>
                        <Badge className="bg-green-100 text-green-700">
                          {
                            parents.filter((p) => p.engagement === "high")
                              .length
                          }{" "}
                          parents
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium Engagement</span>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          {
                            parents.filter((p) => p.engagement === "medium")
                              .length
                          }{" "}
                          parents
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Low Engagement</span>
                        <Badge className="bg-red-100 text-red-700">
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
