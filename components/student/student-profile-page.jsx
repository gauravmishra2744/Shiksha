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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Trophy,
  Target,
  Star,
  Award,
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  Edit,
  Camera,
  Save,
  X,
  Check,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share2,
  Copy,
  Lock,
  Unlock,
  Globe,
  GraduationCap,
  Briefcase,
  Heart,
  Zap,
  Brain,
  Crown,
  Medal,
  Flame,
  ChevronRight,
  Plus,
  Minus,
  RefreshCw,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Link as LinkIcon,
  School,
  Users,
  Activity,
  Calendar as CalendarIcon,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Coffee,
  Gamepad2,
  Book,
  Code,
  Palette,
  Mountain,
  Plane,
  Camera as CameraIcon,
  Cake,
  Home,
  Baby,
  Smile,
  UserCheck,
  ShieldCheck,
  ParentLock,
  Users2,
  FamilyIcon,
} from "lucide-react";

// Sample user data for school students (Class 6-12)
const userData = {
  id: "STU2024001",
  name: "Aarav Sharma",
  email: "aarav.sharma@school.edu",
  phone: "+91 98765 43210",
  avatar: "/avatars/student.jpg",
  coverPhoto: "/covers/gradient.jpg",
  bio: "I love learning new things, especially in Science and Mathematics. I enjoy participating in school competitions and helping my classmates with their studies!",
  location: "Mumbai, Maharashtra",
  dateOfBirth: "2009-08-15",
  joinDate: "2023-04-01",
  studentId: "STU2024001",
  class: "Class 10",
  section: "A",
  rollNumber: "15",
  school: "Delhi Public School, Mumbai",
  currentGrade: "A+",
  percentage: 92.5,
  status: "Active",
  verified: true,
  profileCompletion: 88,
  parentEmail: "parent.sharma@gmail.com",
  parentPhone: "+91 98765 43211",
  guardianName: "Mrs. Priya Sharma",
  bloodGroup: "B+",
  address: "123, Green Valley Society, Andheri West, Mumbai - 400058",
  interests: [
    "Mathematics",
    "Science",
    "Cricket",
    "Reading",
    "Art & Craft",
    "Music",
    "Computer Programming",
    "Quiz Competitions",
    "Photography",
    "Dancing",
  ],
  subjects: [
    {
      name: "Mathematics",
      grade: "A+",
      percentage: 95,
      teacher: "Mr. Rajesh Kumar",
    },
    {
      name: "Science",
      grade: "A",
      percentage: 90,
      teacher: "Mrs. Sunita Patel",
    },
    {
      name: "English",
      grade: "A",
      percentage: 88,
      teacher: "Ms. Jennifer D'souza",
    },
    { name: "Hindi", grade: "A+", percentage: 93, teacher: "Mr. Suresh Gupta" },
    {
      name: "Social Studies",
      grade: "A",
      percentage: 87,
      teacher: "Mrs. Kavita Singh",
    },
    {
      name: "Computer Science",
      grade: "A+",
      percentage: 96,
      teacher: "Mr. Amit Verma",
    },
  ],
  hobbies: [
    "Playing Cricket",
    "Reading Story Books",
    "Painting",
    "Playing Piano",
    "Solving Puzzles",
    "Gardening",
  ],
};

