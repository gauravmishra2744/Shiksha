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
  Users,
  UserPlus,
  Trophy,
  Target,
  Zap,
  Crown,
  Star,
  Swords,
  Shield,
  Flame,
  Timer,
  Brain,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  Share2,
  Copy,
  Clock,
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  Users2,
  Gamepad2,
  Sparkles,
  Bolt,
  Medal,
  ChevronRight,
  Eye,
  Settings,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  MessageSquare,
  Send,
  X,
  RefreshCw,
} from "lucide-react";

// Sample active competitions
const activeCompetitions = [
  {
    id: 1,
    title: "Mathematics Championship",
    subject: "Mathematics",
    type: "team",
    maxPlayers: 6,
    currentPlayers: 4,
    difficulty: "hard",
    duration: "30 min",
    prize: "500 XP + Badge",
    status: "waiting",
    startTime: "14:30",
    players: [
      { id: 1, name: "You", avatar: "/avatars/me.jpg", score: 0, ready: true },
      {
        id: 2,
        name: "Rahul",
        avatar: "/avatars/student1.jpg",
        score: 0,
        ready: true,
      },
      {
        id: 3,
        name: "Priya",
        avatar: "/avatars/student2.jpg",
        score: 0,
        ready: false,
      },
      {
        id: 4,
        name: "Arjun",
        avatar: "/avatars/student3.jpg",
        score: 0,
        ready: true,
      },
    ],
    questions: 20,
    category: "live",
  },
  {
    id: 2,
    title: "Physics Quick Battle",
    subject: "Physics",
    type: "duo",
    maxPlayers: 2,
    currentPlayers: 2,
    difficulty: "medium",
    duration: "15 min",
    prize: "200 XP",
    status: "in-progress",
    startTime: "14:15",
    players: [
      {
        id: 1,
        name: "Sarah",
        avatar: "/avatars/student4.jpg",
        score: 85,
        ready: true,
      },
      {
        id: 2,
        name: "Mike",
        avatar: "/avatars/student5.jpg",
        score: 92,
        ready: true,
      },
    ],
    questions: 15,
    category: "live",
  },
  {
    id: 3,
    title: "Chemistry Challenge",
    subject: "Chemistry",
    type: "solo",
    maxPlayers: 1,
    currentPlayers: 1,
    difficulty: "easy",
    duration: "20 min",
    prize: "150 XP",
    status: "completed",
    startTime: "13:45",
    players: [
      {
        id: 1,
        name: "Alex",
        avatar: "/avatars/student6.jpg",
        score: 78,
        ready: true,
      },
    ],
    questions: 12,
    category: "practice",
  },
];

// Sample leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: "Emma Watson",
    avatar: "/avatars/student1.jpg",
    score: 2450,
    wins: 15,
    winRate: 85,
  },
  {
    rank: 2,
    name: "John Smith",
    avatar: "/avatars/student2.jpg",
    score: 2380,
    wins: 14,
    winRate: 82,
  },
  {
    rank: 3,
    name: "You",
    avatar: "/avatars/me.jpg",
    score: 2340,
    wins: 13,
    winRate: 80,
  },
  {
    rank: 4,
    name: "Sarah Johnson",
    avatar: "/avatars/student3.jpg",
    score: 2250,
    wins: 12,
    winRate: 78,
  },
  {
    rank: 5,
    name: "Mike Chen",
    avatar: "/avatars/student4.jpg",
    score: 2180,
    wins: 11,
    winRate: 75,
  },
];

// Sample match history
const matchHistory = [
  {
    id: 1,
    title: "Mathematics Battle",
    type: "duo",
    result: "won",
    score: 95,
    opponentScore: 87,
    opponent: "Rahul Sharma",
    duration: "12:45",
    completedAt: "2024-12-08 15:30",
    xpGained: 250,
  },
  {
    id: 2,
    title: "Physics Championship",
    type: "team",
    result: "lost",
    score: 78,
    teamScore: 320,
    opponentTeamScore: 350,
    duration: "25:15",
    completedAt: "2024-12-07 14:20",
    xpGained: 100,
  },
];

