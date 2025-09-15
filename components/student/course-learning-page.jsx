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
  Video,
  HelpCircle,
  FileText,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const courseData = {
  "math-101": {
    title: "Advanced Mathematics",
    instructor: "Dr. Priya Sharma",
    modules: [
      {
        id: 1,
        title: "Introduction to Advanced Mathematics",
        lessons: [
          {
            id: 1,
            title: "Course Overview",
            duration: "5:30",
            completed: true,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 2,
            title: "Mathematical Foundations",
            duration: "12:45",
            completed: true,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 3,
            title: "Problem-Solving Strategies",
            duration: "8:20",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 4,
            title: "Practice Quiz",
            duration: "15:00",
            completed: false,
            type: "quiz",
          },
        ],
      },
      {
        id: 2,
        title: "Calculus Fundamentals",
        lessons: [
          {
            id: 5,
            title: "Limits and Continuity",
            duration: "18:30",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 6,
            title: "Derivatives",
            duration: "22:15",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 7,
            title: "Integration Techniques",
            duration: "25:40",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 8,
            title: "Applications of Calculus",
            duration: "20:10",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
        ],
      },
      {
        id: 3,
        title: "Linear Algebra",
        lessons: [
          {
            id: 9,
            title: "Vectors and Matrices",
            duration: "16:45",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 10,
            title: "Matrix Operations",
            duration: "19:20",
            completed: false,
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          },
          {
            id: 11,
            title: "Final Assessment",
            duration: "45:00",
            completed: false,
            type: "assignment",
          },
        ],
      },
    ],
  },
};

const CourseLearningPage = ({ courseId }) => {
  const course = courseData[courseId] || courseData["math-101"];
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set([1, 2]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title }))
  );

  const currentLesson = allLessons.find(
    (lesson) => lesson.id === currentLessonId
  );
  const currentIndex = allLessons.findIndex(
    (lesson) => lesson.id === currentLessonId
  );

  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const progressPercentage = Math.round(
    (completedLessons.size / allLessons.length) * 100
  );

  const markAsComplete = () => {
    setCompletedLessons((prev) => new Set([...prev, currentLessonId]));
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id);
    }
  };

  const goToLesson = (lessonId) => {
    const lesson = allLessons.find((l) => l.id === lessonId);
    if (
      lesson &&
      (completedLessons.has(lessonId) ||
        lessonId ===
          Math.min(
            ...allLessons
              .filter((l) => !completedLessons.has(l.id))
              .map((l) => l.id)
          ))
    ) {
      setCurrentLessonId(lessonId);
      setSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "assignment":
        return <FileText className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video":
        return "text-blue-400";
      case "quiz":
        return "text-green-400";
      case "assignment":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 p-3 sm:p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href={`/student/courses/${courseId}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800/50 p-1 sm:p-2"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>

            <div className="hidden sm:block w-px h-6 bg-gray-700"></div>

            <div className="flex-1 min-w-0">
              <h1 className="text-white font-semibold text-sm sm:text-base lg:text-lg truncate">
                {course.title}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm truncate">
                by {course.instructor}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-gray-800/50 p-2"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
            <div className="text-white text-xs sm:text-sm font-medium">
              {completedLessons.size}/{allLessons.length} completed
            </div>
            <Progress
              value={progressPercentage}
              className="w-20 sm:w-32 h-2 bg-gray-800"
            />
            <span className="text-white text-xs sm:text-sm font-bold min-w-[3rem]">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="sm:hidden mt-3 flex items-center space-x-3">
          <Progress
            value={progressPercentage}
            className="flex-1 h-2 bg-gray-800"
          />
          <span className="text-white text-xs font-bold">
            {progressPercentage}%
          </span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)] relative">
        {/* Video Player Section */}
        <div className="flex-1 flex flex-col">
          {/* Video/Content Area */}
          <div className="flex-1 bg-black flex items-center justify-center relative">
            {currentLesson?.type === "video" ? (
              <div className="w-full h-full">
                <iframe
                  src={currentLesson.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={currentLesson.title}
                />
              </div>
            ) : (
              <Card className="bg-gray-900/90 border-gray-700/50 backdrop-blur-sm max-w-md mx-4">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-4 rounded-full bg-gray-800/50 ${getTypeColor(
                        currentLesson?.type
                      )}`}
                    >
                      {getTypeIcon(currentLesson?.type)}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                    {currentLesson?.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {currentLesson?.type === "quiz"
                      ? "Interactive Quiz"
                      : "Assignment"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {currentLesson?.duration}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Video Controls */}
          <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800/50 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              {/* Left Controls */}
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => prevLesson && goToLesson(prevLesson.id)}
                  disabled={!prevLesson}
                  className="text-white hover:bg-gray-800/50 disabled:opacity-50"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:bg-gray-800/50 p-2 sm:p-2.5"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => nextLesson && goToLesson(nextLesson.id)}
                  disabled={!nextLesson}
                  className="text-white hover:bg-gray-800/50 disabled:opacity-50"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex-1 min-w-0 sm:max-w-xs">
                  <div className="text-white text-sm font-medium truncate">
                    {currentLesson?.title}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {currentLesson?.duration}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                <Button
                  onClick={markAsComplete}
                  disabled={completedLessons.has(currentLessonId)}
                  className={`flex-1 sm:flex-none text-xs sm:text-sm ${
                    completedLessons.has(currentLessonId)
                      ? "bg-green-600/20 text-green-400 border-green-600/30"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  variant={
                    completedLessons.has(currentLessonId)
                      ? "outline"
                      : "default"
                  }
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {completedLessons.has(currentLessonId)
                    ? "Completed"
                    : "Complete"}
                </Button>

                {nextLesson && (
                  <Button
                    onClick={() => goToLesson(nextLesson.id)}
                    variant="outline"
                    className="flex-1 sm:flex-none border-gray-600/50 text-white hover:bg-gray-800/50 text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Next Lesson</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div
          className={`
          fixed lg:relative inset-y-0 right-0 z-40 w-80 sm:w-96 lg:w-80 
          bg-gray-900/98 backdrop-blur-sm border-l border-gray-800/50 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          overflow-hidden flex flex-col
        `}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-800/50 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-base sm:text-lg">
                Course Content
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Summary */}
            <div className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Progress</span>
                <span className="text-sm font-bold text-white">
                  {progressPercentage}%
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2 bg-gray-800"
              />
              <p className="text-xs text-gray-400 mt-2">
                {completedLessons.size} of {allLessons.length} lessons completed
              </p>
            </div>
          </div>

          {/* Course Modules */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wide">
                    Module {module.id}: {module.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-600/50 text-gray-400"
                  >
                    {module.lessons.length} lessons
                  </Badge>
                </div>

                <div className="space-y-2">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isCurrent = currentLessonId === lesson.id;
                    const isLocked =
                      !isCompleted &&
                      lesson.id !==
                        Math.min(
                          ...allLessons
                            .filter((l) => !completedLessons.has(l.id))
                            .map((l) => l.id)
                        );

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => !isLocked && goToLesson(lesson.id)}
                        className={`group p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          isCurrent
                            ? "bg-blue-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10"
                            : isCompleted
                            ? "bg-green-900/20 border-green-700/30 text-green-300 hover:bg-green-900/30 hover:border-green-600/50"
                            : isLocked
                            ? "bg-gray-800/30 border-gray-700/30 text-gray-500 cursor-not-allowed opacity-60"
                            : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/70 hover:border-gray-600/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div
                              className={`p-2 rounded-lg border-2 flex-shrink-0 transition-colors ${
                                isCompleted
                                  ? "bg-green-600/20 border-green-500/50"
                                  : isLocked
                                  ? "bg-gray-700/30 border-gray-600/30"
                                  : isCurrent
                                  ? "bg-blue-600/20 border-blue-500/50"
                                  : "bg-gray-700/50 border-gray-600/50 group-hover:border-gray-500/50"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                              ) : isLocked ? (
                                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                              ) : (
                                <div className={getTypeColor(lesson.type)}>
                                  {getTypeIcon(lesson.type)}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm sm:text-base truncate">
                                {lesson.title}
                              </p>
                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <span
                                  className={`capitalize ${getTypeColor(
                                    lesson.type
                                  )}`}
                                >
                                  {lesson.type}
                                </span>
                                <span>•</span>
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>

                          {isCurrent && (
                            <div className="flex-shrink-0 ml-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
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

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CourseLearningPage;
