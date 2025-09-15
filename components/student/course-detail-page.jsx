"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Play,
  CheckCircle,
  Lock,
  Download,
  MessageCircle,
  Award,
  Calendar,
  Target,
  TrendingUp,
  Video,
  FileText,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Medal,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const courseData = {
  "math-101": {
    title: "Advanced Mathematics",
    instructor: "Dr. Priya Sharma",
    instructorAvatar: "/t1.png",
    thumbnail: "/l1.png",
    duration: "12 weeks",
    totalLessons: 45,
    students: 1250,
    rating: 4.8,
    reviews: 324,
    progress: 65,
    category: "Mathematics",
    level: "Intermediate",
    enrolled: true,
    price: "₹2,999",
    originalPrice: "₹4,999",
    discount: 40,
    description: "Master advanced mathematical concepts including calculus, algebra, and statistics. This comprehensive course covers everything from basic principles to complex problem-solving techniques with real-world applications.",
    learningOutcomes: [
      "Understand advanced calculus concepts and applications",
      "Master algebraic problem-solving techniques",
      "Apply statistical analysis methods in real scenarios",
      "Solve complex mathematical problems with confidence",
      "Develop mathematical reasoning and logical thinking",
      "Use mathematical software tools effectively",
    ],
    modules: [
      {
        id: 1,
        title: "Introduction to Advanced Mathematics",
        lessons: [
          { id: 1, title: "Course Overview", duration: "5:30", completed: true, type: "video" },
          { id: 2, title: "Mathematical Foundations", duration: "12:45", completed: true, type: "video" },
          { id: 3, title: "Problem-Solving Strategies", duration: "8:20", completed: true, type: "video" },
          { id: 4, title: "Practice Quiz", duration: "15:00", completed: false, type: "quiz" },
        ]
      },
      {
        id: 2,
        title: "Calculus Fundamentals",
        lessons: [
          { id: 5, title: "Limits and Continuity", duration: "18:30", completed: true, type: "video" },
          { id: 6, title: "Derivatives", duration: "22:15", completed: true, type: "video" },
          { id: 7, title: "Integration Techniques", duration: "25:40", completed: false, type: "video" },
          { id: 8, title: "Applications of Calculus", duration: "20:10", completed: false, type: "video" },
          { id: 9, title: "Calculus Assignment", duration: "30:00", completed: false, type: "assignment" },
        ]
      },
      {
        id: 3,
        title: "Linear Algebra",
        lessons: [
          { id: 10, title: "Vectors and Matrices", duration: "16:45", completed: false, type: "video" },
          { id: 11, title: "Matrix Operations", duration: "19:20", completed: false, type: "video" },
          { id: 12, title: "Eigenvalues and Eigenvectors", duration: "23:30", completed: false, type: "video" },
          { id: 13, title: "Linear Transformations", duration: "21:15", completed: false, type: "video" },
        ]
      },
    ],
    features: [
      "24/7 Course Access",
      "Mobile & Desktop Compatible",
      "Certificate of Completion",
      "Practice Exercises",
      "Expert Support",
      "Lifetime Access"
    ]
  }
};

const CourseDetailPageContent = ({ courseId }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const course = courseData[courseId] || courseData["math-101"];
  
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );
  
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "quiz": return <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "assignment": return <FileText className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video": return "text-blue-600 dark:text-blue-400";
      case "quiz": return "text-green-600 dark:text-green-400";
      case "assignment": return "text-orange-600 dark:text-orange-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "Intermediate":
        return "bg-yellow-50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
      case "Advanced":
        return "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Course Header */}
      <div className="relative overflow-hidden rounded-xl border-2 border-border dark:border-border">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
          <div className="p-4 sm:p-6 lg:p-8 text-white w-full">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <Badge className={`${getLevelColor(course.level)} border`}>
                {course.level}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                {course.category}
              </Badge>
              {course.discount && (
                <Badge className="bg-red-600 text-white">
                  {course.discount}% OFF
                </Badge>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg opacity-90 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center mt-3 sm:mt-4 space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white/30">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback className="text-xs sm:text-sm bg-white/20 text-white">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm sm:text-base font-medium">
                  {course.instructor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-blue-800 dark:text-blue-200 truncate">
                  {course.duration}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Duration
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 w-full">
              <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-green-800 dark:text-green-200 truncate">
                  {totalLessons}
                </p>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                  Lessons
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 w-full">
              <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                  {course.rating}/5
                </p>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 w-full">
              <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-purple-800 dark:text-purple-200 truncate">
                  {course.students}
                </p>
                <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                  Students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      {course.enrolled && (
        <Card className="border-2 border-border dark:border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Course Completion</h3>
              <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm sm:text-base px-3 py-1">
                {progressPercentage}% Complete
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-3 sm:h-4" />
            <div className="flex justify-between text-sm sm:text-base text-muted-foreground">
              <span>{completedLessons} lessons completed</span>
              <span>{totalLessons - completedLessons} remaining</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Card (for non-enrolled) */}
      {!course.enrolled && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 border-2 border-main/20 dark:border-main/30">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
                    {course.price}
                  </span>
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    {course.originalPrice}
                  </span>
                  <Badge className="bg-red-600 text-white">
                    Save {course.discount}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  One-time payment • Lifetime access
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-12 sm:h-14">
          <TabsTrigger value="overview" className="text-sm sm:text-base">Overview</TabsTrigger>
          <TabsTrigger value="curriculum" className="text-sm sm:text-base">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor" className="text-sm sm:text-base">Instructor</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>About This Course</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>
              
              <div>
                <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">What You'll Learn</h4>
                <div className="grid gap-3 sm:gap-4">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800/50">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-green-800 dark:text-green-200 font-medium">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {course.features && (
                <div>
                  <h4 className="font-bold text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">Course Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800/50">
                        <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-blue-800 dark:text-blue-200 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4 sm:space-y-6">
          {course.modules.map((module) => (
            <Card key={module.id} className="border-2 border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-base sm:text-lg lg:text-xl">
                  <span>Module {module.id}: {module.title}</span>
                  <Badge className="bg-main/10 dark:bg-main/20 text-main border-main/30 text-sm">
                    {module.lessons.length} lessons
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all ${
                        lesson.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800/50"
                          : course.enrolled
                          ? "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-800/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`p-2 sm:p-3 rounded-full border-2 ${
                          lesson.completed
                            ? "bg-green-600 border-green-600 text-white"
                            : course.enrolled
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-gray-400 border-gray-400 text-white"
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : course.enrolled ? (
                            getTypeIcon(lesson.type)
                          ) : (
                            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-base lg:text-lg">{lesson.title}</p>
                          <div className="flex items-center space-x-3 text-xs sm:text-sm text-muted-foreground">
                            <span className={`capitalize font-medium ${getTypeColor(lesson.type)}`}>
                              {lesson.type}
                            </span>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      {course.enrolled && !lesson.completed && (
                        <Button size="sm" className="h-8 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm">
                          Start
                          <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="instructor">
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Meet Your Instructor</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-4 border-main/20 flex-shrink-0">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback className="text-lg sm:text-xl lg:text-2xl bg-main/10 text-main">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">{course.instructor}</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                    Professor of Mathematics with over 18 years of teaching experience at premier institutions across India. 
                    Dr. Sharma specializes in advanced mathematics, statistical analysis, and has published over 50 research papers 
                    in international journals. She has mentored thousands of students and is passionate about making complex 
                    mathematical concepts accessible and engaging.
                  </p>
                  
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                    <div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-800/50">
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">18+</p>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">Years Experience</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-green-50 dark:bg-green-950/50 rounded-xl border border-green-200 dark:border-green-800/50">
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">25</p>
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">Courses</p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/50 rounded-xl border border-purple-200 dark:border-purple-800/50">
                      <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400">50K+</p>
                      <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card className="border-2 border-main/20 dark:border-main/30 bg-gradient-to-r from-main/5 to-blue-500/5 dark:from-main/10 dark:to-blue-500/10">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {course.enrolled ? (
              <>
                <Link href={`/student/courses/${courseId}/learn`} className="flex-1">
                  <Button size="lg" className="w-full h-12 sm:h-14 text-sm sm:text-base lg:text-lg">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                    Continue Learning
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-12 sm:h-14 text-sm sm:text-base lg:text-lg px-4 sm:px-6">
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  Materials
                </Button>
              </>
            ) : (
              <Button size="lg" className="w-full h-12 sm:h-14 text-sm sm:text-base lg:text-lg">
                <Medal className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                Enroll Now - {course.price}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPageContent;