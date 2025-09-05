"use client";

import { useState } from "react";
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
  CheckSquare,
  Plus,
  Trash,
  Save,
  Eye,
  Clock,
  Target,
  Edit,
  Copy,
  FileText,
  Users,
  Calendar,
  Settings,
  Brain,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  Upload,
  Download,
  Play,
  BookOpen,
  GraduationCap,
  Award,
  Timer,
  Shuffle,
  Lock,
  Unlock,
  HelpCircle,
  ImageIcon,
  VideoIcon,
  AudioWaveform,
  Link,
  Hash,
  Type,
  List,
  ToggleLeft,
  PenTool,
  Calculator,
  Lightbulb,
  Zap,
} from "lucide-react";

export default function CreateAssessmentPage() {
  const [assessment, setAssessment] = useState({
    title: "",
    description: "",
    subject: "",
    class: "",
    difficulty: "medium",
    duration: 60,
    totalPoints: 0,
    instructions: "",
    tags: [],
    questions: [],
    settings: {
      randomizeQuestions: false,
      randomizeOptions: false,
      showResultsImmediately: true,
      allowMultipleAttempts: false,
      maxAttempts: 1,
      requirePassword: false,
      password: "",
      timeLimit: true,
      showProgressBar: true,
      allowBackNavigation: true,
      showQuestionNumbers: true,
      preventCopyPaste: false,
      fullScreenMode: false,
      proctoring: false,
      autoSubmit: true,
      passingScore: 60,
    },
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    type: "multiple-choice",
    question: "",
    description: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    correctAnswers: [], // For multiple correct answers
    points: 1,
    explanation: "",
    difficulty: "medium",
    category: "",
    tags: [],
    timeLimit: null,
    media: null,
  });

  const [activeTab, setActiveTab] = useState("details");
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const classes = [
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
    "College Level",
    "Graduate Level",
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      color: "text-green-600 bg-green-50 border-green-200",
    },
    {
      value: "medium",
      label: "Medium",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    {
      value: "hard",
      label: "Hard",
      color: "text-red-600 bg-red-50 border-red-200",
    },
  ];

  const validateQuestion = () => {
    const newErrors = {};

    if (!currentQuestion.question.trim()) {
      newErrors.question = "Question text is required";
    }

    if (
      currentQuestion.type === "multiple-choice" ||
      currentQuestion.type === "single-choice"
    ) {
      const filledOptions = currentQuestion.options.filter((opt) => opt.trim());
      if (filledOptions.length < 2) {
        newErrors.options = "At least 2 options are required";
      }
      if (!currentQuestion.options[currentQuestion.correctAnswer]?.trim()) {
        newErrors.correctAnswer = "Please select a valid correct answer";
      }
    }

    if (currentQuestion.points <= 0) {
      newErrors.points = "Points must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addQuestion = () => {
    if (!validateQuestion()) return;

    const newQuestion = {
      ...currentQuestion,
      id: Date.now(),
      order: assessment.questions.length + 1,
    };

    setAssessment((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      totalPoints: prev.totalPoints + currentQuestion.points,
    }));

    // Reset current question
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      description: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      correctAnswers: [],
      points: 1,
      explanation: "",
      difficulty: "medium",
      category: "",
      tags: [],
      timeLimit: null,
      media: null,
    });

    setErrors({});
  };

  const removeQuestion = (questionId) => {
    const questionToRemove = assessment.questions.find(
      (q) => q.id === questionId
    );
    setAssessment((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
      totalPoints: prev.totalPoints - (questionToRemove?.points || 0),
    }));
  };

  const duplicateQuestion = (questionId) => {
    const questionToDuplicate = assessment.questions.find(
      (q) => q.id === questionId
    );
    if (questionToDuplicate) {
      const newQuestion = {
        ...questionToDuplicate,
        id: Date.now(),
        order: assessment.questions.length + 1,
        question: questionToDuplicate.question + " (Copy)",
      };
      setAssessment((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
        totalPoints: prev.totalPoints + newQuestion.points,
      }));
    }
  };

  const updateQuestionOption = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addOption = () => {
    if (currentQuestion.options.length < 6) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [...currentQuestion.options, ""],
      });
    }
  };

  const removeOption = (index) => {
    if (currentQuestion.options.length > 2) {
      const newOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion({
        ...currentQuestion,
        options: newOptions,
        correctAnswer:
          currentQuestion.correctAnswer >= index
            ? Math.max(0, currentQuestion.correctAnswer - 1)
            : currentQuestion.correctAnswer,
      });
    }
  };

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true);

    try {
      // Validate assessment
      if (
        !assessment.title.trim() ||
        !assessment.subject ||
        assessment.questions.length === 0
      ) {
        throw new Error(
          "Please fill in all required fields and add at least one question"
        );
      }

      const assessmentData = {
        ...assessment,
        status: isDraft ? "draft" : "published",
        createdAt: new Date().toISOString(),
        totalQuestions: assessment.questions.length,
      };

      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessmentData),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          `Assessment ${isDraft ? "saved as draft" : "published"} successfully!`
        );
        // Reset form or redirect
      } else {
        throw new Error(result.message || "Failed to save assessment");
      }
    } catch (error) {
      console.error("Failed to save assessment:", error);
      alert(error.message || "Failed to save assessment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIQuestions = async () => {
    try {
      // Simulate AI question generation
      const aiQuestions = [
        {
          id: Date.now() + 1,
          type: "multiple-choice",
          question: "What is the derivative of x²?",
          options: ["2x", "x", "2x²", "x²"],
          correctAnswer: 0,
          points: 2,
          explanation: "Using the power rule: d/dx(x²) = 2x¹ = 2x",
          difficulty: "medium",
          order: assessment.questions.length + 1,
        },
        {
          id: Date.now() + 2,
          type: "true-false",
          question: "The integral of a constant is another constant.",
          options: ["True", "False"],
          correctAnswer: 1,
          points: 1,
          explanation:
            "The integral of a constant c is cx + C, where C is the constant of integration.",
          difficulty: "easy",
          order: assessment.questions.length + 2,
        },
      ];

      setAssessment((prev) => ({
        ...prev,
        questions: [...prev.questions, ...aiQuestions],
        totalPoints:
          prev.totalPoints + aiQuestions.reduce((sum, q) => sum + q.points, 0),
      }));

      alert("AI-generated questions added successfully!");
    } catch (error) {
      console.error("Failed to generate AI questions:", error);
      alert("Failed to generate questions. Please try again.");
    }
  };

  const renderQuestionInput = () => {
    const questionType = questionTypes.find(
      (t) => t.value === currentQuestion.type
    );
    const IconComponent = questionType?.icon || FileText;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IconComponent className="h-5 w-5" />
              <span>Add New Question</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {assessment.questions.length} questions
              </Badge>
              <Badge variant="outline">
                {assessment.totalPoints} total points
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Type Selection */}
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select
              value={currentQuestion.type}
              onValueChange={(value) =>
                setCurrentQuestion({ ...currentQuestion, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
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

          {/* Question Text */}
          <div className="space-y-2">
            <Label>Question Text *</Label>
            <Textarea
              placeholder="Enter your question here..."
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  question: e.target.value,
                })
              }
              className={errors.question ? "border-red-500" : ""}
              rows={3}
            />
            {errors.question && (
              <p className="text-sm text-red-500">{errors.question}</p>
            )}
          </div>

          {/* Question Description (Optional) */}
          <div className="space-y-2">
            <Label>Additional Description (Optional)</Label>
            <Textarea
              placeholder="Provide additional context or instructions..."
              value={currentQuestion.description}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  description: e.target.value,
                })
              }
              rows={2}
            />
          </div>

          {/* Options for Multiple Choice */}
          {(currentQuestion.type === "multiple-choice" ||
            currentQuestion.type === "single-choice") && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Answer Options *</Label>
                <Button size="sm" variant="outline" onClick={addOption}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Option
                </Button>
              </div>
              <RadioGroup
                value={currentQuestion.correctAnswer.toString()}
                onValueChange={(value) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: parseInt(value),
                  })
                }
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateQuestionOption(index, e.target.value)
                      }
                      className="flex-1"
                    />
                    {currentQuestion.options.length > 2 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeOption(index)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </RadioGroup>
              {errors.options && (
                <p className="text-sm text-red-500">{errors.options}</p>
              )}
              {errors.correctAnswer && (
                <p className="text-sm text-red-500">{errors.correctAnswer}</p>
              )}
            </div>
          )}

          {/* True/False Options */}
          {currentQuestion.type === "true-false" && (
            <div className="space-y-2">
              <Label>Correct Answer</Label>
              <RadioGroup
                value={currentQuestion.correctAnswer.toString()}
                onValueChange={(value) =>
                  setCurrentQuestion({
                    ...currentQuestion,
                    correctAnswer: parseInt(value),
                    options: ["True", "False"],
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="true" />
                  <Label htmlFor="true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="false" />
                  <Label htmlFor="false">False</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Points and Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Points *</Label>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  min="1"
                  value={currentQuestion.points}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      points: parseInt(e.target.value) || 1,
                    })
                  }
                  className={`w-24 ${errors.points ? "border-red-500" : ""}`}
                />
              </div>
              {errors.points && (
                <p className="text-sm text-red-500">{errors.points}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={currentQuestion.difficulty}
                onValueChange={(value) =>
                  setCurrentQuestion({ ...currentQuestion, difficulty: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
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
          </div>

          {/* Explanation */}
          <div className="space-y-2">
            <Label>Explanation (Optional)</Label>
            <Textarea
              placeholder="Explain the correct answer or provide additional learning material..."
              value={currentQuestion.explanation}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  explanation: e.target.value,
                })
              }
              rows={2}
            />
          </div>

          {/* Add Question Button */}
          <div className="flex justify-end">
            <Button
              onClick={addQuestion}
              disabled={!currentQuestion.question.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-200 dark:border-orange-800">
                  <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Create Assessment
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Design comprehensive quizzes and tests with AI-powered
                    features
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Smart Templates
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Auto-Grading
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="details"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Details</span>
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="flex items-center space-x-2"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">Questions</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Preview</span>
              </TabsTrigger>
            </TabsList>

            {/* Assessment Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Basic Information</span>
                  </CardTitle>
                  <CardDescription>
                    Set up the fundamental details of your assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Assessment Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Mathematics Quiz - Chapter 5"
                        value={assessment.title}
                        onChange={(e) =>
                          setAssessment({
                            ...assessment,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={assessment.subject}
                        onValueChange={(value) =>
                          setAssessment({ ...assessment, subject: value })
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this assessment covers..."
                      value={assessment.description}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class/Grade</Label>
                      <Select
                        value={assessment.class}
                        onValueChange={(value) =>
                          setAssessment({ ...assessment, class: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((className) => (
                            <SelectItem key={className} value={className}>
                              {className}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select
                        value={assessment.difficulty}
                        onValueChange={(value) =>
                          setAssessment({ ...assessment, difficulty: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((diff) => (
                            <SelectItem key={diff.value} value={diff.value}>
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
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={assessment.duration}
                          onChange={(e) =>
                            setAssessment({
                              ...assessment,
                              duration: parseInt(e.target.value) || 60,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">
                      Instructions for Students
                    </Label>
                    <Textarea
                      id="instructions"
                      placeholder="Provide clear instructions for taking this assessment..."
                      value={assessment.instructions}
                      onChange={(e) =>
                        setAssessment({
                          ...assessment,
                          instructions: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Questions</h3>
                  <p className="text-sm text-gray-600">
                    Add and manage your assessment questions
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={generateAIQuestions}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    AI Generate
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>

              {renderQuestionInput()}

              {/* Questions Preview */}
              {assessment.questions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Questions Preview</span>
                      <div className="flex items-center space-x-2">
                        <Badge>{assessment.questions.length} questions</Badge>
                        <Badge variant="outline">
                          {assessment.totalPoints} points
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessment.questions.map((question, index) => (
                        <Card
                          key={question.id}
                          className="border border-gray-200"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    Q{index + 1}
                                  </Badge>
                                  <Badge
                                    className={`text-xs ${
                                      difficulties.find(
                                        (d) => d.value === question.difficulty
                                      )?.color
                                    }`}
                                    variant="outline"
                                  >
                                    {question.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {question.points} pts
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {question.question}
                                </h4>
                                {question.description && (
                                  <p className="text-sm text-gray-600 mb-2">
                                    {question.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => duplicateQuestion(question.id)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <Trash className="h-3 w-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Question
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this
                                        question? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          removeQuestion(question.id)
                                        }
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>

                            {(question.type === "multiple-choice" ||
                              question.type === "single-choice") && (
                              <div className="ml-4 space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`text-sm flex items-center space-x-2 ${
                                      optIndex === question.correctAnswer
                                        ? "text-green-600 font-medium"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                      {String.fromCharCode(65 + optIndex)}
                                    </span>
                                    <span>{option}</span>
                                    {optIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === "true-false" && (
                              <div className="ml-4 space-y-1">
                                <div
                                  className={`text-sm ${
                                    question.correctAnswer === 0
                                      ? "text-green-600 font-medium"
                                      : "text-gray-600"
                                  }`}
                                >
                                  ✓ True
                                </div>
                                <div
                                  className={`text-sm ${
                                    question.correctAnswer === 1
                                      ? "text-green-600 font-medium"
                                      : "text-gray-600"
                                  }`}
                                >
                                  ✗ False
                                </div>
                              </div>
                            )}

                            {question.explanation && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>Explanation:</strong>{" "}
                                  {question.explanation}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assessment Behavior */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5" />
                      <span>Assessment Behavior</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="randomizeQuestions"
                        checked={assessment.settings.randomizeQuestions}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              randomizeQuestions: checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="randomizeQuestions" className="text-sm">
                        Randomize question order
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="randomizeOptions"
                        checked={assessment.settings.randomizeOptions}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              randomizeOptions: checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="randomizeOptions" className="text-sm">
                        Randomize answer options
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="showResultsImmediately"
                        checked={assessment.settings.showResultsImmediately}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              showResultsImmediately: checked,
                            },
                          }))
                        }
                      />
                      <Label
                        htmlFor="showResultsImmediately"
                        className="text-sm"
                      >
                        Show results immediately
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowBackNavigation"
                        checked={assessment.settings.allowBackNavigation}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              allowBackNavigation: checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="allowBackNavigation" className="text-sm">
                        Allow back navigation
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Attempts and Security */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Attempts & Security</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowMultipleAttempts"
                        checked={assessment.settings.allowMultipleAttempts}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              allowMultipleAttempts: checked,
                            },
                          }))
                        }
                      />
                      <Label
                        htmlFor="allowMultipleAttempts"
                        className="text-sm"
                      >
                        Allow multiple attempts
                      </Label>
                    </div>

                    {assessment.settings.allowMultipleAttempts && (
                      <div className="ml-6 space-y-2">
                        <Label htmlFor="maxAttempts" className="text-sm">
                          Max attempts
                        </Label>
                        <Input
                          id="maxAttempts"
                          type="number"
                          min="1"
                          max="10"
                          value={assessment.settings.maxAttempts}
                          onChange={(e) =>
                            setAssessment((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                maxAttempts: parseInt(e.target.value) || 1,
                              },
                            }))
                          }
                          className="w-20"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requirePassword"
                        checked={assessment.settings.requirePassword}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              requirePassword: checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="requirePassword" className="text-sm">
                        Require password
                      </Label>
                    </div>

                    {assessment.settings.requirePassword && (
                      <div className="ml-6 space-y-2">
                        <Label htmlFor="password" className="text-sm">
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={assessment.settings.password}
                          onChange={(e) =>
                            setAssessment((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                password: e.target.value,
                              },
                            }))
                          }
                          placeholder="Enter password"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Grading Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Grading & Scoring</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passingScore">Passing Score (%)</Label>
                      <Input
                        id="passingScore"
                        type="number"
                        min="0"
                        max="100"
                        value={assessment.settings.passingScore}
                        onChange={(e) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              passingScore: parseInt(e.target.value) || 60,
                            },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        id="autoSubmit"
                        checked={assessment.settings.autoSubmit}
                        onCheckedChange={(checked) =>
                          setAssessment((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, autoSubmit: checked },
                          }))
                        }
                      />
                      <Label htmlFor="autoSubmit" className="text-sm">
                        Auto-submit when time expires
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Assessment Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Preview how your assessment will appear to students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 bg-gray-50">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">
                        {assessment.title || "Assessment Title"}
                      </h2>
                      {assessment.description && (
                        <p className="text-gray-600 mb-4">
                          {assessment.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {assessment.duration} minutes
                        </Badge>
                        <Badge variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          {assessment.questions.length} questions
                        </Badge>
                        <Badge variant="outline">
                          <Target className="w-3 h-3 mr-1" />
                          {assessment.totalPoints} points
                        </Badge>
                      </div>
                      {assessment.instructions && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Instructions:</h3>
                          <p className="text-sm text-gray-700">
                            {assessment.instructions}
                          </p>
                        </div>
                      )}
                    </div>

                    {assessment.questions.length > 0 ? (
                      <div className="space-y-4">
                        {assessment.questions
                          .slice(0, 2)
                          .map((question, index) => (
                            <div
                              key={question.id}
                              className="bg-white p-4 rounded-lg border"
                            >
                              <h4 className="font-medium mb-3">
                                {index + 1}. {question.question}
                              </h4>
                              {question.type === "multiple-choice" && (
                                <div className="space-y-2">
                                  {question.options.map((option, optIndex) => (
                                    <label
                                      key={optIndex}
                                      className="flex items-center space-x-2"
                                    >
                                      <input
                                        type="radio"
                                        name={`preview-${question.id}`}
                                        disabled
                                      />
                                      <span className="text-sm">{option}</span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        {assessment.questions.length > 2 && (
                          <div className="text-center text-gray-500 text-sm">
                            ... and {assessment.questions.length - 2} more
                            questions
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>
                          No questions added yet. Add questions to see the
                          preview.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {assessment.questions.length} questions •{" "}
                {assessment.totalPoints} points • {assessment.duration} minutes
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting || assessment.questions.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Publish Assessment
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
