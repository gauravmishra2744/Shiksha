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
  Brain,
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
  Puzzle,
  Grid3X3,
  Move,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Logic puzzle data and generators
const puzzleTypes = {
  sudoku: {
    name: "Mini Sudoku",
    description: "Fill the grid with numbers 1-4",
    generator: (difficulty) => {
      // Generate 4x4 Sudoku for simplicity
      const solutions = {
        easy: [
          [1, 2, 3, 4],
          [3, 4, 1, 2],
          [2, 3, 4, 1],
          [4, 1, 2, 3],
        ],
        medium: [
          [2, 1, 4, 3],
          [4, 3, 2, 1],
          [1, 4, 3, 2],
          [3, 2, 1, 4],
        ],
        hard: [
          [3, 4, 1, 2],
          [1, 2, 3, 4],
          [4, 1, 2, 3],
          [2, 3, 4, 1],
        ],
      };

      const solution = solutions[difficulty];
      const puzzle = solution.map((row) => [...row]);

      // Remove numbers based on difficulty
      const cellsToRemove =
        difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10;
      for (let i = 0; i < cellsToRemove; i++) {
        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);
        puzzle[row][col] = 0;
      }

      return {
        puzzle,
        solution,
        type: "sudoku",
        points: difficulty === "easy" ? 20 : difficulty === "medium" ? 35 : 50,
      };
    },
  },
  slidingPuzzle: {
    name: "Sliding Puzzle",
    description: "Arrange numbers in order",
    generator: (difficulty) => {
      const size = 3; // 3x3 grid
      const target = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 0],
      ]; // 0 represents empty space

      // Create shuffled puzzle
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
      const shuffled = [...numbers].sort(() => Math.random() - 0.5);

      const puzzle = [];
      for (let i = 0; i < size; i++) {
        puzzle.push(shuffled.slice(i * size, (i + 1) * size));
      }

      return {
        puzzle,
        solution: target,
        type: "sliding",
        size,
        points: difficulty === "easy" ? 25 : difficulty === "medium" ? 40 : 60,
      };
    },
  },
  pathfinding: {
    name: "Path Finder",
    description: "Find the shortest path from start to end",
    generator: (difficulty) => {
      const sizes = { easy: 5, medium: 6, hard: 7 };
      const size = sizes[difficulty];

      // Create grid with obstacles
      const grid = Array(size)
        .fill()
        .map(() => Array(size).fill(0));

      // Add obstacles
      const obstacles =
        difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 8;
      for (let i = 0; i < obstacles; i++) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        if (
          (row !== 0 || col !== 0) &&
          (row !== size - 1 || col !== size - 1)
        ) {
          grid[row][col] = 1; // 1 = obstacle
        }
      }

      // Set start and end
      grid[0][0] = 2; // 2 = start
      grid[size - 1][size - 1] = 3; // 3 = end

      return {
        grid,
        start: [0, 0],
        end: [size - 1, size - 1],
        type: "pathfinding",
        size,
        points: difficulty === "easy" ? 30 : difficulty === "medium" ? 45 : 65,
      };
    },
  },
  sequence: {
    name: "Logic Sequences",
    description: "Complete the logical sequence",
    generator: (difficulty) => {
      const sequences = {
        easy: [
          {
            pattern: ["A", "B", "C", "D", "?"],
            answer: "E",
            options: ["E", "F", "G", "H"],
            explanation: "Alphabetical sequence",
          },
          {
            pattern: ["🔴", "🔵", "🔴", "🔵", "?"],
            answer: "🔴",
            options: ["🔴", "🔵", "🟡", "🟢"],
            explanation: "Alternating colors",
          },
          {
            pattern: ["▲", "▲", "●", "▲", "▲", "●", "?"],
            answer: "▲",
            options: ["▲", "●", "■", "♦"],
            explanation: "Pattern: 2 triangles, 1 circle",
          },
        ],
        medium: [
          {
            pattern: ["2", "4", "8", "16", "?"],
            answer: "32",
            options: ["32", "24", "20", "28"],
            explanation: "Each number doubles",
          },
          {
            pattern: ["🔴", "🔵", "🔵", "🔴", "🔴", "🔴", "?"],
            answer: "🔵",
            options: ["🔴", "🔵", "🟡", "🟢"],
            explanation: "Fibonacci pattern with colors",
          },
          {
            pattern: ["A1", "B2", "C3", "D4", "?"],
            answer: "E5",
            options: ["E5", "F6", "D5", "E4"],
            explanation: "Letter + corresponding number",
          },
        ],
        hard: [
          {
            pattern: ["Z", "Y", "X", "W", "V", "?"],
            answer: "U",
            options: ["U", "T", "S", "R"],
            explanation: "Reverse alphabetical order",
          },
          {
            pattern: ["1", "4", "9", "16", "25", "?"],
            answer: "36",
            options: ["36", "30", "35", "32"],
            explanation: "Perfect squares: 1², 2², 3², 4², 5², 6²",
          },
          {
            pattern: ["🔴", "🔴", "🔵", "🔴", "🔵", "🔵", "🔴", "?"],
            answer: "🔵",
            options: ["🔴", "🔵", "🟡", "🟢"],
            explanation: "Complex alternating pattern",
          },
        ],
      };

      const sequenceList = sequences[difficulty];
      const selected =
        sequenceList[Math.floor(Math.random() * sequenceList.length)];

      return {
        pattern: selected.pattern,
        answer: selected.answer,
        options: selected.options.sort(() => Math.random() - 0.5),
        explanation: selected.explanation,
        type: "sequence",
        points: difficulty === "easy" ? 15 : difficulty === "medium" ? 25 : 40,
      };
    },
  },
};

