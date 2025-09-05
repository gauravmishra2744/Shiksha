"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Brain,
  Lightbulb,
  Target,
  Clock,
  Users,
  BookOpen,
  Zap,
  Star,
  CheckSquare,
  Calendar,
  FileText,
  Video,
  Award,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Copy,
  Plus,
  Search,
  Filter,
  Sparkles,
  GraduationCap,
  PlayCircle,
  PenTool,
  Gamepad2,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

// Dummy data for lesson plans
const lessonPlansData = {
  templates: [
    {
      id: 1,
      title: "Science Experiment Lab",
      subject: "Physics",
      grade: "Grade 10",
      duration: "60 min",
      type: "Hands-on",
      description: "Interactive laboratory session with real experiments",
      activities: ["Experiment Setup", "Data Collection", "Analysis", "Conclusion"],
      materials: ["Lab Equipment", "Worksheets", "Safety Gear"],
      difficulty: "Medium",
      rating: 4.8,
      usageCount: 245,
    },
    {
      id: 2,
      title: "Literature Analysis Workshop",
      subject: "English",
      grade: "Grade 9",
      duration: "45 min",
      type: "Discussion",
      description: "Deep dive into character analysis and themes",
      activities: ["Reading", "Group Discussion", "Character Mapping", "Presentation"],
      materials: ["Text Books", "Worksheets", "Presentation Tools"],
      difficulty: "Easy",
      rating: 4.6,
      usageCount: 189,
    },
    {
      id: 3,
      title: "Math Problem Solving Session",
      subject: "Mathematics",
      grade: "Grade 11",
      duration: "50 min",
      type: "Problem-solving",
      description: "Step-by-step approach to complex mathematical problems",
      activities: ["Problem Introduction", "Solution Methods", "Practice", "Review"],
      materials: ["Calculators", "Graph Paper", "Formula Sheets"],
      difficulty: "Hard",
      rating: 4.9,
      usageCount: 312,
    },
    {
      id: 4,
      title: "History Timeline Creation",
      subject: "History",
      grade: "Grade 8",
      duration: "40 min",
      type: "Creative",
      description: "Visual timeline creation for historical events",
      activities: ["Research", "Timeline Design", "Presentation", "Discussion"],
      materials: ["Reference Books", "Art Supplies", "Computers"],
      difficulty: "Easy",
      rating: 4.5,
      usageCount: 156,
    },
  ],
  myPlans: [
    {
      id: 1,
      title: "Quadratic Equations - Advanced Concepts",
      subject: "Mathematics",
      grade: "Grade 10",
      date: "2024-01-15",
      status: "Completed",
      duration: "55 min",
      studentsCount: 28,
      averageScore: 87,
      feedback: "Excellent",
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      subject: "Physics",
      grade: "Grade 9",
      date: "2024-01-12",
      status: "In Progress",
      duration: "60 min",
      studentsCount: 25,
      averageScore: null,
      feedback: "Pending",
    },
    {
      id: 3,
      title: "Photosynthesis Process",
      subject: "Biology",
      grade: "Grade 8",
      date: "2024-01-10",
      status: "Draft",
      duration: "45 min",
      studentsCount: 30,
      averageScore: null,
      feedback: "Not Started",
    },
  ],
  aiSuggestions: [
    {
      id: 1,
      title: "Interactive Math Games for Algebra",
      description: "Based on your Grade 10 class performance, students would benefit from gamified algebra practice",
      confidence: "95%",
      type: "Activity Enhancement",
      subject: "Mathematics",
      estimatedImprovement: "+15% engagement",
      implementationTime: "10 mins",
    },
    {
      id: 2,
      title: "Visual Learning for Physics Concepts",
      description: "Your students show strong visual learning preferences for complex physics topics",
      confidence: "88%",
      type: "Learning Style",
      subject: "Physics",
      estimatedImprovement: "+20% comprehension",
      implementationTime: "15 mins",
    },
    {
      id: 3,
      title: "Collaborative Learning for Literature",
      description: "Group discussions have shown 30% better retention in your English classes",
      confidence: "92%",
      type: "Teaching Method",
      subject: "English",
      estimatedImprovement: "+25% retention",
      implementationTime: "5 mins",
    },
  ],
};

