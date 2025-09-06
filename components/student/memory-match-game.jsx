"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Zap,
  Trophy,
  Clock,
  Star,
  RefreshCw,
  Target,
  BookOpen,
  Award,
  RotateCcw,
  Eye,
  EyeOff,
  Shuffle,
  Play,
  Pause,
  Globe,
  Calculator,
  Atom,
  Palette,
} from "lucide-react";

// Memory card themes
const cardThemes = {
  vocabulary: {
    name: "English Vocabulary",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Match words with their meanings",
    cards: [
      { id: 1, content: "Abundant", match: "Plentiful", type: "word" },
      { id: 2, content: "Plentiful", match: "Abundant", type: "definition" },
      { id: 3, content: "Meticulous", match: "Very careful", type: "word" },
      { id: 4, content: "Very careful", match: "Meticulous", type: "definition" },
      { id: 5, content: "Eloquent", match: "Well-spoken", type: "word" },
      { id: 6, content: "Well-spoken", match: "Eloquent", type: "definition" },
      { id: 7, content: "Resilient", match: "Able to recover", type: "word" },
      { id: 8, content: "Able to recover", match: "Resilient", type: "definition" },
      { id: 9, content: "Pragmatic", match: "Practical", type: "word" },
      { id: 10, content: "Practical", match: "Pragmatic", type: "definition" },
      { id: 11, content: "Versatile", match: "Multi-skilled", type: "word" },
      { id: 12, content: "Multi-skilled", match: "Versatile", type: "definition" },
    ]
  },
  math: {
    name: "Math Equations",
    icon: <Calculator className="h-5 w-5" />,
    description: "Match equations with their answers",
    cards: [
      { id: 1, content: "15 + 27", match: "42", type: "equation" },
      { id: 2, content: "42", match: "15 + 27", type: "answer" },
      { id: 3, content: "8 × 7", match: "56", type: "equation" },
      { id: 4, content: "56", match: "8 × 7", type: "answer" },
      { id: 5, content: "144 ÷ 12", match: "12", type: "equation" },
      { id: 6, content: "12", match: "144 ÷ 12", type: "answer" },
      { id: 7, content: "9²", match: "81", type: "equation" },
      { id: 8, content: "81", match: "9²", type: "answer" },
      { id: 9, content: "√64", match: "8", type: "equation" },
      { id: 10, content: "8", match: "√64", type: "answer" },
      { id: 11, content: "25% of 80", match: "20", type: "equation" },
      { id: 12, content: "20", match: "25% of 80", type: "answer" },
    ]
  },
  science: {
    name: "Science Facts",
    icon: <Atom className="h-5 w-5" />,
    description: "Match scientific terms with facts",
    cards: [
      { id: 1, content: "H₂O", match: "Water", type: "formula" },
      { id: 2, content: "Water", match: "H₂O", type: "name" },
      { id: 3, content: "CO₂", match: "Carbon Dioxide", type: "formula" },
      { id: 4, content: "Carbon Dioxide", match: "CO₂", type: "name" },
      { id: 5, content: "Photosynthesis", match: "Plants make food", type: "term" },
      { id: 6, content: "Plants make food", match: "Photosynthesis", type: "process" },
      { id: 7, content: "Mitosis", match: "Cell division", type: "term" },
      { id: 8, content: "Cell division", match: "Mitosis", type: "process" },
      { id: 9, content: "Gravity", match: "9.8 m/s²", type: "concept" },
      { id: 10, content: "9.8 m/s²", match: "Gravity", type: "value" },
      { id: 11, content: "DNA", match: "Genetic code", type: "term" },
      { id: 12, content: "Genetic code", match: "DNA", type: "description" },
    ]
  },
  geography: {
    name: "World Geography",
    icon: <Globe className="h-5 w-5" />,
    description: "Match countries with their capitals",
    cards: [
      { id: 1, content: "France", match: "Paris", type: "country" },
      { id: 2, content: "Paris", match: "France", type: "capital" },
      { id: 3, content: "Japan", match: "Tokyo", type: "country" },
      { id: 4, content: "Tokyo", match: "Japan", type: "capital" },
      { id: 5, content: "Australia", match: "Canberra", type: "country" },
      { id: 6, content: "Canberra", match: "Australia", type: "capital" },
      { id: 7, content: "Brazil", match: "Brasília", type: "country" },
      { id: 8, content: "Brasília", match: "Brazil", type: "capital" },
      { id: 9, content: "Egypt", match: "Cairo", type: "country" },
      { id: 10, content: "Cairo", match: "Egypt", type: "capital" },
      { id: 11, content: "Canada", match: "Ottawa", type: "country" },
      { id: 12, content: "Ottawa", match: "Canada", type: "capital" },
    ]
  }
};

