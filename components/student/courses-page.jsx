"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Award,
  Search,
  Filter,
  ChevronRight,
  Loader2,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { authenticatedFetch } from "@/lib/auth-client";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await authenticatedFetch("/api/student/courses");
      setCourses(response.courses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-main" />
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive mb-4">Error: {error}</p>
        <Button onClick={fetchCourses}>Retry</Button>
      </div>
    );
  }

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">
          Continue learning and track your progress
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="text-center p-12">
          <div className="space-y-4">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">No Courses Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "You haven't enrolled in any courses yet"}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => {
            const completedLessons = course.lessons?.filter(l => l.completed).length || 0;
            const totalLessons = course.lessons?.length || 0;
            const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

            return (
              <Card
                key={course._id}
                className="hover:shadow-lg transition-shadow border-2 flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.subject || "General"}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating || "4.5"}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold line-clamp-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  {course.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  )}

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="mr-1 h-3 w-3" />
                        <span>{totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{course.duration || "Self-paced"}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/student/courses/${course._id}`} className="mt-auto">
                    <Button className="w-full" variant="default">
                      {progress > 0 ? "Continue Learning" : "Start Course"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Stats Card */}
      {courses.length > 0 && (
        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses.filter(c => {
                    const total = c.lessons?.length || 0;
                    const completed = c.lessons?.filter(l => l.completed).length || 0;
                    return total > 0 && completed === total;
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses.filter(c => {
                    const completed = c.lessons?.filter(l => l.completed).length || 0;
                    return completed > 0;
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;
