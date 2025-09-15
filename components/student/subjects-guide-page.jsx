"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpen,
  Calculator,
  Microscope,
  Globe,
  Palette,
  Code,
  Brain,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  Users,
  Clock,
  Star,
  MessageCircle,
  Send,
  Bot,
  User,
  Search,
  Filter,
  ChevronRight,
  Play,
  FileText,
  Video,
  Headphones,
  Download,
  Bookmark,
  Share2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Trophy,
} from "lucide-react";

// Subjects data with comprehensive information
const subjectsData = [
  {
    id: "mathematics",
    name: "Mathematics",
    description:
      "Master mathematical concepts from basic algebra to advanced calculus",
    icon: Calculator,
    color:
      "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400",
    difficulty: 4,
    popularity: 5,
    careerRelevance: 5,
    topics: [
      { id: "algebra", name: "Algebra", difficulty: 3, duration: "4 weeks" },
      { id: "geometry", name: "Geometry", difficulty: 3, duration: "6 weeks" },
      { id: "calculus", name: "Calculus", difficulty: 5, duration: "8 weeks" },
      {
        id: "statistics",
        name: "Statistics",
        difficulty: 4,
        duration: "5 weeks",
      },
      {
        id: "trigonometry",
        name: "Trigonometry",
        difficulty: 4,
        duration: "4 weeks",
      },
    ],
    studyTips: [
      "Practice daily problem-solving",
      "Understand concepts before memorizing formulas",
      "Use visual aids and graphs",
      "Join study groups for discussion",
    ],
    resources: [
      {
        type: "video",
        title: "Khan Academy Mathematics",
        url: "#",
        duration: "200+ hours",
      },
      {
        type: "book",
        title: "NCERT Mathematics Textbook",
        url: "#",
        pages: "350 pages",
      },
      {
        type: "practice",
        title: "Mathematics Problem Bank",
        url: "#",
        questions: "1000+ problems",
      },
    ],
    careers: [
      "Engineer",
      "Data Scientist",
      "Researcher",
      "Actuary",
      "Financial Analyst",
    ],
    prerequisites: ["Basic Arithmetic", "Elementary Algebra"],
    examPattern: {
      theory: 70,
      practical: 30,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
  {
    id: "physics",
    name: "Physics",
    description:
      "Explore the fundamental laws governing the universe and natural phenomena",
    icon: Microscope,
    color:
      "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400",
    difficulty: 4,
    popularity: 4,
    careerRelevance: 5,
    topics: [
      {
        id: "mechanics",
        name: "Mechanics",
        difficulty: 4,
        duration: "6 weeks",
      },
      {
        id: "thermodynamics",
        name: "Thermodynamics",
        difficulty: 4,
        duration: "5 weeks",
      },
      { id: "optics", name: "Optics", difficulty: 3, duration: "4 weeks" },
      {
        id: "electricity",
        name: "Electricity & Magnetism",
        difficulty: 5,
        duration: "8 weeks",
      },
      {
        id: "modern-physics",
        name: "Modern Physics",
        difficulty: 5,
        duration: "6 weeks",
      },
    ],
    studyTips: [
      "Connect theory with real-world applications",
      "Practice numerical problems regularly",
      "Understand derivations, don't just memorize",
      "Use lab experiments to visualize concepts",
    ],
    resources: [
      {
        type: "video",
        title: "Physics Wallah",
        url: "#",
        duration: "300+ hours",
      },
      {
        type: "book",
        title: "HC Verma Concepts of Physics",
        url: "#",
        pages: "1200 pages",
      },
      {
        type: "simulation",
        title: "PhET Physics Simulations",
        url: "#",
        simulations: "150+ sims",
      },
    ],
    careers: [
      "Physicist",
      "Engineer",
      "Researcher",
      "Astronomer",
      "Medical Physicist",
    ],
    prerequisites: ["Mathematics", "Basic Science"],
    examPattern: {
      theory: 70,
      practical: 30,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description:
      "Understand matter, its properties, and chemical reactions at molecular level",
    icon: Award,
    color:
      "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400",
    difficulty: 4,
    popularity: 4,
    careerRelevance: 4,
    topics: [
      {
        id: "organic",
        name: "Organic Chemistry",
        difficulty: 5,
        duration: "10 weeks",
      },
      {
        id: "inorganic",
        name: "Inorganic Chemistry",
        difficulty: 4,
        duration: "8 weeks",
      },
      {
        id: "physical",
        name: "Physical Chemistry",
        difficulty: 5,
        duration: "8 weeks",
      },
      {
        id: "atomic",
        name: "Atomic Structure",
        difficulty: 3,
        duration: "4 weeks",
      },
      {
        id: "bonding",
        name: "Chemical Bonding",
        difficulty: 4,
        duration: "5 weeks",
      },
    ],
    studyTips: [
      "Memorize periodic table and reactions",
      "Practice drawing molecular structures",
      "Understand reaction mechanisms",
      "Use mnemonics for remembering facts",
    ],
    resources: [
      {
        type: "video",
        title: "Unacademy Chemistry",
        url: "#",
        duration: "250+ hours",
      },
      { type: "book", title: "NCERT Chemistry", url: "#", pages: "400 pages" },
      {
        type: "practice",
        title: "Chemistry Lab Manual",
        url: "#",
        experiments: "50+ labs",
      },
    ],
    careers: [
      "Chemist",
      "Pharmacist",
      "Chemical Engineer",
      "Researcher",
      "Quality Analyst",
    ],
    prerequisites: ["Basic Science", "Mathematics"],
    examPattern: {
      theory: 70,
      practical: 30,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
  {
    id: "biology",
    name: "Biology",
    description:
      "Study living organisms, from cells to ecosystems and human body systems",
    icon: Brain,
    color:
      "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:text-green-400",
    difficulty: 3,
    popularity: 4,
    careerRelevance: 4,
    topics: [
      {
        id: "cell-biology",
        name: "Cell Biology",
        difficulty: 3,
        duration: "5 weeks",
      },
      { id: "genetics", name: "Genetics", difficulty: 4, duration: "6 weeks" },
      {
        id: "evolution",
        name: "Evolution",
        difficulty: 3,
        duration: "4 weeks",
      },
      { id: "ecology", name: "Ecology", difficulty: 2, duration: "4 weeks" },
      {
        id: "human-physiology",
        name: "Human Physiology",
        difficulty: 4,
        duration: "8 weeks",
      },
    ],
    studyTips: [
      "Use diagrams and visual aids extensively",
      "Create concept maps for processes",
      "Practice with specimens and models",
      "Remember through real-life examples",
    ],
    resources: [
      {
        type: "video",
        title: "BYJU'S Biology",
        url: "#",
        duration: "180+ hours",
      },
      {
        type: "book",
        title: "Campbell Biology",
        url: "#",
        pages: "1400 pages",
      },
      {
        type: "interactive",
        title: "Virtual Biology Lab",
        url: "#",
        activities: "100+ labs",
      },
    ],
    careers: [
      "Doctor",
      "Biotechnologist",
      "Researcher",
      "Ecologist",
      "Pharmacist",
    ],
    prerequisites: ["Basic Science"],
    examPattern: {
      theory: 70,
      practical: 30,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description:
      "Learn programming, algorithms, and computational problem-solving",
    icon: Code,
    color:
      "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400",
    difficulty: 4,
    popularity: 5,
    careerRelevance: 5,
    topics: [
      {
        id: "programming",
        name: "Programming Basics",
        difficulty: 3,
        duration: "6 weeks",
      },
      {
        id: "data-structures",
        name: "Data Structures",
        difficulty: 4,
        duration: "8 weeks",
      },
      {
        id: "algorithms",
        name: "Algorithms",
        difficulty: 5,
        duration: "10 weeks",
      },
      {
        id: "databases",
        name: "Database Management",
        difficulty: 3,
        duration: "5 weeks",
      },
      {
        id: "web-dev",
        name: "Web Development",
        difficulty: 3,
        duration: "8 weeks",
      },
    ],
    studyTips: [
      "Practice coding daily",
      "Work on real projects",
      "Understand logic before syntax",
      "Join coding communities",
    ],
    resources: [
      {
        type: "video",
        title: "FreeCodeCamp",
        url: "#",
        duration: "400+ hours",
      },
      {
        type: "platform",
        title: "LeetCode Problems",
        url: "#",
        problems: "2000+ problems",
      },
      {
        type: "documentation",
        title: "Official Language Docs",
        url: "#",
        languages: "10+ languages",
      },
    ],
    careers: [
      "Software Developer",
      "Data Scientist",
      "AI Engineer",
      "Cybersecurity Expert",
    ],
    prerequisites: ["Mathematics", "Logical Thinking"],
    examPattern: {
      theory: 30,
      practical: 70,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
  {
    id: "english",
    name: "English Literature",
    description:
      "Develop language skills, literary analysis, and communication abilities",
    icon: BookOpen,
    color:
      "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400",
    difficulty: 3,
    popularity: 4,
    careerRelevance: 4,
    topics: [
      {
        id: "grammar",
        name: "Grammar & Composition",
        difficulty: 2,
        duration: "4 weeks",
      },
      {
        id: "poetry",
        name: "Poetry Analysis",
        difficulty: 4,
        duration: "6 weeks",
      },
      {
        id: "prose",
        name: "Prose & Fiction",
        difficulty: 3,
        duration: "6 weeks",
      },
      {
        id: "drama",
        name: "Drama & Theatre",
        difficulty: 3,
        duration: "4 weeks",
      },
      {
        id: "writing",
        name: "Creative Writing",
        difficulty: 4,
        duration: "8 weeks",
      },
    ],
    studyTips: [
      "Read extensively and diversely",
      "Practice writing regularly",
      "Analyze literary techniques",
      "Participate in discussions",
    ],
    resources: [
      {
        type: "book",
        title: "Norton Anthology",
        url: "#",
        pages: "2500 pages",
      },
      {
        type: "audio",
        title: "Literature Podcasts",
        url: "#",
        episodes: "200+ episodes",
      },
      {
        type: "platform",
        title: "Poetry Foundation",
        url: "#",
        poems: "1000+ poems",
      },
    ],
    careers: ["Writer", "Journalist", "Teacher", "Editor", "Content Creator"],
    prerequisites: ["Basic Reading Skills"],
    examPattern: {
      theory: 80,
      practical: 20,
      duration: "3 hours",
      totalMarks: 100,
    },
  },
];

// Sample chat messages
const initialMessages = [
  {
    id: 1,
    type: "bot",
    content:
      "Hi! I'm your AI Subject Guide. I can help you understand different subjects, suggest study strategies, recommend resources, and answer any questions about your academic subjects. Which subject would you like to explore?",
    timestamp: new Date().toISOString(),
  },
];

const SubjectsGuidePage = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showChatbot, setShowChatbot] = useState(false);
  const [userContext, setUserContext] = useState({
    grade: "",
    stream: "",
    interests: [],
    challenges: "",
  });
  const [showContextDialog, setShowContextDialog] = useState(false);

  // Chat states
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const filteredSubjects = subjectsData.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      (difficultyFilter === "easy" && subject.difficulty <= 3) ||
      (difficultyFilter === "medium" && subject.difficulty === 4) ||
      (difficultyFilter === "hard" && subject.difficulty === 5);

    return matchesSearch && matchesDifficulty;
  });

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(
        newMessage,
        userContext,
        selectedSubject
      );
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          content: botResponse,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput, context, subject) => {
    const input = userInput.toLowerCase();

    if (input.includes("study") && input.includes("tips")) {
      if (subject) {
        return `Here are effective study tips for ${
          subject.name
        }:\n\n${subject.studyTips
          .map((tip, index) => `${index + 1}. ${tip}`)
          .join(
            "\n"
          )}\n\nRemember to practice regularly and don't hesitate to ask for help when needed!`;
      }
      return "For effective studying: 1) Create a schedule and stick to it, 2) Use active recall techniques, 3) Take regular breaks, 4) Form study groups, 5) Practice past papers. Which specific subject would you like study tips for?";
    }

    if (input.includes("difficult") || input.includes("hard")) {
      const hardSubjects = subjectsData.filter((s) => s.difficulty >= 4);
      return `The most challenging subjects are typically: ${hardSubjects
        .map((s) => s.name)
        .join(
          ", "
        )}. However, with proper study techniques and consistent practice, any subject can be mastered. Which subject are you finding difficult?`;
    }

    if (input.includes("career") || input.includes("job")) {
      if (subject) {
        return `${
          subject.name
        } can lead to exciting careers like: ${subject.careers.join(
          ", "
        )}. Each path offers unique opportunities and good growth prospects. Would you like to know more about any specific career?`;
      }
      return "Different subjects open doors to various careers. For example: Science leads to engineering/medicine, Math to data science/finance, English to journalism/teaching. Which field interests you most?";
    }

    if (
      input.includes("resources") ||
      input.includes("books") ||
      input.includes("materials")
    ) {
      if (subject) {
        const resources = subject.resources
          .map(
            (r) =>
              `• ${r.title} (${
                r.duration ||
                r.pages ||
                r.questions ||
                r.simulations ||
                r.experiments ||
                r.activities ||
                r.problems ||
                r.episodes ||
                r.poems ||
                r.languages
              })`
          )
          .join("\n");
        return `Here are great resources for ${subject.name}:\n\n${resources}\n\nStart with the basics and gradually move to advanced materials. Consistent practice is key!`;
      }
      return "I can recommend specific resources once you tell me which subject you're interested in. Are you looking for videos, books, practice materials, or online platforms?";
    }

    if (input.includes("time") || input.includes("schedule")) {
      return `Based on your current level, I'd suggest:\n\n• Dedicate 2-3 hours daily for core subjects\n• Focus on weak areas first\n• Use the 25-minute Pomodoro technique\n• Review previous topics weekly\n\nWould you like a personalized study schedule for any specific subject?`;
    }

    // Context-based responses
    if (context.challenges) {
      return `I understand you're facing challenges with ${context.challenges}. Here's what I suggest:\n\n1. Break down complex topics into smaller parts\n2. Use multiple learning resources (visual, audio, text)\n3. Practice regularly with increasing difficulty\n4. Don't hesitate to ask teachers or peers for help\n\nWhich specific aspect would you like help with?`;
    }

    return "I'm here to help you with any subject-related questions! You can ask me about:\n\n• Study tips and strategies\n• Career prospects\n• Learning resources\n• Time management\n• Specific topic explanations\n\nWhat would you like to know?";
  };

  const saveContext = () => {
    setShowContextDialog(false);
    // Add a context-aware welcome message
    const contextMessage = {
      id: Date.now(),
      type: "bot",
      content: `Great! I now know you're in ${userContext.grade} studying ${
        userContext.stream
      }. ${
        userContext.interests.length > 0
          ? `I see you're interested in ${userContext.interests.join(", ")}.`
          : ""
      } ${
        userContext.challenges
          ? `I'll help you with ${userContext.challenges}.`
          : ""
      } How can I assist you today?`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, contextMessage]);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 3) return "text-green-600 dark:text-green-400";
    if (difficulty === 4) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 3) return "Easy";
    if (difficulty === 4) return "Medium";
    return "Hard";
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Subjects Guide
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Comprehensive guide to academic subjects with AI-powered
                assistance
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowContextDialog(true)}
              variant="neutral"
              className="w-full sm:w-auto"
            >
              <User className="mr-2 h-4 w-4" />
              <span className="sm:hidden">Set Learning Context</span>
              <span className="hidden sm:inline">Set Context</span>
            </Button>
            <Button
              onClick={() => setShowChatbot(true)}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span className="sm:hidden">Ask AI Subject Guide</span>
              <span className="hidden sm:inline">Ask AI Guide</span>
            </Button>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 pt-2 sm:pt-5">
          {filteredSubjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <Card
                key={subject.id}
                className="border-0 shadow-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedSubject(subject)}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 sm:p-3 rounded-xl ${subject.color} group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {subject.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getDifficultyColor(
                              subject.difficulty
                            )} w-fit`}
                          >
                            {getDifficultyLabel(subject.difficulty)}
                          </Badge>
                          <div className="flex items-center">
                            {[...Array(subject.popularity)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {subject.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs sm:text-sm font-medium">
                      Key Topics:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.slice(0, 3).map((topic) => (
                        <Badge
                          key={topic.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          {topic.name}
                        </Badge>
                      ))}
                      {subject.topics.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{subject.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs sm:text-sm font-medium">
                      Career Prospects:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {subject.careers.slice(0, 3).map((career) => (
                        <Badge
                          key={career}
                          variant="outline"
                          className="text-xs"
                        >
                          {career}
                        </Badge>
                      ))}
                      {subject.careers.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.careers.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Subject Details Dialog */}
        <Dialog
          open={!!selectedSubject}
          onOpenChange={() => setSelectedSubject(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            {selectedSubject && (
              <>
                <DialogHeader className="pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div
                      className={`p-2 sm:p-3 rounded-xl ${selectedSubject.color} flex-shrink-0`}
                    >
                      <selectedSubject.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
                      <DialogTitle className="text-xl sm:text-2xl">
                        {selectedSubject.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm sm:text-base">
                        {selectedSubject.description}
                      </DialogDescription>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <Badge
                          className={`${getDifficultyColor(
                            selectedSubject.difficulty
                          )} w-fit`}
                        >
                          {getDifficultyLabel(selectedSubject.difficulty)} Level
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
                          <span className="text-xs sm:text-sm">
                            High Career Relevance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="topics" className="space-y-4 sm:space-y-6">
                  <TabsList className="grid w-full grid-cols-4 h-auto">
                    <TabsTrigger
                      value="topics"
                      className="text-xs sm:text-sm py-2"
                    >
                      Topics
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="text-xs sm:text-sm py-2"
                    >
                      Resources
                    </TabsTrigger>
                    <TabsTrigger
                      value="tips"
                      className="text-xs sm:text-sm py-2"
                    >
                      Study Tips
                    </TabsTrigger>
                    <TabsTrigger
                      value="exam"
                      className="text-xs sm:text-sm py-2"
                    >
                      Exam Pattern
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="topics"
                    className="space-y-3 sm:space-y-4"
                  >
                    <div className="grid gap-3 sm:gap-4">
                      {selectedSubject.topics.map((topic) => (
                        <Card key={topic.id} className="border">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                              <div className="space-y-1 min-w-0 flex-1">
                                <h4 className="font-medium text-sm sm:text-base">
                                  {topic.name}
                                </h4>
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {topic.duration}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs w-fit ${getDifficultyColor(
                                      topic.difficulty
                                    )}`}
                                  >
                                    Level {topic.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="neutral"
                                className="w-full sm:w-auto"
                              >
                                <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm">
                                  Start Learning
                                </span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="resources"
                    className="space-y-3 sm:space-y-4"
                  >
                    <div className="grid gap-3 sm:gap-4">
                      {selectedSubject.resources.map((resource, index) => (
                        <Card key={index} className="border">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                              <div className="flex items-start space-x-2 sm:space-x-3 min-w-0 flex-1">
                                {resource.type === "video" && (
                                  <Video className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "book" && (
                                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "practice" && (
                                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "platform" && (
                                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "simulation" && (
                                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "interactive" && (
                                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "audio" && (
                                  <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                                )}
                                {resource.type === "documentation" && (
                                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                )}
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-sm sm:text-base">
                                    {resource.title}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-muted-foreground">
                                    {resource.duration ||
                                      resource.pages ||
                                      resource.questions ||
                                      resource.simulations ||
                                      resource.experiments ||
                                      resource.activities ||
                                      resource.problems ||
                                      resource.episodes ||
                                      resource.poems ||
                                      resource.languages}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <Button size="sm" variant="ghost">
                                  <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tips" className="space-y-3 sm:space-y-4">
                    <div className="grid gap-3 sm:gap-4">
                      {selectedSubject.studyTips.map((tip, index) => (
                        <Card key={index} className="border">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex items-start space-x-2 sm:space-x-3">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {index + 1}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm">{tip}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1 text-sm sm:text-base">
                              Remember
                            </h4>
                            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                              Consistency is key to mastering any subject.
                              Practice regularly and don't hesitate to seek help
                              when needed.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="exam" className="space-y-3 sm:space-y-4">
                    <Card className="border">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">
                          Exam Pattern Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1 sm:space-y-2">
                            <h4 className="font-medium text-sm sm:text-base">
                              Theory Component
                            </h4>
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">
                              {selectedSubject.examPattern.theory}%
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <h4 className="font-medium text-sm sm:text-base">
                              Practical Component
                            </h4>
                            <div className="text-xl sm:text-2xl font-bold text-green-600">
                              {selectedSubject.examPattern.practical}%
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
                          <div className="space-y-1">
                            <h4 className="font-medium text-sm sm:text-base">
                              Duration
                            </h4>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              {selectedSubject.examPattern.duration}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium text-sm sm:text-base">
                              Total Marks
                            </h4>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              {selectedSubject.examPattern.totalMarks}
                            </p>
                          </div>
                        </div>
                        {selectedSubject.prerequisites.length > 0 && (
                          <div className="space-y-2 pt-3 sm:pt-4 border-t">
                            <h4 className="font-medium text-sm sm:text-base">
                              Prerequisites
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {selectedSubject.prerequisites.map((prereq) => (
                                <Badge
                                  key={prereq}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 sm:pt-6 border-t">
                  <Button
                    variant="neutral"
                    onClick={() => {
                      setSelectedSubject(selectedSubject);
                      setShowChatbot(true);
                    }}
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">
                      Ask AI About This Subject
                    </span>
                  </Button>
                  <Button variant={""} className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm">Start Learning</span>
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Context Setting Dialog */}
        <Dialog open={showContextDialog} onOpenChange={setShowContextDialog}>
          <DialogContent className="max-w-md mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                Set Your Learning Context
              </DialogTitle>
              <DialogDescription className="text-sm">
                Help our AI provide more personalized guidance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              <div>
                <label className="text-sm font-medium mb-1 sm:mb-2 block">
                  Grade/Class
                </label>
                <Select
                  value={userContext.grade}
                  onValueChange={(value) =>
                    setUserContext((prev) => ({ ...prev, grade: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 sm:mb-2 block">
                  Stream
                </label>
                <Select
                  value={userContext.stream}
                  onValueChange={(value) =>
                    setUserContext((prev) => ({ ...prev, stream: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="science-pcm">Science (PCM)</SelectItem>
                    <SelectItem value="science-pcb">Science (PCB)</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts/Humanities</SelectItem>
                    <SelectItem value="computer">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 sm:mb-2 block">
                  Subjects of Interest
                </label>
                <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                  {subjectsData.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={subject.id}
                        checked={userContext.interests.includes(subject.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setUserContext((prev) => ({
                              ...prev,
                              interests: [...prev.interests, subject.name],
                            }));
                          } else {
                            setUserContext((prev) => ({
                              ...prev,
                              interests: prev.interests.filter(
                                (interest) => interest !== subject.name
                              ),
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor={subject.id}
                        className="text-xs sm:text-sm cursor-pointer"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 sm:mb-2 block">
                  Current Challenges (Optional)
                </label>
                <Textarea
                  placeholder="What subjects or topics are you finding difficult?"
                  value={userContext.challenges}
                  onChange={(e) =>
                    setUserContext((prev) => ({
                      ...prev,
                      challenges: e.target.value,
                    }))
                  }
                  className="min-h-[60px] sm:min-h-[80px] text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2 sm:pt-4">
                <Button
                  variant="neutral"
                  onClick={() => setShowContextDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button onClick={saveContext} className="w-full sm:w-auto">
                  Save Context
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Chatbot Dialog */}
        <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
          <DialogContent className="max-w-2xl h-[80vh] sm:h-[600px] flex flex-col mx-4 sm:mx-auto">
            <DialogHeader>
              <DialogTitle className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-base sm:text-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                  <span>AI Subject Guide</span>
                </div>
                {selectedSubject && (
                  <Badge variant="outline" className="text-xs w-fit">
                    {selectedSubject.name}
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Get personalized guidance for your academic subjects
              </DialogDescription>
            </DialogHeader>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 bg-muted/20 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex space-x-2 sm:space-x-3 ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.type === "bot"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-green-100 text-green-600"
                      }
                    >
                      {message.type === "bot" ? (
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[75%] sm:max-w-sm p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                      message.type === "user"
                        ? "bg-indigo-600 text-white ml-auto"
                        : "bg-white border shadow-sm"
                    }`}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex space-x-2 sm:space-x-3">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border shadow-sm p-2 sm:p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {[
                    "Study tips for math",
                    "Career options",
                    "Best resources",
                    "Time management",
                  ].map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewMessage(question)}
                      className="text-xs h-7 sm:h-8 px-2 sm:px-3"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="flex space-x-2 pt-3 sm:pt-4 border-t">
              <Input
                placeholder="Ask me anything about subjects..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 text-xs sm:text-sm"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubjectsGuidePage;
