"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookOpen,
  ChevronRight,
  User,
  Clock,
  Target,
  PlayCircle,
  MessageCircle,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  Brain,
  Trophy,
  Star,
  FileText,
  Video,
  HelpCircle,
  Image,
  Play,
  Download,
  Bookmark,
} from "lucide-react";

// Enhanced subjects data with rich content
const subjectsData = {
  english: {
    name: "English Literature",
    description: "Master the art of language, literature, and communication",
    color: "bg-blue-50 dark:bg-blue-950/50",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    textColor: "text-blue-600 dark:text-blue-400",
    icon: BookOpen,
    addedBy: "Dr. Sarah Johnson",
    addedDate: "2024-01-15",
    totalChapters: 12,
    completedChapters: 8,
    chapters: [
      {
        id: 1,
        name: "Poetry and Prose",
        description:
          "Explore the beautiful world of poetry and prose literature",
        topics: [
          {
            id: 1,
            name: "Shakespearean Sonnets",
            description:
              "Deep dive into the structure and beauty of Shakespeare's sonnets",
            parts: [
              {
                title: "Introduction to Sonnets",
                type: "video",
                duration: "15 min",
                content: {
                  text: "A sonnet is a 14-line poem with a specific rhyme scheme. Shakespeare's sonnets are among the most famous in English literature.",
                  videoUrl: "/videos/shakespeare-intro.mp4",
                  images: [
                    "/images/shakespeare-portrait.jpg",
                    "/images/sonnet-structure.png",
                  ],
                  keyPoints: [
                    "14 lines with specific structure",
                    "ABAB CDCD EFEF GG rhyme scheme",
                    "Written in iambic pentameter",
                    "Often explores themes of love and beauty",
                  ],
                },
              },
              {
                title: "Structure Analysis",
                type: "interactive",
                duration: "20 min",
                content: {
                  text: "Understanding the technical aspects of sonnet construction including meter, rhyme, and volta.",
                  images: ["/images/sonnet-breakdown.jpg"],
                  examples: [
                    "Shall I compare thee to a summer's day? (Sonnet 18)",
                    "When in eternal lines to time thou grow'st",
                  ],
                  activities: [
                    "Identify rhyme scheme",
                    "Count syllables",
                    "Find the volta",
                  ],
                },
              },
              {
                title: "Famous Examples",
                type: "reading",
                duration: "25 min",
                content: {
                  text: "Study famous sonnets including Sonnet 18, 116, and 130 with detailed analysis.",
                  audioUrl: "/audio/sonnets-reading.mp3",
                  images: ["/images/sonnet18.jpg", "/images/sonnet116.jpg"],
                  fullText:
                    "Detailed text of famous sonnets with annotations...",
                },
              },
              {
                title: "Writing Practice",
                type: "practice",
                duration: "30 min",
                content: {
                  text: "Practice writing your own sonnets with guided exercises and feedback.",
                  exercises: [
                    "Write a quatrain with ABAB rhyme",
                    "Create a complete sonnet about nature",
                    "Analyze peer sonnets",
                  ],
                  tips: [
                    "Start with simple themes",
                    "Use a rhyming dictionary",
                    "Read aloud to check rhythm",
                  ],
                },
              },
            ],
            completed: true,
          },
          {
            id: 2,
            name: "Modern Poetry",
            description: "Contemporary poetry movements and techniques",
            parts: [
              {
                title: "Contemporary Poets",
                type: "video",
                duration: "18 min",
                content: {
                  text: "Explore the works of modern poets like Maya Angelou, Robert Frost, and Langston Hughes.",
                  videoUrl: "/videos/modern-poets.mp4",
                  images: [
                    "/images/maya-angelou.jpg",
                    "/images/robert-frost.jpg",
                  ],
                  poets: [
                    "Maya Angelou",
                    "Robert Frost",
                    "Langston Hughes",
                    "Sylvia Plath",
                  ],
                },
              },
              {
                title: "Themes and Styles",
                type: "analysis",
                duration: "22 min",
                content: {
                  text: "Understanding common themes in modern poetry: identity, social justice, nature, and human experience.",
                  images: ["/images/poetry-themes.png"],
                  themes: [
                    "Identity and Self",
                    "Social Justice",
                    "Nature",
                    "Love and Loss",
                    "Technology and Modern Life",
                  ],
                },
              },
            ],
            completed: false,
          },
        ],
      },
      {
        id: 2,
        name: "Grammar Fundamentals",
        description: "Build strong foundations in English grammar",
        topics: [
          {
            id: 3,
            name: "Parts of Speech",
            description: "Master the eight parts of speech in English",
            parts: [
              {
                title: "Nouns and Pronouns",
                type: "interactive",
                duration: "15 min",
                content: {
                  text: "Learn about different types of nouns and how pronouns replace them in sentences.",
                  images: ["/images/noun-types.png"],
                  examples: [
                    "Common nouns: cat, house, idea",
                    "Proper nouns: London, Shakespeare",
                    "Pronouns: he, she, it, they",
                  ],
                  quiz: [
                    "Identify the noun in this sentence",
                    "Replace nouns with appropriate pronouns",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  mathematics: {
    name: "Mathematics",
    description:
      "Explore the world of numbers, equations, and mathematical reasoning",
    color: "bg-green-50 dark:bg-green-950/50",
    borderColor: "border-green-200 dark:border-green-800/50",
    textColor: "text-green-600 dark:text-green-400",
    icon: Target,
    addedBy: "Prof. Michael Chen",
    addedDate: "2024-01-10",
    totalChapters: 15,
    completedChapters: 6,
    chapters: [
      {
        id: 1,
        name: "Algebra",
        description: "Master algebraic expressions and equations",
        topics: [
          {
            id: 1,
            name: "Linear Equations",
            description:
              "Solve and graph linear equations in one and two variables",
            parts: [
              {
                title: "Basic Concepts",
                type: "video",
                duration: "20 min",
                content: {
                  text: "A linear equation is an equation that makes a straight line when graphed. Learn the fundamental concepts.",
                  videoUrl: "/videos/linear-equations-intro.mp4",
                  images: [
                    "/images/linear-graph.png",
                    "/images/slope-intercept.jpg",
                  ],
                  formulas: ["y = mx + b", "ax + by = c"],
                  keyPoints: [
                    "Linear equations have degree 1",
                    "Graph is always a straight line",
                    "Slope represents rate of change",
                    "Y-intercept is where line crosses y-axis",
                  ],
                },
              },
              {
                title: "Solving Methods",
                type: "interactive",
                duration: "25 min",
                content: {
                  text: "Learn various methods to solve linear equations: substitution, elimination, and graphing.",
                  images: ["/images/solving-methods.png"],
                  methods: [
                    "Substitution Method",
                    "Elimination Method",
                    "Graphing Method",
                  ],
                  examples: [
                    "2x + 3 = 7 → x = 2",
                    "3x + 2y = 12 and x - y = 1",
                  ],
                  practice: [
                    "Step-by-step solver",
                    "Interactive examples",
                    "Self-check problems",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  physics: {
    name: "Physics",
    description:
      "Understand the fundamental principles governing the natural world",
    color: "bg-purple-50 dark:bg-purple-950/50",
    borderColor: "border-purple-200 dark:border-purple-800/50",
    textColor: "text-purple-600 dark:text-purple-400",
    icon: Zap,
    addedBy: "Dr. Emma Wilson",
    addedDate: "2024-01-20",
    totalChapters: 18,
    completedChapters: 7,
    chapters: [
      {
        id: 1,
        name: "Mechanics",
        description: "Study motion, forces, and energy in classical mechanics",
        topics: [
          {
            id: 1,
            name: "Motion in One Dimension",
            description: "Analyze motion along a straight line",
            parts: [
              {
                title: "Distance vs Displacement",
                type: "simulation",
                duration: "18 min",
                content: {
                  text: "Understanding the difference between distance (scalar) and displacement (vector) in physics.",
                  simulationUrl: "/simulations/motion-1d.html",
                  images: [
                    "/images/distance-displacement.png",
                    "/images/motion-diagram.jpg",
                  ],
                  definitions: {
                    distance: "Total path length traveled",
                    displacement: "Change in position vector",
                  },
                  examples: [
                    "Walking 5m east, then 3m west: Distance = 8m, Displacement = 2m east",
                    "Running around a 400m track: Distance = 400m, Displacement = 0m",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  chemistry: {
    name: "Chemistry",
    description:
      "Discover the composition, structure, and properties of matter",
    color: "bg-orange-50 dark:bg-orange-950/50",
    borderColor: "border-orange-200 dark:border-orange-800/50",
    textColor: "text-orange-600 dark:text-orange-400",
    icon: Award,
    addedBy: "Dr. Robert Lee",
    addedDate: "2024-01-25",
    totalChapters: 16,
    completedChapters: 5,
    chapters: [
      {
        id: 1,
        name: "Atomic Structure",
        description: "Explore the building blocks of matter",
        topics: [
          {
            id: 1,
            name: "Atoms and Molecules",
            description: "Understanding atomic theory and molecular structure",
            parts: [
              {
                title: "Atomic Theory",
                type: "video",
                duration: "22 min",
                content: {
                  text: "Journey through the development of atomic theory from Democritus to modern quantum mechanics.",
                  videoUrl: "/videos/atomic-theory-history.mp4",
                  images: [
                    "/images/atom-models.png",
                    "/images/periodic-table.jpg",
                  ],
                  timeline: [
                    "400 BC - Democritus proposes atoms",
                    "1803 - Dalton's atomic theory",
                    "1897 - Thomson discovers electron",
                    "1911 - Rutherford's nuclear model",
                    "1913 - Bohr's quantum model",
                  ],
                  models: [
                    "Dalton's Model",
                    "Thomson's Plum Pudding",
                    "Rutherford's Nuclear",
                    "Bohr's Quantum",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  biology: {
    name: "Biology",
    description:
      "Explore the fascinating world of living organisms and life processes",
    color: "bg-emerald-50 dark:bg-emerald-950/50",
    borderColor: "border-emerald-200 dark:border-emerald-800/50",
    textColor: "text-emerald-600 dark:text-emerald-400",
    icon: Brain,
    addedBy: "Dr. Lisa Martinez",
    addedDate: "2024-02-01",
    totalChapters: 14,
    completedChapters: 9,
    chapters: [
      {
        id: 1,
        name: "Cell Biology",
        description: "Study the fundamental unit of life",
        topics: [
          {
            id: 1,
            name: "Cell Structure",
            description: "Explore cellular components and their functions",
            parts: [
              {
                title: "Cell Membrane",
                type: "3d-model",
                duration: "20 min",
                content: {
                  text: "The cell membrane is a selective barrier that controls what enters and exits the cell.",
                  modelUrl: "/models/cell-membrane-3d.html",
                  images: [
                    "/images/cell-membrane.png",
                    "/images/phospholipid-bilayer.jpg",
                  ],
                  functions: [
                    "Selective permeability",
                    "Cell recognition",
                    "Signal transduction",
                    "Structural support",
                  ],
                  components: [
                    "Phospholipids",
                    "Cholesterol",
                    "Proteins",
                    "Carbohydrates",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  "computer-science": {
    name: "Computer Science",
    description: "Learn programming, algorithms, and computational thinking",
    color: "bg-indigo-50 dark:bg-indigo-950/50",
    borderColor: "border-indigo-200 dark:border-indigo-800/50",
    textColor: "text-indigo-600 dark:text-indigo-400",
    icon: Trophy,
    addedBy: "Prof. David Kim",
    addedDate: "2024-02-05",
    totalChapters: 20,
    completedChapters: 12,
    chapters: [
      {
        id: 1,
        name: "Programming Fundamentals",
        description: "Learn the basics of programming and coding",
        topics: [
          {
            id: 1,
            name: "Variables and Data Types",
            description: "Understanding how to store and manipulate data",
            parts: [
              {
                title: "Variable Declaration",
                type: "code",
                duration: "15 min",
                content: {
                  text: "Variables are containers for storing data values. Learn how to declare and use them effectively.",
                  codeEditor: true,
                  images: ["/images/variable-memory.png"],
                  examples: [
                    "int age = 25;",
                    'String name = "Alice";',
                    "boolean isStudent = true;",
                    "double price = 19.99;",
                  ],
                  languages: ["Java", "Python", "JavaScript", "C++"],
                  exercises: [
                    "Declare variables for a student record",
                    "Convert between data types",
                    "Practice variable naming conventions",
                  ],
                },
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
};

const SingleSubjectDataPage = ({ subjectParam }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  const subject = subjectsData[subjectParam] || subjectsData.mathematics;
  const IconComponent = subject.icon;

  useEffect(() => {
    if (subject.chapters.length > 0) {
      setSelectedChapter(subject.chapters[0]);
      setSelectedTopic(subject.chapters[0].topics[0]);
    }
  }, [subjectParam]);

  const handleChapterChange = (chapterId) => {
    const chapter = subject.chapters.find(
      (ch) => ch.id === parseInt(chapterId)
    );
    setSelectedChapter(chapter);
    setSelectedTopic(chapter.topics[0]);
    setCurrentPart(0);
  };

  const handleTopicChange = (topicId) => {
    const topic = selectedChapter.topics.find(
      (t) => t.id === parseInt(topicId)
    );
    setSelectedTopic(topic);
    setCurrentPart(0);
  };

  const nextPart = () => {
    if (selectedTopic && currentPart < selectedTopic.parts.length - 1) {
      setCurrentPart(currentPart + 1);
    }
  };

  const prevPart = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
    }
  };

  const completionPercentage = Math.round(
    (subject.completedChapters / subject.totalChapters) * 100
  );

  const ChatbotModal = () => (
    <DialogContent className="max-w-2xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3">
          <MessageCircle className="h-6 w-6 text-main" />
          <span>AI Study Assistant</span>
        </DialogTitle>
        <DialogDescription>
          Ask questions about {selectedTopic?.name || selectedChapter?.name}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 mt-6">
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Hi! I'm your AI study assistant. I can help you with questions about{" "}
            {subject.name}, specifically {selectedTopic?.name}. What would you
            like to know?
          </p>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 p-3 border rounded-lg"
          />
          <Button>Send</Button>
        </div>
      </div>
    </DialogContent>
  );

  const renderContentByType = (part) => {
    const content = part.content;

    switch (part.type) {
      case "video":
        return (
          <div className="space-y-4">
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-semibold">{part.title}</p>
                <p className="text-sm opacity-75">Duration: {part.duration}</p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>{content.text}</p>
              {content.keyPoints && (
                <div>
                  <h4>Key Points:</h4>
                  <ul>
                    {content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case "interactive":
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Interactive Content</h4>
                <p className="text-sm text-muted-foreground">{content.text}</p>
                {content.examples && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Examples:</h5>
                    <ul className="text-sm space-y-1">
                      {content.examples.map((example, index) => (
                        <li
                          key={index}
                          className="bg-white/50 dark:bg-black/20 p-2 rounded"
                        >
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {content.activities &&
                  content.activities.map((activity, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      {activity}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        );

      case "reading":
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-amber-600" />
                <h4 className="font-semibold">Reading Material</h4>
              </div>
              <p className="text-sm text-muted-foreground">{content.text}</p>
              {content.audioUrl && (
                <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Play className="h-8 w-8 text-amber-600" />
                    <div>
                      <p className="font-medium">Audio Reading Available</p>
                      <p className="text-xs text-muted-foreground">
                        Listen while you read
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "practice":
        return (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Trophy className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Practice Exercises</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {content.text}
              </p>
              {content.exercises && (
                <div className="space-y-2">
                  {content.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="bg-white/50 dark:bg-black/20 p-3 rounded-lg"
                    >
                      <p className="font-medium">Exercise {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "simulation":
        return (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-5 w-5 text-purple-600" />
                <h4 className="font-semibold">Interactive Simulation</h4>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="font-medium">Physics Simulation</p>
                  <p className="text-sm text-muted-foreground">
                    Interactive model loading...
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {content.text}
              </p>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-950/50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="h-5 w-5 text-gray-600" />
                <h4 className="font-semibold">Code Editor</h4>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2 text-gray-400">// Example code</div>
                {content.examples &&
                  content.examples.map((example, index) => (
                    <div key={index} className="mb-1">
                      {example}
                    </div>
                  ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {content.text}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="prose dark:prose-invert max-w-none">
            <p>{content.text}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Subject Header */}
      <Card className={`border-2 ${subject.borderColor} ${subject.color}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-xl sm:text-2xl lg:text-3xl">
            <IconComponent
              className={`h-8 w-8 sm:h-10 sm:w-10 ${subject.textColor}`}
            />
            <span>{subject.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-muted-foreground">
            {subject.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-4">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {selectedTopic && (
            <Card className="border-2 border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-main" />
                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedTopic.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-normal">
                        Chapter: {selectedChapter.name}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={selectedTopic.completed ? "default" : "secondary"}
                  >
                    {selectedTopic.completed ? "Completed" : "In Progress"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Parts Navigation */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {selectedTopic.parts.map((part, index) => (
                    <Button
                      key={index}
                      variant={index === currentPart ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-auto py-2 px-3"
                      onClick={() => setCurrentPart(index)}
                    >
                      <div className="text-center">
                        <div>Part {index + 1}</div>
                        <div className="text-xs opacity-75">{part.type}</div>
                      </div>
                    </Button>
                  ))}
                </div>

                {/* Current Part Content */}
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {selectedTopic.parts[currentPart].type === "video" && (
                          <Video className="h-5 w-5" />
                        )}
                        {selectedTopic.parts[currentPart].type ===
                          "interactive" && <Target className="h-5 w-5" />}
                        {selectedTopic.parts[currentPart].type ===
                          "reading" && <BookOpen className="h-5 w-5" />}
                        {selectedTopic.parts[currentPart].type ===
                          "practice" && <Trophy className="h-5 w-5" />}
                        {selectedTopic.parts[currentPart].type ===
                          "simulation" && <Zap className="h-5 w-5" />}
                        {selectedTopic.parts[currentPart].type === "code" && (
                          <FileText className="h-5 w-5" />
                        )}
                        <span>
                          Part {currentPart + 1}:{" "}
                          {selectedTopic.parts[currentPart].title}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {selectedTopic.parts[currentPart].duration}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {renderContentByType(selectedTopic.parts[currentPart])}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={prevPart}
                        disabled={currentPart === 0}
                      >
                        Previous
                      </Button>

                      <div className="text-sm text-muted-foreground flex items-center">
                        {currentPart + 1} of {selectedTopic.parts.length}
                      </div>

                      <Button
                        onClick={nextPart}
                        disabled={
                          currentPart === selectedTopic.parts.length - 1
                        }
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bookmark
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Get Help
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Side - Navigation & Info */}
        <div className="lg:col-span-1 space-y-4">
          {/* Subject Stats */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="text-lg">Subject Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <BookOpen className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="font-bold text-sm">{subject.totalChapters}</p>
                  <p className="text-xs text-muted-foreground">Chapters</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg text-center">
                  <CheckCircle className="h-4 w-4 mx-auto mb-1 text-green-600" />
                  <p className="font-bold text-sm">
                    {subject.completedChapters}
                  </p>
                  <p className="text-xs text-muted-foreground">Done</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>

              <div className="text-center pt-2 border-t">
                <p className="text-xs text-muted-foreground">Instructor</p>
                <p className="font-medium text-sm">{subject.addedBy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Navigation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chapter Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Chapter
                </label>
                <Select
                  onValueChange={handleChapterChange}
                  value={selectedChapter?.id?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {subject.chapters.map((chapter) => (
                      <SelectItem
                        key={chapter.id}
                        value={chapter.id.toString()}
                      >
                        {chapter.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Topic Selection */}
              {selectedChapter && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Topic
                  </label>
                  <Select
                    onValueChange={handleTopicChange}
                    value={selectedTopic?.id?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedChapter.topics.map((topic) => (
                        <SelectItem key={topic.id} value={topic.id.toString()}>
                          <div className="flex items-center space-x-2">
                            <span>{topic.name}</span>
                            {topic.completed && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gamified Actions */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="text-lg">Study Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowChatbot(true)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    AI Assistant
                  </Button>
                </DialogTrigger>
                <ChatbotModal />
              </Dialog>

              <Button variant="outline" className="w-full justify-start">
                <PlayCircle className="mr-2 h-4 w-4" />
                Practice Quiz
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Earn Badges
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Study Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleSubjectDataPage;