const MemoryMatchGameContent = () => {
  const [gameState, setGameState] = useState("menu"); // menu, playing, paused, finished
  const [selectedTheme, setSelectedTheme] = useState("vocabulary");
  const [difficulty, setDifficulty] = useState("easy"); // easy: 6 pairs, medium: 8 pairs, hard: 12 pairs
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(5);

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    gamesPlayed: 0,
    totalMatches: 0,
    bestTime: 0,
    averageScore: 0,
    perfectGames: 0,
  });

  // Game timer
  useEffect(() => {
    let interval;
    if (gameState === "playing" && gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, gameStarted, timeLeft]);

  // Preview timer
  useEffect(() => {
    let interval;
    if (showPreview && previewTime > 0) {
      interval = setInterval(() => {
        setPreviewTime((prev) => {
          if (prev <= 1) {
            setShowPreview(false);
            setGameStarted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPreview, previewTime]);

  const getPairCount = (diff) => {
    switch (diff) {
      case "easy": return 6;
      case "medium": return 8;
      case "hard": return 12;
      default: return 6;
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = (theme, diff) => {
    const pairCount = getPairCount(diff);
    const themeCards = cardThemes[theme].cards.slice(0, pairCount * 2);
    const shuffledCards = shuffleArray(themeCards).map((card, index) => ({
      ...card,
      gameId: index,
      flipped: false,
      matched: false,
    }));

    setSelectedTheme(theme);
    setDifficulty(diff);
    setGameCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setScore(0);
    setTimeLeft(diff === "easy" ? 120 : diff === "medium" ? 180 : 240);
    setGameStarted(false);
    setShowPreview(true);
    setPreviewTime(5);
    setGameState("playing");
  };

  const handleCardClick = (cardId) => {
    if (!gameStarted || showPreview) return;
    
    const card = gameCards.find(c => c.gameId === cardId);
    if (card.flipped || card.matched || flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setGameCards(prev => prev.map(c => 
      c.gameId === cardId ? { ...c, flipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setAttempts(prev => prev + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds) => {
    const [firstId, secondId] = flippedCardIds;
    const firstCard = gameCards.find(c => c.gameId === firstId);
    const secondCard = gameCards.find(c => c.gameId === secondId);

    setTimeout(() => {
      if (firstCard.content === secondCard.match || firstCard.match === secondCard.content) {
        // Match found
        setMatchedPairs(prev => [...prev, firstCard.id, secondCard.id]);
        setGameCards(prev => prev.map(c => 
          c.gameId === firstId || c.gameId === secondId 
            ? { ...c, matched: true, flipped: true }
            : c
        ));
        
        // Calculate score based on time and attempts
        const timeBonus = Math.max(0, Math.floor(timeLeft / 10));
        const attemptPenalty = Math.max(0, attempts * 2);
        const matchScore = 100 + timeBonus - attemptPenalty;
        setScore(prev => prev + Math.max(matchScore, 20));

        // Check if game is complete
        const newMatchCount = matchedPairs.length + 2;
        if (newMatchCount === gameCards.length) {
          endGame();
        }
      } else {
        // No match - flip cards back
        setGameCards(prev => prev.map(c => 
          c.gameId === firstId || c.gameId === secondId 
            ? { ...c, flipped: false }
            : c
        ));
      }
      setFlippedCards([]);
    }, 1000);
  };

  const endGame = () => {
    setGameState("finished");
    const completionBonus = matchedPairs.length === gameCards.length ? 500 : 0;
    const finalScore = score + completionBonus;
    setScore(finalScore);
    
    setSessionStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      totalMatches: prev.totalMatches + (matchedPairs.length / 2),
      averageScore: Math.round((prev.averageScore * prev.gamesPlayed + finalScore) / (prev.gamesPlayed + 1)),
      perfectGames: matchedPairs.length === gameCards.length ? prev.perfectGames + 1 : prev.perfectGames,
    }));
  };

  const resetGame = () => {
    setGameState("menu");
    setGameCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setShowPreview(false);
    setGameStarted(false);
  };

  const pauseGame = () => {
    setGameState("paused");
  };

  const resumeGame = () => {
    setGameState("playing");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case "easy":
        return <Badge className="bg-green-500">Easy (6 pairs)</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium (8 pairs)</Badge>;
      case "hard":
        return <Badge className="bg-red-500">Hard (12 pairs)</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCardStyle = (card) => {
    if (card.matched) {
      return "bg-green-100 dark:bg-green-950/20 border-green-300 dark:border-green-700";
    }
    if (card.flipped || showPreview) {
      return "bg-blue-100 dark:bg-blue-950/20 border-blue-300 dark:border-blue-700";
    }
    return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Memory Match Challenge
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Test your memory by matching pairs of educational cards
        </p>
      </div>

      {gameState === "menu" && (
        <div className=" space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">87</div>
                <div className="text-xs text-muted-foreground">Games Played</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">432</div>
                <div className="text-xs text-muted-foreground">Total Matches</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">1,250</div>
                <div className="text-xs text-muted-foreground">Average Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">23</div>
                <div className="text-xs text-muted-foreground">Perfect Games</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">2:15</div>
                <div className="text-xs text-muted-foreground">Best Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Selection */}
          <Tabs defaultValue="vocabulary" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="math">Math</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
            </TabsList>

            {Object.entries(cardThemes).map(([themeKey, theme]) => (
              <TabsContent key={themeKey} value={themeKey} className="space-y-4">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center space-x-2">
                      {theme.icon}
                      <span>{theme.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground">
                      {theme.description}
                    </p>
                    <div className="grid gap-4">
                      <Button
                        size="lg"
                        onClick={() => startGame(themeKey, "easy")}
                        className="h-16 text-lg bg-green-500 hover:bg-green-600"
                      >
                        <div className="text-center">
                          <div className="font-bold">Easy</div>
                          <div className="text-sm opacity-90">6 pairs • 2 minutes</div>
                        </div>
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => startGame(themeKey, "medium")}
                        className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
                      >
                        <div className="text-center">
                          <div className="font-bold">Medium</div>
                          <div className="text-sm opacity-90">8 pairs • 3 minutes</div>
                        </div>
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => startGame(themeKey, "hard")}
                        className="h-16 text-lg bg-red-500 hover:bg-red-600"
                      >
                        <div className="text-center">
                          <div className="font-bold">Hard</div>
                          <div className="text-sm opacity-90">12 pairs • 4 minutes</div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {(gameState === "playing" || gameState === "paused") && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Game Header */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getDifficultyBadge(difficulty)}
                  <div className="flex items-center space-x-1">
                    {cardThemes[selectedTheme].icon}
                    <span className="text-sm font-medium">{cardThemes[selectedTheme].name}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className={`font-mono ${timeLeft <= 30 ? 'text-red-600' : ''}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-bold">{score}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-bold">{matchedPairs.length / 2}/{gameCards.length / 2}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Progress 
                  value={(matchedPairs.length / gameCards.length) * 100} 
                  className="flex-1"
                />
                <div className="ml-4">
                  {gameState === "playing" ? (
                    <Button variant="outline" size="sm" onClick={pauseGame}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={resumeGame}>
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview/Pause Overlay */}
          {(showPreview || gameState === "paused") && (
            <Card className="border-2 border-blue-500">
              <CardContent className="p-8 text-center">
                {showPreview ? (
                  <div className="space-y-4">
                    <Eye className="h-16 w-16 mx-auto text-blue-600" />
                    <h2 className="text-2xl font-bold">Study the cards!</h2>
                    <p className="text-muted-foreground">
                      Memorize the positions before the game starts
                    </p>
                    <div className="text-3xl font-bold text-blue-600">{previewTime}</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Pause className="h-16 w-16 mx-auto text-gray-600" />
                    <h2 className="text-2xl font-bold">Game Paused</h2>
                    <Button onClick={resumeGame}>
                      <Play className="mr-2 h-4 w-4" />
                      Resume Game
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Game Board */}
          <div className={`grid gap-4 ${
            gameCards.length <= 12 ? 'grid-cols-3 sm:grid-cols-4' : 
            gameCards.length <= 16 ? 'grid-cols-4 sm:grid-cols-4' : 
            'grid-cols-4 sm:grid-cols-6'
          }`}>
            {gameCards.map((card) => (
              <Card
                key={card.gameId}
                className={`aspect-square transition-all duration-300 ${getCardStyle(card)}`}
                onClick={() => handleCardClick(card.gameId)}
              >
                <CardContent className="p-2 h-full flex items-center justify-center">
                  <div className="text-center">
                    {(card.flipped || card.matched || showPreview) ? (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">
                          {card.type}
                        </div>
                        <div className="text-sm font-bold break-words">
                          {card.content}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Brain className="h-8 w-8 mx-auto text-gray-400" />
                        <div className="text-xs text-gray-400">?</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-600">{matchedPairs.length / 2}</div>
                <div className="text-xs text-muted-foreground">Matches Found</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-600">{attempts}</div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-600">
                  {attempts > 0 ? Math.round((matchedPairs.length / 2 / attempts) * 100) : 0}%
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <Trophy className="h-16 w-16 mx-auto text-yellow-600" />
                <h2 className="text-2xl font-bold">Memory Challenge Complete!</h2>
                <p className="text-muted-foreground">
                  {matchedPairs.length === gameCards.length 
                    ? "Perfect! You found all pairs!" 
                    : "Good effort! Keep practicing to improve your memory."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{matchedPairs.length / 2}</div>
                  <div className="text-sm text-muted-foreground">Pairs Matched</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{attempts}</div>
                  <div className="text-sm text-muted-foreground">Total Attempts</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatTime(Math.max(0, (difficulty === "easy" ? 120 : difficulty === "medium" ? 180 : 240) - timeLeft))}
                  </div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>

              {matchedPairs.length === gameCards.length && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="text-yellow-800 dark:text-yellow-200 font-medium">
                    🎉 Perfect Game! Bonus points awarded!
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <Button onClick={resetGame}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
                <Button variant="outline" onClick={resetGame}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Back to Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MemoryMatchGameContent;