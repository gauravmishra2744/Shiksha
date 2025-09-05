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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Upload,
  CheckCircle,
  XCircle,
  FileText,
  Zap,
  Star,
  Clock,
  Users,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Award,
  AlertCircle,
  MessageSquare,
  Target,
  BookOpen,
  Settings,
  Sparkles,
  GraduationCap,
  Save,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

// Dummy data for grading assistant
const gradingData = {
  recentSubmissions: [
    {
      id: 1,
      studentName: "Aarav Sharma",
      studentId: "ST001",
      assignment: "Quadratic Equations Essay",
      subject: "Mathematics",
      submittedAt: "2024-01-15 10:30 AM",
      grade: 85,
      status: "Graded",
      feedback:
        "Excellent understanding of quadratic equations with clear explanations. Good use of examples and step-by-step solutions.",
      strengths: [
        "Clear mathematical reasoning",
        "Proper use of formulas",
        "Well-structured presentation",
        "Good examples provided",
      ],
      improvements: [
        "Could include more complex problem variations",
        "Minor calculation errors in problem 3",
      ],
      timeSpent: "12 minutes",
      originalScore: null,
      aiConfidence: 92,
      rubricScores: {
        understanding: 90,
        presentation: 85,
        accuracy: 80,
        examples: 88,
      },
    },
    {
      id: 2,
      studentName: "Priya Patel",
      studentId: "ST002",
      assignment: "Physics Lab Report",
      subject: "Physics",
      submittedAt: "2024-01-15 09:15 AM",
      grade: 78,
      status: "Graded",
      feedback:
        "Good experimental setup and data collection. Analysis could be more thorough with better error discussion.",
      strengths: [
        "Detailed experimental procedure",
        "Accurate data recording",
        "Proper lab format followed",
      ],
      improvements: [
        "Need better error analysis",
        "Conclusion could be more comprehensive",
        "Missing some theoretical background",
      ],
      timeSpent: "8 minutes",
      originalScore: null,
      aiConfidence: 88,
      rubricScores: {
        procedure: 85,
        data: 80,
        analysis: 70,
        conclusion: 75,
      },
    },
    {
      id: 3,
      studentName: "Arjun Kumar",
      studentId: "ST003",
      assignment: "Literature Analysis",
      subject: "English",
      submittedAt: "2024-01-14 04:20 PM",
      grade: 92,
      status: "Graded",
      feedback:
        "Outstanding analysis of character development and themes. Excellent use of textual evidence and critical thinking.",
      strengths: [
        "Deep textual analysis",
        "Strong critical thinking",
        "Excellent writing style",
        "Good use of literary devices",
      ],
      improvements: [
        "Could explore alternative interpretations",
        "Minor grammar corrections needed",
      ],
      timeSpent: "15 minutes",
      originalScore: null,
      aiConfidence: 95,
      rubricScores: {
        analysis: 95,
        evidence: 92,
        writing: 88,
        creativity: 93,
      },
    },
  ],
  gradingHistory: [
    {
      id: 1,
      date: "2024-01-15",
      assignment: "Mathematics Quiz - Chapter 5",
      totalSubmissions: 28,
      gradedCount: 28,
      averageGrade: 84,
      timeSaved: "2.5 hours",
      accuracy: "94%",
    },
    {
      id: 2,
      date: "2024-01-12",
      assignment: "Physics Lab Report",
      totalSubmissions: 25,
      gradedCount: 25,
      averageGrade: 79,
      timeSaved: "3.2 hours",
      accuracy: "91%",
    },
    {
      id: 3,
      date: "2024-01-10",
      assignment: "English Essay - Character Analysis",
      totalSubmissions: 30,
      gradedCount: 30,
      averageGrade: 87,
      timeSaved: "4.1 hours",
      accuracy: "96%",
    },
  ],
  rubricTemplates: [
    {
      id: 1,
      name: "Essay Grading Rubric",
      subject: "English",
      criteria: [
        { name: "Content & Ideas", weight: 30, maxPoints: 30 },
        { name: "Organization", weight: 25, maxPoints: 25 },
        { name: "Language Use", weight: 25, maxPoints: 25 },
        { name: "Mechanics", weight: 20, maxPoints: 20 },
      ],
      totalPoints: 100,
      usageCount: 45,
    },
    {
      id: 2,
      name: "Math Problem Solving",
      subject: "Mathematics",
      criteria: [
        { name: "Understanding", weight: 25, maxPoints: 25 },
        { name: "Problem Solving", weight: 35, maxPoints: 35 },
        { name: "Reasoning", weight: 25, maxPoints: 25 },
        { name: "Presentation", weight: 15, maxPoints: 15 },
      ],
      totalPoints: 100,
      usageCount: 38,
    },
    {
      id: 3,
      name: "Science Lab Report",
      subject: "Physics",
      criteria: [
        { name: "Procedure", weight: 20, maxPoints: 20 },
        { name: "Data Collection", weight: 25, maxPoints: 25 },
        { name: "Analysis", weight: 30, maxPoints: 30 },
        { name: "Conclusion", weight: 25, maxPoints: 25 },
      ],
      totalPoints: 100,
      usageCount: 22,
    },
  ],
  statistics: {
    totalGraded: 156,
    timeSaved: "28.5 hours",
    averageAccuracy: 93,
    averageConfidence: 91,
    submissionsToday: 12,
    pendingReview: 3,
  },
};

