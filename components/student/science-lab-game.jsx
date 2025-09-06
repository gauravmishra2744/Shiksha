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
  Beaker,
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
  FlaskConical,
  Microscope,
  Atom,
  Flame,
  Droplets,
  TestTube,
  Eye,
  AlertTriangle,
} from "lucide-react";

// Science experiment data
const experiments = {
  chemistry: {
    name: "Chemistry Lab",
    icon: <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5" />,
    experiments: [
      {
        id: 1,
        name: "Acid-Base Reaction",
        description: "Mix acids and bases to observe neutralization",
        difficulty: "easy",
        materials: ["HCl (Acid)", "NaOH (Base)", "Litmus Paper", "Water"],
        steps: [
          "Add 10ml of HCl to beaker",
          "Slowly add NaOH drop by drop",
          "Test with litmus paper",
          "Stop when paper turns green"
        ],
        questions: [
          {
            question: "What happens when acid and base react?",
            options: ["They neutralize", "They explode", "Nothing happens", "They freeze"],
            correct: 0,
            explanation: "Acids and bases neutralize each other to form salt and water"
          },
          {
            question: "What color indicates neutral pH?",
            options: ["Red", "Blue", "Green", "Yellow"],
            correct: 2,
            explanation: "Green color on litmus paper indicates neutral pH (around 7)"
          }
        ],
        points: 50,
        safetyTips: ["Wear safety goggles", "Add base slowly", "Work in ventilated area"]
      },
      {
        id: 2,
        name: "Chemical Indicators",
        description: "Test different substances with pH indicators",
        difficulty: "medium",
        materials: ["Red Cabbage Extract", "Lemon Juice", "Baking Soda", "Soap"],
        steps: [
          "Prepare cabbage indicator solution",
          "Test lemon juice - should turn red",
          "Test baking soda - should turn blue/green",
          "Record color changes"
        ],
        questions: [
          {
            question: "Red cabbage indicator turns red in which solution?",
            options: ["Neutral", "Basic", "Acidic", "Salty"],
            correct: 2,
            explanation: "Red cabbage indicator turns red in acidic solutions"
          },
          {
            question: "Baking soda is a:",
            options: ["Acid", "Base", "Neutral", "Salt"],
            correct: 1,
            explanation: "Baking soda (sodium bicarbonate) is a base"
          }
        ],
        points: 75,
        safetyTips: ["Don't ingest any chemicals", "Wash hands after experiment"]
      }
    ]
  },
  physics: {
    name: "Physics Lab",
    icon: <Atom className="h-4 w-4 sm:h-5 sm:w-5" />,
    experiments: [
      {
        id: 3,
        name: "Simple Pendulum",
        description: "Study the motion of a pendulum",
        difficulty: "easy",
        materials: ["String", "Weight", "Ruler", "Stopwatch"],
        steps: [
          "Tie weight to 50cm string",
          "Pull weight to 15° angle",
          "Release and time 10 oscillations",
          "Calculate period (time/10)"
        ],
        questions: [
          {
            question: "What affects pendulum period most?",
            options: ["Mass", "Length", "Angle", "Color"],
            correct: 1,
            explanation: "The period of a pendulum depends mainly on its length"
          },
          {
            question: "If you double the length, period becomes:",
            options: ["Same", "Double", "√2 times", "Half"],
            correct: 2,
            explanation: "Period is proportional to square root of length"
          }
        ],
        points: 60,
        safetyTips: ["Ensure weight is secure", "Keep clear of swing path"]
      },
      {
        id: 4,
        name: "Electromagnetic Induction",
        description: "Generate electricity using magnets",
        difficulty: "hard",
        materials: ["Magnet", "Copper Coil", "Galvanometer", "Iron Core"],
        steps: [
          "Connect coil to galvanometer",
          "Move magnet quickly into coil",
          "Observe needle deflection",
          "Try different speeds and directions"
        ],
        questions: [
          {
            question: "Moving magnet in coil generates:",
            options: ["Heat", "Light", "Current", "Sound"],
            correct: 2,
            explanation: "Moving magnetic field induces electric current in conductor"
          },
          {
            question: "Faster magnet movement produces:",
            options: ["Less current", "Same current", "More current", "No current"],
            correct: 2,
            explanation: "Faster changing magnetic field induces stronger current"
          }
        ],
        points: 100,
        safetyTips: ["Handle magnets carefully", "Check wire connections"]
      }
    ]
  },
  biology: {
    name: "Biology Lab",
    icon: <Microscope className="h-4 w-4 sm:h-5 sm:w-5" />,
    experiments: [
      {
        id: 5,
        name: "Microscope Observation",
        description: "Observe cells under microscope",
        difficulty: "easy",
        materials: ["Microscope", "Onion Skin", "Iodine", "Glass Slide"],
        steps: [
          "Place onion skin on slide",
          "Add drop of iodine stain",
          "Cover with cover slip",
          "Observe under 40x magnification"
        ],
        questions: [
          {
            question: "Cell walls are visible in:",
            options: ["Animal cells", "Plant cells", "Both", "Neither"],
            correct: 1,
            explanation: "Plant cells have rigid cell walls, animal cells don't"
          },
          {
            question: "Iodine stains which part dark?",
            options: ["Cell wall", "Nucleus", "Cytoplasm", "Vacuole"],
            correct: 1,
            explanation: "Iodine is used to stain the nucleus dark blue/black"
          }
        ],
        points: 45,
        safetyTips: ["Handle microscope carefully", "Clean slides after use"]
      },
      {
        id: 6,
        name: "Photosynthesis Test",
        description: "Test for starch in leaves",
        difficulty: "medium",
        materials: ["Green Leaf", "Iodine", "Hot Water", "Alcohol"],
        steps: [
          "Boil leaf in water for 2 minutes",
          "Soak in alcohol to remove chlorophyll",
          "Rinse and add iodine drops",
          "Blue-black color indicates starch"
        ],
        questions: [
          {
            question: "Starch test turns positive when color is:",
            options: ["Red", "Blue-black", "Green", "Yellow"],
            correct: 1,
            explanation: "Iodine turns blue-black in presence of starch"
          },
          {
            question: "Plants produce starch during:",
            options: ["Respiration", "Photosynthesis", "Digestion", "Growth"],
            correct: 1,
            explanation: "Photosynthesis converts CO2 and water into glucose/starch"
          }
        ],
        points: 70,
        safetyTips: ["Handle hot water carefully", "Work in ventilated area"]
      }
    ]
  }
};

