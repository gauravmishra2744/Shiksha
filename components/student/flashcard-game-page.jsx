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
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Shuffle,
  Plus,
  Eye,
  EyeOff,
  Star,
  ThumbsUp,
  ThumbsDown,
  Brain,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Layers,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  Upload,
  Settings,
  Timer,
  TrendingUp,
  BarChart3,
  CheckCircle,
  X,
  RotateCw,
  Sparkles,
  Users,
  Calendar,
  Clock,
  Award,
  Crown,
  Heart,
  Filter,
  Search,
} from "lucide-react";

// Sample flashcard data
const sampleFlashcards = [
  {
    id: 1,
    front: "What is the derivative of sin(x)?",
    back: "cos(x)\n\nExplanation: The derivative of sin(x) with respect to x is cos(x). This is a fundamental trigonometric derivative that should be memorized.",
    subject: "Mathematics",
    topic: "Calculus",
    difficulty: "medium",
    tags: ["trigonometry", "derivatives", "calculus"],
    mastery: 0.8,
    lastReviewed: "2024-12-08",
    timesReviewed: 12,
    correctStreak: 5,
  },
  {
    id: 2,
    front: "What is Newton's Second Law?",
    back: "F = ma\n\nForce equals mass times acceleration. This law describes the relationship between the forces acting on a body and its motion due to those forces.",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "easy",
    tags: ["newton", "forces", "mechanics"],
    mastery: 0.9,
    lastReviewed: "2024-12-07",
    timesReviewed: 20,
    correctStreak: 8,
  },
  {
    id: 3,
    front: "What is the chemical formula for glucose?",
    back: "C₆H₁₂O₆\n\nGlucose is a simple sugar (monosaccharide) and is the primary source of energy for cells. It's also known as dextrose.",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "easy",
    tags: ["glucose", "formula", "organic"],
    mastery: 0.7,
    lastReviewed: "2024-12-06",
    timesReviewed: 8,
    correctStreak: 3,
  },
  {
    id: 4,
    front: "What is the process of photosynthesis?",
    back: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nPhotosynthesis is the process by which plants convert carbon dioxide and water into glucose using sunlight energy, producing oxygen as a byproduct.",
    subject: "Biology",
    topic: "Plant Biology",
    difficulty: "medium",
    tags: ["photosynthesis", "plants", "biology"],
    mastery: 0.6,
    lastReviewed: "2024-12-05",
    timesReviewed: 6,
    correctStreak: 2,
  },
  {
    id: 5,
    front: "What is the capital of Australia?",
    back: "Canberra\n\nCanberra is the capital city of Australia, located in the Australian Capital Territory (ACT). Many people incorrectly think it's Sydney or Melbourne.",
    subject: "Geography",
    topic: "World Capitals",
    difficulty: "easy",
    tags: ["australia", "capital", "geography"],
    mastery: 0.95,
    lastReviewed: "2024-12-08",
    timesReviewed: 15,
    correctStreak: 10,
  },
];

// Sample decks
const sampleDecks = [
  {
    id: 1,
    name: "Mathematics Essentials",
    description: "Core mathematical concepts and formulas",
    cardCount: 45,
    subject: "Mathematics",
    difficulty: "medium",
    averageMastery: 0.78,
    lastStudied: "2024-12-08",
    isPublic: true,
    author: "You",
    likes: 0,
  },
  {
    id: 2,
    name: "Physics Fundamentals",
    description: "Basic physics laws and principles",
    cardCount: 32,
    subject: "Physics",
    difficulty: "hard",
    averageMastery: 0.65,
    lastStudied: "2024-12-07",
    isPublic: false,
    author: "You",
    likes: 0,
  },
  {
    id: 3,
    name: "Chemistry Formulas",
    description: "Important chemical formulas and reactions",
    cardCount: 28,
    subject: "Chemistry",
    difficulty: "medium",
    averageMastery: 0.72,
    lastStudied: "2024-12-06",
    isPublic: true,
    author: "Rahul Sharma",
    likes: 24,
  },
];

