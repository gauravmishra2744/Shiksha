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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Users,
  Plus,
  Brain,
  Target,
  Trophy,
  Clock,
  Zap,
  Star,
  MoreVertical,
  UserPlus,
  Share2,
  Eye,
  Calendar,
  BarChart3,
  TrendingUp,
  CheckCircle,
  XCircle,
  Timer,
  Sparkles,
  BookOpen,
  Award,
  Crown,
  Shield,
  Gamepad2,
  History,
  Settings,
  X,
  Copy,
  Users2,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

// Sample quiz history
const sampleQuizHistory = [
  {
    id: 1,
    title: "Mathematics Quiz",
    subject: "Mathematics",
    topic: "Algebra & Calculus",
    score: 85,
    totalQuestions: 10,
    correctAnswers: 8,
    timeTaken: "12:45",
    completedAt: "2024-12-08",
    difficulty: "Medium",
    teammates: [
      { name: "Rahul", avatar: "/avatars/student1.jpg", score: 90 },
      { name: "Priya", avatar: "/avatars/student2.jpg", score: 75 },
    ],
  },
  {
    id: 2,
    title: "Physics Challenge",
    subject: "Physics",
    topic: "Mechanics & Motion",
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    timeTaken: "18:20",
    completedAt: "2024-12-07",
    difficulty: "Hard",
    teammates: [],
  },
  {
    id: 3,
    title: "Chemistry Basics",
    subject: "Chemistry",
    topic: "Atomic Structure",
    score: 78,
    totalQuestions: 12,
    correctAnswers: 9,
    timeTaken: "15:30",
    completedAt: "2024-12-06",
    difficulty: "Easy",
    teammates: [{ name: "Arjun", avatar: "/avatars/student3.jpg", score: 82 }],
  },
];

// Sample team members
const sampleTeammates = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/avatars/student1.jpg",
    status: "online",
    level: 15,
    totalScore: 2450,
    gamesPlayed: 48,
    averageScore: 85,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/avatars/student2.jpg",
    status: "online",
    level: 12,
    totalScore: 1890,
    gamesPlayed: 35,
    averageScore: 78,
  },
  {
    id: 3,
    name: "Arjun Singh",
    avatar: "/avatars/student3.jpg",
    status: "offline",
    level: 18,
    totalScore: 3200,
    gamesPlayed: 62,
    averageScore: 88,
  },
];

// Sample current game state
const sampleQuestions = [
  {
    id: 1,
    question: "What is the derivative of x²?",
    options: ["2x", "x", "2", "x²"],
    correctAnswer: 0,
    explanation:
      "The derivative of x² is 2x using the power rule: d/dx(x^n) = nx^(n-1)",
  },
  {
    id: 2,
    question: "Which of the following is a prime number?",
    options: ["15", "21", "17", "25"],
    correctAnswer: 2,
    explanation:
      "17 is a prime number as it has no divisors other than 1 and itself.",
  },
];

