"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Users,
  BookOpen,
  Target,
  Star,
  Calendar,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Zap,
  Flame,
  Crown,
  Medal,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { authenticatedFetch } from "@/lib/auth-client";

const StudentDashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await authenticatedFetch("/api/student/dashboard");
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-main" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!data || !data.student) {
    return <div className="p-8 text-center">No data available</div>;
  }

  const student = data.student;
  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? "Good Morning"
      : currentTime < 17
      ? "Good Afternoon"
      : "Good Evening";

  const levelProgress = ((student.totalXP % 350) / 350) * 100;
  const primaryClassroom = data.classrooms?.[0];

  // Default values for data that might not be available yet
  const weeklyProgress = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: false },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Greeting Header */}
      <Card className="bg-main/5 dark:bg-main/10 border-main/20 dark:border-main/30 h-32 justify-center">
        <CardContent className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            {greeting}, {student.name}!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Ready to continue your learning journey today?
          </p>
        </CardContent>
      </Card>

      {/* Top Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Streak Card */}
        <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Flame className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                  {student.streak}
                </p>
                <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                  Day Streak
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coins Card */}
        <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                  {student.coins}
                </p>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Coins
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Card */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                  {student.totalXP}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Total XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Card */}
        <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Crown className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                  Level {student.level}
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {student.totalXP % 350}/350 XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Classroom Card */}
          {primaryClassroom && (
            <Card className="border-2 border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  <span>Your Classroom</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="font-bold text-xl sm:text-2xl uppercase">
                    {primaryClassroom.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                      Teacher: {primaryClassroom.teacher?.name || "Not assigned"}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                      Subject: {primaryClassroom.subject || "Multiple"}
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                      Code: {primaryClassroom.classCode}
                    </p>
                  </div>
                </div>
                <Link href="/student/classrooms">
                  <Button
                    className="w-full text-sm sm:text-base lg:text-lg py-4 sm:py-6"
                    size="lg"
                  >
                    Enter Classroom
                    <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Weekly Progress */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>This Week's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 font-medium">
                      {day.day}
                    </p>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full mx-auto flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold border-2 ${
                        day.completed
                          ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 border-green-300 dark:border-green-700/50"
                          : "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700/50"
                      }`}
                    >
                      {day.completed ? "✓" : "○"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center p-3 sm:p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-muted dark:border-muted/50">
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                  Current streak: <span className="font-bold text-main">{student.streak} days</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You have earned {data.badges?.length || 0} badges
                </p>
                <Link href="/student/badges">
                  <Button variant="outline" className="w-full">
                    View All Badges
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Stats */}
        <div>
          <Card className="border-2 border-border dark:border-border lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Your Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Courses Enrolled</span>
                  <Badge>{data.courses?.length || 0}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Classrooms</span>
                  <Badge>{data.classrooms?.length || 0}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Badges Earned</span>
                  <Badge>{data.badges?.length || 0}</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link href="/student/courses">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Courses
                    </Button>
                  </Link>
                  <Link href="/student/doubts">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="mr-2 h-4 w-4" />
                      Ask a Doubt
                    </Button>
                  </Link>
                  <Link href="/student/games">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Star className="mr-2 h-4 w-4" />
                      Play Games
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