export default function GradingAssistantPage() {
  const [submissions, setSubmissions] = useState(gradingData.recentSubmissions);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setLoading(true);
    setUploadProgress(0);

    // Simulate file upload and grading process
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowUploadModal(false);
          // Add some dummy graded submissions
          const newSubmissions = [
            {
              id: Date.now(),
              studentName: "New Student",
              assignment: "Recent Upload",
              grade: Math.floor(Math.random() * 30) + 70,
              status: "Graded",
              feedback: "AI has automatically graded this submission.",
              strengths: ["Good effort", "Clear presentation"],
              improvements: ["Could improve analysis"],
              timeSpent: "5 minutes",
              aiConfidence: 89,
            },
          ];
          setSubmissions((prev) => [...newSubmissions, ...prev]);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getGradeColor = (grade) => {
    if (grade >= 90)
      return "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
    if (grade >= 80)
      return "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50";
    if (grade >= 70)
      return "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
    return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "text-green-600 dark:text-green-400";
    if (confidence >= 80) return "text-blue-600 dark:text-blue-400";
    if (confidence >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/50">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    AI Grading Assistant
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Automated grading with intelligent feedback and analytics
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Time-Saving
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                >
                  <Target className="w-3 h-3 mr-1" />
                  Accurate Feedback
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {gradingData.statistics.totalGraded}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Graded
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-green-800 dark:text-green-200 truncate">
                      {gradingData.statistics.timeSaved}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Time Saved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {gradingData.statistics.averageAccuracy}%
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Accuracy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 xl:h-8 xl:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {gradingData.statistics.pendingReview}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Pending Review
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 h-32 justify-center">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Dialog
                  open={showUploadModal}
                  onOpenChange={setShowUploadModal}
                >
                  <DialogTrigger asChild>
                    <Button className="text-sm" variant="" size={"sm"}>
                      <Upload className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">
                        Upload Submissions
                      </span>
                      <span className="sm:hidden">Upload</span>
                    </Button>
                  </DialogTrigger>
                </Dialog>

                <Button className="text-sm" variant="" size={"sm"}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Grading Rubrics</span>
                  <span className="sm:hidden">Rubrics</span>
                </Button>

                <Button className="text-sm" variant="" size={"sm"}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">View Analytics</span>
                  <span className="sm:hidden">Analytics</span>
                </Button>

                <Dialog
                  open={showHistoryModal}
                  onOpenChange={setShowHistoryModal}
                >
                  <DialogTrigger asChild>
                    <Button className=" text-sm" variant="" size={"sm"}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Grading History</span>
                      <span className="sm:hidden">History</span>
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-white dark:bg-gray-800/50 border shadow-sm">
              <TabsTrigger value="recent" className="text-xs sm:text-sm py-2">
                <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Recent</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="text-xs sm:text-sm py-2">
                <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="rubrics" className="text-xs sm:text-sm py-2">
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Rubrics</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="text-xs sm:text-sm py-2"
              >
                <BarChart3 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Recent Submissions Tab */}
            <TabsContent value="recent" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recent Graded Submissions
                </h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {submissions.map((submission) => (
                  <Card
                    key={submission.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                        <div className="flex-1 space-y-3 w-full">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                              {submission.studentName}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {submission.studentId}
                            </Badge>
                            <Badge
                              className={`text-xs ${getGradeColor(
                                submission.grade
                              )}`}
                            >
                              {submission.grade}%
                            </Badge>
                            {submission.grade >= 80 ? (
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            )}
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">
                              {submission.assignment}
                            </span>{" "}
                            • {submission.subject}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>Submitted: {submission.submittedAt}</span>
                            <span>Graded in: {submission.timeSpent}</span>
                            <span
                              className={`font-medium ${getConfidenceColor(
                                submission.aiConfidence
                              )}`}
                            >
                              AI Confidence: {submission.aiConfidence}%
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            {submission.feedback}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {submission.strengths
                              .slice(0, 2)
                              .map((strength, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
                                >
                                  ✓ {strength}
                                </Badge>
                              ))}
                            {submission.improvements
                              .slice(0, 1)
                              .map((improvement, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50"
                                >
                                  ⚠ {improvement}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 w-full lg:w-auto">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full lg:w-auto"
                              >
                                <Eye className="mr-2 h-3 w-3" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900 dark:text-gray-100">
                                  Submission Details
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 dark:text-gray-400">
                                  {submission.studentName} •{" "}
                                  {submission.assignment}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-medium text-gray-900 dark:text-gray-100">
                                      Grade
                                    </Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge
                                        className={getGradeColor(
                                          submission.grade
                                        )}
                                        variant="outline"
                                      >
                                        {submission.grade}%
                                      </Badge>
                                      <span
                                        className={`text-sm font-medium ${getConfidenceColor(
                                          submission.aiConfidence
                                        )}`}
                                      >
                                        ({submission.aiConfidence}% confidence)
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-900 dark:text-gray-100">
                                      Time to Grade
                                    </Label>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      {submission.timeSpent}
                                    </p>
                                  </div>
                                </div>

                                {submission.rubricScores && (
                                  <div>
                                    <Label className="font-medium mb-3 block text-gray-900 dark:text-gray-100">
                                      Rubric Breakdown
                                    </Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {Object.entries(
                                        submission.rubricScores
                                      ).map(([criteria, score]) => (
                                        <div
                                          key={criteria}
                                          className="space-y-2"
                                        >
                                          <div className="flex justify-between text-sm">
                                            <span className="capitalize text-gray-700 dark:text-gray-300">
                                              {criteria}
                                            </span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                              {score}%
                                            </span>
                                          </div>
                                          <Progress
                                            value={score}
                                            className="h-2"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <Label className="font-medium text-gray-900 dark:text-gray-100">
                                    AI Feedback
                                  </Label>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    {submission.feedback}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-medium text-gray-900 dark:text-gray-100">
                                      Strengths
                                    </Label>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                      {submission.strengths.map(
                                        (strength, index) => (
                                          <li
                                            key={index}
                                            className="flex items-start space-x-2"
                                          >
                                            <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>{strength}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                  <div>
                                    <Label className="font-medium text-gray-900 dark:text-gray-100">
                                      Areas for Improvement
                                    </Label>
                                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                                      {submission.improvements.map(
                                        (improvement, index) => (
                                          <li
                                            key={index}
                                            className="flex items-start space-x-2"
                                          >
                                            <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                            <span>{improvement}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end gap-2">
                                  <Button variant="outline">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Adjust Grade
                                  </Button>
                                  <Button variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Add Comment
                                  </Button>
                                  <Button>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Send Feedback
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" className="w-full lg:w-auto">
                            <Share2 className="mr-2 h-3 w-3" />
                            Send Feedback
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <Upload className="h-5 w-5 text-blue-500" />
                    <span>Upload Student Submissions</span>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Upload multiple files for batch AI grading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 sm:p-8 text-center bg-gray-50 dark:bg-gray-800/50">
                    <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Drop files here or click to browse
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto mb-4"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB each)
                    </p>
                  </div>

                  {loading && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
                      <div className="flex items-center space-x-3 mb-3">
                        <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-pulse" />
                        <p className="font-medium text-blue-800 dark:text-blue-200">
                          AI is grading submissions...
                        </p>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Grading Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-gray-100">
                        Subject
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-gray-100">
                        Grade Level
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">
                      Assignment Type
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="lab-report">Lab Report</SelectItem>
                        <SelectItem value="problem-solving">
                          Problem Solving
                        </SelectItem>
                        <SelectItem value="creative-writing">
                          Creative Writing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-gray-900 dark:text-gray-100">
                      Additional Options
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="detailed-feedback" />
                        <Label
                          htmlFor="detailed-feedback"
                          className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                          Generate detailed feedback
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rubric-scoring" />
                        <Label
                          htmlFor="rubric-scoring"
                          className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                          Use rubric-based scoring
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="plagiarism-check" />
                        <Label
                          htmlFor="plagiarism-check"
                          className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                          Check for plagiarism
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-send" />
                        <Label
                          htmlFor="auto-send"
                          className="text-sm font-normal text-gray-700 dark:text-gray-300"
                        >
                          Auto-send feedback to students
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rubrics Tab */}
            <TabsContent value="rubrics" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Grading Rubrics
                </h2>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Rubric
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gradingData.rubricTemplates.map((rubric) => (
                  <Card
                    key={rubric.id}
                    className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                            {rubric.name}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {rubric.subject}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          {rubric.criteria.map((criteria, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-700 dark:text-gray-300">
                                {criteria.name}
                              </span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {criteria.weight}%
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Total: {rubric.totalPoints} points</span>
                          <span>Used {rubric.usageCount} times</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="mr-2 h-3 w-3" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            Use Rubric
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span>Grading Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Average Accuracy
                        </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {gradingData.statistics.averageAccuracy}%
                        </span>
                      </div>
                      <Progress
                        value={gradingData.statistics.averageAccuracy}
                        className="h-2"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          AI Confidence
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {gradingData.statistics.averageConfidence}%
                        </span>
                      </div>
                      <Progress
                        value={gradingData.statistics.averageConfidence}
                        className="h-2"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Time Efficiency
                        </span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">
                          95%
                        </span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span>This Week's Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Submissions Graded
                        </span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {gradingData.statistics.submissionsToday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Time Saved
                        </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          12.5 hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Feedback Quality
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          Excellent
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Upload Modal */}
          <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
            <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  Upload Submissions for AI Grading
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Select files and configure grading settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800/50">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Choose files to upload
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="max-w-xs mx-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">
                      Assignment Type
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="report">Lab Report</SelectItem>
                        <SelectItem value="problem">Problem Set</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-gray-100">
                      Subject
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading}>
                    {loading ? "Processing..." : "Start Grading"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Grading History Modal */}
          <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  Grading History
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  View past AI grading sessions and statistics
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Date
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Assignment
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Submissions
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Avg Grade
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Time Saved
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Accuracy
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradingData.gradingHistory.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {session.date}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {session.assignment}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {session.gradedCount}/{session.totalSubmissions}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {session.averageGrade}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {session.timeSaved}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                            {session.accuracy}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
