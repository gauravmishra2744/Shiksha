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
  HelpCircle,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  Search,
  Filter,
  Star,
  Reply,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Eye,
  MoreVertical,
  Archive,
  Pin,
  Flag,
  Send,
  Paperclip,
  Image,
  Video,
  FileText,
  Tag,
  Users,
  Lightbulb,
  TrendingUp,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

// Dummy data for doubts
const doubtsData = [
  {
    id: 1,
    title: "How to solve quadratic equations with negative discriminant?",
    description: "I'm having trouble understanding what happens when the discriminant (b²-4ac) is negative in quadratic equations. Can someone explain with examples?",
    student: {
      id: 1,
      name: "Aarav Sharma",
      avatar: "AS",
      grade: "Grade 10",
      section: "A"
    },
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    priority: "High",
    status: "Open",
    timestamp: "2024-01-15 10:30 AM",
    upvotes: 12,
    downvotes: 1,
    replies: 3,
    tags: ["Complex Numbers", "Algebra", "Grade 10"],
    attachments: [],
    isBookmarked: false,
    isPinned: false,
    lastActivity: "2 hours ago",
    classroom: "Grade 10 - Mathematics A"
  },
  {
    id: 2,
    title: "Difference between speed and velocity in physics?",
    description: "I know both are related to motion, but I'm confused about when to use speed vs velocity. Are they the same thing?",
    student: {
      id: 2,
      name: "Priya Patel",
      avatar: "PP",
      grade: "Grade 9",
      section: "B"
    },
    subject: "Physics",
    chapter: "Motion",
    priority: "Medium",
    status: "Answered",
    timestamp: "2024-01-14 2:15 PM",
    upvotes: 8,
    downvotes: 0,
    replies: 5,
    tags: ["Mechanics", "Kinematics", "Grade 9"],
    attachments: [
      { name: "velocity_diagram.png", type: "image", size: "1.2 MB" }
    ],
    isBookmarked: true,
    isPinned: true,
    lastActivity: "1 day ago",
    classroom: "Grade 9 - Physics B"
  },
  {
    id: 3,
    title: "Can you explain photosynthesis process step by step?",
    description: "I need help understanding the light and dark reactions in photosynthesis. The textbook explanation is confusing.",
    student: {
      id: 3,
      name: "Arjun Kumar",
      avatar: "AK",
      grade: "Grade 8",
      section: "C"
    },
    subject: "Biology",
    chapter: "Life Processes",
    priority: "Low",
    status: "In Progress",
    timestamp: "2024-01-13 4:45 PM",
    upvotes: 15,
    downvotes: 2,
    replies: 7,
    tags: ["Plant Biology", "Biochemistry", "Grade 8"],
    attachments: [
      { name: "chloroplast_structure.pdf", type: "pdf", size: "2.1 MB" },
      { name: "photosynthesis_notes.docx", type: "document", size: "0.8 MB" }
    ],
    isBookmarked: false,
    isPinned: false,
    lastActivity: "3 hours ago",
    classroom: "Grade 8 - Biology C"
  },
  {
    id: 4,
    title: "Help with Shakespeare's Hamlet character analysis",
    description: "I'm writing an essay on Hamlet's character development. Can someone help me understand his soliloquies better?",
    student: {
      id: 4,
      name: "Sneha Singh",
      avatar: "SS",
      grade: "Grade 11",
      section: "A"
    },
    subject: "English",
    chapter: "Drama",
    priority: "Medium",
    status: "Open",
    timestamp: "2024-01-12 11:20 AM",
    upvotes: 6,
    downvotes: 0,
    replies: 2,
    tags: ["Literature", "Character Analysis", "Grade 11"],
    attachments: [],
    isBookmarked: true,
    isPinned: false,
    lastActivity: "5 hours ago",
    classroom: "Grade 11 - English A"
  },
  {
    id: 5,
    title: "Organic chemistry naming conventions confusion",
    description: "I'm struggling with IUPAC naming of organic compounds, especially with multiple functional groups. Any tips?",
    student: {
      id: 5,
      name: "Rohan Gupta",
      avatar: "RG",
      grade: "Grade 12",
      section: "B"
    },
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    priority: "High",
    status: "Resolved",
    timestamp: "2024-01-11 9:00 AM",
    upvotes: 20,
    downvotes: 1,
    replies: 8,
    tags: ["Nomenclature", "Functional Groups", "Grade 12"],
    attachments: [
      { name: "iupac_rules.pdf", type: "pdf", size: "3.2 MB" }
    ],
    isBookmarked: false,
    isPinned: true,
    lastActivity: "1 day ago",
    classroom: "Grade 12 - Chemistry B"
  }
];

// Dummy data for recent replies
const recentReplies = [
  {
    id: 1,
    doubtId: 1,
    author: "Dr. Sharma",
    content: "When the discriminant is negative, the quadratic equation has no real roots, but it has two complex conjugate roots.",
    timestamp: "2 hours ago",
    upvotes: 8,
    isTeacher: true
  },
  {
    id: 2,
    doubtId: 2,
    author: "Ms. Patel",
    content: "Speed is scalar (magnitude only), velocity is vector (magnitude + direction). Speed = distance/time, Velocity = displacement/time.",
    timestamp: "1 day ago",
    upvotes: 12,
    isTeacher: true
  }
];

const DoubtsPage = () => {
  const [doubts, setDoubts] = useState(doubtsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyDialog, setShowReplyDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "In Progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Answered":
        return "bg-green-50 text-green-700 border-green-200";
      case "Resolved":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200";
      case "Medium":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "pdf":
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <Paperclip className="h-4 w-4" />;
    }
  };

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doubt.status === statusFilter;
    const matchesSubject = subjectFilter === "all" || doubt.subject === subjectFilter;
    const matchesPriority = priorityFilter === "all" || doubt.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesSubject && matchesPriority;
  });

  const subjects = [...new Set(doubts.map(d => d.subject))];
  const priorities = [...new Set(doubts.map(d => d.priority))];
  const statuses = [...new Set(doubts.map(d => d.status))];

  const handleReply = () => {
    if (!replyText.trim()) return;
    
    // Simulate adding reply
    console.log("Reply added:", replyText);
    setReplyText("");
    setShowReplyDialog(false);
  };

  const toggleBookmark = (id) => {
    setDoubts(prev => prev.map(doubt => 
      doubt.id === id ? { ...doubt, isBookmarked: !doubt.isBookmarked } : doubt
    ));
  };

  const togglePin = (id) => {
    setDoubts(prev => prev.map(doubt => 
      doubt.id === id ? { ...doubt, isPinned: !doubt.isPinned } : doubt
    ));
  };

  const updateStatus = (id, newStatus) => {
    setDoubts(prev => prev.map(doubt => 
      doubt.id === id ? { ...doubt, status: newStatus } : doubt
    ));
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
                  <HelpCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Doubts</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Help students resolve their academic questions and concerns
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {doubts.filter(d => d.status === "Open").length} Open Doubts
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Clock className="w-3 h-3 mr-1" />
                  {doubts.filter(d => d.status === "In Progress").length} In Progress
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {doubts.filter(d => d.status === "Resolved").length} Resolved
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
                    <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {doubts.length}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Doubts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                      {doubts.filter(d => d.status === "Open" || d.status === "In Progress").length}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Pending
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
                      {doubts.filter(d => d.status === "Resolved" || d.status === "Answered").length}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Resolved
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
                      {doubts.reduce((sum, d) => sum + d.upvotes, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Total Upvotes
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
                      placeholder="Search doubts..."
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
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
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
                  
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Doubts List */}
          {filteredDoubts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== "all" || subjectFilter !== "all" || priorityFilter !== "all"
                    ? "No doubts found"
                    : "No doubts yet"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== "all" || subjectFilter !== "all" || priorityFilter !== "all"
                    ? "Try adjusting your search criteria"
                    : "Students haven't posted any doubts yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredDoubts.map((doubt) => (
                <Card key={doubt.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            {doubt.isPinned && (
                              <Pin className="h-4 w-4 text-orange-500" />
                            )}
                            <h3 className="font-semibold text-lg line-clamp-2">
                              {doubt.title}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className={`${getStatusColor(doubt.status)} border`} variant="outline">
                              {doubt.status}
                            </Badge>
                            <Badge className={`${getPriorityColor(doubt.priority)} border`} variant="outline">
                              {doubt.priority} Priority
                            </Badge>
                            <Badge variant="secondary">
                              {doubt.subject}
                            </Badge>
                            <Badge variant="outline">
                              {doubt.chapter}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark(doubt.id)}
                            className={doubt.isBookmarked ? "text-yellow-500" : ""}
                          >
                            <Star className={`h-4 w-4 ${doubt.isBookmarked ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Student Info */}
                      <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {doubt.student.avatar}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doubt.student.name}</p>
                          <p className="text-xs text-gray-600">
                            {doubt.student.grade} {doubt.student.section} • {doubt.classroom}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{doubt.timestamp}</p>
                          <p className="text-xs text-gray-500">Last: {doubt.lastActivity}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-3">
                        <p className="text-gray-700 line-clamp-3">
                          {doubt.description}
                        </p>
                        
                        {/* Tags */}
                        {doubt.tags && doubt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {doubt.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Attachments */}
                        {doubt.attachments && doubt.attachments.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {doubt.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2 text-sm">
                                  {getAttachmentIcon(attachment.type)}
                                  <span className="text-gray-700">{attachment.name}</span>
                                  <span className="text-gray-500">({attachment.size})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{doubt.upvotes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{doubt.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>View details</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Reply className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Reply to Student Doubt</DialogTitle>
                                <DialogDescription>
                                  Help resolve: {doubt.title}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="text-sm font-medium mb-2">Original Question:</p>
                                  <p className="text-sm text-gray-700">{doubt.description}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="reply">Your Response</Label>
                                  <Textarea
                                    id="reply"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Provide a detailed explanation to help the student..."
                                    rows={6}
                                  />
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setReplyText("")}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleReply}>
                                    <Send className="h-4 w-4 mr-2" />
                                    Send Reply
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Select
                            value={doubt.status}
                            onValueChange={(value) => updateStatus(doubt.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Answered">Answered</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoubtsPage;