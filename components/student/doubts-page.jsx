"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  MessageCircle,
  Send,
  Image as ImageIcon,
  Camera,
  Upload,
  History,
  Bot,
  User,
  Clock,
  BookOpen,
  Target,
  Zap,
  X,
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Search,
  Filter,
} from "lucide-react";

// Subjects data for context selection
const subjects = [
  { id: "mathematics", name: "Mathematics", icon: Target },
  { id: "physics", name: "Physics", icon: Zap },
  { id: "chemistry", name: "Chemistry", icon: BookOpen },
  { id: "biology", name: "Biology", icon: BookOpen },
  { id: "english", name: "English", icon: BookOpen },
  { id: "computer-science", name: "Computer Science", icon: Target },
];

// Sample chapters for each subject
const chapters = {
  mathematics: ["Algebra", "Geometry", "Calculus", "Statistics"],
  physics: ["Mechanics", "Thermodynamics", "Optics", "Electricity"],
  chemistry: ["Atomic Structure", "Chemical Bonding", "Organic Chemistry"],
  biology: ["Cell Biology", "Genetics", "Evolution", "Ecology"],
  english: ["Poetry", "Grammar", "Literature", "Writing"],
  "computer-science": ["Programming", "Data Structures", "Algorithms", "Databases"],
};

