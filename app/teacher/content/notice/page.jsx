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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Bell,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Edit,
  Trash2,
  Archive,
  Pin,
  MoreVertical,
  RefreshCw,
  Megaphone,
  Target,
  TrendingUp,
  MessageSquare,
  Star,
  Copy,
  ExternalLink,
  Settings,
  BookOpen,
} from "lucide-react";

// Dummy data for notices
const noticesData = [
  {
    id: 1,
    title: "Mid-Term Examination Schedule Released",
    content:
      "The mid-term examination schedule for all classes has been finalized. Please check the detailed timetable on the school portal. Exams will commence from March 15th, 2024.",
    priority: "high",
    audience: "All Students",
    audienceCode: "all",
    expiryDate: "2024-03-20",
    publishDate: "2024-01-15",
    publishTime: "10:30 AM",
    author: "Academic Office",
    status: "Published",
    readCount: 324,
    isStarred: true,
    isPinned: true,
    tags: ["Examination", "Schedule", "Important"],
    type: "Academic",
    lastModified: "2024-01-15",
  },
  {
    id: 2,
    title: "Science Fair Registration Open",
    content:
      "Registration for the annual science fair is now open. Students can register until February 28th. This is a great opportunity to showcase your innovative projects and compete for exciting prizes.",
    priority: "medium",
    audience: "Grade 8-12",
    audienceCode: "grade-8-12",
    expiryDate: "2024-02-28",
    publishDate: "2024-01-12",
    publishTime: "2:15 PM",
    author: "Science Department",
    status: "Published",
    readCount: 156,
    isStarred: false,
    isPinned: false,
    tags: ["Science Fair", "Registration", "Competition"],
    type: "Event",
    lastModified: "2024-01-14",
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting Scheduled",
    content:
      "Parent-teacher meetings are scheduled for February 10th, 2024. Please confirm your attendance by calling the school office. Individual appointment slots will be assigned.",
    priority: "medium",
    audience: "Parents",
    audienceCode: "parents",
    expiryDate: "2024-02-10",
    publishDate: "2024-01-10",
    publishTime: "4:45 PM",
    author: "Administration",
    status: "Published",
    readCount: 89,
    isStarred: true,
    isPinned: false,
    tags: ["PTM", "Meeting", "Parents"],
    type: "Meeting",
    lastModified: "2024-01-11",
  },
  {
    id: 4,
    title: "Library Books Return Reminder",
    content:
      "Students who have borrowed books from the library are reminded to return them by January 25th. Late return fees will be applicable after the due date.",
    priority: "low",
    audience: "All Students",
    audienceCode: "all",
    expiryDate: "2024-01-25",
    publishDate: "2024-01-08",
    publishTime: "11:20 AM",
    author: "Library",
    status: "Published",
    readCount: 67,
    isStarred: false,
    isPinned: false,
    tags: ["Library", "Books", "Reminder"],
    type: "Reminder",
    lastModified: "2024-01-08",
  },
  {
    id: 5,
    title: "Sports Day Event Announcement",
    content:
      "Annual sports day will be held on March 5th, 2024. All students are encouraged to participate. Registration forms are available at the sports office.",
    priority: "medium",
    audience: "All Students",
    audienceCode: "all",
    expiryDate: "2024-03-05",
    publishDate: "2024-01-05",
    publishTime: "9:00 AM",
    author: "Sports Department",
    status: "Draft",
    readCount: 0,
    isStarred: false,
    isPinned: false,
    tags: ["Sports", "Event", "Annual"],
    type: "Event",
    lastModified: "2024-01-07",
  },
];