export default function AILessonPlannerPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    grade: "",
    duration: "",
    objectives: "",
    teachingStyle: "",
    includeActivities: false,
    includeAssessment: false,
    includeMultimedia: false,
  });

  const handleCreatePlan = () => {
    console.log("Creating lesson plan with:", formData);
    setShowCreateModal(false);
    // Here you would typically send the data to your AI service
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />
        
        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section - Clean without gradients */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50">
                  <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Lesson Planner</h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Create intelligent, personalized lesson plans with AI assistance
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Target className="w-3 h-3 mr-1" />
                  Personalized
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Smart Templates
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                  <DialogTrigger asChild>
                    <Button className="h-12 text-sm" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Plan
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Button className="h-12 text-sm" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
                
                <Button className="h-12 text-sm" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Suggestions
                </Button>
                
                <Button className="h-12 text-sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  My Plans
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="create" className="text-xs sm:text-sm">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Create Plan</span>
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs sm:text-sm">
                <BookOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs sm:text-sm">
                <Brain className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">AI Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">
                <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">My Plans</span>
              </TabsTrigger>
            </TabsList>

            {/* Create Plan Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <span>Lesson Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Input id="topic" placeholder="e.g., Quadratic Equations" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="objectives">Learning Objectives</Label>
                      <Textarea 
                        id="objectives" 
                        placeholder="What should students learn from this lesson?" 
                        rows={3} 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span>AI Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Teaching Style</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="justify-start">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Interactive
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Lecture-based
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Include Features</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="activities" />
                          <Label htmlFor="activities" className="text-sm font-normal">
                            Interactive activities
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="assessment" />
                          <Label htmlFor="assessment" className="text-sm font-normal">
                            Assessment questions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="multimedia" />
                          <Label htmlFor="multimedia" className="text-sm font-normal">
                            Multimedia resources
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="differentiation" />
                          <Label htmlFor="differentiation" className="text-sm font-normal">
                            Differentiated learning
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button size="lg" className="w-full">
                        <Brain className="mr-2 h-4 w-4" />
                        Generate AI Lesson Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold">Lesson Plan Templates</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lessonPlansData.templates.map((template) => (
                  <Card key={template.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-base line-clamp-2">{template.title}</h3>
                          <div className="flex items-center space-x-1 text-xs text-amber-600">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{template.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{template.subject}</span>
                            <Badge variant="outline">{template.grade}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center space-x-1 text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>{template.duration}</span>
                            </span>
                            <Badge className={getDifficultyColor(template.difficulty)}>
                              {template.difficulty}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Used {template.usageCount} times</span>
                          <Badge variant="outline" className="text-xs">{template.type}</Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="mr-2 h-3 w-3" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{template.title}</DialogTitle>
                                <DialogDescription>
                                  {template.subject} • {template.grade} • {template.duration}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p>{template.description}</p>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Activities</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {template.activities.map((activity, index) => (
                                      <Badge key={index} variant="secondary" className="justify-start">
                                        {activity}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Required Materials</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {template.materials.map((material, index) => (
                                      <Badge key={index} variant="outline" className="justify-start">
                                        {material}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Use Template
                                  </Button>
                                  <Button>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Customize
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Suggestions Tab */}
            <TabsContent value="suggestions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">AI-Powered Suggestions</h2>
                <Button size="sm" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  Refresh Suggestions
                </Button>
              </div>

              <div className="grid gap-4">
                {lessonPlansData.aiSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base mb-2">{suggestion.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-green-50 text-green-700 border-green-200">
                                <TrendingUp className="mr-1 h-3 w-3" />
                                {suggestion.confidence} confidence
                              </Badge>
                              <Badge variant="outline">{suggestion.type}</Badge>
                              <Badge variant="outline">{suggestion.subject}</Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>📈 {suggestion.estimatedImprovement}</span>
                              <span>⏱️ {suggestion.implementationTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button size="sm">
                              Apply Suggestion
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-3 w-3" />
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Plans Tab */}
            <TabsContent value="history" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Lesson Plans</h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View All
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>All Lesson Plans</DialogTitle>
                        <DialogDescription>
                          Manage and view all your lesson plans
                        </DialogDescription>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {lessonPlansData.myPlans.map((plan) => (
                            <TableRow key={plan.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{plan.title}</p>
                                  <p className="text-sm text-gray-500">{plan.duration}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{plan.subject}</Badge>
                              </TableCell>
                              <TableCell>{plan.grade}</TableCell>
                              <TableCell>{plan.date}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(plan.status)}>
                                  {plan.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{plan.studentsCount}</TableCell>
                              <TableCell>
                                {plan.averageScore ? (
                                  <span className="font-medium">{plan.averageScore}%</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid gap-4">
                {lessonPlansData.myPlans.map((plan) => (
                  <Card key={plan.id} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-base">{plan.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {plan.subject} • {plan.grade} • {plan.duration}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{plan.date}</span>
                            <span>{plan.studentsCount} students</span>
                            {plan.averageScore && (
                              <span className="font-medium text-green-600">
                                Avg: {plan.averageScore}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(plan.status)}>
                            {plan.status}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Create Plan Modal */}
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lesson Plan</DialogTitle>
                <DialogDescription>
                  Fill in the details to generate an AI-powered lesson plan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* Form content would go here - same as the create tab but in modal form */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Grade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Input placeholder="Enter lesson topic" />
                  </div>
                  <div className="space-y-2">
                    <Label>Learning Objectives</Label>
                    <Textarea placeholder="What should students learn?" rows={3} />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePlan}>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Plan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}