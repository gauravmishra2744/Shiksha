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
  Calculator,
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
  Brain,
  Plus,
  Minus,
  X,
  Divide,
} from "lucide-react";

// Math puzzle generators
const generateEquation = (difficulty, operation) => {
  let num1, num2, answer, equation, options;
  
  switch (difficulty) {
    case "easy":
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
    case "medium":
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
      break;
    case "hard":
      num1 = Math.floor(Math.random() * 100) + 20;
      num2 = Math.floor(Math.random() * 100) + 20;
      break;
  }

  switch (operation) {
    case "addition":
      answer = num1 + num2;
      equation = `${num1} + ${num2} = ?`;
      break;
    case "subtraction":
      if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
      answer = num1 - num2;
      equation = `${num1} - ${num2} = ?`;
      break;
    case "multiplication":
      num1 = Math.floor(num1 / 5) + 1; // Smaller numbers for multiplication
      num2 = Math.floor(num2 / 5) + 1;
      answer = num1 * num2;
      equation = `${num1} × ${num2} = ?`;
      break;
    case "division":
      answer = Math.floor(num2 / 5) + 1;
      num1 = answer * (Math.floor(num1 / 10) + 2);
      equation = `${num1} ÷ ${Math.floor(num1 / answer)} = ?`;
      break;
    case "mixed":
      const ops = ["addition", "subtraction", "multiplication"];
      return generateEquation(difficulty, ops[Math.floor(Math.random() * ops.length)]);
  }

  // Generate multiple choice options
  options = [answer];
  while (options.length < 4) {
    let wrongAnswer;
    if (operation === "division") {
      wrongAnswer = answer + Math.floor(Math.random() * 10) - 5;
    } else {
      wrongAnswer = answer + Math.floor(Math.random() * 20) - 10;
    }
    if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  
  options.sort(() => Math.random() - 0.5);

  return {
    equation,
    answer,
    options,
    explanation: `The correct answer is ${answer}`,
    points: difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30,
  };
};

const puzzleTypes = {
  pattern: {
    name: "Number Patterns",
    description: "Find the missing number in the sequence",
    generator: (difficulty) => {
      const patterns = {
        easy: [
          { sequence: [2, 4, 6, 8, "?"], answer: 10, rule: "+2" },
          { sequence: [1, 3, 5, 7, "?"], answer: 9, rule: "+2" },
          { sequence: [5, 10, 15, 20, "?"], answer: 25, rule: "+5" },
        ],
        medium: [
          { sequence: [2, 6, 18, 54, "?"], answer: 162, rule: "×3" },
          { sequence: [1, 4, 9, 16, "?"], answer: 25, rule: "squares" },
          { sequence: [2, 5, 11, 23, "?"], answer: 47, rule: "double +1" },
        ],
        hard: [
          { sequence: [1, 1, 2, 3, 5, 8, "?"], answer: 13, rule: "fibonacci" },
          { sequence: [2, 6, 12, 20, 30, "?"], answer: 42, rule: "n(n+1)" },
          { sequence: [1, 8, 27, 64, "?"], answer: 125, rule: "cubes" },
        ],
      };
      
      const patternData = patterns[difficulty][Math.floor(Math.random() * patterns[difficulty].length)];
      const options = [patternData.answer];
      
      while (options.length < 4) {
        let wrongAnswer = patternData.answer + Math.floor(Math.random() * 20) - 10;
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
          options.push(wrongAnswer);
        }
      }
      
      return {
        equation: `Find the next number: ${patternData.sequence.join(", ")}`,
        answer: patternData.answer,
        options: options.sort(() => Math.random() - 0.5),
        explanation: `The pattern follows: ${patternData.rule}`,
        points: difficulty === "easy" ? 15 : difficulty === "medium" ? 25 : 35,
      };
    },
  },
  geometry: {
    name: "Geometry Puzzles",
    description: "Solve shape and area problems",
    generator: (difficulty) => {
      const problems = {
        easy: [
          { 
            question: "What is the area of a rectangle with length 6 and width 4?",
            answer: 24,
            formula: "Area = length × width = 6 × 4 = 24"
          },
          { 
            question: "How many sides does a hexagon have?",
            answer: 6,
            formula: "A hexagon is a 6-sided polygon"
          },
        ],
        medium: [
          { 
            question: "What is the area of a triangle with base 8 and height 6?",
            answer: 24,
            formula: "Area = (base × height) ÷ 2 = (8 × 6) ÷ 2 = 24"
          },
          { 
            question: "What is the circumference of a circle with radius 5? (Use π = 3.14)",
            answer: 31.4,
            formula: "Circumference = 2πr = 2 × 3.14 × 5 = 31.4"
          },
        ],
        hard: [
          { 
            question: "What is the volume of a cube with side length 4?",
            answer: 64,
            formula: "Volume = side³ = 4³ = 64"
          },
          { 
            question: "What is the area of a circle with radius 3? (Use π = 3.14)",
            answer: 28.26,
            formula: "Area = πr² = 3.14 × 3² = 3.14 × 9 = 28.26"
          },
        ],
      };
      
      const problem = problems[difficulty][Math.floor(Math.random() * problems[difficulty].length)];
      const options = [problem.answer];
      
      while (options.length < 4) {
        let wrongAnswer = Math.round((problem.answer + Math.floor(Math.random() * 20) - 10) * 100) / 100;
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
          options.push(wrongAnswer);
        }
      }
      
      return {
        equation: problem.question,
        answer: problem.answer,
        options: options.sort(() => Math.random() - 0.5),
        explanation: problem.formula,
        points: difficulty === "easy" ? 15 : difficulty === "medium" ? 25 : 35,
      };
    },
  },
};