const ScienceLabGameContent = () => {
  const [gameState, setGameState] = useState("menu"); // menu, experiment, quiz, results
  const [selectedLab, setSelectedLab] = useState("chemistry");
  const [currentExperiment, setCurrentExperiment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [experimentResults, setExperimentResults] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Session stats
  const [sessionStats, setSessionStats] = useState({
    experimentsCompleted: 0,
    questionsCorrect: 0,
    totalQuestions: 0,
    totalScore: 0,
    safetyViolations: 0,
  });

  const startExperiment = (experiment) => {
    setCurrentExperiment(experiment);
    setCurrentStep(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setExperimentCompleted(false);
    setQuizCompleted(false);
    setShowHint(false);
    setGameState("experiment");
  };

  const nextStep = () => {
    if (currentStep < currentExperiment.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setExperimentCompleted(true);
      // Auto-advance to quiz after completing experiment
      setTimeout(() => {
        setGameState("quiz");
      }, 2000);
    }
  };

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitQuizAnswer = () => {
    const question = currentExperiment.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    setExperimentResults(prev => [...prev, {
      question: question.question,
      userAnswer: selectedAnswer,
      correctAnswer: question.correct,
      correct: isCorrect,
      explanation: question.explanation
    }]);

    if (isCorrect) {
      setScore(prev => prev + 20);
    }

    // Show result for 3 seconds
    setTimeout(() => {
      if (currentQuestion < currentExperiment.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        completeExperiment();
      }
    }, 3000);
  };

  const completeExperiment = () => {
    const correctAnswers = experimentResults.filter(r => r.correct).length;
    const totalQuestions = currentExperiment.questions.length;
    const experimentScore = currentExperiment.points + (correctAnswers * 20);
    
    setScore(prev => prev + currentExperiment.points);
    setSessionStats(prev => ({
      ...prev,
      experimentsCompleted: prev.experimentsCompleted + 1,
      questionsCorrect: prev.questionsCorrect + correctAnswers,
      totalQuestions: prev.totalQuestions + totalQuestions,
      totalScore: prev.totalScore + experimentScore,
    }));
    
    setGameState("results");
  };

  const resetGame = () => {
    setGameState("menu");
    setCurrentExperiment(null);
    setCurrentStep(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setExperimentResults([]);
    setExperimentCompleted(false);
    setQuizCompleted(false);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return <Badge className="bg-green-500 text-xs">Easy</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-xs">Medium</Badge>;
      case "hard":
        return <Badge className="bg-red-500 text-xs">Hard</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const getLabIcon = (labType) => {
    return experiments[labType]?.icon || <Beaker className="h-4 w-4 sm:h-5 sm:w-5" />;
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
          Science Lab Simulator
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
          Conduct virtual experiments and learn scientific concepts safely
        </p>
      </div>

      {gameState === "menu" && (
        <div className="space-y-4 sm:space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">42</div>
                <div className="text-xs text-muted-foreground">Experiments Done</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">1,850</div>
                <div className="text-xs text-muted-foreground">Total Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">88%</div>
                <div className="text-xs text-muted-foreground">Quiz Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">3</div>
                <div className="text-xs text-muted-foreground">Safety Violations</div>
              </CardContent>
            </Card>
          </div>

          {/* Lab Selection */}
          <Tabs value={selectedLab} onValueChange={setSelectedLab} className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="chemistry" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <FlaskConical className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Chemistry</span>
              </TabsTrigger>
              <TabsTrigger value="physics" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <Atom className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Physics</span>
              </TabsTrigger>
              <TabsTrigger value="biology" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 sm:p-3">
                <Microscope className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Biology</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(experiments).map(([labType, labData]) => (
              <TabsContent key={labType} value={labType} className="space-y-3 sm:space-y-4">
                <Card>
                  <CardHeader className="text-center p-4 sm:p-6">
                    <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl">
                      {labData.icon}
                      <span>{labData.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                    <div className="grid gap-3 sm:gap-4">
                      {labData.experiments.map((experiment) => (
                        <Card key={experiment.id} className="border hover:shadow-md transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                              <div className="space-y-1">
                                <h3 className="font-bold text-base sm:text-lg">{experiment.name}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{experiment.description}</p>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                {getDifficultyBadge(experiment.difficulty)}
                                <Badge variant="outline" className="text-xs">{experiment.points} pts</Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-xs sm:text-sm mb-2">Materials Needed:</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                  {experiment.materials.map((material, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                      {material}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center space-x-1">
                                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
                                  <span>Safety Tips:</span>
                                </h4>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {experiment.safetyTips.map((tip, index) => (
                                    <li key={index} className="leading-relaxed">• {tip}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full mt-3 sm:mt-4 h-10 sm:h-11"
                              onClick={() => startExperiment(experiment)}
                            >
                              <Beaker className="mr-2 h-4 w-4" />
                              <span className="text-sm">Start Experiment</span>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {gameState === "experiment" && currentExperiment && (
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* Experiment Header */}
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-1 flex-1">
                  <h2 className="text-lg sm:text-xl font-bold">{currentExperiment.name}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">{currentExperiment.description}</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                  {getDifficultyBadge(currentExperiment.difficulty)}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="font-bold text-sm sm:text-base">{score}</span>
                  </div>
                </div>
              </div>
              <Progress 
                value={((currentStep + 1) / currentExperiment.steps.length) * 100} 
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* Experiment Steps */}
          <Card className="border-2">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-lg font-medium text-muted-foreground">
                    Step {currentStep + 1} of {currentExperiment.steps.length}
                  </h3>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed">
                    {currentExperiment.steps[currentStep]}
                  </h2>
                </div>

                {/* Virtual Lab Equipment Simulation */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-dashed">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-gray-500">
                    <Beaker className="h-12 w-12 sm:h-16 sm:w-16" />
                    <TestTube className="h-8 w-8 sm:h-12 sm:w-12" />
                    <Droplets className="h-6 w-6 sm:h-10 sm:w-10" />
                    <Eye className="h-5 w-5 sm:h-8 sm:w-8" />
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground">
                    Virtual lab equipment simulation
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {!experimentCompleted ? (
                    <Button 
                      size="lg" 
                      onClick={nextStep}
                      className="px-6 sm:px-8 h-11 sm:h-12"
                    >
                      <span className="text-sm sm:text-base">
                        {currentStep < currentExperiment.steps.length - 1 ? 'Next Step' : 'Complete Experiment'}
                      </span>
                    </Button>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-green-50 dark:bg-green-950/20 p-3 sm:p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="text-green-800 dark:text-green-200 font-medium text-sm sm:text-base">
                          🧪 Experiment Complete! Proceeding to quiz...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materials and Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg">Materials Used</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2">
                  {currentExperiment.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">{material}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <span>Safety Reminders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2">
                  {currentExperiment.safetyTips.map((tip, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {gameState === "quiz" && currentExperiment && (
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Quiz Header */}
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-xl font-bold">Quiz Time!</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {currentExperiment.questions.length}
                  </p>
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="font-bold text-sm sm:text-base">{score}</span>
                </div>
              </div>
              <Progress 
                value={((currentQuestion + 1) / currentExperiment.questions.length) * 100} 
                className="mt-3"
              />
            </CardContent>
          </Card>

          {/* Quiz Question */}
          <Card className="border-2">
            <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              <div className="text-center space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed">
                  {currentExperiment.questions[currentQuestion].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {currentExperiment.questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    onClick={() => handleQuizAnswer(index)}
                    className="h-auto min-h-12 sm:min-h-16 text-left justify-start p-3 sm:p-4"
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3 w-full">
                      <span className="font-bold text-sm sm:text-base flex-shrink-0">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base leading-relaxed text-left">
                        {option}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  onClick={submitQuizAnswer} 
                  disabled={selectedAnswer === null}
                  className="px-6 sm:px-8 h-10 sm:h-11"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Submit Answer</span>
                </Button>
              </div>

              {/* Show result after submission */}
              {selectedAnswer !== null && (
                <div className={`p-3 sm:p-4 rounded-lg ${
                  selectedAnswer === currentExperiment.questions[currentQuestion].correct
                    ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800' 
                    : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className={`font-medium text-sm sm:text-base ${
                    selectedAnswer === currentExperiment.questions[currentQuestion].correct
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {selectedAnswer === currentExperiment.questions[currentQuestion].correct 
                      ? '🎉 Correct!' : '❌ Incorrect!'}
                  </div>
                  <div className="text-xs sm:text-sm mt-2 text-muted-foreground leading-relaxed">
                    {currentExperiment.questions[currentQuestion].explanation}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {gameState === "results" && (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Trophy className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-yellow-600" />
                <h2 className="text-xl sm:text-2xl font-bold">Experiment Complete!</h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Great work in the {experiments[selectedLab].name}!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                    {experimentResults.filter(r => r.correct).length}/{experimentResults.length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Quiz Score</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                    {Math.round((experimentResults.filter(r => r.correct).length / experimentResults.length) * 100)}%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 capitalize">
                    {currentExperiment.difficulty}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Difficulty</div>
                </div>
              </div>

              {/* Quiz Review */}
              <div className="text-left space-y-3">
                <h3 className="font-bold text-base sm:text-lg text-center">Quiz Review:</h3>
                <div className="max-h-64 sm:max-h-80 overflow-y-auto space-y-3">
                  {experimentResults.map((result, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      result.correct 
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                    }`}>
                      <div className="font-medium text-sm sm:text-base leading-relaxed">{result.question}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                        {result.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
                <Button onClick={resetGame} className="h-10 sm:h-11">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Try Another Experiment</span>
                </Button>
                <Button variant="outline" onClick={resetGame} className="h-10 sm:h-11">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span className="text-sm sm:text-base">Back to Lab</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ScienceLabGameContent;