// Dummy data for audience options
const audienceOptions = [
  { value: "all", label: "All Students", count: 850 },
  { value: "grade-12", label: "Grade 12", count: 120 },
  { value: "grade-11", label: "Grade 11", count: 115 },
  { value: "grade-10", label: "Grade 10", count: 130 },
  { value: "grade-9", label: "Grade 9", count: 125 },
  { value: "grade-8", label: "Grade 8", count: 135 },
  { value: "grade-8-12", label: "Grade 8-12", count: 625 },
  { value: "parents", label: "Parents", count: 420 },
  { value: "teachers", label: "Teachers", count: 45 },
];

export default function NoticePage() {
  const [noticeData, setNoticeData] = useState({
    title: "",
    content: "",
    priority: "medium",
    audience: "all",
    type: "General",
    expiryDate: "",
    tags: "",
    scheduledDate: "",
    scheduledTime: "",
  });
  const [sending, setSending] = useState(false);
  const [notices, setNotices] = useState(noticesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noticeData.title || !noticeData.content) {
      setMessage("Please fill in all required fields");
      setMessageType("error");
      return;
    }

    setSending(true);

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const newNotice = {
        id: Date.now(),
        title: noticeData.title,
        content: noticeData.content,
        priority: noticeData.priority,
        audience:
          audienceOptions.find((a) => a.value === noticeData.audience)?.label ||
          "All Students",
        audienceCode: noticeData.audience,
        type: noticeData.type,
        expiryDate: noticeData.expiryDate,
        publishDate: new Date().toISOString().split("T")[0],
        publishTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        author: "Current Teacher",
        status: noticeData.scheduledDate ? "Scheduled" : "Published",
        readCount: 0,
        isStarred: false,
        isPinned: false,
        tags: noticeData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        lastModified: new Date().toISOString().split("T")[0],
        scheduledDate: noticeData.scheduledDate,
        scheduledTime: noticeData.scheduledTime,
      };

      setNotices((prev) => [newNotice, ...prev]);
      setNoticeData({
        title: "",
        content: "",
        priority: "medium",
        audience: "all",
        type: "General",
        expiryDate: "",
        tags: "",
        scheduledDate: "",
        scheduledTime: "",
      });
      setMessage("Notice sent successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error sending notice:", error);
      setMessage("Error sending notice. Please try again.");
      setMessageType("error");
    }

    setSending(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-50 text-green-700 border-green-200";
      case "Draft":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Scheduled":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Expired":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Academic":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Event":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Meeting":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Reminder":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id));
    setMessage("Notice deleted successfully");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const toggleStar = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, isStarred: !notice.isStarred } : notice
      )
    );
  };

  const togglePin = (id) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id ? { ...notice, isPinned: !notice.isPinned } : notice
      )
    );
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || notice.priority === priorityFilter;
    const matchesType = typeFilter === "all" || notice.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || notice.status === statusFilter;

    return matchesSearch && matchesPriority && matchesType && matchesStatus;
  });

  const priorities = [...new Set(notices.map((n) => n.priority))];
  const types = [...new Set(notices.map((n) => n.type))];
  const statuses = [...new Set(notices.map((n) => n.status))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-200 dark:border-orange-800">
                  <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Notice Board
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Send important announcements and updates to students and
                    parents
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {notices.filter((n) => n.status === "Published").length}{" "}
                  Published
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {notices.filter((n) => n.status === "Draft").length} Drafts
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {notices.filter((n) => n.status === "Scheduled").length}{" "}
                  Scheduled
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
                    <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {notices.length}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Notices
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
                      {notices.reduce((sum, n) => sum + n.readCount, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Total Reads
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                      {notices.filter((n) => n.priority === "high").length}
                    </p>
                    <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                      High Priority
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {audienceOptions.find((a) => a.value === "all")?.count ||
                        850}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Total Audience
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="create" className="text-xs sm:text-sm">
                <Send className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Create Notice</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm">
                <Bell className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Manage Notices</span>
                <span className="sm:hidden">Manage</span>
              </TabsTrigger>
            </TabsList>

            {/* Create Notice Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Send className="h-5 w-5 text-orange-500" />
                        <span>Create Notice</span>
                      </CardTitle>
                      <CardDescription>
                        Send important announcements to students and parents
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Notice Title *</Label>
                          <Input
                            id="title"
                            placeholder="Enter notice title..."
                            value={noticeData.title}
                            onChange={(e) =>
                              setNoticeData({
                                ...noticeData,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="content">Notice Content *</Label>
                          <Textarea
                            id="content"
                            placeholder="Write your notice content here..."
                            rows={6}
                            value={noticeData.content}
                            onChange={(e) =>
                              setNoticeData({
                                ...noticeData,
                                content: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority Level</Label>
                            <Select
                              value={noticeData.priority}
                              onValueChange={(value) =>
                                setNoticeData({
                                  ...noticeData,
                                  priority: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">
                                  High Priority
                                </SelectItem>
                                <SelectItem value="medium">
                                  Medium Priority
                                </SelectItem>
                                <SelectItem value="low">
                                  Low Priority
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="audience">Send To</Label>
                            <Select
                              value={noticeData.audience}
                              onValueChange={(value) =>
                                setNoticeData({
                                  ...noticeData,
                                  audience: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {audienceOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label} ({option.count} people)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="type">Notice Type</Label>
                            <Select
                              value={noticeData.type}
                              onValueChange={(value) =>
                                setNoticeData({ ...noticeData, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="Academic">
                                  Academic
                                </SelectItem>
                                <SelectItem value="Event">Event</SelectItem>
                                <SelectItem value="Meeting">Meeting</SelectItem>
                                <SelectItem value="Reminder">
                                  Reminder
                                </SelectItem>
                                <SelectItem value="Emergency">
                                  Emergency
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="expiry">
                              Expiry Date (Optional)
                            </Label>
                            <Input
                              id="expiry"
                              type="date"
                              value={noticeData.expiryDate}
                              onChange={(e) =>
                                setNoticeData({
                                  ...noticeData,
                                  expiryDate: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            placeholder="e.g., Important, Examination, Schedule"
                            value={noticeData.tags}
                            onChange={(e) =>
                              setNoticeData({
                                ...noticeData,
                                tags: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="scheduledDate">
                              Schedule Date (Optional)
                            </Label>
                            <Input
                              id="scheduledDate"
                              type="date"
                              value={noticeData.scheduledDate}
                              onChange={(e) =>
                                setNoticeData({
                                  ...noticeData,
                                  scheduledDate: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="scheduledTime">
                              Schedule Time (Optional)
                            </Label>
                            <Input
                              id="scheduledTime"
                              type="time"
                              value={noticeData.scheduledTime}
                              onChange={(e) =>
                                setNoticeData({
                                  ...noticeData,
                                  scheduledTime: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                          <Button
                            type="submit"
                            disabled={
                              sending ||
                              !noticeData.title ||
                              !noticeData.content
                            }
                            className="flex items-center space-x-2"
                          >
                            {sending ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                            <span>
                              {sending
                                ? "Sending..."
                                : noticeData.scheduledDate
                                ? "Schedule Notice"
                                : "Send Notice"}
                            </span>
                          </Button>

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
                                <Bell className="h-4 w-4" />
                              )}
                              <span>{message}</span>
                            </div>
                          )}
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Notice Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            className={`${getPriorityColor(
                              noticeData.priority
                            )} border`}
                            variant="outline"
                          >
                            {noticeData.priority} priority
                          </Badge>
                          {noticeData.type && (
                            <Badge
                              className={`${getTypeColor(
                                noticeData.type
                              )} border`}
                              variant="outline"
                            >
                              {noticeData.type}
                            </Badge>
                          )}
                          {noticeData.priority === "high" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-bold text-lg">
                            {noticeData.title || "Notice Title"}
                          </h3>
                          <p className="text-sm text-gray-600 mt-2">
                            {noticeData.content ||
                              "Notice content will appear here..."}
                          </p>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            Audience:{" "}
                            {audienceOptions.find(
                              (a) => a.value === noticeData.audience
                            )?.label || "All Students"}
                          </p>
                          <p>
                            Recipients:{" "}
                            {audienceOptions.find(
                              (a) => a.value === noticeData.audience
                            )?.count || 850}{" "}
                            people
                          </p>
                          {noticeData.expiryDate && (
                            <p>
                              Expires:{" "}
                              {new Date(
                                noticeData.expiryDate
                              ).toLocaleDateString()}
                            </p>
                          )}
                          {noticeData.scheduledDate && (
                            <p>
                              Scheduled:{" "}
                              {new Date(
                                noticeData.scheduledDate
                              ).toLocaleDateString()}{" "}
                              {noticeData.scheduledTime}
                            </p>
                          )}
                          <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>

                        {noticeData.tags && (
                          <div className="flex flex-wrap gap-1">
                            {noticeData.tags.split(",").map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Manage Notices Tab */}
            <TabsContent value="manage" className="space-y-4">
              {/* Search and Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-1 items-center space-x-2">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search notices..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select
                        value={priorityFilter}
                        onValueChange={setPriorityFilter}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priority</SelectItem>
                          {priorities.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {types.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
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
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notices List */}
              {filteredNotices.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {searchTerm ||
                      priorityFilter !== "all" ||
                      typeFilter !== "all" ||
                      statusFilter !== "all"
                        ? "No notices found"
                        : "No notices yet"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ||
                      priorityFilter !== "all" ||
                      typeFilter !== "all" ||
                      statusFilter !== "all"
                        ? "Try adjusting your search criteria"
                        : "Create your first notice to get started"}
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
                  {filteredNotices.map((notice) => (
                    <Card
                      key={notice.id}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent
                        className={viewMode === "grid" ? "p-4" : "p-4"}
                      >
                        {viewMode === "grid" ? (
                          // Grid View
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                {notice.isPinned && (
                                  <Pin className="h-4 w-4 text-orange-500" />
                                )}
                                <Badge
                                  className={`${getPriorityColor(
                                    notice.priority
                                  )} border`}
                                  variant="outline"
                                >
                                  {notice.priority}
                                </Badge>
                                <Badge
                                  className={`${getStatusColor(
                                    notice.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {notice.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleStar(notice.id)}
                                  className={
                                    notice.isStarred ? "text-yellow-500" : ""
                                  }
                                >
                                  <Star
                                    className={`h-4 w-4 ${
                                      notice.isStarred ? "fill-current" : ""
                                    }`}
                                  />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                {notice.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-3">
                                {notice.content}
                              </p>
                            </div>

                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center justify-between">
                                <span>{notice.audience}</span>
                                <span>{notice.type}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{notice.readCount}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{notice.publishDate}</span>
                                  </div>
                                </div>
                                <span>{notice.author}</span>
                              </div>
                            </div>

                            {notice.tags && notice.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {notice.tags.slice(0, 3).map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <div className="flex space-x-1 pt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Notice
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {notice.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteNotice(notice.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ) : (
                          // List View
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                {notice.isPinned && (
                                  <Pin className="h-4 w-4 text-orange-500" />
                                )}
                                <h3 className="font-semibold text-sm">
                                  {notice.title}
                                </h3>
                                <Badge
                                  className={`${getPriorityColor(
                                    notice.priority
                                  )} border`}
                                  variant="outline"
                                >
                                  {notice.priority}
                                </Badge>
                                <Badge
                                  className={`${getStatusColor(
                                    notice.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {notice.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span>{notice.audience}</span>
                                <span>{notice.type}</span>
                                <span>{notice.publishDate}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{notice.readCount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleStar(notice.id)}
                                className={
                                  notice.isStarred ? "text-yellow-500" : ""
                                }
                              >
                                <Star
                                  className={`h-4 w-4 ${
                                    notice.isStarred ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Notice
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {notice.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteNotice(notice.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