// Sample chat history
const sampleHistory = [
  {
    id: 1,
    subject: "Mathematics",
    chapter: "Algebra",
    question: "How do I solve quadratic equations?",
    timestamp: "2024-12-08 10:30 AM",
    hasImage: false,
    messages: [
      {
        id: 1,
        type: "user",
        content: "How do I solve quadratic equations?",
        timestamp: "10:30 AM",
      },
      {
        id: 2,
        type: "bot",
        content: "Quadratic equations can be solved using several methods:\n\n1. **Factoring**: If the equation can be factored\n2. **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a\n3. **Completing the Square**\n4. **Graphing**\n\nWhich method would you like me to explain in detail?",
        timestamp: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    subject: "Physics",
    chapter: "Mechanics",
    question: "Explain Newton's laws of motion",
    timestamp: "2024-12-07 02:15 PM",
    hasImage: true,
    messages: [
      {
        id: 1,
        type: "user",
        content: "Can you explain Newton's laws of motion with examples?",
        timestamp: "02:15 PM",
        image: "/images/newtons-laws.jpg",
      },
      {
        id: 2,
        type: "bot",
        content: "Newton's Three Laws of Motion:\n\n**First Law (Inertia)**: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n**Second Law (F=ma)**: The force acting on an object equals its mass times acceleration.\n\n**Third Law (Action-Reaction)**: For every action, there is an equal and opposite reaction.\n\nWould you like specific examples for each law?",
        timestamp: "02:15 PM",
      },
    ],
  },
];

const DoubtsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [chatHistory, setChatHistory] = useState(sampleHistory);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() && !uploadedImage) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: uploadedImage,
      subject: selectedSubject,
      chapter: selectedChapter,
    };

    setCurrentChat(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: generateAIResponse(currentMessage, selectedSubject, selectedChapter),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setCurrentChat(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Save to history if it's a new conversation
      if (currentChat.length === 0) {
        const newHistoryItem = {
          id: Date.now(),
          subject: subjects.find(s => s.id === selectedSubject)?.name || "General",
          chapter: selectedChapter || "General",
          question: currentMessage.substring(0, 50) + (currentMessage.length > 50 ? "..." : ""),
          timestamp: new Date().toLocaleString(),
          hasImage: !!uploadedImage,
          messages: [userMessage, botMessage],
        };
        setChatHistory(prev => [newHistoryItem, ...prev]);
      }
    }, 1500);

    removeUploadedImage();
  };

  const generateAIResponse = (message, subject, chapter) => {
    const responses = {
      mathematics: "I can help you with this mathematical concept. Let me break it down step by step...",
      physics: "This is an interesting physics question. Let me explain the underlying principles...",
      chemistry: "Great chemistry question! Let me walk you through the chemical processes involved...",
      biology: "This biological concept is fascinating. Here's how it works in living organisms...",
      english: "Excellent question about English! Let me help you understand this concept...",
      "computer-science": "Good programming question! Let me explain this concept with examples...",
    };

    return responses[subject] || "I understand your question. Let me provide you with a comprehensive answer based on the context you've provided...";
  };

  const clearCurrentChat = () => {
    setCurrentChat([]);
    setSelectedHistoryItem(null);
  };

  const loadHistoryItem = (item) => {
    setSelectedHistoryItem(item);
    setCurrentChat(item.messages);
  };

  const filteredHistory = chatHistory.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          AI Doubts Assistant
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Get instant help with your academic questions using AI
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14">
          <TabsTrigger value="chat" className="text-sm sm:text-base font-medium">
            <MessageCircle className="mr-2 h-4 w-4" />
            Ask Questions
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm sm:text-base font-medium">
            <History className="mr-2 h-4 w-4" />
            Chat History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-4">
            {/* Context Selection Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="border-2 border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Context</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            <div className="flex items-center space-x-2">
                              <subject.icon className="h-4 w-4" />
                              <span>{subject.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSubject && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Chapter</label>
                      <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select chapter" />
                        </SelectTrigger>
                        <SelectContent>
                          {chapters[selectedSubject]?.map((chapter) => (
                            <SelectItem key={chapter} value={chapter}>
                              {chapter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearCurrentChat}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      New Conversation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="border-2 border-border dark:border-border h-[600px] flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-6 w-6 text-blue-600" />
                      <span>AI Assistant</span>
                    </div>
                    {selectedSubject && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {subjects.find(s => s.id === selectedSubject)?.name}
                        </Badge>
                        {selectedChapter && (
                          <Badge variant="secondary">{selectedChapter}</Badge>
                        )}
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>

                {/* Chat Messages */}
                <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                  {currentChat.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Bot className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                      <h3 className="text-lg font-semibold mb-2">Welcome to AI Doubts Assistant!</h3>
                      <p className="text-sm">
                        Select a subject and chapter, then ask your questions. 
                        I'm here to help you understand complex concepts!
                      </p>
                    </div>
                  ) : (
                    <>
                      {currentChat.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-muted/50 border'
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.type === 'bot' && (
                                <Bot className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                {message.image && (
                                  <div className="mb-2">
                                    <img
                                      src={message.image}
                                      alt="Uploaded"
                                      className="max-w-full h-auto rounded-lg"
                                    />
                                  </div>
                                )}
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                                }`}>
                                  {message.timestamp}
                                </p>
                              </div>
                              {message.type === 'user' && (
                                <User className="h-5 w-5 text-blue-100 mt-1 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted/50 border rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Bot className="h-5 w-5 text-blue-600" />
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="flex-shrink-0 border-t p-4">
                  {uploadedImage && (
                    <div className="mb-3 relative inline-block">
                      <img
                        src={uploadedImage}
                        alt="Upload preview"
                        className="max-w-20 h-20 object-cover rounded-lg border"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={removeUploadedImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Ask your question here..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        className="min-h-[60px] max-h-32 resize-none pr-20"
                      />
                      <div className="absolute right-2 bottom-2 flex space-x-1">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-8 w-8 p-0"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={(!currentMessage.trim() && !uploadedImage) || isLoading}
                      className="h-[60px]"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {/* Search and Filter */}
            <Card className="border-2 border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search your doubts history..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Items */}
            <div className="grid gap-4">
              {filteredHistory.length === 0 ? (
                <Card className="border-2 border-dashed border-muted">
                  <CardContent className="text-center py-12">
                    <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No chat history found</h3>
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "Try adjusting your search terms" : "Start asking questions to build your history"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredHistory.map((item) => (
                  <Card key={item.id} className="border hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{item.subject}</Badge>
                            <Badge variant="secondary">{item.chapter}</Badge>
                            {item.hasImage && (
                              <Badge variant="outline" className="text-blue-600">
                                <ImageIcon className="h-3 w-3 mr-1" />
                                Image
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{item.question}</h3>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{item.timestamp}</span>
                            <span>•</span>
                            <span>{item.messages.length} messages</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => loadHistoryItem(item)}
                          >
                            View Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoubtsPage;