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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  GraduationCap,
  Brain,
  Calculator,
  Microscope,
  Palette,
  Globe,
  Users,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Heart,
  Code,
  Music,
  BookOpen,
  Briefcase,
  Star,
  ChevronRight,
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  BarChart3,
  Trophy,
  Zap,
} from "lucide-react";

// Stream data with detailed information
const streamOptions = [
  {
    id: "science",
    name: "Science (PCM/PCB)",
    description:
      "Physics, Chemistry, Mathematics/Biology for engineering and medical careers",
    icon: Microscope,
    color:
      "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400",
    careers: [
      "Doctor",
      "Engineer",
      "Researcher",
      "Pharmacist",
      "Biotechnologist",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    difficulty: 4,
    jobProspects: 5,
    avgSalary: "₹6-25 LPA",
    topColleges: ["IIT", "AIIMS", "NIT", "BITS", "Manipal"],
  },
  {
    id: "commerce",
    name: "Commerce",
    description:
      "Accounting, Economics, Business Studies for business and finance careers",
    icon: TrendingUp,
    color:
      "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:text-green-400",
    careers: ["CA", "MBA", "Banker", "Financial Analyst", "Entrepreneur"],
    subjects: ["Accountancy", "Economics", "Business Studies", "Mathematics"],
    difficulty: 3,
    jobProspects: 4,
    avgSalary: "₹4-20 LPA",
    topColleges: ["SRCC", "LSR", "XLRI", "FMS", "JBIMS"],
  },
  {
    id: "arts",
    name: "Arts/Humanities",
    description:
      "Literature, History, Psychology for creative and social science careers",
    icon: Palette,
    color:
      "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400",
    careers: [
      "Lawyer",
      "Journalist",
      "Psychologist",
      "Teacher",
      "Civil Servant",
    ],
    subjects: [
      "English",
      "History",
      "Political Science",
      "Psychology",
      "Sociology",
    ],
    difficulty: 2,
    jobProspects: 3,
    avgSalary: "₹3-15 LPA",
    topColleges: ["JNU", "DU", "BHU", "Jamia", "Presidency"],
  },
  {
    id: "computer",
    name: "Computer Science",
    description: "Programming, Technology, AI for tech industry careers",
    icon: Code,
    color:
      "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400",
    careers: [
      "Software Engineer",
      "Data Scientist",
      "AI Engineer",
      "Cybersecurity Expert",
    ],
    subjects: ["Programming", "Data Structures", "AI/ML", "Cybersecurity"],
    difficulty: 4,
    jobProspects: 5,
    avgSalary: "₹8-35 LPA",
    topColleges: ["IIT", "IIIT", "NIT", "VIT", "SRM"],
  },
];

// Assessment questions
const assessmentQuestions = [
  {
    id: 1,
    question: "Which subjects do you enjoy the most?",
    type: "multiple",
    options: [
      { id: "math", label: "Mathematics", stream: "science" },
      { id: "physics", label: "Physics", stream: "science" },
      { id: "chemistry", label: "Chemistry", stream: "science" },
      { id: "biology", label: "Biology", stream: "science" },
      { id: "accounts", label: "Accounts", stream: "commerce" },
      { id: "economics", label: "Economics", stream: "commerce" },
      { id: "english", label: "English", stream: "arts" },
      { id: "history", label: "History", stream: "arts" },
      { id: "programming", label: "Programming", stream: "computer" },
    ],
  },
  {
    id: 2,
    question: "What type of career excites you most?",
    type: "single",
    options: [
      { id: "doctor", label: "Healthcare & Medicine", stream: "science" },
      { id: "engineer", label: "Engineering & Technology", stream: "science" },
      { id: "business", label: "Business & Finance", stream: "commerce" },
      { id: "creative", label: "Arts & Creative Fields", stream: "arts" },
      { id: "tech", label: "Software & Technology", stream: "computer" },
    ],
  },
  {
    id: 3,
    question: "How would you rate your mathematical skills?",
    type: "slider",
    min: 1,
    max: 5,
    default: 3,
  },
  {
    id: 4,
    question: "What's your preferred learning style?",
    type: "single",
    options: [
      { id: "practical", label: "Hands-on & Practical" },
      { id: "theoretical", label: "Theoretical & Conceptual" },
      { id: "visual", label: "Visual & Creative" },
      { id: "analytical", label: "Analytical & Problem-solving" },
    ],
  },
];

// Sample chat messages
const initialMessages = [
  {
    id: 1,
    type: "bot",
    content:
      "Hi! I'm your AI Career Counselor. I'm here to help you explore different streams and make the best choice for your future. Feel free to ask me anything about streams, careers, or your assessment results!",
    timestamp: new Date().toISOString(),
  },
];

const StreamSelectionPage = () => {
  const [currentStep, setCurrentStep] = useState("assessment"); // assessment, results, chat
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recommendedStreams, setRecommendedStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

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

  const handleAnswerChange = (questionId, answer) => {
    setAssessmentAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateRecommendations = () => {
    const streamScores = {
      science: 0,
      commerce: 0,
      arts: 0,
      computer: 0,
    };

    // Score based on subject preferences
    if (assessmentAnswers[1]) {
      assessmentAnswers[1].forEach((subjectId) => {
        const subject = assessmentQuestions[0].options.find(
          (opt) => opt.id === subjectId
        );
        if (subject) {
          streamScores[subject.stream] += 2;
        }
      });
    }

    // Score based on career interests
    if (assessmentAnswers[2]) {
      const career = assessmentQuestions[1].options.find(
        (opt) => opt.id === assessmentAnswers[2]
      );
      if (career) {
        streamScores[career.stream] += 3;
      }
    }

    // Score based on math skills
    const mathSkill = assessmentAnswers[3] || 3;
    if (mathSkill >= 4) {
      streamScores.science += 2;
      streamScores.computer += 2;
    } else if (mathSkill <= 2) {
      streamScores.arts += 1;
    }

    // Sort streams by score
    const sortedStreams = Object.entries(streamScores)
      .map(([streamId, score]) => ({
        ...streamOptions.find((s) => s.id === streamId),
        score,
        matchPercentage: Math.min(100, (score / 7) * 100),
      }))
      .sort((a, b) => b.score - a.score);

    setRecommendedStreams(sortedStreams);
    setCurrentStep("results");
  };

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
        recommendedStreams,
        selectedStream
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

  const generateBotResponse = (userInput, recommendations, stream) => {
    const input = userInput.toLowerCase();

    if (
      input.includes("science") ||
      input.includes("pcm") ||
      input.includes("pcb")
    ) {
      return "Science is a great choice! It opens doors to engineering, medicine, and research careers. The PCM combination is ideal for engineering, while PCB is perfect for medical and biological sciences. Would you like to know more about specific career paths?";
    }

    if (input.includes("commerce") || input.includes("business")) {
      return "Commerce offers excellent opportunities in business, finance, and entrepreneurship. You can become a CA, pursue MBA, or start your own business. The analytical skills you develop will be valuable in any career path.";
    }

    if (input.includes("arts") || input.includes("humanities")) {
      return "Arts/Humanities nurtures critical thinking and creativity. It's perfect for careers in law, journalism, psychology, and civil services. Don't let anyone tell you it's 'easy' - it requires deep analytical and communication skills!";
    }

    if (
      input.includes("computer") ||
      input.includes("programming") ||
      input.includes("coding")
    ) {
      return "Computer Science is booming! With AI, machine learning, and digital transformation, tech careers offer high growth potential. You'll learn programming, problem-solving, and logical thinking - skills that are highly valued today.";
    }

    if (
      input.includes("salary") ||
      input.includes("money") ||
      input.includes("earn")
    ) {
      return "Salaries vary by field and experience. Generally: Science (₹6-25 LPA), Commerce (₹4-20 LPA), Arts (₹3-15 LPA), Computer Science (₹8-35 LPA). But remember, passion and skill matter more than just salary!";
    }

    if (
      input.includes("difficult") ||
      input.includes("hard") ||
      input.includes("easy")
    ) {
      return "Each stream has its challenges. Science requires strong analytical skills, Commerce needs attention to detail, Arts requires critical thinking and writing skills, and Computer Science needs logical problem-solving. Choose based on your strengths and interests!";
    }

    if (recommendations.length > 0) {
      const topStream = recommendations[0];
      return `Based on your assessment, ${
        topStream.name
      } seems like a great fit for you with ${Math.round(
        topStream.matchPercentage
      )}% compatibility! This stream aligns well with your interests and can lead to careers like ${topStream.careers
        .slice(0, 3)
        .join(", ")}. What specific aspect would you like to explore?`;
    }

    return "That's a great question! I'm here to help you understand different streams and make the best choice. You can ask me about career prospects, difficulty levels, salary expectations, or anything else related to stream selection. What would you like to know?";
  };

  const AssessmentStep = () => {
    const question = assessmentQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2"></div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="shadow-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-border/50">
          <CardContent className="p-4 sm:p-8">
            <h3 className="text-lg font-medium mb-6">{question.question}</h3>

            {question.type === "multiple" && (
              <div className="grid gap-3">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={
                        assessmentAnswers[question.id]?.includes(option.id) ||
                        false
                      }
                      onCheckedChange={(checked) => {
                        const currentAnswers =
                          assessmentAnswers[question.id] || [];
                        if (checked) {
                          handleAnswerChange(question.id, [
                            ...currentAnswers,
                            option.id,
                          ]);
                        } else {
                          handleAnswerChange(
                            question.id,
                            currentAnswers.filter((id) => id !== option.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "single" && (
              <div className="grid gap-3">
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={option.id}
                      name={`question-${question.id}`}
                      checked={assessmentAnswers[question.id] === option.id}
                      onChange={() =>
                        handleAnswerChange(question.id, option.id)
                      }
                      className="h-4 w-4"
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {question.type === "slider" && (
              <div className="space-y-4">
                <Slider
                  value={[assessmentAnswers[question.id] || question.default]}
                  onValueChange={([value]) =>
                    handleAnswerChange(question.id, value)
                  }
                  max={question.max}
                  min={question.min}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Beginner</span>
                  <span className="font-medium">
                    {assessmentAnswers[question.id] || question.default}/5
                  </span>
                  <span>Expert</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-2">
              <Button
                variant="neutral"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>

              {currentQuestion === assessmentQuestions.length - 1 ? (
                <Button
                  onClick={calculateRecommendations}
                  disabled={!assessmentAnswers[question.id]}
                  className="w-full sm:w-auto"
                >
                  Get Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={!assessmentAnswers[question.id]}
                  className="w-full sm:w-auto"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ResultsStep = () => (
    <div className="space-y-6 pt-5">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {recommendedStreams.map((stream, index) => {
          const IconComponent = stream.icon;
          return (
            <Card
              key={stream.id}
              className={`border-0 shadow-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${stream.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{stream.name}</h3>
                        {index === 0 && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {stream.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(stream.matchPercentage)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Career Options
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {stream.careers.map((career) => (
                        <Badge
                          key={career}
                          variant="outline"
                          className="text-xs"
                        >
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {stream.subjects.map((subject) => (
                        <Badge
                          key={subject}
                          variant="secondary"
                          className="text-xs"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-t border-border/50">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < stream.difficulty
                              ? "fill-orange-400 text-orange-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Difficulty
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < stream.jobProspects
                              ? "fill-green-400 text-green-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Job Prospects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">
                      {stream.avgSalary}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Avg Salary
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    Top Colleges
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {stream.topColleges.map((college) => (
                      <Badge
                        key={college}
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-600 border-blue-200"
                      >
                        {college}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-border/50 gap-2">
                  <Button
                    variant="neutral"
                    onClick={() => setSelectedStream(stream)}
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedStream(stream);
                      setShowChatbot(true);
                    }}
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
        <Button
          variant="neutral"
          onClick={() => {
            setCurrentStep("assessment");
            setCurrentQuestion(0);
            setAssessmentAnswers({});
          }}
          className="w-full sm:w-auto"
        >
          Retake Assessment
        </Button>
        <Button
          onClick={() => setShowChatbot(true)}
          className="w-full sm:w-auto"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat with Career Counselor
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 ">
      {/* Background Pattern */}

      <div className="space-y-2">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Stream Selection Guide
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Discover the perfect academic stream for your career goals
                through our AI-powered assessment
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentStep === "assessment" && <AssessmentStep />}
        {currentStep === "results" && <ResultsStep />}

        {/* Chatbot Dialog */}
        <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
          <DialogContent className="max-w-full sm:max-w-2xl w-full h-[70vh] sm:h-[600px] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span>AI Career Counselor</span>
              </DialogTitle>
              <DialogDescription>
                Get personalized advice about streams and career paths
              </DialogDescription>
            </DialogHeader>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-2 sm:p-4 bg-muted/20 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex space-x-3 ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={
                        message.type === "bot"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }
                    >
                      {message.type === "bot" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[90vw] sm:max-w-sm p-3 rounded-lg text-sm ${
                      message.type === "user"
                        ? "bg-blue-600 text-white ml-auto"
                        : "bg-white border shadow-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border shadow-sm p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
              <Input
                placeholder="Ask me anything about streams and careers..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StreamSelectionPage;
