"use client";

import React from "react";
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
} from "lucide-react";
import Link from "next/link";

// Dummy data for student dashboard
const studentData = {
  name: "Alex Johnson",
  grade: "10th Grade",
  avatar: "https://github.com/shadcn.png",
  streak: 15,
  totalXP: 2450,
  coins: 325,
  level: 8,
  nextLevelXP: 2800,
  classroom: {
    name: "Science Champions",
    teacher: "Mrs. Smith",
    students: 28,
    nextClass: "Tomorrow, 9:00 AM",
    subject: "Biology",
  },
  badges: [
    { name: "Math Wizard", icon: "🧮", earned: true, date: "2 days ago" },
    { name: "Reading Star", icon: "📚", earned: true, date: "1 week ago" },
    { name: "Science Explorer", icon: "🔬", earned: true, date: "3 days ago" },
    { name: "Perfect Week", icon: "⭐", earned: false, date: null },
    { name: "Team Player", icon: "🤝", earned: true, date: "5 days ago" },
    { name: "Quick Learner", icon: "⚡", earned: false, date: null },
  ],
  leaderboard: [
    { name: "Emma Wilson", xp: 2680, position: 1, avatar: "EW" },
    { name: "You", xp: 2450, position: 2, avatar: "AJ", isCurrentUser: true },
    { name: "Mike Chen", xp: 2340, position: 3, avatar: "MC" },
    { name: "Sarah Davis", xp: 2210, position: 4, avatar: "SD" },
    { name: "Tom Brown", xp: 2180, position: 5, avatar: "TB" },
  ],
  weeklyProgress: [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: false },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ],
};

const StudentDashboardPage = () => {
  const currentTime = new Date().getHours();
  const greeting =
    currentTime < 12
      ? "Good Morning"
      : currentTime < 17
      ? "Good Afternoon"
      : "Good Evening";

  const levelProgress = ((studentData.totalXP % 350) / 350) * 100;

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Greeting Header */}
      <Card className="bg-main/5 dark:bg-main/10 border-main/20 dark:border-main/30 h-32 justify-center">
        <CardContent className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            {greeting}, {studentData.name}!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Ready to continue your learning journey today?
          </p>
        </CardContent>
      </Card>

      {/* Top Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
        {/* Streak Card */}
        <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24 ">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Flame className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                  {studentData.streak}
                </p>
                <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                  Day Streak
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coins Card */}
        <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24 ">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                  {studentData.coins}
                </p>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Coins
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Card */}
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24 ">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                  {studentData.totalXP}
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
                  Level {studentData.level}
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {studentData.totalXP}/{studentData.nextLevelXP} XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
        {/* Left Column - Classroom and Progress */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Classroom Card */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader className="">
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20  py-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Your Classroom</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-bold text-xl sm:text-2xl  uppercase">
                  {studentData.classroom.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                    Teacher: {studentData.classroom.teacher}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base lg:text-lg text-muted-foreground">
                    <span className="flex items-center space-x-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{studentData.classroom.students} students</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{studentData.classroom.subject}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm sm:text-base mt-4 lg:text-lg bg-green-50 dark:bg-green-950/50 p-3 rounded-lg border border-green-200 dark:border-green-800/50">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      Next class: {studentData.classroom.nextClass}
                    </span>
                  </div>
                </div>
              </div>
              <Link href={"/student/classrooms/class-id"}>
                <Button
                  className="w-full text-sm sm:text-base lg:text-lg py-4 sm:py-6 cursor-pointer"
                  size="lg"
                >
                  Enter Classroom
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20  py-2">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>This Week's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4">
                {studentData.weeklyProgress.map((day, index) => (
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
                  <span className="font-bold text-main">3 out of 7</span> days
                  completed this week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card className="border-2 border-border dark:border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20  py-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Achievement Badges</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {studentData.badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-xl border-2 ${
                      badge.earned
                        ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50"
                        : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800/50 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl border-2 flex-shrink-0 ${
                        badge.earned
                          ? "bg-white dark:bg-green-900/50 border-green-300 dark:border-green-700/50"
                          : "bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700/50"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm sm:text-base lg:text-lg truncate">
                        {badge.name}
                      </p>
                      {badge.earned ? (
                        <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                          Earned {badge.date}
                        </p>
                      ) : (
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Not earned yet
                        </p>
                      )}
                    </div>
                    {badge.earned && (
                      <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs sm:text-sm px-2 sm:px-3 py-1 flex-shrink-0">
                        ✓ Earned
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Leaderboard */}
        <div>
          <Card className="border-2 border-border dark:border-border lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20  py-2">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Class Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {studentData.leaderboard.map((student, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 sm:p-4 rounded-xl border-2 ${
                      student.isCurrentUser
                        ? "bg-main/10 dark:bg-main/20 border-main/30 dark:border-main/40"
                        : "bg-muted/30 dark:bg-muted/20 border-muted dark:border-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4 w-full">
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {student.position === 1 && (
                          <Crown className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-500" />
                        )}
                        {student.position === 2 && (
                          <Medal className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400" />
                        )}
                        {student.position === 3 && (
                          <Medal className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-orange-500" />
                        )}
                        <span className="font-bold text-sm sm:text-base lg:text-lg">
                          #{student.position}
                        </span>
                      </div>
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-2 flex-shrink-0">
                        <AvatarFallback className="font-bold text-xs sm:text-sm">
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm sm:text-base lg:text-lg truncate">
                          {student.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs sm:text-sm mt-1"
                        >
                          {student.xp} XP
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
