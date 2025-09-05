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
import {
  Brain,
  Sparkles,
  Target,
  Clock,
  Users,
  FileText,
  Zap,
  Star,
  CheckSquare,
  Calendar,
  Award,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Copy,
  Plus,
  Search,
  Filter,
  PlayCircle,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Save,
  Settings,
  Shuffle,
  List,
  Grid,
} from "lucide-react";
import { useState } from "react";

// Dummy data for quiz generator
const quizData = {
  templates: [
    {
      id: 1,
      title: "Mathematics MCQ Template",
      subject: "Mathematics",
      questionType: "Multiple Choice",
      questionsCount: 10,
      difficulty: "Medium",
      duration: "15 min",
      description: "Standard mathematics multiple choice questions",
      usageCount: 156,
      rating: 4.7,
      lastUsed: "2024-01-15",
    },
    {
      id: 2,
      title: "Science True/False Quiz",
      subject: "Physics",
      questionType: "True/False",
      questionsCount: 15,
      difficulty: "Easy",
      duration: "10 min",
      description: "Basic physics concepts true/false questions",
      usageCount: 89,
      rating: 4.5,
      lastUsed: "2024-01-12",
    },
    {
      id: 3,
      title: "Literature Short Answer",
      subject: "English",
      questionType: "Short Answer",
      questionsCount: 8,
      difficulty: "Hard",
      duration: "25 min",
      description: "Literature analysis short answer questions",
      usageCount: 67,
      rating: 4.8,
      lastUsed: "2024-01-10",
    },
  ],
  myQuizzes: [
    {
      id: 1,
      title: "Quadratic Equations Quiz",
      subject: "Mathematics",
      grade: "Grade 10",
      questionsCount: 12,
      difficulty: "Medium",
      dateCreated: "2024-01-15",
      status: "Published",
      attempts: 28,
      averageScore: 78,
      duration: "20 min",
      questionTypes: ["Multiple Choice", "Fill in Blank"],
    },
    {
      id: 2,
      title: "Newton's Laws Assessment",
      subject: "Physics",
      grade: "Grade 9",
      questionsCount: 15,
      difficulty: "Hard",
      dateCreated: "2024-01-12",
      status: "Draft",
      attempts: 0,
      averageScore: null,
      duration: "25 min",
      questionTypes: ["Multiple Choice", "True/False"],
    },
    {
      id: 3,
      title: "Cell Structure Quiz",
      subject: "Biology",
      grade: "Grade 8",
      questionsCount: 10,
      difficulty: "Easy",
      dateCreated: "2024-01-10",
      status: "Published",
      attempts: 45,
      averageScore: 85,
      duration: "15 min",
      questionTypes: ["Multiple Choice"],
    },
  ],
  generatedQuizzes: [
    {
      id: 1,
      topic: "Algebra Basics",
      difficulty: "Medium",
      questionsCount: 10,
      generatedAt: "2024-01-15 10:30 AM",
      questions: [
        {
          id: 1,
          question: "What is the value of x in the equation 2x + 5 = 13?",
          type: "multiple-choice",
          options: ["x = 2", "x = 4", "x = 6", "x = 8"],
          correctAnswer: "x = 4",
          explanation:
            "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
          difficulty: "Medium",
          estimatedTime: "2 minutes",
        },
        {
          id: 2,
          question: "Simplify: 3(x + 2) - 2x",
          type: "multiple-choice",
          options: ["x + 6", "5x + 6", "x + 2", "3x + 4"],
          correctAnswer: "x + 6",
          explanation: "Distribute: 3x + 6 - 2x = x + 6",
          difficulty: "Medium",
          estimatedTime: "3 minutes",
        },
      ],
    },
  ],
  aiSuggestions: [
    {
      id: 1,
      title: "Add Visual Questions",
      description:
        "Students in your Grade 10 class show 25% better performance with visual aids",
      confidence: "92%",
      impact: "High",
      implementation: "Add diagrams and charts to math questions",
    },
    {
      id: 2,
      title: "Reduce Question Complexity",
      description:
        "Recent quiz data suggests breaking complex questions into smaller parts",
      confidence: "87%",
      impact: "Medium",
      implementation: "Split multi-step problems into sequential questions",
    },
    {
      id: 3,
      title: "Include More Practice Questions",
      description: "Students request more practice before assessments",
      confidence: "94%",
      impact: "High",
      implementation: "Add 3-5 practice questions before main quiz",
    },
  ],
};

