"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  CheckCircle,
  Lock,
  BookOpen,
  MessageCircle,
  Volume2,
  Settings,
  Maximize,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const courseData = {
  "math-101": {
    title: "Advanced Mathematics",
    modules: [
      {
        id: 1,
        title: "Introduction to Advanced Mathematics",
        lessons: [
          { id: 1, title: "Course Overview", duration: "5:30", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "Mathematical Foundations", duration: "12:45", completed: true, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Problem-Solving Strategies", duration: "8:20", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 4, title: "Practice Quiz", duration: "15:00", completed: false, type: "quiz" },
        ]
      },
      {
        id: 2,
        title: "Calculus Fundamentals",
        lessons: [
          { id: 5, title: "Limits and Continuity", duration: "18:30", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 6, title: "Derivatives", duration: "22:15", completed: false, type: "video", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        ]
      },
    ]
  }
};

const CourseLearningPage = ({ courseId }) => {
  const course = courseData[courseId] || courseData["math-101"];
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2]));
  const [isPlaying, setIsPlaying] = useState(false);

  const allLessons = course.modules.flatMap(module => 
    module.lessons.map(lesson => ({ ...lesson, moduleTitle: module.title }))
  );
  
  const currentLesson = allLessons.find(lesson => lesson.id === currentLessonId);
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const progressPercentage = Math.round((completedLessons.size / allLessons.length) * 100);

  const markAsComplete = () => {
    setCompletedLessons(prev => new Set([...prev, currentLessonId]));
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id);
    }
  };

  const goToLesson = (lessonId) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (lesson && (completedLessons.has(lessonId) || lessonId === Math.min(...allLessons.filter(l => !completedLessons.has(l.id)).map(l => l.id)))) {
      setCurrentLessonId(lessonId);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <Play className="h-4 w-4" />;
      case "quiz": return <MessageCircle className="h-4 w-4" />;
      case "assignment": return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/student/courses/${courseId}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <h1 className="text-white font-semibold">{course.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-sm">
              {completedLessons.size}/{allLessons.length} lessons completed
            </div>
            <Progress value={progressPercentage} className="w-32 h-2" />
            <span className="text-white text-sm">{progressPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center">
            {currentLesson?.type === "video" ? (
              <div className="w-full h-full max-w-6xl">
                <iframe
                  src={currentLesson.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={currentLesson.title}
                />
              </div>
            ) : (
              <div className="text-center text-white">
                <div className="mb-4">
                  {getTypeIcon(currentLesson?.type)}
                </div>
                <h3 className="text-xl mb-2">{currentLesson?.title}</h3>
                <p className="text-gray-400">
                  {currentLesson?.type === "quiz" ? "Interactive Quiz" : "Assignment"}
                </p>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => prevLesson && goToLesson(prevLesson.id)}
                  disabled={!prevLesson}
                  className="text-white hover:bg-gray-800"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-gray-800"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => nextLesson && goToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className="text-white hover:bg-gray-800"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <div className="text-white text-sm">
                  {currentLesson?.title} • {currentLesson?.duration}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={markAsComplete}
                  disabled={completedLessons.has(currentLessonId)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {completedLessons.has(currentLessonId) ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
                
                {nextLesson && (
                  <Button
                    onClick={() => goToLesson(nextLesson.id)}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-white font-semibold">Course Content</h3>
          </div>
          
          <div className="p-4 space-y-4">
            {course.modules.map((module) => (
              <div key={module.id}>
                <h4 className="text-gray-300 font-medium mb-3 text-sm uppercase tracking-wide">
                  {module.title}
                </h4>
                
                <div className="space-y-2">
                  {module.lessons.map((lesson) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isCurrent = currentLessonId === lesson.id;
                    const isLocked = !isCompleted && lesson.id !== Math.min(...allLessons.filter(l => !completedLessons.has(l.id)).map(l => l.id));
                    
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => !isLocked && goToLesson(lesson.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isCurrent
                            ? "bg-blue-600 text-white"
                            : isCompleted
                            ? "bg-green-900/50 text-green-300 hover:bg-green-900/70"
                            : isLocked
                            ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-1 rounded ${
                              isCompleted ? "bg-green-600" : isLocked ? "bg-gray-600" : "bg-gray-700"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 text-white" />
                              ) : isLocked ? (
                                <Lock className="h-4 w-4 text-gray-400" />
                              ) : (
                                getTypeIcon(lesson.type)
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <p className="text-xs opacity-75">{lesson.duration}</p>
                            </div>
                          </div>
                          
                          {lesson.type !== "video" && (
                            <Badge variant="outline" className="text-xs">
                              {lesson.type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;