const MathPuzzleGameContent = () => {
  const [gameState, setGameState] = useState("menu"); // menu, playing, finished
  const [difficulty, setDifficulty] = useState("easy");
  const [puzzleType, setPuzzleType] = useState("arithmetic");
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [puzzles, setPuzzles] = useState([]);
  const [completedPuzzles, setCompletedPuzzles] = useState([]);
  const [streak, setStreak] = useState(0);

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    puzzlesSolved: 0,
    totalScore: 0,
    accuracy: 0,
    bestStreak: 0,
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

  const generatePuzzles = (type, diff, count = 10) => {
    const generatedPuzzles = [];
    for (let i = 0; i < count; i++) {
      if (type === "arithmetic") {
        const operations = ["addition", "subtraction", "multiplication", "mixed"];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        generatedPuzzles.push(generateEquation(diff, operation));
      } else if (puzzleTypes[type]) {
        generatedPuzzles.push(puzzleTypes[type].generator(diff));
      }
    }
    return generatedPuzzles;
  };

  const startGame = (selectedDifficulty, selectedType) => {
    setDifficulty(selectedDifficulty);
    setPuzzleType(selectedType);
    const newPuzzles = generatePuzzles(selectedType, selectedDifficulty);
    setPuzzles(newPuzzles);
    setCurrentPuzzleIndex(0);
    setCurrentPuzzle(newPuzzles[0]);
    setScore(0);
    setTimeLeft(120); // 2 minutes
    setHintsUsed(0);
    setShowHint(false);
    setCompletedPuzzles([]);
    setStreak(0);
    setSelectedAnswer(null);
    setGameState("playing");
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    const isCorrect = selectedAnswer === currentPuzzle.answer;
    
    if (isCorrect) {
      const points = currentPuzzle.points - (hintsUsed * 5);
      setScore(prev => prev + Math.max(points, 5));
      setStreak(prev => prev + 1);
      setCompletedPuzzles(prev => [...prev, { ...currentPuzzle, correct: true }]);
    } else {
      setStreak(0);
      setCompletedPuzzles(prev => [...prev, { ...currentPuzzle, correct: false }]);
    }

    // Show result for 2 seconds, then next puzzle
    setTimeout(() => {
      if (currentPuzzleIndex < puzzles.length - 1) {
        const nextIndex = currentPuzzleIndex + 1;
        setCurrentPuzzleIndex(nextIndex);
        setCurrentPuzzle(puzzles[nextIndex]);
        setSelectedAnswer(null);
        setHintsUsed(0);
        setShowHint(false);
      } else {
        endGame();
      }
    }, 2000);
  };

  const useHint = () => {
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
  };

  const endGame = () => {
    setGameState("finished");
    setSessionStats({
      puzzlesSolved: completedPuzzles.filter(p => p.correct).length,
      totalScore: score,
      accuracy: completedPuzzles.length > 0 ? 
        Math.round((completedPuzzles.filter(p => p.correct).length / completedPuzzles.length) * 100) : 0,
      bestStreak: Math.max(streak, sessionStats.bestStreak),
    });
  };

  const resetGame = () => {
    setGameState("menu");
    setSelectedAnswer(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const getTypeIcon = (type) => {
    switch (type) {
      case "arithmetic":
        return <Calculator className="h-5 w-5" />;
      case "pattern":
        return <Target className="h-5 w-5" />;
      case "geometry":
        return <Brain className="h-5 w-5" />;
      default:
        return <Calculator className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Math Puzzle Challenge
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Solve mathematical puzzles to sharpen your problem-solving skills
        </p>
      </div>

      {gameState === "menu" && (
        <div className=" space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">234</div>
                <div className="text-xs text-muted-foreground">Puzzles Solved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">3,650</div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">92%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">15</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </CardContent>
            </Card>
          </div>

          {/* Game Type Selection */}
          <Tabs defaultValue="arithmetic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="arithmetic">Arithmetic</TabsTrigger>
              <TabsTrigger value="pattern">Patterns</TabsTrigger>
              <TabsTrigger value="geometry">Geometry</TabsTrigger>
            </TabsList>

            <TabsContent value="arithmetic" className="space-y-4">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Calculator className="h-6 w-6 text-blue-600" />
                    <span>Arithmetic Puzzles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Practice addition, subtraction, multiplication, and division
                  </p>
                  <div className="grid gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "arithmetic")}
                      className="h-16 text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-sm opacity-90">Numbers 1-20 • 10 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "arithmetic")}
                      className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-sm opacity-90">Numbers 10-50 • 20 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "arithmetic")}
                      className="h-16 text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-sm opacity-90">Numbers 20-100 • 30 points each</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pattern" className="space-y-4">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Target className="h-6 w-6 text-purple-600" />
                    <span>Number Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Find patterns and sequences in number series
                  </p>
                  <div className="grid gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "pattern")}
                      className="h-16 text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-sm opacity-90">Simple sequences • 15 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "pattern")}
                      className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-sm opacity-90">Complex patterns • 25 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "pattern")}
                      className="h-16 text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-sm opacity-90">Advanced sequences • 35 points each</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geometry" className="space-y-4">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Brain className="h-6 w-6 text-indigo-600" />
                    <span>Geometry Puzzles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground">
                    Solve problems involving shapes, areas, and volumes
                  </p>
                  <div className="grid gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "geometry")}
                      className="h-16 text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-sm opacity-90">Basic shapes • 15 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "geometry")}
                      className="h-16 text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-sm opacity-90">Area & perimeter • 25 points each</div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "geometry")}
                      className="h-16 text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-sm opacity-90">Volume & complex shapes • 35 points each</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {gameState === "playing" && currentPuzzle && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Game Header */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getDifficultyBadge(difficulty)}
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(puzzleType)}
                    <span className="text-sm font-medium capitalize">{puzzleType}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentPuzzleIndex + 1} of {puzzles.length}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className={`font-mono ${timeLeft <= 20 ? 'text-red-600' : ''}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-bold">{score}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span className="font-bold">{streak}</span>
                  </div>
                </div>
              </div>
              <Progress 
                value={((currentPuzzleIndex + 1) / puzzles.length) * 100} 
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* Main Puzzle Area */}
          <Card className="border-2">
            <CardContent className="p-8 text-center space-y-6">
              {/* Question */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
                  {currentPuzzle.equation}
                </h2>
              </div>

              {/* Hint */}
              {showHint && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">{currentPuzzle.explanation}</span>
                  </div>
                </div>
              )}

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-2 gap-4">
                {currentPuzzle.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option ? "default" : "outline"}
                    onClick={() => handleAnswerSelect(option)}
                    className="h-16 text-xl font-bold"
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={submitAnswer} 
                  disabled={selectedAnswer === null}
                  className="px-8"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Answer
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

              {/* Show result after submission */}
              {selectedAnswer !== null && (
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === currentPuzzle.answer 
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className={`font-medium ${
                    selectedAnswer === currentPuzzle.answer 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {selectedAnswer === currentPuzzle.answer ? '🎉 Correct!' : '❌ Incorrect!'}
                  </div>
                  <div className="text-sm mt-2 text-muted-foreground">
                    {currentPuzzle.explanation}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-600">
                  {completedPuzzles.filter(p => p.correct).length}
                </div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-red-600">
                  {completedPuzzles.filter(p => !p.correct).length}
                </div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-600">{streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-600">{hintsUsed}</div>
                <div className="text-xs text-muted-foreground">Hints</div>
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
                <h2 className="text-2xl font-bold">Puzzle Challenge Complete!</h2>
                <p className="text-muted-foreground">
                  Excellent work on your mathematical thinking!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{sessionStats.puzzlesSolved}</div>
                  <div className="text-sm text-muted-foreground">Puzzles Solved</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{sessionStats.totalScore}</div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{sessionStats.accuracy}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{sessionStats.bestStreak}</div>
                  <div className="text-sm text-muted-foreground">Best Streak</div>
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

export default MathPuzzleGameContent;