const FlashcardGamePageContent = () => {
  // Game states
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [gameMode, setGameMode] = useState("study"); // study, practice, test
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(5); // seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Current session states
  const [currentDeck, setCurrentDeck] = useState(sampleFlashcards);
  const [sessionStats, setSessionStats] = useState({
    cardsStudied: 0,
    correct: 0,
    incorrect: 0,
    timeSpent: 0,
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // UI states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeckDialog, setShowDeckDialog] = useState(false);
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [viewMode, setViewMode] = useState("cards"); // cards, decks

  // Form states
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [newCardSubject, setNewCardSubject] = useState("");
  const [newCardTopic, setNewCardTopic] = useState("");
  const [newCardDifficulty, setNewCardDifficulty] = useState("medium");
  const [newCardTags, setNewCardTags] = useState("");

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (autoPlay && isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && autoPlay && isPlaying) {
      handleNextCard();
    }
    return () => clearInterval(interval);
  }, [autoPlay, isPlaying, timeLeft]);

  const currentCard = currentDeck[currentCardIndex];

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setShowAnswer(true);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < currentDeck.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
      setShowAnswer(false);
      setSelectedAnswer(null);
      if (autoPlay) {
        setTimeLeft(autoPlaySpeed);
      }
    } else {
      // End of deck
      setIsPlaying(false);
      setAutoPlay(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
      setShowAnswer(false);
      setSelectedAnswer(null);
      if (autoPlay) {
        setTimeLeft(autoPlaySpeed);
      }
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...currentDeck].sort(() => Math.random() - 0.5);
    setCurrentDeck(shuffledCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShuffled(!shuffled);
  };

  const handleAnswer = (correct) => {
    setSelectedAnswer(correct);
    setSessionStats((prev) => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correct: correct ? prev.correct + 1 : prev.correct,
      incorrect: correct ? prev.incorrect : prev.incorrect + 1,
    }));

    // Auto-advance after 2 seconds
    setTimeout(() => {
      handleNextCard();
    }, 2000);
  };

  const startAutoPlay = () => {
    setIsPlaying(true);
    setAutoPlay(true);
    setTimeLeft(autoPlaySpeed);
  };

  const stopAutoPlay = () => {
    setIsPlaying(false);
    setAutoPlay(false);
    setTimeLeft(0);
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsPlaying(false);
    setAutoPlay(false);
    setTimeLeft(0);
    setSessionStats({
      cardsStudied: 0,
      correct: 0,
      incorrect: 0,
      timeSpent: 0,
    });
  };

  const getMasteryColor = (mastery) => {
    if (mastery >= 0.8) return "text-green-600";
    if (mastery >= 0.6) return "text-yellow-600";
    return "text-red-600";
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
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const createNewCard = () => {
    const newCard = {
      id: Date.now(),
      front: newCardFront,
      back: newCardBack,
      subject: newCardSubject,
      topic: newCardTopic,
      difficulty: newCardDifficulty,
      tags: newCardTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      mastery: 0,
      lastReviewed: new Date().toISOString().split("T")[0],
      timesReviewed: 0,
      correctStreak: 0,
    };

    setCurrentDeck((prev) => [...prev, newCard]);
    setNewCardFront("");
    setNewCardBack("");
    setNewCardSubject("");
    setNewCardTopic("");
    setNewCardDifficulty("medium");
    setNewCardTags("");
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Flashcard Arena
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Master your subjects with interactive flashcards and spaced repetition
        </p>
      </div>

      {/* Game Mode Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14">
          <TabsTrigger
            value="cards"
            className="text-sm sm:text-base font-medium"
          >
            <Layers className="mr-2 h-4 w-4" />
            Study Cards
          </TabsTrigger>
          <TabsTrigger
            value="decks"
            className="text-sm sm:text-base font-medium"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Manage Decks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="space-y-6">
          {/* Control Panel */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">
                    Card {currentCardIndex + 1} of {currentDeck.length}
                  </div>
                  <Progress
                    value={((currentCardIndex + 1) / currentDeck.length) * 100}
                    className="w-32"
                  />
                  {autoPlay && (
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4" />
                      <span className="text-sm font-mono">{timeLeft}s</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePrevCard}
                    disabled={currentCardIndex === 0}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  {autoPlay ? (
                    <Button size="sm" onClick={stopAutoPlay}>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" onClick={startAutoPlay}>
                      <Play className="mr-2 h-4 w-4" />
                      Auto Play
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleNextCard}
                    disabled={currentCardIndex === currentDeck.length - 1}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline" onClick={handleShuffle}>
                    <Shuffle className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="outline" onClick={resetSession}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setShowStatsDialog(true)}
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Session Stats
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShowCreateDialog(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Card
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Export Deck
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Flashcard */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Card
                className="h-96 cursor-pointer transition-all duration-500 transform hover:scale-105 border-2"
                onClick={handleCardFlip}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{currentCard?.subject}</Badge>
                      {getDifficultyBadge(currentCard?.difficulty)}
                    </div>
                    <CardTitle className="text-sm text-muted-foreground">
                      Question
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center h-64">
                    <div className="space-y-4">
                      <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed">
                        {currentCard?.front}
                      </h2>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>Click to reveal answer</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{currentCard?.topic}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span
                          className={`text-sm font-medium ${getMasteryColor(
                            currentCard?.mastery
                          )}`}
                        >
                          {Math.round((currentCard?.mastery || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-sm text-muted-foreground">
                      Answer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center text-center h-64">
                    <div className="space-y-4 max-w-lg">
                      <div className="text-lg leading-relaxed whitespace-pre-wrap">
                        {currentCard?.back}
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {currentCard?.tags?.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>

          {/* Answer Feedback (for practice mode) */}
          {gameMode === "practice" && isFlipped && selectedAnswer === null && (
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleAnswer(false)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <ThumbsDown className="mr-2 h-5 w-5" />
                Need More Practice
              </Button>
              <Button
                size="lg"
                onClick={() => handleAnswer(true)}
                className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
              >
                <ThumbsUp className="mr-2 h-5 w-5" />
                Got It Right!
              </Button>
            </div>
          )}

          {/* Session Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {sessionStats.cardsStudied}
                </div>
                <div className="text-xs text-muted-foreground">
                  Cards Studied
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {sessionStats.correct}
                </div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {sessionStats.incorrect}
                </div>
                <div className="text-xs text-muted-foreground">Need Review</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {sessionStats.cardsStudied > 0
                    ? Math.round(
                        (sessionStats.correct / sessionStats.cardsStudied) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="decks" className="space-y-6">
          {/* Deck Management Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold">My Flashcard Decks</h2>
              <p className="text-sm text-muted-foreground">
                Organize your flashcards into themed collections
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Deck
            </Button>
          </div>

          {/* Deck Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleDecks.map((deck) => (
              <Card
                key={deck.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base line-clamp-1">
                        {deck.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {deck.description}
                      </p>
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
                          <Play className="mr-2 h-4 w-4" />
                          Study Deck
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Deck
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Deck
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Deck
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {deck.cardCount} cards
                    </span>
                    {getDifficultyBadge(deck.difficulty)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mastery</span>
                      <span>{Math.round(deck.averageMastery * 100)}%</span>
                    </div>
                    <Progress
                      value={deck.averageMastery * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      by {deck.author}
                    </div>
                    <div className="flex items-center space-x-2">
                      {deck.isPublic && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Heart className="h-3 w-3" />
                          <span>{deck.likes}</span>
                        </div>
                      )}
                      <Button
                        size="sm"
                        onClick={() => {
                          setViewMode("cards");
                          resetSession();
                        }}
                      >
                        Study
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Card/Deck Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Flashcard</DialogTitle>
            <DialogDescription>
              Add a new flashcard to your collection
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Question (Front)
              </label>
              <Textarea
                placeholder="Enter the question or prompt..."
                value={newCardFront}
                onChange={(e) => setNewCardFront(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Answer (Back)
              </label>
              <Textarea
                placeholder="Enter the answer and explanation..."
                value={newCardBack}
                onChange={(e) => setNewCardBack(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select
                  value={newCardSubject}
                  onValueChange={setNewCardSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Topic</label>
                <Input
                  placeholder="e.g., Calculus, Mechanics"
                  value={newCardTopic}
                  onChange={(e) => setNewCardTopic(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <Select
                  value={newCardDifficulty}
                  onValueChange={setNewCardDifficulty}
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
                <label className="text-sm font-medium mb-2 block">Tags</label>
                <Input
                  placeholder="Enter tags separated by commas"
                  value={newCardTags}
                  onChange={(e) => setNewCardTags(e.target.value)}
                />
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
                onClick={createNewCard}
                disabled={!newCardFront || !newCardBack || !newCardSubject}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Session Stats Dialog */}
      <Dialog open={showStatsDialog} onOpenChange={setShowStatsDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Session Statistics</DialogTitle>
            <DialogDescription>
              Your current study session performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {sessionStats.cardsStudied}
                </div>
                <div className="text-sm text-muted-foreground">
                  Cards Studied
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {sessionStats.correct}
                </div>
                <div className="text-sm text-muted-foreground">
                  Correct Answers
                </div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {sessionStats.incorrect}
                </div>
                <div className="text-sm text-muted-foreground">Need Review</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {sessionStats.cardsStudied > 0
                    ? Math.round(
                        (sessionStats.correct / sessionStats.cardsStudied) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cards Completed</span>
                  <span>
                    {currentCardIndex + 1} / {currentDeck.length}
                  </span>
                </div>
                <Progress
                  value={((currentCardIndex + 1) / currentDeck.length) * 100}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={() => setShowStatsDialog(false)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Continue Studying
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlashcardGamePageContent;