// Achievement data for school students
const achievements = [
  {
    id: 1,
    title: "Top Student of the Month",
    description: "Excellent performance in all subjects for October 2024",
    icon: Crown,
    color: "text-amber-600",
    date: "2024-10-31",
    category: "Academic",
  },
  {
    id: 2,
    title: "Science Fair Winner",
    description: "First place in school science exhibition",
    icon: Trophy,
    color: "text-blue-600",
    date: "2024-09-15",
    category: "Competition",
  },
  {
    id: 3,
    title: "Math Olympiad Qualifier",
    description: "Qualified for state level mathematics olympiad",
    icon: Brain,
    color: "text-purple-600",
    date: "2024-08-20",
    category: "Competition",
  },
  {
    id: 4,
    title: "Perfect Attendance",
    description: "100% attendance for the academic year",
    icon: Calendar,
    color: "text-green-600",
    date: "2024-07-30",
    category: "Attendance",
  },
  {
    id: 5,
    title: "Sports Champion",
    description: "Won inter-house cricket tournament",
    icon: Award,
    color: "text-orange-600",
    date: "2024-06-10",
    category: "Sports",
  },
  {
    id: 6,
    title: "Art Competition Winner",
    description: "First prize in painting competition",
    icon: Palette,
    color: "text-pink-600",
    date: "2024-05-25",
    category: "Arts",
  },
];

// Recent activity for school students
const recentActivity = [
  {
    id: 1,
    type: "assignment",
    title: "Submitted Math Assignment",
    description: "Algebra and Quadratic Equations",
    timestamp: "2 hours ago",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "test",
    title: "Completed Science Test",
    description: "Light and Reflection - Score: 18/20",
    timestamp: "1 day ago",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "badge",
    title: "Earned Star Student Badge",
    description: "For completing all homework on time",
    timestamp: "2 days ago",
    icon: Star,
    color: "text-amber-600",
  },
  {
    id: 4,
    type: "participation",
    title: "Joined Study Group",
    description: "Mathematics Problem Solving Group",
    timestamp: "3 days ago",
    icon: Users,
    color: "text-purple-600",
  },
];