export default function QuizGeneratorPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showGeneratedModal, setShowGeneratedModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    grade: "",
    difficulty: "",
    questionCount: 10,
    questionTypes: [],
    duration: "",
    includeExplanations: false,
    randomizeOrder: false,
    timeLimit: false,
  });

  const handleGenerateQuiz = () => {
    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedQuiz(quizData.generatedQuizzes[0]);
      setLoading(false);
      setShowGeneratedModal(true);
    }, 2000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "Medium":
        return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
      case "Hard":
        return "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "Draft":
        return "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50";
      case "Archived":
        return "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700/50";
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/50 flex-shrink-0 mx-auto sm:mx-0">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    AI Quiz Generator
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                    Create intelligent quizzes and assessments with AI
                    assistance
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Badge
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Generated
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50"
                >
                  <Target className="w-3 h-3 mr-1" />
                  Auto-Grading
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-border/50 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 h-32 justify-center">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                  className=" text-xs sm:text-sm justify-center"
                  variant=""
                  size={"sm"}
                >
                  <Plus className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Create Quiz</span>
                  <span className="sm:hidden">Create</span>
                </Button>
                <Button
                  className=" text-xs sm:text-sm justify-center"
                  variant=""
                  size={"sm"}
                >
                  <Search className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Browse Templates</span>
                  <span className="sm:hidden">Browse</span>
                </Button>
                <Button
                  className=" text-xs sm:text-sm justify-center"
                  variant=""
                  size={"sm"}
                >
                  <Brain className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">AI Suggestions</span>
                  <span className="sm:hidden">AI Tips</span>
                </Button>
                <Button
                  className=" text-xs sm:text-sm justify-center"
                  variant=""
                  size={"sm"}
                >
                  <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">My Quizzes</span>
                  <span className="sm:hidden">Quizzes</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-sm">
              <TabsTrigger
                value="create"
                className="text-xs sm:text-sm px-2 sm:px-4"
              >
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Create Quiz</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger
                value="templates"
                className="text-xs sm:text-sm px-2 sm:px-4"
              >
                <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Templates</span>
                <span className="sm:hidden">Templates</span>
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="text-xs sm:text-sm px-2 sm:px-4"
              >
                <Brain className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">AI Suggestions</span>
                <span className="sm:hidden">AI</span>
              </TabsTrigger>
              <TabsTrigger
                value="myquizzes"
                className="text-xs sm:text-sm px-2 sm:px-4"
              >
                <List className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">My Quizzes</span>
                <span className="sm:hidden">Quizzes</span>
              </TabsTrigger>
            </TabsList>

            {/* Create Quiz Tab */}
            <TabsContent value="create" className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <span>Quiz Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="subject"
                          className="text-gray-900 dark:text-gray-100"
                        >
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
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="grade"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Grade Level
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="topic"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        Quiz Topic
                      </Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Quadratic Equations, Cell Biology"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="difficulty"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Difficulty
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="count"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          Questions Count
                        </Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Questions</SelectItem>
                            <SelectItem value="10">10 Questions</SelectItem>
                            <SelectItem value="15">15 Questions</SelectItem>
                            <SelectItem value="20">20 Questions</SelectItem>
                            <SelectItem value="25">25 Questions</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="duration"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        Time Duration
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 minutes</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Target className="h-5 w-5 text-purple-500" />
                      <span>Question Types & Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-gray-900 dark:text-gray-100">
                        Question Types
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="mcq" />
                          <Label
                            htmlFor="mcq"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Multiple Choice
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="truefalse" />
                          <Label
                            htmlFor="truefalse"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            True/False
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fillblank" />
                          <Label
                            htmlFor="fillblank"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Fill in Blank
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="shortanswer" />
                          <Label
                            htmlFor="shortanswer"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Short Answer
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-900 dark:text-gray-100">
                        Additional Options
                      </Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="explanations" />
                          <Label
                            htmlFor="explanations"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Include explanations
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="randomize" />
                          <Label
                            htmlFor="randomize"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Randomize question order
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="timelimit" />
                          <Label
                            htmlFor="timelimit"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Set time limit per question
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="feedback" />
                          <Label
                            htmlFor="feedback"
                            className="text-sm font-normal text-gray-700 dark:text-gray-300"
                          >
                            Instant feedback
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={handleGenerateQuiz}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                            <span className="hidden sm:inline">
                              Generating Quiz...
                            </span>
                            <span className="sm:hidden">Generating...</span>
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-4 w-4" />
                            <span className="hidden sm:inline">
                              Generate AI Quiz
                            </span>
                            <span className="sm:hidden">Generate Quiz</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Quiz Templates
                </h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {quizData.templates.map((template) => (
                  <Card
                    key={template.id}
                    className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-base line-clamp-2 text-gray-900 dark:text-gray-100 pr-2">
                            {template.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-xs text-amber-600 dark:text-amber-400 flex-shrink-0">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{template.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 truncate">
                              {template.subject}
                            </span>
                            <Badge
                              variant="outline"
                              className="flex-shrink-0 ml-2"
                            >
                              {template.questionType}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                              <HelpCircle className="h-3 w-3 flex-shrink-0" />
                              <span>{template.questionsCount} questions</span>
                            </span>
                            <Badge
                              className={`${getDifficultyColor(
                                template.difficulty
                              )} flex-shrink-0 ml-2`}
                            >
                              {template.difficulty}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span>{template.duration}</span>
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {template.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Used {template.usageCount} times</span>
                          <span>Last: {template.lastUsed}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="neutral"
                                className="flex-1"
                              >
                                <Eye className="mr-2 h-3 w-3" />
                                <span className="hidden sm:inline">
                                  Preview
                                </span>
                                <span className="sm:hidden">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900 dark:text-gray-100">
                                  {template.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 dark:text-gray-400">
                                  {template.subject} • {template.questionsCount}{" "}
                                  questions • {template.duration}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  <Badge
                                    className={getDifficultyColor(
                                      template.difficulty
                                    )}
                                  >
                                    {template.difficulty}
                                  </Badge>
                                  <Badge variant="outline">
                                    {template.questionType}
                                  </Badge>
                                  <Badge variant="secondary">
                                    ⭐ {template.rating} ({template.usageCount}{" "}
                                    uses)
                                  </Badge>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300">
                                  {template.description}
                                </p>

                                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                  <Button
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                  >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Use Template
                                  </Button>
                                  <Button className="w-full sm:w-auto">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Customize
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" className="flex-1">
                            <span className="hidden sm:inline">
                              Use Template
                            </span>
                            <span className="sm:hidden">Use</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  AI-Powered Suggestions
                </h2>
                <Button size="sm" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Refresh Suggestions</span>
                  <span className="sm:hidden">Refresh</span>
                </Button>
              </div>

              <div className="grid gap-4">
                {quizData.aiSuggestions.map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-gray-100">
                              {suggestion.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {suggestion.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                {suggestion.confidence} confidence
                              </Badge>
                              <Badge variant="outline">
                                {suggestion.impact} Impact
                              </Badge>
                            </div>

                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              💡 {suggestion.implementation}
                            </p>
                          </div>

                          <div className="flex flex-col space-y-2 w-full lg:w-auto">
                            <Button size="sm" className="w-full lg:w-auto">
                              Apply Suggestion
                            </Button>
                            <Button
                              size="sm"
                              variant="neutral"
                              className="w-full lg:w-auto"
                            >
                              <Eye className="mr-2 h-3 w-3" />
                              <span className="hidden sm:inline">
                                Learn More
                              </span>
                              <span className="sm:hidden">Details</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Quizzes Tab */}
            <TabsContent value="myquizzes" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  My Quizzes
                </h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">View All</span>
                        <span className="sm:hidden">All</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                          All Quizzes
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                          Manage and view all your created quizzes
                        </DialogDescription>
                      </DialogHeader>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-gray-900 dark:text-gray-100">
                                Title
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100">
                                Subject
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                                Grade
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100 hidden md:table-cell">
                                Questions
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100">
                                Difficulty
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100">
                                Status
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                                Attempts
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                                Avg Score
                              </TableHead>
                              <TableHead className="text-gray-900 dark:text-gray-100">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {quizData.myQuizzes.map((quiz) => (
                              <TableRow key={quiz.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                      {quiz.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {quiz.duration}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {quiz.subject}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-gray-700 dark:text-gray-300">
                                  {quiz.grade}
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-gray-700 dark:text-gray-300">
                                  {quiz.questionsCount}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${getDifficultyColor(
                                      quiz.difficulty
                                    )} text-xs`}
                                  >
                                    {quiz.difficulty}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${getStatusColor(
                                      quiz.status
                                    )} text-xs`}
                                  >
                                    {quiz.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell text-gray-700 dark:text-gray-300">
                                  {quiz.attempts}
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">
                                  {quiz.averageScore ? (
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                      {quiz.averageScore}%
                                    </span>
                                  ) : (
                                    <span className="text-gray-400 dark:text-gray-500">
                                      -
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-1">
                                    <Button size="sm" variant="ghost">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="hidden sm:flex"
                                    >
                                      <Share2 className="h-4 w-4" />
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
              </div>

              <div className="grid gap-4">
                {quizData.myQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                            {quiz.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {quiz.subject} • {quiz.grade} •{" "}
                            {quiz.questionsCount} questions • {quiz.duration}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>Created: {quiz.dateCreated}</span>
                            <span>{quiz.attempts} attempts</span>
                            {quiz.averageScore && (
                              <span className="font-medium text-green-600 dark:text-green-400">
                                Avg: {quiz.averageScore}%
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {quiz.questionTypes.map((type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <Badge
                            className={`${getStatusColor(quiz.status)} w-fit`}
                          >
                            {quiz.status}
                          </Badge>
                          <Badge
                            className={`${getDifficultyColor(
                              quiz.difficulty
                            )} w-fit`}
                          >
                            {quiz.difficulty}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Generated Quiz Modal */}
          <Dialog
            open={showGeneratedModal}
            onOpenChange={setShowGeneratedModal}
          >
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-gray-100">
                  Generated Quiz Preview
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Review your AI-generated quiz before saving or publishing
                </DialogDescription>
              </DialogHeader>
              {generatedQuiz && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={getDifficultyColor(generatedQuiz.difficulty)}
                    >
                      {generatedQuiz.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      {generatedQuiz.questionsCount} Questions
                    </Badge>
                    <Badge variant="secondary">
                      Generated: {generatedQuiz.generatedAt}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {generatedQuiz.questions.map((question, index) => (
                      <Card
                        key={question.id}
                        className="border border-gray-200 dark:border-gray-700"
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {index + 1}. {question.question}
                              </h4>
                              <div className="flex space-x-2 flex-shrink-0">
                                <Badge
                                  className={getDifficultyColor(
                                    question.difficulty
                                  )}
                                >
                                  {question.difficulty}
                                </Badge>
                                <Badge variant="outline">
                                  {question.estimatedTime}
                                </Badge>
                              </div>
                            </div>

                            {question.options && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="text-sm p-2 rounded border bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                                  >
                                    {String.fromCharCode(65 + optIndex)}.{" "}
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="space-y-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800/50">
                              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                ✓ Correct Answer: {question.correctAnswer}
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-400">
                                💡 {question.explanation}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Quiz
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button className="w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Save Quiz
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