const QuizGamePageContent = () => {
  const [activeTab, setActiveTab] = useState("play");
  const [showContextDialog, setShowContextDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showGameDialog, setShowGameDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // Context and team states
  const [contextTopic, setContextTopic] = useState("");
  const [contextSubject, setContextSubject] = useState("");
  const [contextDetails, setContextDetails] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [teamMembers, setTeamMembers] = useState([]);
  const [inviteEmails, setInviteEmails] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0 && !gameEnded) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, gameEnded]);

  const generateQuestions = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      setQuestions(sampleQuestions);
      setIsGenerating(false);
      setShowContextDialog(false);
      startGame();
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(timePerQuestion);
    setSelectedAnswer(null);
    setAnswers([]);
    setGameEnded(false);
    setShowGameDialog(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (!isPlaying || selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setIsPlaying(false);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[currentQuestion].id,
        selected: answerIndex,
        correct: questions[currentQuestion].correctAnswer,
        isCorrect,
      },
    ]);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(timePerQuestion);
      setIsPlaying(true);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameEnded(true);
    // Save to history logic here
  };

  const inviteTeammates = () => {
    const emails = inviteEmails
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);
    // Send invites logic here
    setInviteEmails("");
    setShowTeamDialog(false);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case "easy":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Easy
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-200"
          >
            Medium
          </Badge>
        );
      case "hard":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Hard
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          AI Quiz Arena
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Challenge yourself with AI-generated questions and compete with
          friends
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {sampleQuizHistory.length}
                </div>
                <div className="text-xs text-muted-foreground">
                  Games Played
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    sampleQuizHistory.reduce(
                      (acc, quiz) => acc + quiz.score,
                      0
                    ) / sampleQuizHistory.length
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Avg Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-xs text-muted-foreground">Win Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Action Card */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span>Start New Quiz</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-muted-foreground">
                  Provide context about what you want to study, and our AI will
                  generate personalized quiz questions for you.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    onClick={() => setShowContextDialog(true)}
                    className="w-full"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Solo Play
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setShowTeamDialog(true)}
                    className="w-full"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Team Play
                  </Button>
                </div>
              </div>

              {/* Recent Games */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Recent Games</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistoryDialog(true)}
                  >
                    <History className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </div>

                <div className="grid gap-3">
                  {sampleQuizHistory.slice(0, 3).map((quiz) => (
                    <Card
                      key={quiz.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1">
                              {quiz.title}
                            </h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {quiz.subject}
                              </Badge>
                              {getDifficultyBadge(
                                quiz.difficulty.toLowerCase()
                              )}
                              <span className="text-xs text-muted-foreground">
                                {quiz.correctAnswers}/{quiz.totalQuestions}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-lg font-bold ${getScoreColor(
                                quiz.score
                              )}`}
                            >
                              {quiz.score}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(quiz.completedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Users2 className="h-5 w-5" />
                  <span>Study Buddies</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowTeamDialog(true)}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleTeammates.map((teammate) => (
                <div
                  key={teammate.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={teammate.avatar} />
                      <AvatarFallback>{teammate.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        teammate.status === "online"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {teammate.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>Level {teammate.level}</span>
                      <span>•</span>
                      <span>{teammate.averageScore}% avg</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Gamepad2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowTeamDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Invite Friends
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleTeammates
                .sort((a, b) => b.totalScore - a.totalScore)
                .slice(0, 5)
                .map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="text-xs">
                        {player.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm line-clamp-1">
                        {player.name}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {player.totalScore} pts
                      </p>
                    </div>
                    {index === 0 && (
                      <Crown className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Context Dialog */}
      <Dialog open={showContextDialog} onOpenChange={setShowContextDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Setup AI Quiz</DialogTitle>
            <DialogDescription>
              Provide context about what you want to study, and we'll generate
              personalized questions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select
                  value={contextSubject}
                  onValueChange={setContextSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="computer-science">
                      Computer Science
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Topic/Chapter
                </label>
                <Input
                  placeholder="e.g., Quadratic Equations, Newton's Laws"
                  value={contextTopic}
                  onChange={(e) => setContextTopic(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Additional Context
              </label>
              <Textarea
                placeholder="Describe what specific concepts you want to focus on, difficulty level, or any particular areas you want to practice..."
                value={contextDetails}
                onChange={(e) => setContextDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Questions
                </label>
                <Select
                  value={questionCount.toString()}
                  onValueChange={(v) => setQuestionCount(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Time per Question
                </label>
                <Select
                  value={timePerQuestion.toString()}
                  onValueChange={(v) => setTimePerQuestion(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">60 seconds</SelectItem>
                    <SelectItem value="120">2 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowContextDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={generateQuestions}
                disabled={!contextSubject || !contextTopic || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Invite friends to join your quiz session
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email Addresses
              </label>
              <Textarea
                placeholder="Enter email addresses separated by commas..."
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-sm mb-2">
                Or share quiz room code:
              </h4>
              <div className="flex items-center space-x-2">
                <Input
                  value="QUIZ-ABC123"
                  readOnly
                  className="text-center font-mono"
                />
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowTeamDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={inviteTeammates} disabled={!inviteEmails.trim()}>
                <Share2 className="mr-2 h-4 w-4" />
                Send Invites
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Dialog */}
      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {gameStarted && questions.length > 0 && !gameEnded && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Quiz in Progress</DialogTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      Question {currentQuestion + 1}/{questions.length}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4" />
                      <span
                        className={`font-mono text-lg ${
                          timeLeft <= 10 ? "text-red-600" : ""
                        }`}
                      >
                        {timeLeft}s
                      </span>
                    </div>
                  </div>
                </div>
                <Progress
                  value={(timeLeft / timePerQuestion) * 100}
                  className="h-2"
                />
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4">
                    {questions[currentQuestion]?.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion]?.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswer === index
                          ? index === questions[currentQuestion].correctAnswer
                            ? "default"
                            : "destructive"
                          : selectedAnswer !== null &&
                            index === questions[currentQuestion].correctAnswer
                          ? "default"
                          : "outline"
                      }
                      className={`p-6 h-auto text-left justify-start ${
                        selectedAnswer !== null ? "pointer-events-none" : ""
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedAnswer !== null && (
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Explanation:</h4>
                    <p className="text-sm text-muted-foreground">
                      {questions[currentQuestion]?.explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Score:{" "}
                    <span className="font-bold text-foreground">
                      {score} points
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Progress: {currentQuestion + 1}/{questions.length}
                  </div>
                </div>
              </div>
            </>
          )}

          {gameEnded && (
            <div className="text-center space-y-6 py-8">
              <div className="space-y-2">
                <Trophy className="h-16 w-16 mx-auto text-yellow-600" />
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="text-muted-foreground">
                  Great job on finishing the quiz
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {score}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Final Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {answers.filter((a) => a.isCorrect).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      (answers.filter((a) => a.isCorrect).length /
                        questions.length) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={() => setShowGameDialog(false)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Done
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowContextDialog(true)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quiz History</DialogTitle>
            <DialogDescription>
              View your past quiz performances and track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            {sampleQuizHistory.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.topic}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${getScoreColor(
                          quiz.score
                        )}`}
                      >
                        {quiz.score}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {quiz.correctAnswers}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Correct
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {quiz.totalQuestions}
                      </div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{quiz.timeTaken}</div>
                      <div className="text-xs text-muted-foreground">Time</div>
                    </div>
                    <div className="text-center">
                      {getDifficultyBadge(quiz.difficulty.toLowerCase())}
                    </div>
                  </div>

                  {quiz.teammates.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Team:
                      </span>
                      {quiz.teammates.map((teammate, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={teammate.avatar} />
                            <AvatarFallback className="text-xs">
                              {teammate.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {teammate.name} ({teammate.score}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizGamePageContent;
