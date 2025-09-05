"use client";

import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Users,
  Clock,
  Edit,
  Save,
  Camera,
  School,
  GraduationCap,
  FileText,
  Star,
  TrendingUp,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Download,
  Upload,
  Settings,
  Lock,
  Heart,
  Target,
  Briefcase,
  Languages,
  Building,
  CreditCard,
  History,
  BarChart3,
  MessageSquare,
  CalendarDays,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const TeacherProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@school.edu",
    phone: "+91 98765 43210",
    dateOfBirth: "1985-06-15",
    gender: "Female",
    address: "123 Teachers Colony, Delhi, India",
    avatar: "/api/placeholder/150/150",

    // Professional Information
    employeeId: "TCH001",
    designation: "Senior Mathematics Teacher",
    department: "Mathematics",
    joiningDate: "2010-08-01",
    experience: "13 years",
    qualification: "M.Sc Mathematics, B.Ed",
    subjects: ["Mathematics", "Applied Mathematics", "Statistics"],
    classes: ["Class 9", "Class 10", "Class 11", "Class 12"],

    // Bio and Skills
    bio: "Passionate mathematics teacher with over 13 years of experience in making complex mathematical concepts simple and engaging for students. Dedicated to fostering critical thinking and problem-solving skills.",
    skills: [
      "Advanced Mathematics",
      "Data Analysis",
      "Student Mentoring",
      "Curriculum Development",
      "Technology Integration",
    ],
    languages: ["English", "Hindi", "Punjabi"],

    // Social Links
    linkedin: "https://linkedin.com/in/priyasharma",
    twitter: "https://twitter.com/priyateacher",
    website: "https://priyamath.com",

    // Settings
    notifications: {
      email: true,
      push: true,
      sms: false,
      assignments: true,
      meetings: true,
      announcements: true,
    },
    privacy: {
      profileVisible: true,
      contactVisible: false,
      achievementsVisible: true,
    },
  });

  const [achievements] = useState([
    {
      id: 1,
      title: "Best Teacher Award 2023",
      organization: "Delhi Education Board",
      date: "2023-09-15",
      description:
        "Recognized for outstanding contribution to mathematics education",
      icon: Award,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      id: 2,
      title: "Mathematics Excellence Certificate",
      organization: "National Mathematics Society",
      date: "2022-11-20",
      description: "For innovative teaching methodologies in mathematics",
      icon: Star,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 3,
      title: "Technology Integration Leader",
      organization: "Educational Technology Council",
      date: "2021-12-10",
      description: "Leading digital transformation in classroom teaching",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
    },
  ]);

  const [statistics] = useState({
    totalStudents: 180,
    totalClasses: 6,
    averageRating: 4.8,
    completedCourses: 12,
    activeProjects: 3,
    mentoreesSuccess: 95,
    attendanceRate: 98,
    responseTime: "2 hours",
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save profile data
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    // Show success message
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
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
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6">
                <div className="relative mx-auto lg:mx-0">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage
                      src={profileData.avatar}
                      alt={`${profileData.firstName} ${profileData.lastName}`}
                    />
                    <AvatarFallback className="text-xl sm:text-2xl font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 rounded-full w-8 h-8 p-0"
                        variant="secondary"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Profile Picture</DialogTitle>
                        <DialogDescription>
                          Choose a new profile picture. Recommended size:
                          300x300px
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Upload</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div className="flex flex-col gap-4">
                    <div className="text-center lg:text-left">
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {profileData.firstName} {profileData.lastName}
                      </h1>
                      <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium">
                        {profileData.designation}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-2 sm:gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center justify-center lg:justify-start gap-1">
                          <Building className="w-4 h-4" />
                          {profileData.department} Department
                        </span>
                        <span className="flex items-center justify-center lg:justify-start gap-1">
                          <Briefcase className="w-4 h-4" />
                          {profileData.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() =>
                          isEditing ? handleSave() : setIsEditing(true)
                        }
                        className="flex items-center gap-2 flex-1 sm:flex-none"
                      >
                        {isEditing ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">
                          {isEditing ? "Save Changes" : "Edit Profile"}
                        </span>
                        <span className="sm:hidden">
                          {isEditing ? "Save" : "Edit"}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none"
                      >
                        <Download className="w-4 h-4" />
                        <span className="ml-2 sm:hidden">Export</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-white/50 dark:border-gray-700/50">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {statistics.totalStudents}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="hidden sm:inline">Total Students</span>
                        <span className="sm:hidden">Students</span>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-white/50 dark:border-gray-700/50">
                      <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                        {statistics.totalClasses}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="hidden sm:inline">Active Classes</span>
                        <span className="sm:hidden">Classes</span>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-white/50 dark:border-gray-700/50">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {statistics.averageRating}/5
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Rating
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg border border-white/50 dark:border-gray-700/50 col-span-2 lg:col-span-1">
                      <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {statistics.attendanceRate}%
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Attendance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5">
              <TabsTrigger value="personal" className="text-xs sm:text-sm">
                Personal
              </TabsTrigger>
              <TabsTrigger value="professional" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Professional</span>
                <span className="sm:hidden">Work</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Achievements</span>
                <span className="sm:hidden">Awards</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <User className="w-5 h-5 text-blue-500" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="flex items-center"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={profileData.gender}
                          onValueChange={(value) =>
                            handleInputChange("gender", value)
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <MapPin className="w-5 h-5 text-green-500" />
                      Contact & Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Biography</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself, your teaching philosophy, and interests..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Languages and Social Links */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Languages className="w-5 h-5 text-purple-500" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((language, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                        >
                          {language}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <User className="w-4 h-4 mr-1" />
                          Add Language
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <Input
                        placeholder="LinkedIn Profile"
                        value={profileData.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <Input
                        placeholder="Twitter Handle"
                        value={profileData.twitter}
                        onChange={(e) =>
                          handleInputChange("twitter", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                      <Input
                        placeholder="Personal Website"
                        value={profileData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent
              value="professional"
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Briefcase className="w-5 h-5 text-blue-500" />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={profileData.employeeId}
                        disabled
                        className="bg-gray-50 dark:bg-gray-800/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        value={profileData.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={profileData.department}
                        onValueChange={(value) =>
                          handleInputChange("department", value)
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
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
                          <SelectItem value="Computer Science">
                            Computer Science
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="joiningDate">Joining Date</Label>
                      <Input
                        id="joiningDate"
                        type="date"
                        value={profileData.joiningDate}
                        disabled
                        className="bg-gray-50 dark:bg-gray-800/50"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <GraduationCap className="w-5 h-5 text-green-500" />
                      Qualifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="qualification">
                        Educational Qualification
                      </Label>
                      <Textarea
                        id="qualification"
                        value={profileData.qualification}
                        onChange={(e) =>
                          handleInputChange("qualification", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Skills & Expertise</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                      Teaching Subjects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profileData.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {subject}
                          </span>
                          <Badge className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                            Active
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Users className="w-5 h-5 text-orange-500" />
                      Teaching Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profileData.classes.map((className, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {className}
                          </span>
                          <Badge variant="secondary">
                            {Math.floor(Math.random() * 30) + 20} Students
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent
              value="achievements"
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${achievement.color}`}
                        >
                          <achievement.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900 dark:text-gray-100">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {achievement.organization}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {achievement.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Certifications & Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          Advanced Mathematics Teaching Certification
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          National Education Board • Valid until Dec 2025
                        </p>
                      </div>
                      <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50 w-fit">
                        Active
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          Digital Teaching Tools Workshop
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          EdTech Institute • Completed Aug 2023
                        </p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          Student Psychology and Counseling
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Education Psychology Council • Completed Jan 2023
                        </p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {statistics.completedCourses}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span className="hidden sm:inline">
                        Courses Completed
                      </span>
                      <span className="sm:hidden">Courses</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Target className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                      {statistics.mentoreesSuccess}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span className="hidden sm:inline">
                        Student Success Rate
                      </span>
                      <span className="sm:hidden">Success Rate</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {statistics.responseTime}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span className="hidden sm:inline">
                        Avg Response Time
                      </span>
                      <span className="sm:hidden">Response</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 col-span-2 lg:col-span-1">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                      {statistics.averageRating}/5
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span className="hidden sm:inline">Student Rating</span>
                      <span className="sm:hidden">Rating</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Student Engagement
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          92%
                        </span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Assignment Completion Rate
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          88%
                        </span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Parent Satisfaction
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          94%
                        </span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Curriculum Coverage
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          96%
                        </span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Completed Class 10 Mathematics Assessment
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Upload className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Uploaded new study material
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Yesterday
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CalendarDays className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Scheduled parent-teacher meeting
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Received Best Teacher nomination
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            1 week ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Bell className="w-5 h-5 text-blue-500" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="email-notifications"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "notifications",
                            "email",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="push-notifications"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Push Notifications
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive push notifications
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "notifications",
                            "push",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="sms-notifications"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          SMS Notifications
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "notifications",
                            "sms",
                            checked
                          )
                        }
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="assignment-notifications"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Assignment Updates
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify about assignment submissions
                        </p>
                      </div>
                      <Switch
                        id="assignment-notifications"
                        checked={profileData.notifications.assignments}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "notifications",
                            "assignments",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="meeting-notifications"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Meeting Reminders
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notify about upcoming meetings
                        </p>
                      </div>
                      <Switch
                        id="meeting-notifications"
                        checked={profileData.notifications.meetings}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "notifications",
                            "meetings",
                            checked
                          )
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Shield className="w-5 h-5 text-green-500" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="profile-visible"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Profile Visibility
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Make profile visible to students
                        </p>
                      </div>
                      <Switch
                        id="profile-visible"
                        checked={profileData.privacy.profileVisible}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "privacy",
                            "profileVisible",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="contact-visible"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Contact Information
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Show contact details publicly
                        </p>
                      </div>
                      <Switch
                        id="contact-visible"
                        checked={profileData.privacy.contactVisible}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "privacy",
                            "contactVisible",
                            checked
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 mr-4">
                        <Label
                          htmlFor="achievements-visible"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Achievements Visibility
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Display achievements publicly
                        </p>
                      </div>
                      <Switch
                        id="achievements-visible"
                        checked={profileData.privacy.achievementsVisible}
                        onCheckedChange={(checked) =>
                          handleNestedInputChange(
                            "privacy",
                            "achievementsVisible",
                            checked
                          )
                        }
                      />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download My Data
                      </Button>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Info className="w-5 h-5 text-blue-500" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                    <div>
                      <Label className="text-gray-500 dark:text-gray-400">
                        Account Created
                      </Label>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {new Date(profileData.joiningDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-500 dark:text-gray-400">
                        Last Login
                      </Label>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        Today at 9:30 AM
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-500 dark:text-gray-400">
                        Profile Completion
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={85} className="h-2 flex-1" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          85%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TeacherProfilePage;
