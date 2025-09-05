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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Upload,
  Download,
  Eye,
  Copy,
  Star,
  StarOff,
  Brain,
  Sparkles,
  Target,
  Clock,
  Users,
  BarChart3,
  FileText,
  List,
  CheckSquare,
  ToggleLeft,
  Type,
  PenTool,
  Calculator,
  Link,
  Hash,
  Shuffle,
  Archive,
  RefreshCw,
  Settings,
  Lightbulb,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Tag,
  Calendar,
  Database,
  MoreVertical,
} from "lucide-react";

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [filters, setFilters] = useState({
    subject: "",
    difficulty: "",
    type: "",
    search: "",
    tags: "",
    favorite: false,
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    description: "",
    type: "multiple-choice",
    subject: "",
    difficulty: "medium",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    tags: [],
    points: 1,
    timeLimit: null,
    category: "",
  });

  // Comprehensive mock questions data
  const mockQuestions = [
    {
      id: 1,
      question:
        "What is the quadratic formula used to solve quadratic equations?",
      description:
        "This fundamental formula is essential for solving second-degree polynomial equations.",
      subject: "Mathematics",
      difficulty: "medium",
      type: "multiple-choice",
      options: [
        "x = (-b ± √(b²-4ac))/2a",
        "x = -b/2a",
        "x = b²-4ac",
        "x = a+b+c",
      ],
      correctAnswer: 0,
      explanation:
        "The quadratic formula x = (-b ± √(b²-4ac))/2a is derived from completing the square method and works for any quadratic equation in the form ax² + bx + c = 0.",
      tags: ["algebra", "equations", "formulas"],
      points: 2,
      timeLimit: 120,
      category: "Algebra",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      usageCount: 15,
      averageScore: 78.5,
      isFavorite: true,
      createdBy: "Dr. Smith",
      status: "active",
    },
    {
      id: 2,
      question: "The mitochondria is often called the powerhouse of the cell.",
      description:
        "This organelle is responsible for cellular energy production.",
      subject: "Biology",
      difficulty: "easy",
      type: "true-false",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Mitochondria produce ATP through cellular respiration, which is why they're called the powerhouse of the cell.",
      tags: ["cell biology", "organelles", "energy"],
      points: 1,
      timeLimit: 60,
      category: "Cell Biology",
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-14T09:15:00Z",
      usageCount: 23,
      averageScore: 92.1,
      isFavorite: false,
      createdBy: "Prof. Johnson",
      status: "active",
    },
    {
      id: 3,
      question: "What is the derivative of sin(x) with respect to x?",
      description: "Basic trigonometric derivative calculation.",
      subject: "Mathematics",
      difficulty: "medium",
      type: "short-answer",
      correctAnswer: "cos(x)",
      explanation:
        "The derivative of sin(x) is cos(x). This is a fundamental trigonometric derivative rule.",
      tags: ["calculus", "derivatives", "trigonometry"],
      points: 2,
      timeLimit: 90,
      category: "Calculus",
      createdAt: "2024-01-16T11:20:00Z",
      updatedAt: "2024-01-18T16:30:00Z",
      usageCount: 12,
      averageScore: 65.8,
      isFavorite: true,
      createdBy: "Dr. Wilson",
      status: "active",
    },
    {
      id: 4,
      question: "Which of the following is NOT a fundamental force in physics?",
      description: "Test knowledge of the four fundamental forces of nature.",
      subject: "Physics",
      difficulty: "hard",
      type: "multiple-choice",
      options: [
        "Gravitational force",
        "Electromagnetic force",
        "Nuclear force",
        "Centrifugal force",
      ],
      correctAnswer: 3,
      explanation:
        "Centrifugal force is a fictitious force in rotating reference frames, not a fundamental force. The four fundamental forces are gravitational, electromagnetic, strong nuclear, and weak nuclear forces.",
      tags: ["forces", "fundamental physics", "mechanics"],
      points: 3,
      timeLimit: 180,
      category: "Mechanics",
      createdAt: "2024-01-12T14:45:00Z",
      updatedAt: "2024-01-19T10:20:00Z",
      usageCount: 8,
      averageScore: 45.2,
      isFavorite: false,
      createdBy: "Dr. Brown",
      status: "active",
    },
    {
      id: 5,
      question: "What is the chemical formula for water?",
      description: "Basic chemistry knowledge test.",
      subject: "Chemistry",
      difficulty: "easy",
      type: "multiple-choice",
      options: ["H2O", "CO2", "NaCl", "CH4"],
      correctAnswer: 0,
      explanation:
        "Water consists of two hydrogen atoms and one oxygen atom, giving it the formula H2O.",
      tags: ["basic chemistry", "compounds", "molecules"],
      points: 1,
      timeLimit: 30,
      category: "Basic Chemistry",
      createdAt: "2024-01-10T08:30:00Z",
      updatedAt: "2024-01-10T08:30:00Z",
      usageCount: 35,
      averageScore: 96.8,
      isFavorite: false,
      createdBy: "Dr. Davis",
      status: "active",
    },
    {
      id: 6,
      question: "Who wrote the novel 'Pride and Prejudice'?",
      description: "Classic English literature question.",
      subject: "English",
      difficulty: "medium",
      type: "multiple-choice",
      options: [
        "Charlotte Brontë",
        "Jane Austen",
        "Emily Dickinson",
        "Virginia Woolf",
      ],
      correctAnswer: 1,
      explanation:
        "Jane Austen wrote 'Pride and Prejudice', published in 1813. It's one of the most famous works of English literature.",
      tags: ["literature", "novels", "19th century"],
      points: 2,
      timeLimit: 90,
      category: "Literature",
      createdAt: "2024-01-11T13:15:00Z",
      updatedAt: "2024-01-17T09:45:00Z",
      usageCount: 18,
      averageScore: 73.4,
      isFavorite: true,
      createdBy: "Prof. Miller",
      status: "active",
    },
  ];

  const questionTypes = [
    { value: "multiple-choice", label: "Multiple Choice", icon: List },
    { value: "single-choice", label: "Single Choice", icon: CheckCircle },
    { value: "multiple-select", label: "Multiple Select", icon: CheckSquare },
    { value: "true-false", label: "True/False", icon: ToggleLeft },
    { value: "short-answer", label: "Short Answer", icon: Type },
    { value: "essay", label: "Essay", icon: PenTool },
    { value: "numerical", label: "Numerical", icon: Calculator },
    { value: "matching", label: "Matching", icon: Link },
    { value: "fill-blanks", label: "Fill in the Blanks", icon: Hash },
    { value: "ordering", label: "Ordering", icon: Shuffle },
  ];

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
    "Economics",
    "Psychology",
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      color:
        "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50",
    },
    {
      value: "medium",
      label: "Medium",
      color:
        "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/50",
    },
    {
      value: "hard",
      label: "Hard",
      color:
        "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/50",
    },
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [filters, questions]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions.filter((question) => {
      const matchesSearch =
        question.question
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        question.tags.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase())
        );
      const matchesSubject =
        !filters.subject || question.subject === filters.subject;
      const matchesDifficulty =
        !filters.difficulty || question.difficulty === filters.difficulty;
      const matchesType = !filters.type || question.type === filters.type;
      const matchesFavorite = !filters.favorite || question.isFavorite;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesDifficulty &&
        matchesType &&
        matchesFavorite
      );
    });

    // Apply tab filtering
    if (activeTab === "favorites") {
      filtered = filtered.filter((q) => q.isFavorite);
    } else if (activeTab === "recent") {
      filtered = filtered
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 10);
    } else if (activeTab === "popular") {
      filtered = filtered.sort((a, b) => b.usageCount - a.usageCount);
    }

    setFilteredQuestions(filtered);
  };

  const toggleFavorite = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, isFavorite: !q.isFavorite } : q
      )
    );
  };

  const deleteQuestion = (questionId) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.delete(questionId);
      return newSet;
    });
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = questions.find((q) => q.id === questionId);
    if (questionToDuplicate) {
      const newQuestion = {
        ...questionToDuplicate,
        id: Date.now(),
        question: questionToDuplicate.question + " (Copy)",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0,
      };
      setQuestions((prev) => [newQuestion, ...prev]);
    }
  };

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedQuestions.size === filteredQuestions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(filteredQuestions.map((q) => q.id)));
    }
  };

  const addNewQuestion = () => {
    const question = {
      ...newQuestion,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      averageScore: 0,
      isFavorite: false,
      createdBy: "Current User",
      status: "active",
    };

    setQuestions((prev) => [question, ...prev]);
    setShowAddDialog(false);

    // Reset form
    setNewQuestion({
      question: "",
      description: "",
      type: "multiple-choice",
      subject: "",
      difficulty: "medium",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      tags: [],
      points: 1,
      timeLimit: null,
      category: "",
    });
  };

  const getQuestionTypeIcon = (type) => {
    const questionType = questionTypes.find((t) => t.value === type);
    return questionType ? questionType.icon : FileText;
  };

  const getDifficultyColor = (difficulty) => {
    const diff = difficulties.find((d) => d.value === difficulty);
    return diff
      ? diff.color
      : "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800/50";
  };

  const getStats = () => {
    const total = questions.length;
    const favorites = questions.filter((q) => q.isFavorite).length;
    const byDifficulty = {
      easy: questions.filter((q) => q.difficulty === "easy").length,
      medium: questions.filter((q) => q.difficulty === "medium").length,
      hard: questions.filter((q) => q.difficulty === "hard").length,
    };
    const totalUsage = questions.reduce((sum, q) => sum + q.usageCount, 0);
    const avgScore =
      questions.reduce((sum, q) => sum + q.averageScore, 0) / total || 0;

    return { total, favorites, byDifficulty, totalUsage, avgScore };
  };

  const stats = getStats();

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
                <div className="p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/50 flex-shrink-0">
                  <Database className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Question Bank
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                    Manage your comprehensive collection of assessment questions
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="neutral"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Import</span>
                    <span className="sm:hidden">Import</span>
                  </Button>
                  <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Add Question</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:w-full">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                          Add New Question
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                          Create a new question for your question bank
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-100">
                              Question Type
                            </Label>
                            <Select
                              value={newQuestion.type}
                              onValueChange={(value) =>
                                setNewQuestion({ ...newQuestion, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {questionTypes.map((type) => {
                                  const IconComponent = type.icon;
                                  return (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <IconComponent className="h-4 w-4" />
                                        <span>{type.label}</span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-100">
                              Subject
                            </Label>
                            <Select
                              value={newQuestion.subject}
                              onValueChange={(value) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  subject: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-900 dark:text-gray-100">
                            Question Text
                          </Label>
                          <Textarea
                            placeholder="Enter your question here..."
                            value={newQuestion.question}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                question: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>

                        {newQuestion.type === "multiple-choice" && (
                          <div className="space-y-3">
                            <Label className="text-gray-900 dark:text-gray-100">
                              Answer Options
                            </Label>
                            <RadioGroup
                              value={newQuestion.correctAnswer.toString()}
                              onValueChange={(value) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  correctAnswer: parseInt(value),
                                })
                              }
                            >
                              {newQuestion.options.map((option, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-2"
                                >
                                  <RadioGroupItem
                                    value={index.toString()}
                                    id={`new-option-${index}`}
                                  />
                                  <Input
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...newQuestion.options,
                                      ];
                                      newOptions[index] = e.target.value;
                                      setNewQuestion({
                                        ...newQuestion,
                                        options: newOptions,
                                      });
                                    }}
                                    className="flex-1"
                                  />
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-100">
                              Difficulty
                            </Label>
                            <Select
                              value={newQuestion.difficulty}
                              onValueChange={(value) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  difficulty: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {difficulties.map((diff) => (
                                  <SelectItem
                                    key={diff.value}
                                    value={diff.value}
                                  >
                                    <Badge
                                      className={`${diff.color} border`}
                                      variant="outline"
                                    >
                                      {diff.label}
                                    </Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-100">
                              Points
                            </Label>
                            <Input
                              type="number"
                              min="1"
                              value={newQuestion.points}
                              onChange={(e) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  points: parseInt(e.target.value) || 1,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-900 dark:text-gray-100">
                            Explanation (Optional)
                          </Label>
                          <Textarea
                            placeholder="Explain the correct answer..."
                            value={newQuestion.explanation}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                explanation: e.target.value,
                              })
                            }
                            rows={2}
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddDialog(false)}
                            className="w-full sm:w-auto"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={addNewQuestion}
                            disabled={
                              !newQuestion.question || !newQuestion.subject
                            }
                            className="w-full sm:w-auto"
                          >
                            Add Question
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge className="bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50">
                  <FileText className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">
                    {stats.total} Questions
                  </span>
                  <span className="sm:hidden">{stats.total}</span>
                </Badge>
                <Badge className="bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50">
                  <Star className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">
                    {stats.favorites} Favorites
                  </span>
                  <span className="sm:hidden">{stats.favorites}</span>
                </Badge>
                <Badge className="bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">
                    {stats.totalUsage} Total Uses
                  </span>
                  <span className="sm:hidden">{stats.totalUsage}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-5">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {stats.total}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      <span className="hidden sm:inline">Total Questions</span>
                      <span className="sm:hidden">Total</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {stats.byDifficulty.easy}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Easy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                      {stats.byDifficulty.medium}
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Medium
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-red-900/50 border-2 border-red-200 dark:border-red-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-red-800 dark:text-red-200 truncate">
                      {stats.byDifficulty.hard}
                    </p>
                    <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                      Hard
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-20 sm:h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-1.5 sm:p-2 lg:p-3 flex-shrink-0">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {stats.avgScore.toFixed(0)}%
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      <span className="hidden sm:inline">Avg Score</span>
                      <span className="sm:hidden">Avg</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">All Questions</span>
                <span className="sm:hidden">All</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Favorites</span>
                <span className="sm:hidden">⭐</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-xs sm:text-sm">
                Recent
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-xs sm:text-sm">
                Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {/* Filters */}
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5" />
                      <span className="text-gray-900 dark:text-gray-100">
                        Filters
                      </span>
                    </div>
                    {selectedQuestions.size > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {selectedQuestions.size} selected
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Duplicate</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-2"
                          >
                            <Archive className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Archive</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                <span className="hidden sm:inline">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="mx-4 w-[calc(100vw-2rem)] sm:w-full">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                                  Delete Questions
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                                  Are you sure you want to delete{" "}
                                  {selectedQuestions.size} selected questions?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    selectedQuestions.forEach((id) =>
                                      deleteQuestion(id)
                                    );
                                    setSelectedQuestions(new Set());
                                  }}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Search Bar - Full width on mobile */}
                    <div className="w-full">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <Input
                          placeholder="Search questions..."
                          value={filters.search}
                          onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                          }
                          className="pl-10 w-full"
                        />
                      </div>
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Select
                        value={filters.subject}
                        onValueChange={(value) =>
                          setFilters({ ...filters, subject: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-subjects">
                            All Subjects
                          </SelectItem>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={filters.difficulty}
                        onValueChange={(value) =>
                          setFilters({ ...filters, difficulty: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-levels">All Levels</SelectItem>
                          {difficulties.map((diff) => (
                            <SelectItem key={diff.value} value={diff.value}>
                              {diff.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={filters.type}
                        onValueChange={(value) =>
                          setFilters({ ...filters, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-types">All Types</SelectItem>
                          {questionTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                        <Checkbox
                          id="favorites-only"
                          checked={filters.favorite}
                          onCheckedChange={(checked) =>
                            setFilters({ ...filters, favorite: checked })
                          }
                        />
                        <Label
                          htmlFor="favorites-only"
                          className="text-sm text-gray-900 dark:text-gray-100"
                        >
                          <span className="hidden sm:inline">
                            Favorites only
                          </span>
                          <span className="sm:hidden">⭐ only</span>
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 dark:text-gray-100">
                        Questions ({filteredQuestions.length})
                      </span>
                      {filteredQuestions.length > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleSelectAll}
                        >
                          <CheckSquare className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">
                            {selectedQuestions.size === filteredQuestions.length
                              ? "Deselect All"
                              : "Select All"}
                          </span>
                          <span className="sm:hidden">
                            {selectedQuestions.size === filteredQuestions.length
                              ? "✗"
                              : "✓"}
                          </span>
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Export</span>
                        <span className="sm:hidden">Export</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Settings</span>
                        <span className="sm:hidden">Settings</span>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500" />
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        Loading questions...
                      </span>
                    </div>
                  ) : filteredQuestions.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                        No questions found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Try adjusting your filters or create a new question
                      </p>
                      <Button onClick={() => setShowAddDialog(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Question
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredQuestions.map((question) => {
                        const IconComponent = getQuestionTypeIcon(
                          question.type
                        );
                        return (
                          <Card
                            key={question.id}
                            className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow bg-white dark:bg-gray-800/50"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3 sm:space-x-4">
                                <Checkbox
                                  checked={selectedQuestions.has(question.id)}
                                  onCheckedChange={() =>
                                    handleSelectQuestion(question.id)
                                  }
                                  className="mt-1 flex-shrink-0"
                                />

                                <div className="flex-1 space-y-3 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                        <Badge
                                          variant="outline"
                                          className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                        >
                                          {question.subject}
                                        </Badge>
                                        <Badge
                                          className={`text-xs ${getDifficultyColor(
                                            question.difficulty
                                          )} border`}
                                          variant="outline"
                                        >
                                          {question.difficulty}
                                        </Badge>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                          {question.type}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300"
                                        >
                                          {question.points} pts
                                        </Badge>
                                        {question.isFavorite && (
                                          <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                                        )}
                                      </div>

                                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1 break-words">
                                        {question.question}
                                      </h3>
                                      {question.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 break-words">
                                          {question.description}
                                        </p>
                                      )}

                                      {question.tags &&
                                        question.tags.length > 0 && (
                                          <div className="flex flex-wrap gap-1 mb-2">
                                            {question.tags.map((tag, index) => (
                                              <Badge
                                                key={index}
                                                variant="outline"
                                                className="text-xs bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                                              >
                                                <Tag className="w-2 h-2 mr-1" />
                                                {tag}
                                              </Badge>
                                            ))}
                                          </div>
                                        )}
                                    </div>

                                    {/* Action Buttons - Mobile Friendly */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          toggleFavorite(question.id)
                                        }
                                        className="h-8 w-8 p-0"
                                      >
                                        {question.isFavorite ? (
                                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        ) : (
                                          <StarOff className="h-4 w-4" />
                                        )}
                                      </Button>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl mx-4 w-[calc(100vw-2rem)] sm:w-full max-h-[90vh] overflow-y-auto">
                                          <DialogHeader>
                                            <DialogTitle className="text-gray-900 dark:text-gray-100">
                                              Question Preview
                                            </DialogTitle>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <div>
                                              <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                                                {question.question}
                                              </h3>
                                              {question.description && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                  {question.description}
                                                </p>
                                              )}
                                            </div>

                                            {question.options && (
                                              <div className="space-y-2">
                                                {question.options.map(
                                                  (option, index) => (
                                                    <div
                                                      key={index}
                                                      className={`p-2 rounded border ${
                                                        index ===
                                                        question.correctAnswer
                                                          ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/50"
                                                          : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                                                      }`}
                                                    >
                                                      <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {String.fromCharCode(
                                                          65 + index
                                                        )}
                                                        .
                                                      </span>
                                                      <span className="text-gray-900 dark:text-gray-100 ml-2">
                                                        {option}
                                                      </span>
                                                      {index ===
                                                        question.correctAnswer && (
                                                        <CheckCircle className="inline-block w-4 h-4 ml-2 text-green-600 dark:text-green-400" />
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}

                                            {question.explanation && (
                                              <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50">
                                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                                                  Explanation:
                                                </h4>
                                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                                  {question.explanation}
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          duplicateQuestion(question.id)
                                        }
                                        className="h-8 w-8 p-0"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="mx-4 w-[calc(100vw-2rem)] sm:w-full">
                                          <AlertDialogHeader>
                                            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                                              Delete Question
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                                              Are you sure you want to delete
                                              this question? This action cannot
                                              be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>
                                              Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() =>
                                                deleteQuestion(question.id)
                                              }
                                            >
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>

                                  {/* Options Preview - Mobile Friendly */}
                                  {(question.type === "multiple-choice" ||
                                    question.type === "single-choice") &&
                                    question.options && (
                                      <div className="ml-0 sm:ml-4 grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                                        {question.options.map(
                                          (option, optIndex) => (
                                            <div
                                              key={optIndex}
                                              className={`text-xs break-words ${
                                                optIndex ===
                                                question.correctAnswer
                                                  ? "text-green-600 dark:text-green-400 font-medium"
                                                  : "text-gray-500 dark:text-gray-400"
                                              }`}
                                            >
                                              {String.fromCharCode(
                                                65 + optIndex
                                              )}
                                              .{" "}
                                              {option.length > 30
                                                ? option.substring(0, 30) +
                                                  "..."
                                                : option}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}

                                  {/* Question Metadata - Mobile Responsive */}
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700 gap-2">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                      <span className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(
                                          question.createdAt
                                        ).toLocaleDateString()}
                                      </span>
                                      <span className="flex items-center">
                                        <Users className="w-3 h-3 mr-1" />
                                        <span className="hidden sm:inline">
                                          Used {question.usageCount} times
                                        </span>
                                        <span className="sm:hidden">
                                          {question.usageCount} uses
                                        </span>
                                      </span>
                                      <span className="flex items-center">
                                        <BarChart3 className="w-3 h-3 mr-1" />
                                        {question.averageScore.toFixed(1)}% avg
                                      </span>
                                    </div>
                                    <span className="text-right">
                                      by {question.createdBy}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