// Extra-curricular activities
const extraActivities = [
  { name: "School Cricket Team", role: "Captain", year: "2024" },
  { name: "Science Club", role: "Member", year: "2023-2024" },
  { name: "Art & Craft Society", role: "Vice President", year: "2024" },
  { name: "Quiz Team", role: "Team Lead", year: "2023-2024" },
  { name: "School Choir", role: "Member", year: "2023" },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editedData, setEditedData] = useState(userData);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showParentDialog, setShowParentDialog] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    parentalNotifications: true,
    progressReports: true,
    profileVisibility: "school",
    showContact: false,
    allowClassmateMessages: true,
    showActivities: true,
    weeklyReports: true,
  });

  const handleSave = () => {
    setShowEditDialog(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setShowEditDialog(false);
  };

  const getGradeColor = (grade) => {
    if (grade === "A+" || grade === "A") return "text-green-600";
    if (grade === "B+" || grade === "B") return "text-blue-600";
    if (grade === "C+" || grade === "C") return "text-amber-600";
    return "text-red-600";
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      Academic: "bg-blue-50 text-blue-700 border-blue-200",
      Competition: "bg-purple-50 text-purple-700 border-purple-200",
      Sports: "bg-green-50 text-green-700 border-green-200",
      Arts: "bg-pink-50 text-pink-700 border-pink-200",
      Attendance: "bg-orange-50 text-orange-700 border-orange-200",
      Community: "bg-indigo-50 text-indigo-700 border-indigo-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-sm">
          {/* Simple Header */}
          <div className="h-24 sm:h-32 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setShowParentDialog(true)}
              >
                <ShieldCheck className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="relative -mt-12 sm:-mt-16 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-xl font-semibold bg-gray-100 text-gray-800">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full p-0 bg-white shadow-sm"
                  onClick={() => setShowAvatarDialog(true)}
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{userData.name}</span>
                      {userData.verified && (
                        <Check className="h-5 w-5 text-blue-600 bg-blue-50 rounded-full p-1" />
                      )}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <p className="text-gray-600 dark:text-gray-400">
                        {userData.class} • Roll No. {userData.rollNumber}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                      >
                        Age {calculateAge(userData.dateOfBirth)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <Button
                      onClick={() => setShowEditDialog(true)}
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setShowSettingsDialog(true)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Privacy Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setShowParentDialog(true)}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Parent/Guardian Info
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Report Card
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-blue-600">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share with Parents
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                  {userData.bio}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center space-x-1 text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{userData.percentage}%</span>
                    <span className="text-gray-500">Overall</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Trophy className="h-4 w-4 text-amber-600" />
                    <span className="font-medium">{achievements.length}</span>
                    <span className="text-gray-500">Achievements</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <School className="h-4 w-4 text-green-600" />
                    <span className="text-gray-500">{userData.school}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-500">
                      Student since {new Date(userData.joinDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm text-gray-600">
                  {userData.profileCompletion}%
                </span>
              </div>
              <Progress value={userData.profileCompletion} className="h-2" />
              {userData.profileCompletion < 100 && (
                <p className="text-xs text-gray-500 mt-2">
                  Complete your profile to unlock all features and help teachers
                  know you better!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance Quick View */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">
                {userData.currentGrade}
              </div>
              <div className="text-xs text-gray-500">Current Grade</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                {userData.percentage}%
              </div>
              <div className="text-xs text-gray-500">Overall Score</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                {userData.subjects.length}
              </div>
              <div className="text-xs text-gray-500">Subjects</div>
            </CardContent>
          </Card>
          <Card className="text-center border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                {extraActivities.length}
              </div>
              <div className="text-xs text-gray-500">Activities</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto bg-white dark:bg-gray-800 border shadow-sm">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="academic" className="text-xs sm:text-sm">
              <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Academic</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs sm:text-sm">
              <Trophy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="text-xs sm:text-sm">
              <Activity className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Activities</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="text-xs sm:text-sm">
              <Heart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Student Information */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Student Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Student ID
                        </Label>
                        <p className="font-medium">{userData.studentId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Class & Section
                        </Label>
                        <p className="font-medium">
                          {userData.class} - {userData.section}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Roll Number
                        </Label>
                        <p className="font-medium">{userData.rollNumber}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Date of Birth
                        </Label>
                        <p className="font-medium">
                          {new Date(userData.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Blood Group
                        </Label>
                        <p className="font-medium">{userData.bloodGroup}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">
                          Status
                        </Label>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-200"
                        >
                          {userData.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <Label className="text-sm font-medium text-gray-600">
                        School
                      </Label>
                      <p className="mt-1 text-sm">{userData.school}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Interests & Hobbies */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-pink-500" />
                      <span>Interests & Hobbies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600 mb-2 block">
                          Academic Interests
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {userData.interests
                            .slice(0, 7)
                            .map((interest, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="hover:bg-gray-200 cursor-pointer transition-colors"
                              >
                                {interest}
                              </Badge>
                            ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 mb-2 block">
                          Hobbies
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {userData.hobbies.map((hobby, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-full bg-gray-100 ${activity.color}`}
                          >
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Home className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        Address on file
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent/Guardian Info */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span>Parent/Guardian</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">
                        {userData.guardianName}
                      </Label>
                      <p className="text-sm text-gray-500">Primary Guardian</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.parentEmail}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.parentPhone}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Performance */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Quick Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Overall Grade
                      </span>
                      <span className="font-bold text-xl text-green-600">
                        {userData.currentGrade}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Percentage</span>
                      <span className="font-bold text-xl text-blue-600">
                        {userData.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Achievements
                      </span>
                      <span className="font-bold text-xl text-amber-600">
                        {achievements.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Activities</span>
                      <span className="font-bold text-xl text-purple-600">
                        {extraActivities.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Academic Performance</span>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Your performance across all subjects this academic year
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {userData.subjects.map((subject, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow border-0 shadow-sm"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-base">
                              {subject.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={`${getGradeColor(
                                subject.grade
                              )} border-current`}
                            >
                              {subject.grade}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Score</span>
                              <span className="font-medium">
                                {subject.percentage}%
                              </span>
                            </div>
                            <Progress
                              value={subject.percentage}
                              className="h-2"
                            />
                          </div>

                          <div className="text-xs text-gray-500">
                            Teacher: {subject.teacher}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Achievements & Awards</span>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Your accomplishments and recognition throughout your academic
                  journey
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className="hover:shadow-md transition-all group border-0 shadow-sm"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-3 rounded-full bg-gray-100 group-hover:scale-105 transition-transform ${achievement.color}`}
                          >
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className={getCategoryBadgeColor(
                                  achievement.category
                                )}
                              >
                                {achievement.category}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                {new Date(
                                  achievement.date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Extra-Curricular Activities</span>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Your participation in school clubs, sports, and other
                  activities
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {extraActivities.map((activity, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow border-0 shadow-sm"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{activity.name}</h3>
                            <p className="text-sm text-gray-500">
                              {activity.role}
                            </p>
                          </div>
                          <Badge variant="outline">{activity.year}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    <span>Personal Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-3">
                      <Cake className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Date of Birth</p>
                        <p className="text-sm text-gray-500">
                          {new Date(userData.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-500">
                          {userData.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <UserCheck className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Blood Group</p>
                        <p className="text-sm text-gray-500">
                          {userData.bloodGroup}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users2 className="h-5 w-5 text-blue-500" />
                    <span>Emergency Contact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{userData.guardianName}</p>
                      <p className="text-sm text-gray-500">Primary Guardian</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.parentPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{userData.parentEmail}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}

        {/* Edit Profile Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your profile information (some fields may require parent
                approval)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedData.name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedData.email}
                    onChange={(e) =>
                      setEditedData({ ...editedData, email: e.target.value })
                    }
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    Contact administrator to change email
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    value={editedData.phone}
                    onChange={(e) =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editedData.location}
                    onChange={(e) =>
                      setEditedData({ ...editedData, location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your interests, and goals..."
                  value={editedData.bio}
                  onChange={(e) =>
                    setEditedData({ ...editedData, bio: e.target.value })
                  }
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Privacy & Settings</DialogTitle>
              <DialogDescription>
                Manage your privacy preferences and notification settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Parent Notifications</Label>
                    <p className="text-xs text-gray-500">
                      Send updates to parents/guardians
                    </p>
                  </div>
                  <Switch
                    checked={settings.parentalNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        parentalNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Progress Reports</Label>
                    <p className="text-xs text-gray-500">
                      Weekly academic progress reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.progressReports}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, progressReports: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Classmate Messages</Label>
                    <p className="text-xs text-gray-500">
                      Allow messages from classmates
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowClassmateMessages}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        allowClassmateMessages: checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) =>
                    setSettings({ ...settings, profileVisibility: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School Only</SelectItem>
                    <SelectItem value="class">Class Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowSettingsDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowSettingsDialog(false)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Parent/Guardian Info Dialog */}
        <Dialog open={showParentDialog} onOpenChange={setShowParentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Parent/Guardian Information</span>
              </DialogTitle>
              <DialogDescription>
                Emergency contact and guardian details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Guardian Name</Label>
                  <p className="font-medium">{userData.guardianName}</p>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <p className="font-medium">{userData.parentEmail}</p>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <p className="font-medium">{userData.parentPhone}</p>
                </div>
                <div className="space-y-2">
                  <Label>Home Address</Label>
                  <p className="text-sm text-gray-500">{userData.address}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Protected Information
                    </p>
                    <p className="text-xs text-blue-600">
                      This information is kept secure and only accessible to
                      authorized school personnel.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowParentDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Avatar Dialog */}
        <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
              <DialogDescription>
                Choose a new profile picture (requires parent approval)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="flex justify-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback className="text-2xl bg-gray-100 text-gray-800">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Photo
                </Button>
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800">
                  Profile picture changes require approval from your
                  parent/guardian before they become visible.
                </p>
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowAvatarDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowAvatarDialog(false)}>
                  <Save className="mr-2 h-4 w-4" />
                  Request Change
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