const LogicPuzzleGameContent = () => {
  const [gameState, setGameState] = useState("menu"); // menu, playing, finished
  const [difficulty, setDifficulty] = useState("easy");
  const [puzzleType, setPuzzleType] = useState("sequence");
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [puzzles, setPuzzles] = useState([]);
  const [completedPuzzles, setCompletedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Game specific states
  const [sudokuGrid, setSudokuGrid] = useState([]);
  const [slidingGrid, setSlidingGrid] = useState([]);
  const [emptyPos, setEmptyPos] = useState([2, 2]);
  const [pathGrid, setPathGrid] = useState([]);
  const [playerPath, setPlayerPath] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    puzzlesSolved: 0,
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

  const generatePuzzles = (type, diff, count = 5) => {
    const generatedPuzzles = [];
    for (let i = 0; i < count; i++) {
      if (puzzleTypes[type]) {
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
    const firstPuzzle = newPuzzles[0];
    setCurrentPuzzle(firstPuzzle);
    initializePuzzle(firstPuzzle);
    setScore(0);
    setTimeLeft(180);
    setHintsUsed(0);
    setShowHint(false);
    setCompletedPuzzles([]);
    setAttempts(0);
    setSelectedAnswer(null);
    setGameState("playing");
  };

  const initializePuzzle = (puzzle) => {
    if (puzzle.type === "sudoku") {
      setSudokuGrid(puzzle.puzzle.map((row) => [...row]));
    } else if (puzzle.type === "sliding") {
      setSlidingGrid(puzzle.puzzle.map((row) => [...row]));
      // Find empty position
      for (let i = 0; i < puzzle.size; i++) {
        for (let j = 0; j < puzzle.size; j++) {
          if (puzzle.puzzle[i][j] === 0) {
            setEmptyPos([i, j]);
          }
        }
      }
    } else if (puzzle.type === "pathfinding") {
      setPathGrid(puzzle.grid.map((row) => [...row]));
      setPlayerPath([puzzle.start]);
    }
  };

  const handleSudokuInput = (row, col, value) => {
    if (currentPuzzle.puzzle[row][col] !== 0) return; // Can't change pre-filled cells

    const newGrid = [...sudokuGrid];
    newGrid[row][col] = parseInt(value) || 0;
    setSudokuGrid(newGrid);
  };

  const handleSlidingMove = (row, col) => {
    const [emptyRow, emptyCol] = emptyPos;

    // Check if the clicked tile is adjacent to empty space
    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) !== 1) return;

    const newGrid = [...slidingGrid];
    newGrid[emptyRow][emptyCol] = newGrid[row][col];
    newGrid[row][col] = 0;
    setSlidingGrid(newGrid);
    setEmptyPos([row, col]);
  };

  const handlePathMove = (row, col) => {
    const currentPos = playerPath[playerPath.length - 1];
    const [currentRow, currentCol] = currentPos;

    // Check if move is valid (adjacent and not obstacle)
    if (Math.abs(row - currentRow) + Math.abs(col - currentCol) !== 1) return;
    if (pathGrid[row][col] === 1) return; // Obstacle

    const newPath = [...playerPath, [row, col]];
    setPlayerPath(newPath);
  };

  const checkSolution = () => {
    setAttempts((prev) => prev + 1);
    let isCorrect = false;

    if (currentPuzzle.type === "sudoku") {
      isCorrect =
        JSON.stringify(sudokuGrid) === JSON.stringify(currentPuzzle.solution);
    } else if (currentPuzzle.type === "sliding") {
      isCorrect =
        JSON.stringify(slidingGrid) === JSON.stringify(currentPuzzle.solution);
    } else if (currentPuzzle.type === "pathfinding") {
      const lastPos = playerPath[playerPath.length - 1];
      isCorrect = JSON.stringify(lastPos) === JSON.stringify(currentPuzzle.end);
    } else if (currentPuzzle.type === "sequence") {
      isCorrect = selectedAnswer === currentPuzzle.answer;
    }

    if (isCorrect) {
      const points = currentPuzzle.points - hintsUsed * 5;
      setScore((prev) => prev + Math.max(points, 5));
      setCompletedPuzzles((prev) => [
        ...prev,
        { ...currentPuzzle, correct: true, attempts },
      ]);

      // Move to next puzzle
      setTimeout(() => {
        if (currentPuzzleIndex < puzzles.length - 1) {
          const nextIndex = currentPuzzleIndex + 1;
          const nextPuzzle = puzzles[nextIndex];
          setCurrentPuzzleIndex(nextIndex);
          setCurrentPuzzle(nextPuzzle);
          initializePuzzle(nextPuzzle);
          setHintsUsed(0);
          setShowHint(false);
          setAttempts(0);
          setSelectedAnswer(null);
        } else {
          endGame();
        }
      }, 2000);
    } else {
      setCompletedPuzzles((prev) => [
        ...prev,
        { ...currentPuzzle, correct: false },
      ]);
    }
  };

  const useHint = () => {
    setHintsUsed((prev) => prev + 1);
    setShowHint(true);
  };

  const endGame = () => {
    setGameState("finished");
    setSessionStats({
      puzzlesSolved: completedPuzzles.filter((p) => p.correct).length,
      totalScore: score,
      accuracy:
        completedPuzzles.length > 0
          ? Math.round(
              (completedPuzzles.filter((p) => p.correct).length /
                completedPuzzles.length) *
                100
            )
          : 0,
      timeSpent: 180 - timeLeft,
    });
  };

  const resetGame = () => {
    setGameState("menu");
    setSelectedAnswer(null);
    setPlayerPath([]);
    setSudokuGrid([]);
    setSlidingGrid([]);
    setPathGrid([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case "easy":
        return <Badge className="bg-green-500 text-xs">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-xs">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-500 text-xs">Hard</Badge>;
      default:
        return (
          <Badge variant="outline" className="text-xs">
            Unknown
          </Badge>
        );
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "sudoku":
        return <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "sliding":
        return <Move className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "pathfinding":
        return <Target className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "sequence":
        return <Puzzle className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <Brain className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const renderPuzzle = () => {
    if (!currentPuzzle) return null;

    switch (currentPuzzle.type) {
      case "sudoku":
        return (
          <div className="grid grid-cols-4 gap-1 sm:gap-2 max-w-xs sm:max-w-sm mx-auto">
            {sudokuGrid.map((row, i) =>
              row.map((cell, j) => (
                <div key={`${i}-${j}`} className="aspect-square">
                  <Input
                    value={cell || ""}
                    onChange={(e) => handleSudokuInput(i, j, e.target.value)}
                    className="w-full h-full text-center font-bold text-sm sm:text-lg"
                    maxLength={1}
                    disabled={currentPuzzle.puzzle[i][j] !== 0}
                  />
                </div>
              ))
            )}
          </div>
        );

      case "sliding":
        return (
          <div className="grid grid-cols-3 gap-1 sm:gap-2 max-w-xs sm:max-w-sm mx-auto">
            {slidingGrid.map((row, i) =>
              row.map((cell, j) => (
                <Button
                  key={`${i}-${j}`}
                  variant={cell === 0 ? "ghost" : "outline"}
                  className="aspect-square text-sm sm:text-lg font-bold"
                  onClick={() => handleSlidingMove(i, j)}
                  disabled={cell === 0}
                >
                  {cell || ""}
                </Button>
              ))
            )}
          </div>
        );

      case "pathfinding":
        return (
          <div
            className="grid gap-1 sm:gap-2 max-w-xs sm:max-w-sm lg:max-w-md mx-auto"
            style={{
              gridTemplateColumns: `repeat(${currentPuzzle.size}, 1fr)`,
            }}
          >
            {pathGrid.map((row, i) =>
              row.map((cell, j) => {
                const isInPath = playerPath.some(
                  ([pr, pc]) => pr === i && pc === j
                );
                const isStart = i === 0 && j === 0;
                const isEnd =
                  i === currentPuzzle.size - 1 && j === currentPuzzle.size - 1;
                const isObstacle = cell === 1;

                return (
                  <Button
                    key={`${i}-${j}`}
                    variant="outline"
                    className={`aspect-square text-xs sm:text-sm ${
                      isObstacle
                        ? "bg-gray-800 text-white"
                        : isStart
                        ? "bg-green-500 text-white"
                        : isEnd
                        ? "bg-red-500 text-white"
                        : isInPath
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handlePathMove(i, j)}
                    disabled={isObstacle}
                  >
                    {isStart
                      ? "S"
                      : isEnd
                      ? "E"
                      : isObstacle
                      ? "■"
                      : isInPath
                      ? "●"
                      : ""}
                  </Button>
                );
              })
            )}
          </div>
        );

      case "sequence":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-lg sm:text-2xl overflow-x-auto pb-2">
              {currentPuzzle.pattern.map((item, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded border-2 flex-shrink-0 ${
                    item === "?"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-300"
                  }`}
                >
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-xs sm:max-w-sm mx-auto">
              {currentPuzzle.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  onClick={() => setSelectedAnswer(option)}
                  className="h-10 sm:h-12 text-sm sm:text-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown puzzle type</div>;
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          Logic Puzzle Challenge
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          Exercise your brain with challenging logic puzzles and reasoning games
        </p>
      </div>

      {gameState === "menu" && (
        <div className="space-y-4 sm:space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                  89
                </div>
                <div className="text-xs text-muted-foreground">
                  Puzzles Solved
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                  2,840
                </div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                  78%
                </div>
                <div className="text-xs text-muted-foreground">
                  Success Rate
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                  42
                </div>
                <div className="text-xs text-muted-foreground">IQ Level</div>
              </CardContent>
            </Card>
          </div>

          {/* Puzzle Type Selection */}
          <Tabs defaultValue="sequence" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
              <TabsTrigger
                value="sequence"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 p-2 sm:p-3"
              >
                <Puzzle className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Sequences</span>
              </TabsTrigger>
              <TabsTrigger
                value="sudoku"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 p-2 sm:p-3"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Sudoku</span>
              </TabsTrigger>
              <TabsTrigger
                value="sliding"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 p-2 sm:p-3"
              >
                <Move className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Sliding</span>
              </TabsTrigger>
              <TabsTrigger
                value="pathfinding"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-1 p-2 sm:p-3"
              >
                <Target className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Pathfinding</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sequence" className="space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl">
                    <Puzzle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    <span>Logic Sequences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Complete patterns and find the next item in logical
                    sequences
                  </p>
                  <div className="grid gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "sequence")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Simple patterns • 15 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "sequence")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Complex sequences • 25 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "sequence")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Advanced logic • 40 points each
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sudoku" className="space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl">
                    <Grid3X3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    <span>Mini Sudoku (4x4)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Fill the 4x4 grid with numbers 1-4, no repeats in rows or
                    columns
                  </p>
                  <div className="grid gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "sudoku")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Few empty cells • 20 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "sudoku")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          More challenges • 35 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "sudoku")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Minimal clues • 50 points each
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sliding" className="space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl">
                    <Move className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    <span>Sliding Puzzle</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Slide tiles to arrange numbers in order from 1-8
                  </p>
                  <div className="grid gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "sliding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Few moves needed • 25 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "sliding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          More scrambled • 40 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "sliding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          Highly scrambled • 60 points each
                        </div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pathfinding" className="space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="text-center p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    <span>Path Finder</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Navigate from start (S) to end (E) avoiding obstacles
                  </p>
                  <div className="grid gap-3 sm:gap-4">
                    <Button
                      size="lg"
                      onClick={() => startGame("easy", "pathfinding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-green-500 hover:bg-green-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Easy</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          5x5 grid, few obstacles • 30 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("medium", "pathfinding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-yellow-500 hover:bg-yellow-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Medium</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          6x6 grid, more obstacles • 45 points each
                        </div>
                      </div>
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => startGame("hard", "pathfinding")}
                      className="h-12 sm:h-16 text-sm sm:text-lg bg-red-500 hover:bg-red-600"
                    >
                      <div className="text-center">
                        <div className="font-bold">Hard</div>
                        <div className="text-xs sm:text-sm opacity-90">
                          7x7 grid, many obstacles • 65 points each
                        </div>
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
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Game Header */}
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  {getDifficultyBadge(difficulty)}
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(puzzleType)}
                    <span className="text-xs sm:text-sm font-medium capitalize">
                      {puzzleTypes[puzzleType]?.name}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {currentPuzzleIndex + 1} of {puzzles.length}
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span
                      className={`font-mono text-xs sm:text-sm ${
                        timeLeft <= 30 ? "text-red-600" : ""
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                    <span className="font-bold text-xs sm:text-sm">
                      {score}
                    </span>
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
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6">
              {/* Instructions */}
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold">
                  {puzzleTypes[puzzleType]?.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {puzzleTypes[puzzleType]?.description}
                </p>
              </div>

              {/* Hint */}
              {showHint && currentPuzzle.explanation && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 sm:p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
                    <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="font-medium text-xs sm:text-sm">
                      {currentPuzzle.explanation}
                    </span>
                  </div>
                </div>
              )}

              {/* Puzzle Content */}
              <div className="py-2 sm:py-4">{renderPuzzle()}</div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                <Button
                  onClick={checkSolution}
                  className="px-6 sm:px-8 h-10 sm:h-11"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Check Solution</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={showHint || !currentPuzzle.explanation}
                  className="px-6 sm:px-8 h-10 sm:h-11"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Hint (-5 pts)</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl font-bold text-green-600">
                  {completedPuzzles.filter((p) => p.correct).length}
                </div>
                <div className="text-xs text-muted-foreground">Solved</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl font-bold text-blue-600">
                  {attempts}
                </div>
                <div className="text-xs text-muted-foreground">Attempts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl font-bold text-purple-600">
                  {hintsUsed}
                </div>
                <div className="text-xs text-muted-foreground">Hints</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {gameState === "finished" && (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Trophy className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-yellow-600" />
                <h2 className="text-xl sm:text-2xl font-bold">
                  Logic Challenge Complete!
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Outstanding logical thinking and problem-solving!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                    {sessionStats.puzzlesSolved}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Puzzles Solved
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                    {sessionStats.totalScore}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Final Score
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                    {sessionStats.accuracy}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                    {formatTime(sessionStats.timeSpent)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Time Spent
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button onClick={resetGame} className="h-10 sm:h-11">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Play Again</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={resetGame}
                  className="h-10 sm:h-11"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Back to Menu</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LogicPuzzleGameContent;