// Sample current game state
const gameQuestions = [
  {
    id: 1,
    question: "What is the integral of 2x?",
    options: ["x²", "x² + C", "2x²", "2x² + C"],
    correctAnswer: 1,
    timeLimit: 30,
  },
  {
    id: 2,
    question: "What is Newton's First Law?",
    options: [
      "F = ma",
      "An object at rest stays at rest unless acted upon by a force",
      "Every action has an equal and opposite reaction",
      "E = mc²",
    ],
    correctAnswer: 1,
    timeLimit: 30,
  },
];

const CompeteGamePage = () => {
  // Game states
  const [activeTab, setActiveTab] = useState("compete");
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [isInGame, setIsInGame] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // UI states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showGameDialog, setShowGameDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [connected, setConnected] = useState(true);

  // Form states
  const [competitionTitle, setCompetitionTitle] = useState("");
  const [competitionSubject, setCompetitionSubject] = useState("");
  const [competitionType, setCompetitionType] = useState("duo");
  const [competitionDifficulty, setCompetitionDifficulty] = useState("medium");
  const [competitionDuration, setCompetitionDuration] = useState("15");
  const [joinCode, setJoinCode] = useState("");

  // Chat states
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "Rahul",
      message: "Ready for the challenge!",
      timestamp: "14:25",
    },
    {
      id: 2,
      sender: "Priya",
      message: "Let's do this! 💪",
      timestamp: "14:26",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Timer effect
  useEffect(() => {
    let interval;
    if (isInGame && timeLeft > 0 && !gameEnded) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isInGame) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isInGame, timeLeft, gameEnded]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      // Auto submit or mark as incorrect
      handleAnswerSubmit(null);
    }
  };

  const handleAnswerSubmit = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsInGame(false);

    const isCorrect =
      answerIndex === gameQuestions[currentQuestion]?.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      if (currentQuestion < gameQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
        setIsInGame(true);
      } else {
        endGame();
      }
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsInGame(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setGameEnded(false);
    setShowGameDialog(true);
  };

  const endGame = () => {
    setIsInGame(false);
    setGameEnded(true);
    setShowResultsDialog(true);
  };

  const createCompetition = () => {
    const newCompetition = {
      id: Date.now(),
      title: competitionTitle,
      subject: competitionSubject,
      type: competitionType,
      maxPlayers:
        competitionType === "team" ? 6 : competitionType === "duo" ? 2 : 1,
      currentPlayers: 1,
      difficulty: competitionDifficulty,
      duration: `${competitionDuration} min`,
      prize: "200 XP",
      status: "waiting",
      startTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      players: [
        {
          id: 1,
          name: "You",
          avatar: "/avatars/me.jpg",
          score: 0,
          ready: true,
        },
      ],
      questions: parseInt(competitionDuration) || 15,
      category: "live",
    };

    // Add to competitions list
    setCompetitionTitle("");
    setCompetitionSubject("");
    setCompetitionType("duo");
    setCompetitionDifficulty("medium");
    setCompetitionDuration("15");
    setShowCreateDialog(false);
  };

  const joinCompetition = (competition) => {
    setSelectedCompetition(competition);
    if (competition.currentPlayers < competition.maxPlayers) {
      // Join the competition
      console.log("Joining competition:", competition.title);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "waiting":
        return <Badge className="bg-yellow-500">Waiting</Badge>;
      case "in-progress":
        return <Badge className="bg-green-500">Live</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "solo":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Solo
          </Badge>
        );
      case "duo":
        return (
          <Badge
            variant="outline"
            className="text-purple-600 border-purple-200"
          >
            Duo
          </Badge>
        );
      case "team":
        return (
          <Badge
            variant="outline"
            className="text-orange-600 border-orange-200"
          >
            Team
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
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
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-600" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Competitive Arena
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Challenge friends and climb the leaderboard in real-time competitions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">2,340</div>
            <div className="text-xs text-muted-foreground">Total Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">13</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-xs text-muted-foreground">Rank</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">80%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 h-12 sm:h-14">
          <TabsTrigger
            value="compete"
            className="text-sm sm:text-base font-medium"
          >
            <Swords className="mr-2 h-4 w-4" />
            Compete
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="text-sm sm:text-base font-medium"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="text-sm sm:text-base font-medium"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compete" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Competition Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowCreateDialog(true)}
                  className="flex-1"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Competition
                </Button>
                <Button
                  size="lg"
                  variant="neutral"
                  onClick={() => setShowJoinDialog(true)}
                  className="flex-1"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Join with Code
                </Button>
              </div>

              {/* Active Competitions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Competitions</h3>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        connected ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {connected ? (
                        <Wifi className="h-4 w-4" />
                      ) : (
                        <WifiOff className="h-4 w-4" />
                      )}
                      <span>{connected ? "Connected" : "Disconnected"}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                      {soundEnabled ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <VolumeX className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {activeCompetitions.map((competition) => (
                    <Card
                      key={competition.id}
                      className="hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-lg">
                                {competition.title}
                              </h4>
                              {getStatusBadge(competition.status)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {competition.subject}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {getTypeBadge(competition.type)}
                              {getDifficultyBadge(competition.difficulty)}
                              <Badge variant="outline">
                                <Clock className="mr-1 h-3 w-3" />
                                {competition.duration}
                              </Badge>
                              <Badge variant="outline">
                                <Target className="mr-1 h-3 w-3" />
                                {competition.questions} questions
                              </Badge>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Code
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Players */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Players
                            </span>
                            <span className="text-muted-foreground">
                              {competition.currentPlayers}/
                              {competition.maxPlayers}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {competition.players.map((player, idx) => (
                              <div key={idx} className="relative">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={player.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {player.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                {player.ready && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                )}
                              </div>
                            ))}
                            {Array.from({
                              length:
                                competition.maxPlayers -
                                competition.currentPlayers,
                            }).map((_, idx) => (
                              <div
                                key={`empty-${idx}`}
                                className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"
                              >
                                <Plus className="h-3 w-3 text-muted-foreground/50" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Progress and Actions */}
                        <div className="space-y-3">
                          <Progress
                            value={
                              (competition.currentPlayers /
                                competition.maxPlayers) *
                              100
                            }
                            className="h-2"
                          />

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Prize:{" "}
                              <span className="font-medium text-foreground">
                                {competition.prize}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              {competition.status === "waiting" && (
                                <Button
                                  size="sm"
                                  onClick={() => joinCompetition(competition)}
                                  disabled={
                                    competition.currentPlayers >=
                                    competition.maxPlayers
                                  }
                                >
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Join
                                </Button>
                              )}
                              {competition.status === "in-progress" && (
                                <Button size="sm" variant="neutral">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Spectate
                                </Button>
                              )}
                              {competition.status === "waiting" &&
                                competition.players.some(
                                  (p) => p.name === "You"
                                ) && (
                                  <Button size="sm" onClick={startGame}>
                                    <Play className="mr-2 h-4 w-4" />
                                    Start
                                  </Button>
                                )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Live Chat */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Live Chat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-32 overflow-y-auto space-y-2 p-2 bg-muted/30 rounded">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="text-sm">
                        <span className="font-medium text-blue-600">
                          {msg.sender}:
                        </span>
                        <span className="ml-2">{msg.message}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {msg.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Match */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Quick Match</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Select defaultValue="mathematics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Bolt className="mr-2 h-4 w-4" />
                    Find Match
                  </Button>
                </CardContent>
              </Card>

              {/* Top Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <span>Top Players</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboardData.slice(0, 5).map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center space-x-3"
                    >
                      {getRankIcon(player.rank)}
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
                          {player.score} pts
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {player.winRate}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboardData.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-center w-10 h-10">
                      {getRankIcon(player.rank)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {player.wins} wins • {player.winRate}% win rate
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{player.score}</div>
                      <div className="text-xs text-muted-foreground">
                        points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchHistory.map((match) => (
                  <div key={match.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{match.title}</h4>
                      <Badge
                        variant={
                          match.result === "won" ? "default" : "destructive"
                        }
                      >
                        {match.result.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Your Score:
                        </span>
                        <div className="font-medium">{match.score}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{match.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          XP Gained:
                        </span>
                        <div className="font-medium text-green-600">
                          +{match.xpGained}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <div className="font-medium">
                          {new Date(match.completedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Competition Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Competition</DialogTitle>
            <DialogDescription>
              Set up a new competition for you and your friends
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Competition Title
              </label>
              <Input
                placeholder="Enter competition name..."
                value={competitionTitle}
                onChange={(e) => setCompetitionTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select
                  value={competitionSubject}
                  onValueChange={setCompetitionSubject}
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
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Competition Type
                </label>
                <Select
                  value={competitionType}
                  onValueChange={setCompetitionType}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Challenge</SelectItem>
                    <SelectItem value="duo">Duo Battle</SelectItem>
                    <SelectItem value="team">Team Competition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <Select
                  value={competitionDifficulty}
                  onValueChange={setCompetitionDifficulty}
                >
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
                  Duration (minutes)
                </label>
                <Select
                  value={competitionDuration}
                  onValueChange={setCompetitionDuration}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={createCompetition}
                disabled={!competitionTitle || !competitionSubject}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Competition
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Competition Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join Competition</DialogTitle>
            <DialogDescription>
              Enter the competition code to join an existing game
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Competition Code
              </label>
              <Input
                placeholder="Enter 6-digit code..."
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="text-center font-mono text-lg"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowJoinDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={joinCode.length !== 6}>
                <UserPlus className="mr-2 h-4 w-4" />
                Join Competition
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Dialog */}
      <Dialog open={showGameDialog} onOpenChange={setShowGameDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {gameStarted && !gameEnded && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Competition in Progress</DialogTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      Question {currentQuestion + 1}/{gameQuestions.length}
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
                <Progress value={(timeLeft / 30) * 100} className="h-2" />
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-4">
                    {gameQuestions[currentQuestion]?.question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameQuestions[currentQuestion]?.options.map(
                    (option, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedAnswer === index
                            ? index ===
                              gameQuestions[currentQuestion].correctAnswer
                              ? "default"
                              : "destructive"
                            : selectedAnswer !== null &&
                              index ===
                                gameQuestions[currentQuestion].correctAnswer
                            ? "default"
                            : "outline"
                        }
                        className={`p-6 h-auto text-left justify-start ${
                          selectedAnswer !== null ? "pointer-events-none" : ""
                        }`}
                        onClick={() => handleAnswerSubmit(index)}
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </Button>
                    )
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Score:{" "}
                    <span className="font-bold text-foreground">
                      {score} points
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Progress: {currentQuestion + 1}/{gameQuestions.length}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="max-w-lg">
          <div className="text-center space-y-6 py-8">
            <div className="space-y-2">
              <Trophy className="h-16 w-16 mx-auto text-yellow-600" />
              <h2 className="text-2xl font-bold">Competition Complete!</h2>
              <p className="text-muted-foreground">
                Great job on your performance
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-xs text-muted-foreground">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">2nd</div>
                <div className="text-xs text-muted-foreground">Placement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+250</div>
                <div className="text-xs text-muted-foreground">XP Gained</div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => setShowResultsDialog(false)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Continue
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(true)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompeteGamePage;
