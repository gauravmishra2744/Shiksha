"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Type,
  Zap,
  Trophy,
  Clock,
  Star,
  RefreshCw,
  Lightbulb,
  Target,
  BookOpen,
  Award,
  CheckCircle,
  RotateCcw,
  Shuffle,
} from "lucide-react";

// Sample word data
const wordLevels = {
  easy: [
    {
      word: "APPLE",
      hint: "A red or green fruit",
      category: "Food",
      points: 10,
    },
    {
      word: "HOUSE",
      hint: "A place where people live",
      category: "Places",
      points: 10,
    },
    { word: "HAPPY", hint: "Feeling of joy", category: "Emotions", points: 10 },
    {
      word: "WATER",
      hint: "Clear liquid we drink",
      category: "Nature",
      points: 10,
    },
  ],
  medium: [
    {
      word: "JOURNEY",
      hint: "A long trip or adventure",
      category: "Travel",
      points: 20,
    },
    {
      word: "SCIENCE",
      hint: "Study of natural world",
      category: "Education",
      points: 20,
    },
    {
      word: "RAINBOW",
      hint: "Colorful arc in the sky",
      category: "Nature",
      points: 20,
    },
    {
      word: "FREEDOM",
      hint: "State of being free",
      category: "Concepts",
      points: 20,
    },
  ],
  hard: [
    {
      word: "BUTTERFLY",
      hint: "Colorful flying insect",
      category: "Animals",
      points: 30,
    },
    {
      word: "ADVENTURE",
      hint: "Exciting and risky experience",
      category: "Activities",
      points: 30,
    },
    {
      word: "KNOWLEDGE",
      hint: "Information and understanding",
      category: "Education",
      points: 30,
    },
    {
      word: "FRIENDSHIP",
      hint: "Bond between friends",
      category: "Relationships",
      points: 30,
    },
  ],
};

const WordBuildingGameContent = () => {
  const [gameState, setGameState] = useState("menu"); // menu, playing, finished
  const [difficulty, setDifficulty] = useState("easy");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameWords, setGameWords] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    wordsCompleted: 0,
    totalScore: 0,
    accuracy: 0,
    timeSpent: 0,
  });

  useEffect(() => {
    let interval;
    if (gameState === "playing" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const scrambleWord = (word) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    const words = [...wordLevels[selectedDifficulty]];
    setGameWords(words.sort(() => Math.random() - 0.5));
    setCurrentWordIndex(0);
    const firstWord = words[0];
    setCurrentWord(firstWord.word);
    setScrambledWord(scrambleWord(firstWord.word));
    setScore(0);
    setTimeLeft(60);
    setHintsUsed(0);
    setShowHint(false);
    setCompletedWords([]);
    setAttempts(0);
    setUserInput("");
    setGameState("playing");
  };

  const checkAnswer = () => {
    const isCorrect = userInput.toUpperCase() === currentWord;
    setAttempts((prev) => prev + 1);

    if (isCorrect) {
      const currentWordData = gameWords[currentWordIndex];
      const points = currentWordData.points - hintsUsed * 5;
      setScore((prev) => prev + Math.max(points, 5));
      setCompletedWords((prev) => [
        ...prev,
        { ...currentWordData, attempts, hintsUsed },
      ]);

      if (currentWordIndex < gameWords.length - 1) {
        // Next word
        const nextIndex = currentWordIndex + 1;
        const nextWord = gameWords[nextIndex];
        setCurrentWordIndex(nextIndex);
        setCurrentWord(nextWord.word);
        setScrambledWord(scrambleWord(nextWord.word));
        setUserInput("");
        setHintsUsed(0);
        setShowHint(false);
        setAttempts(0);
      } else {
        // Game complete
        endGame();
      }
    } else {
      // Wrong answer - shake animation could be added here
      setUserInput("");
    }
  };

  const useHint = () => {
    setHintsUsed((prev) => prev + 1);
    setShowHint(true);
  };

  const reshuffleWord = () => {
    setScrambledWord(scrambleWord(currentWord));
  };

  const endGame = () => {
    setGameState("finished");
    setSessionStats({
      wordsCompleted: completedWords.length,
      totalScore: score,
      accuracy:
        completedWords.length > 0
          ? Math.round(
              (completedWords.length / (completedWords.length + attempts)) * 100
            )
          : 0,
      timeSpent: 60 - timeLeft,
    });
  };

  const resetGame = () => {
    setGameState("menu");
    setUserInput("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case "easy":
        return <Badge className="bg-green-500">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-500">Hard</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Word Building Challenge
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Unscramble words to build your vocabulary and spelling skills
        </p>
      </div>

      {gameState === "menu" && (
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-xs text-muted-foreground">
                  Words Completed
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">2,450</div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">87%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Difficulty Selection */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Type className="h-6 w-6 text-blue-600" />
                <span>Choose Difficulty</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Button
                  size="lg"
                  onClick={() => startGame("easy")}
                  className="h-16 text-lg bg-green-500 hover:bg-green-600"
                >
                  <div className="text-center">
                    <div className="font-bold">Easy</div>
                    <div className="text-sm opacity-90">
                      4-5 letter words • 10 points each
                    </div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  onClick={() => startGame("medium")}
                  className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
                >
                  <div className="text-center">
                    <div className="font-bold">Medium</div>
                    <div className="text-sm opacity-90">
                      6-7 letter words • 20 points each
                    </div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  onClick={() => startGame("hard")}
                  className="h-16 text-lg bg-red-500 hover:bg-red-600"
                >
                  <div className="text-center">
                    <div className="font-bold">Hard</div>
                    <div className="text-sm opacity-90">
                      8+ letter words • 30 points each
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {gameState === "playing" && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Header */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getDifficultyBadge(difficulty)}
                  <div className="text-sm text-muted-foreground">
                    Word {currentWordIndex + 1} of {gameWords.length}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span
                      className={`font-mono ${
                        timeLeft <= 10 ? "text-red-600" : ""
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-bold">{score}</span>
                  </div>
                </div>
              </div>
              <Progress
                value={((currentWordIndex + 1) / gameWords.length) * 100}
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* Main Game Area */}
          <Card className="border-2">
            <CardContent className="p-8 text-center space-y-6">
              {/* Category */}
              <Badge variant="outline" className="text-lg px-4 py-1">
                {gameWords[currentWordIndex]?.category}
              </Badge>

              {/* Scrambled Word */}
              <div className="space-y-2">
                <h2 className="text-sm text-muted-foreground">
                  Unscramble this word:
                </h2>
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 tracking-wider">
                  {scrambledWord}
                </div>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">
                      Hint: {gameWords[currentWordIndex]?.hint}
                    </span>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="space-y-4">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Type your answer here..."
                  className="text-center text-2xl h-16 font-bold"
                  autoFocus
                />

                <div className="flex justify-center space-x-2">
                  <Button onClick={checkAnswer} disabled={!userInput.trim()}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                  <Button variant="outline" onClick={reshuffleWord}>
                    <Shuffle className="mr-2 h-4 w-4" />
                    Reshuffle
                  </Button>
                  <Button
                    variant="outline"
                    onClick={useHint}
                    disabled={showHint}
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Hint (-5 pts)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-600">
                  {completedWords.length}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-600">
                  {attempts}
                </div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-600">
                  {hintsUsed}
                </div>
                <div className="text-xs text-muted-foreground">Hints Used</div>
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
                <h2 className="text-2xl font-bold">Game Complete!</h2>
                <p className="text-muted-foreground">
                  Great job on your word building skills!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {sessionStats.wordsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Words Completed
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {sessionStats.totalScore}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Final Score
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {sessionStats.accuracy}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatTime(sessionStats.timeSpent)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Time Spent
                  </div>
                </div>
              </div>

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

export default WordBuildingGameContent;
