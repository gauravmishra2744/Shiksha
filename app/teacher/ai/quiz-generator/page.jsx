"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
          explanation: "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
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
      description: "Students in your Grade 10 class show 25% better performance with visual aids",
      confidence: "92%",
      impact: "High",
      implementation: "Add diagrams and charts to math questions",
    },
    {
      id: 2,
      title: "Reduce Question Complexity",
      description: "Recent quiz data suggests breaking complex questions into smaller parts",
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
        return "bg-green-50 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-50 text-green-700 border-green-200";
      case "Draft":
        return "bg-gray-50 text-gray-700 border-gray-200";
      case "Archived":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        
        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/50">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Quiz Generator</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Create intelligent quizzes and assessments with AI assistance
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Generated
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Target className="w-3 h-3 mr-1" />
                  Auto-Grading
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analytics
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button className="h-12 text-sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Quiz
                </Button>
                <Button className="h-12 text-sm" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
                <Button className="h-12 text-sm" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Suggestions
                </Button>
                <Button className="h-12 text-sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  My Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="create" className="text-xs sm:text-sm">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Create Quiz</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs sm:text-sm">
                <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs sm:text-sm">
                <Brain className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">AI Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="myquizzes" className="text-xs sm:text-sm">
                <List className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">My Quizzes</span>
              </TabsTrigger>
            </TabsList>

            {/* Create Quiz Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <span>Quiz Configuration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade Level</Label>
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
                      <Label htmlFor="topic">Quiz Topic</Label>
                      <Input id="topic" placeholder="e.g., Quadratic Equations, Cell Biology" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
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
                        <Label htmlFor="count">Questions Count</Label>
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
                      <Label htmlFor="duration">Time Duration</Label>
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

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-purple-500" />
                      <span>Question Types & Options</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Question Types</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="mcq" />
                          <Label htmlFor="mcq" className="text-sm font-normal">
                            Multiple Choice
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="truefalse" />
                          <Label htmlFor="truefalse" className="text-sm font-normal">
                            True/False
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fillblank" />
                          <Label htmlFor="fillblank" className="text-sm font-normal">
                            Fill in Blank
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="shortanswer" />
                          <Label htmlFor="shortanswer" className="text-sm font-normal">
                            Short Answer
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Additional Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="explanations" />
                          <Label htmlFor="explanations" className="text-sm font-normal">
                            Include explanations
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="randomize" />
                          <Label htmlFor="randomize" className="text-sm font-normal">
                            Randomize question order
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="timelimit" />
                          <Label htmlFor="timelimit" className="text-sm font-normal">
                            Set time limit per question
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="feedback" />
                          <Label htmlFor="feedback" className="text-sm font-normal">
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
                            Generating Quiz...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-4 w-4" />
                            Generate AI Quiz
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
                <h2 className="text-lg font-semibold">Quiz Templates</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quizData.templates.map((template) => (
                  <Card key={template.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-base line-clamp-2">{template.title}</h3>
                          <div className="flex items-center space-x-1 text-xs text-amber-600">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{template.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{template.subject}</span>
                            <Badge variant="outline">{template.questionType}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center space-x-1 text-gray-600">
                              <HelpCircle className="h-3 w-3" />
                              <span>{template.questionsCount} questions</span>
                            </span>
                            <Badge className={getDifficultyColor(template.difficulty)}>
                              {template.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center space-x-1 text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>{template.duration}</span>
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Used {template.usageCount} times</span>
                          <span>Last: {template.lastUsed}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="mr-2 h-3 w-3" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{template.title}</DialogTitle>
                                <DialogDescription>
                                  {template.subject} • {template.questionsCount} questions • {template.duration}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                  <Badge className={getDifficultyColor(template.difficulty)}>
                                    {template.difficulty}
                                  </Badge>
                                  <Badge variant="outline">{template.questionType}</Badge>
                                  <Badge variant="secondary">
                                    ⭐ {template.rating} ({template.usageCount} uses)
                                  </Badge>
                                </div>
                                
                                <p>{template.description}</p>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Use Template
                                  </Button>
                                  <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Customize
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button size="sm" className="flex-1">
                            Use Template
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
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">AI-Powered Suggestions</h2>
                <Button size="sm" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  Refresh Suggestions
                </Button>
              </div>

              <div className="grid gap-4">
                {quizData.aiSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base mb-2">{suggestion.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                {suggestion.confidence} confidence
                              </Badge>
                              <Badge variant="outline">{suggestion.impact} Impact</Badge>
                            </div>
                            
                            <p className="text-sm text-blue-600">
                              💡 {suggestion.implementation}
                            </p>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button size="sm">
                              Apply Suggestion
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-3 w-3" />
                              Learn More
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
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Quizzes</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View All
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>All Quizzes</DialogTitle>
                        <DialogDescription>
                          Manage and view all your created quizzes
                        </DialogDescription>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Questions</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Attempts</TableHead>
                            <TableHead>Avg Score</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {quizData.myQuizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{quiz.title}</p>
                                  <p className="text-sm text-gray-500">{quiz.duration}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{quiz.subject}</Badge>
                              </TableCell>
                              <TableCell>{quiz.grade}</TableCell>
                              <TableCell>{quiz.questionsCount}</TableCell>
                              <TableCell>
                                <Badge className={getDifficultyColor(quiz.difficulty)}>
                                  {quiz.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(quiz.status)}>
                                  {quiz.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{quiz.attempts}</TableCell>
                              <TableCell>
                                {quiz.averageScore ? (
                                  <span className="font-medium">{quiz.averageScore}%</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
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
                                  <Button size="sm" variant="ghost">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid gap-4">
                {quizData.myQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base">{quiz.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {quiz.subject} • {quiz.grade} • {quiz.questionsCount} questions • {quiz.duration}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Created: {quiz.dateCreated}</span>
                            <span>{quiz.attempts} attempts</span>
                            {quiz.averageScore && (
                              <span className="font-medium text-green-600">
                                Avg: {quiz.averageScore}%
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {quiz.questionTypes.map((type, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(quiz.status)}>
                            {quiz.status}
                          </Badge>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>
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
          <Dialog open={showGeneratedModal} onOpenChange={setShowGeneratedModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Generated Quiz Preview</DialogTitle>
                <DialogDescription>
                  Review your AI-generated quiz before saving or publishing
                </DialogDescription>
              </DialogHeader>
              {generatedQuiz && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDifficultyColor(generatedQuiz.difficulty)}>
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
                      <Card key={question.id} className="border">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium">
                                {index + 1}. {question.question}
                              </h4>
                              <div className="flex space-x-2">
                                <Badge className={getDifficultyColor(question.difficulty)}>
                                  {question.difficulty}
                                </Badge>
                                <Badge variant="outline">
                                  {question.estimatedTime}
                                </Badge>
                              </div>
                            </div>
                            
                            {question.options && (
                              <div className="grid grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="text-sm p-2 rounded border bg-gray-50">
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="space-y-2 p-3 bg-green-50 rounded-lg border border-green-200">
                              <p className="text-sm font-medium text-green-800">
                                ✓ Correct Answer: {question.correctAnswer}
                              </p>
                              <p className="text-sm text-green-700">
                                💡 {question.explanation}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Quiz
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button>
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