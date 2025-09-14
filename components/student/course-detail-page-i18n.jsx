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
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const courseData = {
  "math-101": {
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
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
    description: "Master advanced mathematical concepts including calculus, algebra, and statistics. This comprehensive course covers everything from basic principles to complex problem-solving techniques.",
    learningOutcomes: [
      "Understand advanced calculus concepts",
      "Master algebraic problem-solving",
      "Apply statistical analysis methods",
      "Solve complex mathematical problems",
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
    ]
  }
};

const CourseDetailPage = ({ courseId }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const course = courseData[courseId] || courseData["math-101"];
  
  const completedLessons = course.modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0
  );
  
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <Play className="h-4 w-4" />;
      case "quiz": return <MessageCircle className="h-4 w-4" />;
      case "assignment": return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-end">
          <div className="p-6 text-white">
            <Badge className="mb-2 bg-white/20 text-white">{course.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg opacity-90">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="font-semibold">{course.duration}</p>
            <p className="text-sm text-muted-foreground">{t('courses.duration')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="font-semibold">{totalLessons} {t('courses.lessons')}</p>
            <p className="text-sm text-muted-foreground">{t('courses.totalContent')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <p className="font-semibold">{course.rating}/5</p>
            <p className="text-sm text-muted-foreground">{course.reviews} {t('courses.reviews')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="font-semibold">{course.students}</p>
            <p className="text-sm text-muted-foreground">{t('courses.students')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      {course.enrolled && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('courses.yourProgress')}</h3>
              <Badge variant="outline">{progressPercentage}% {t('courses.complete')}</Badge>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedLessons} of {totalLessons} {t('courses.lessonsCompleted')}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('courses.overview')}</TabsTrigger>
          <TabsTrigger value="curriculum">{t('courses.curriculum')}</TabsTrigger>
          <TabsTrigger value="instructor">{t('courses.instructor')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('courses.aboutThisCourse')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              
              <h4 className="font-semibold mb-3">{t('courses.whatYouLearn')}</h4>
              <ul className="space-y-2">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-4">
          {course.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Module {module.id}: {module.title}</span>
                  <Badge variant="outline">{module.lessons.length} {t('courses.lessons')}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        lesson.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800"
                          : course.enrolled
                          ? "bg-muted/50 hover:bg-muted cursor-pointer"
                          : "bg-gray-50 dark:bg-gray-900/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          lesson.completed
                            ? "bg-green-600 text-white"
                            : course.enrolled
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-400 text-white"
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : course.enrolled ? (
                            getTypeIcon(lesson.type)
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {lesson.type} • {lesson.duration}
                          </p>
                        </div>
                      </div>
                      
                      {course.enrolled && !lesson.completed && (
                        <Button size="sm">
                          {t('courses.start')}
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                  <p className="text-muted-foreground mb-4">
                    Professor of Mathematics with over 15 years of teaching experience. 
                    Specializes in advanced mathematics and has published numerous research papers 
                    in the field of mathematical analysis.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold">15+</p>
                      <p className="text-sm text-muted-foreground">{t('courses.yearsExperience')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">{t('courses.courses')}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">25K+</p>
                      <p className="text-sm text-muted-foreground">{t('courses.students')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {course.enrolled ? (
          <>
            <Link href={`/student/courses/${courseId}/learn`}>
              <Button size="lg" className="flex-1">
                <Play className="h-5 w-5 mr-2" />
                {t('courses.continueLearning')}
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              {t('courses.downloadMaterials')}
            </Button>
          </>
        ) : (
          <Button size="lg" className="flex-1">
            {t('courses.enrollNow')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;