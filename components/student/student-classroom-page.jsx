"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  Calendar,
  Users,
  MessageCircle,
  Bell,
  FileText,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Award,
  TrendingUp,
  BarChart3,
  PlusCircle,
  MoreVertical,
  Download,
  Share2,
  Pin,
  Hash,
  Settings,
  Volume2,
  VolumeX,
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  Timer,
  Target,
  Crown,
  Trophy,
  Zap,
  Brain,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  Plus,
  X,
  ChevronRight,
  Home,
  Video,
  Mic,
  MicOff,
  VideoOff,
  ScreenShare,
} from "lucide-react";

// Sample classroom data
const classroomData = {
  id: "CS101",
  name: "Computer Science - Semester 5",
  description: "Advanced Computer Science topics including Data Structures, Algorithms, and Software Engineering",
  teacher: {
    name: "Dr. Sarah Johnson",
    avatar: "/avatars/teacher1.jpg",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    office: "CS Building, Room 301",
  },
  schedule: [
    { day: "Monday", time: "9:00 AM - 10:30 AM", subject: "Data Structures", room: "CS-101" },
    { day: "Tuesday", time: "11:00 AM - 12:30 PM", subject: "Algorithms", room: "CS-102" },
    { day: "Wednesday", time: "2:00 PM - 3:30 PM", subject: "Software Engineering", room: "CS-103" },
    { day: "Thursday", time: "10:00 AM - 11:30 AM", subject: "Database Systems", room: "CS-104" },
    { day: "Friday", time: "1:00 PM - 2:30 PM", subject: "Web Development", room: "CS-105" },
  ],
  students: [
    { id: 1, name: "You", avatar: "/avatars/me.jpg", rollNo: "CS2021001", attendance: 95, grade: "A", rank: 3 },
    { id: 2, name: "Alice Smith", avatar: "/avatars/student1.jpg", rollNo: "CS2021002", attendance: 98, grade: "A+", rank: 1 },
    { id: 3, name: "Bob Johnson", avatar: "/avatars/student2.jpg", rollNo: "CS2021003", attendance: 92, grade: "A", rank: 5 },
    { id: 4, name: "Carol Davis", avatar: "/avatars/student3.jpg", rollNo: "CS2021004", attendance: 96, grade: "A", rank: 2 },
    { id: 5, name: "David Wilson", avatar: "/avatars/student4.jpg", rollNo: "CS2021005", attendance: 89, grade: "B+", rank: 8 },
    { id: 6, name: "Emma Brown", avatar: "/avatars/student5.jpg", rollNo: "CS2021006", attendance: 94, grade: "A", rank: 4 },
  ],
  totalStudents: 45,
  subjects: [
    { id: 1, name: "Data Structures", code: "CS301", credits: 4, teacher: "Dr. Sarah Johnson" },
    { id: 2, name: "Algorithms", code: "CS302", credits: 4, teacher: "Prof. Mike Chen" },
    { id: 3, name: "Software Engineering", code: "CS303", credits: 3, teacher: "Dr. Sarah Johnson" },
    { id: 4, name: "Database Systems", code: "CS304", credits: 4, teacher: "Dr. Lisa Wang" },
    { id: 5, name: "Web Development", code: "CS305", credits: 3, teacher: "Prof. John Davis" },
  ],
};

// Sample notices
const notices = [
  {
    id: 1,
    title: "Mid-term Exam Schedule Released",
    content: "The mid-term examination schedule has been uploaded. Please check your respective subject timings and rooms.",
    author: "Dr. Sarah Johnson",
    timestamp: "2024-12-08 14:30",
    priority: "high",
    pinned: true,
    attachments: ["exam_schedule.pdf"],
  },
  {
    id: 2,
    title: "Assignment Submission Deadline",
    content: "Reminder: Data Structures assignment is due on December 15th. Late submissions will have grade penalties.",
    author: "Dr. Sarah Johnson",
    timestamp: "2024-12-07 16:45",
    priority: "medium",
    pinned: false,
    attachments: [],
  },
  {
    id: 3,
    title: "Guest Lecture on AI/ML",
    content: "We have arranged a special guest lecture on Artificial Intelligence and Machine Learning by Dr. Andrew Thompson from MIT on December 20th.",
    author: "Prof. Mike Chen",
    timestamp: "2024-12-06 10:20",
    priority: "low",
    pinned: false,
    attachments: ["guest_lecture_info.pdf"],
  },
];

// Sample notes
const notes = [
  {
    id: 1,
    title: "Data Structures - Linked Lists",
    subject: "Data Structures",
    content: "Comprehensive notes on linked lists implementation and operations...",
    author: "Dr. Sarah Johnson",
    uploadDate: "2024-12-08",
    downloads: 45,
    fileSize: "2.3 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Sorting Algorithms Explained",
    subject: "Algorithms",
    content: "Detailed explanation of various sorting algorithms with time complexity analysis...",
    author: "Prof. Mike Chen",
    uploadDate: "2024-12-07",
    downloads: 38,
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Software Development Life Cycle",
    subject: "Software Engineering",
    content: "Overview of SDLC phases and methodologies...",
    author: "Dr. Sarah Johnson",
    uploadDate: "2024-12-06",
    downloads: 52,
    fileSize: "3.1 MB",
    fileType: "PPT",
  },
];

// Sample chat rooms
const chatRooms = [
  {
    id: 1,
    name: "General Discussion",
    description: "General classroom discussions and announcements",
    members: 45,
    unreadCount: 3,
    lastMessage: {
      sender: "Alice Smith",
      content: "Anyone has notes for today's lecture?",
      timestamp: "14:25",
    },
    isOnline: true,
  },
  {
    id: 2,
    name: "Study Group",
    description: "Collaborative study sessions and doubt clearing",
    members: 28,
    unreadCount: 0,
    lastMessage: {
      sender: "Bob Johnson",
      content: "Let's meet tomorrow for group study",
      timestamp: "13:45",
    },
    isOnline: true,
  },
  {
    id: 3,
    name: "Project Team Alpha",
    description: "Software Engineering project discussions",
    members: 8,
    unreadCount: 5,
    lastMessage: {
      sender: "Carol Davis",
      content: "Updated the project requirements document",
      timestamp: "12:30",
    },
    isOnline: false,
  },
  {
    id: 4,
    name: "Assignment Help",
    description: "Get help with assignments and homework",
    members: 35,
    unreadCount: 1,
    lastMessage: {
      sender: "David Wilson",
      content: "Can someone explain the binary tree traversal?",
      timestamp: "11:15",
    },
    isOnline: true,
  },
];

// Sample chat messages
const chatMessages = [
  {
    id: 1,
    sender: "Alice Smith",
    avatar: "/avatars/student1.jpg",
    content: "Hey everyone! Did anyone attend today's lecture on binary trees?",
    timestamp: "14:20",
    isMe: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "/avatars/me.jpg",
    content: "Yes, I was there. The professor explained the traversal algorithms really well.",
    timestamp: "14:22",
    isMe: true,
  },
  {
    id: 3,
    sender: "Bob Johnson",
    avatar: "/avatars/student2.jpg",
    content: "I missed it 😅 Can someone share their notes?",
    timestamp: "14:23",
    isMe: false,
  },
  {
    id: 4,
    sender: "Alice Smith",
    avatar: "/avatars/student1.jpg",
    content: "Sure! I'll upload them to the notes section",
    timestamp: "14:25",
    isMe: false,
  },
];

const StudentClassroomDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedChatRoom, setSelectedChatRoom] = useState(chatRooms[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("");
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600";
    if (attendance >= 85) return "text-yellow-600";
    return "text-red-600";
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4 text-yellow-600" />;
      case 2: return <Trophy className="h-4 w-4 text-gray-400" />;
      case 3: return <Award className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold">#{rank}</span>;
    }
  };

  const filteredNotes = selectedSubject === "all" 
    ? notes 
    : notes.filter(note => note.subject === selectedSubject);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              {classroomData.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {classroomData.description}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              {classroomData.totalStudents} Students
            </Badge>
            <Badge variant="outline" className="text-green-600 border-green-200">
              {classroomData.subjects.length} Subjects
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-muted-foreground">Your Attendance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">A</div>
              <div className="text-xs text-muted-foreground">Current Grade</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-xs text-muted-foreground">Class Rank</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">18</div>
              <div className="text-xs text-muted-foreground">Credits</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto sm:h-14">
          <TabsTrigger value="overview" className="text-xs sm:text-sm font-medium">
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs sm:text-sm font-medium">
            <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="notices" className="text-xs sm:text-sm font-medium">
            <Bell className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Notices</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-xs sm:text-sm font-medium">
            <MessageCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs sm:text-sm font-medium">
            <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="text-xs sm:text-sm font-medium">
            <Users className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Teacher Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Class Teacher</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={classroomData.teacher.avatar} />
                      <AvatarFallback>{classroomData.teacher.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg">{classroomData.teacher.name}</h3>
                      <p className="text-sm text-muted-foreground">{classroomData.teacher.department}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{classroomData.teacher.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{classroomData.teacher.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 sm:col-span-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{classroomData.teacher.office}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subjects Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Subjects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {classroomData.subjects.map((subject) => (
                      <div key={subject.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{subject.name}</h4>
                          <p className="text-sm text-muted-foreground">{subject.code} • {subject.teacher}</p>
                        </div>
                        <Badge variant="outline">{subject.credits} Credits</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">New assignment posted in Data Structures</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Lecture notes uploaded for Algorithms</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm">Exam schedule updated</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Join Live Class
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Open Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Notes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Check Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-sm">Data Structures Quiz</h4>
                    <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                    <h4 className="font-medium text-sm">Project Presentation</h4>
                    <p className="text-xs text-muted-foreground">Dec 15, 2:00 PM</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-sm">Guest Lecture</h4>
                    <p className="text-xs text-muted-foreground">Dec 20, 11:00 AM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-lg font-bold text-green-600">A</div>
                      <div className="text-xs text-muted-foreground">Grade</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-lg font-bold text-blue-600">3rd</div>
                      <div className="text-xs text-muted-foreground">Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">Study Notes</h2>
              <p className="text-sm text-muted-foreground">Access lecture notes and study materials</p>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {classroomData.subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base line-clamp-2">{note.title}</h3>
                      <Badge variant="outline" className="mt-2 text-xs">{note.subject}</Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedNote(note)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>by {note.author}</span>
                    <span>{note.uploadDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{note.downloads} downloads</span>
                      <span>•</span>
                      <span>{note.fileSize}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{note.fileType}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notices" className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Notice Board</h2>
                <p className="text-sm text-muted-foreground">Important announcements and updates</p>
              </div>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {notice.pinned && <Pin className="h-4 w-4 text-blue-600" />}
                        <h3 className="font-semibold text-lg">{notice.title}</h3>
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedNotice(notice)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Full Notice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {notice.content}
                    </p>
                    
                    {notice.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {notice.attachments.map((attachment, idx) => (
                          <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-muted">
                            <Paperclip className="mr-1 h-3 w-3" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>by {notice.author}</span>
                      <span>{new Date(notice.timestamp).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Chat Rooms Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-[600px] overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Chat Rooms</span>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {chatRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-3 cursor-pointer hover:bg-muted/50 border-r-2 ${
                          selectedChatRoom.id === room.id ? 'bg-muted border-r-blue-600' : 'border-r-transparent'
                        }`}
                        onClick={() => setSelectedChatRoom(room)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{room.name}</span>
                            {room.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          {room.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs h-5 w-5 flex items-center justify-center p-0">
                              {room.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {room.description}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                          <span>{room.members} members</span>
                          <span>{room.lastMessage.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Messages */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Hash className="h-5 w-5" />
                        <span>{selectedChatRoom.name}</span>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedChatRoom.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{selectedChatRoom.members} members</Badge>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex space-x-3 ${message.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {!message.isMe && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback className="text-xs">{message.sender[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`flex-1 max-w-xs ${message.isMe ? 'text-right' : ''}`}>
                          {!message.isMe && (
                            <p className="text-sm font-medium text-blue-600 mb-1">{message.sender}</p>
                          )}
                          <div className={`p-3 rounded-lg text-sm ${
                            message.isMe 
                              ? 'bg-blue-600 text-white ml-auto' 
                              : 'bg-muted'
                          }`}>
                            {message.content}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Class Schedule</h2>
            <div className="grid gap-4">
              {classroomData.schedule.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">{item.day}</div>
                          <div className="text-sm text-muted-foreground">{item.time}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.subject}</h3>
                          <p className="text-sm text-muted-foreground">Room: {item.room}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Video className="mr-2 h-4 w-4" />
                        Join Class
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Class Students</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {classroomData.students.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                      </div>
                      {getRankIcon(student.rank)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance:</span>
                        <span className={getAttendanceColor(student.attendance)}>
                          {student.attendance}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Grade:</span>
                        <span className="font-medium">{student.grade}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rank:</span>
                        <span className="font-medium">#{student.rank}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Notice Details Dialog */}
      <Dialog open={!!selectedNotice} onOpenChange={() => setSelectedNotice(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedNotice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {selectedNotice.pinned && <Pin className="h-4 w-4 text-blue-600" />}
                  <span>{selectedNotice.title}</span>
                </DialogTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(selectedNotice.priority)}>
                    {selectedNotice.priority.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    by {selectedNotice.author} • {new Date(selectedNotice.timestamp).toLocaleString()}
                  </span>
                </div>
              </DialogHeader>
              <div className="mt-6 space-y-4">
                <div className="prose prose-sm max-w-none">
                  {selectedNotice.content}
                </div>
                {selectedNotice.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Attachments:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNotice.attachments.map((attachment, idx) => (
                        <Button key={idx} variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          {attachment}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Note Details Dialog */}
      <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedNote && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNote.title}</DialogTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{selectedNote.subject}</Badge>
                  <span className="text-sm text-muted-foreground">
                    by {selectedNote.author} • {selectedNote.uploadDate}
                  </span>
                </div>
              </DialogHeader>
              <div className="mt-6 space-y-4">
                <div className="prose prose-sm max-w-none">
                  {selectedNote.content}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    {selectedNote.downloads} downloads • {selectedNote.fileSize} • {selectedNote.fileType}
                  </div>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentClassroomDetailsPage;