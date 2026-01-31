"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Loader2,
  PlayCircle,
  FileText,
  Video,
} from "lucide-react";
import { authenticatedFetch } from "@/lib/auth-client";
import Link from "next/link";

const CourseDetailPage = () => {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const response = await authenticatedFetch(`/api/student/courses/${params.id}`);
      setCourse(response.course);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-main" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive mb-4">Error: {error || "Course not found"}</p>
        <Link href="/student/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }

  const completedLessons = course.lessons?.filter(l => l.completed).length || 0;
  const totalLessons = course.lessons?.length || 0;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {course.subject || "General"}
        </Badge>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Course Completion</span>
            <span className="text-sm font-bold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totalLessons}</p>
              <p className="text-sm text-muted-foreground">Total Lessons</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{completedLessons}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalLessons - completedLessons}</p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          {course.lessons && course.lessons.length > 0 ? (
            <div className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson._id || index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 'bg-muted'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {lesson.duration && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant={lesson.completed ? "outline" : "default"}>
                    {lesson.completed ? (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Review
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No lessons available yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructor Info */}
      {course.teacher && (
        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center text-main font-bold text-lg">
                {course.teacher.name?.charAt(0) || "T"}
              </div>
              <div>
                <p className="font-semibold">{course.teacher.name}</p>
                <p className="text-sm text-muted-foreground">{course.teacher.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseDetailPage;
