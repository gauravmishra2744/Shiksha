"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Trophy,
  Star,
  Crown,
  Medal,
  Award,
  Target,
  Zap,
  BookOpen,
  Users,
  Calendar,
  Brain,
  Heart,
  Flame,
  Shield,
  Gem,
  Lock,
  CheckCircle,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react";

// Dummy data for student badges
const badgesData = {
  earned: [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first assignment",
      icon: Star,
      category: "Academic",
      earnedDate: "2024-01-15",
      xpReward: 50,
      rarity: "Common",
      requirements: "Submit 1 assignment",
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete 5 tasks in one day",
      icon: Zap,
      category: "Productivity",
      earnedDate: "2024-02-20",
      xpReward: 100,
      rarity: "Rare",
      requirements: "Complete 5 tasks in a single day",
    },
    {
      id: 3,
      name: "Bookworm",
      description: "Read 10 books this semester",
      icon: BookOpen,
      category: "Reading",
      earnedDate: "2024-03-10",
      xpReward: 150,
      rarity: "Epic",
      requirements: "Read 10 books in one semester",
    },
    {
      id: 4,
      name: "Team Player",
      description: "Participate in 5 group projects",
      icon: Users,
      category: "Collaboration",
      earnedDate: "2024-03-25",
      xpReward: 120,
      rarity: "Rare",
      requirements: "Join and complete 5 group projects",
    },
    {
      id: 5,
      name: "Perfect Attendance",
      description: "100% attendance for a month",
      icon: Calendar,
      category: "Attendance",
      earnedDate: "2024-04-01",
      xpReward: 200,
      rarity: "Epic",
      requirements: "Maintain perfect attendance for 30 days",
    },
    {
      id: 6,
      name: "Quiz Master",
      description: "Score 90+ on 10 quizzes",
      icon: Brain,
      category: "Academic",
      earnedDate: "2024-04-15",
      xpReward: 180,
      rarity: "Legendary",
      requirements: "Score above 90% on 10 different quizzes",
    },
  ],
  locked: [
    {
      id: 7,
      name: "Class Champion",
      description: "Rank #1 in your class",
      icon: Crown,
      category: "Achievement",
      xpReward: 500,
      rarity: "Legendary",
      requirements: "Achieve rank 1 position in class leaderboard",
      progress: 75,
      progressText: "Rank #2 - Keep going!",
    },
    {
      id: 8,
      name: "Century Club",
      description: "Complete 100 assignments",
      icon: Trophy,
      category: "Academic",
      xpReward: 300,
      rarity: "Epic",
      requirements: "Submit 100 assignments",
      progress: 65,
      progressText: "65/100 assignments completed",
    },
    {
      id: 9,
      name: "Knowledge Seeker",
      description: "Study for 100 hours total",
      icon: Target,
      category: "Study Time",
      xpReward: 250,
      rarity: "Rare",
      requirements: "Accumulate 100 hours of study time",
      progress: 42,
      progressText: "42/100 hours completed",
    },
    {
      id: 10,
      name: "Helping Hand",
      description: "Help 20 classmates with their work",
      icon: Heart,
      category: "Collaboration",
      xpReward: 200,
      rarity: "Legendary",
      requirements: "Assist 20 different classmates",
      progress: 8,
      progressText: "8/20 classmates helped",
    },
    {
      id: 11,
      name: "Streak Legend",
      description: "Maintain a 50-day learning streak",
      icon: Flame,
      category: "Consistency",
      xpReward: 400,
      rarity: "Legendary",
      requirements: "Study for 50 consecutive days",
      progress: 28,
      progressText: "28/50 day streak",
    },
    {
      id: 12,
      name: "Subject Master",
      description: "Achieve A+ in all subjects",
      icon: Shield,
      category: "Academic",
      xpReward: 600,
      rarity: "Legendary",
      requirements: "Maintain A+ grade in every subject",
      progress: 60,
      progressText: "4/7 subjects at A+ level",
    },
    {
      id: 13,
      name: "Diamond Mind",
      description: "Score perfect on 5 major exams",
      icon: Gem,
      category: "Academic",
      xpReward: 750,
      rarity: "Mythic",
      requirements: "Achieve 100% score on 5 major examinations",
      progress: 20,
      progressText: "1/5 perfect exam scores",
    },
  ],
};

const rarityColors = {
  Common: {
    bg: "bg-gray-50 dark:bg-gray-950/50",
    border: "border-gray-300 dark:border-gray-700",
    text: "text-gray-600 dark:text-gray-400",
    iconBg: "bg-gray-100 dark:bg-gray-800/50",
    gradient: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
  },
  Rare: {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-300 dark:border-blue-700",
    text: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-800/50",
    gradient: "from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900",
  },
  Epic: {
    bg: "bg-purple-50 dark:bg-purple-950/50",
    border: "border-purple-300 dark:border-purple-700",
    text: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-800/50",
    gradient:
      "from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900",
  },
  Legendary: {
    bg: "bg-yellow-50 dark:bg-yellow-950/50",
    border: "border-yellow-300 dark:border-yellow-700",
    text: "text-yellow-600 dark:text-yellow-400",
    iconBg: "bg-yellow-100 dark:bg-yellow-800/50",
    gradient:
      "from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900",
  },
  Mythic: {
    bg: "bg-red-50 dark:bg-red-950/50",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-800/50",
    gradient: "from-red-100 to-red-200 dark:from-red-800 dark:to-red-900",
  },
};

const StudentBadgesPage = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const totalBadges = badgesData.earned.length + badgesData.locked.length;
  const earnedCount = badgesData.earned.length;
  const completionPercentage = Math.round((earnedCount / totalBadges) * 100);

  const BadgeDetailModal = ({ badge, isEarned }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isEarned ? rarityColors[badge.rarity].bg : "bg-muted/50"
            } ${
              isEarned ? rarityColors[badge.rarity].border : "border-muted"
            } border-2`}
          >
            {isEarned ? (
              <badge.icon
                className={`h-6 w-6 ${rarityColors[badge.rarity].text}`}
              />
            ) : (
              <Lock className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold">{badge.name}</h3>
            <Badge
              variant=""
              className={`${rarityColors[badge.rarity].text} text-xs`}
            >
              {badge.rarity}
            </Badge>
          </div>
        </DialogTitle>
        <DialogDescription className="text-base">
          {badge.description}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <Award className="h-6 w-6 mx-auto mb-2 text-main" />
            <p className="font-bold text-lg">{badge.xpReward} XP</p>
            <p className="text-sm text-muted-foreground">Reward</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-main" />
            <p className="font-bold text-lg">{badge.category}</p>
            <p className="text-sm text-muted-foreground">Category</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Requirements</h4>
          <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
            {badge.requirements}
          </p>
        </div>

        {isEarned ? (
          <div className="space-y-3">
            <h4 className="font-semibold">Achievement Details</h4>
            <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-950/50 p-3 rounded-lg border border-green-200 dark:border-green-800/50">
              {/* <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> */}
              <span className="text-green-700 dark:text-green-300 font-medium">
                Unlocked on {new Date(badge.earnedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-semibold">Progress</h4>
            <div className="space-y-2">
              <Progress value={badge.progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {badge.progressText}
              </p>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );

  const renderBadgeCard = (badge, isEarned) => {
    const IconComponent = badge.icon;
    const rarity = rarityColors[badge.rarity];

    return (
      <Card
        key={badge.id}
        className={`group  transition-all duration-300 border-2  rounded-2xl  ${
          isEarned ? rarity.border : "border-muted"
        } ${isEarned ? rarity.bg : "bg-muted/20"} ${
          isEarned ? "" : "grayscale hover:grayscale-0"
        }`}
      >
        <CardContent className=" ">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Circular Badge Icon */}
            <div className="relative">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  isEarned
                    ? `bg-gradient-to-br ${rarity.gradient} ${rarity.border} shadow-lg`
                    : "bg-muted/50 border-muted"
                } ${isEarned ? "" : ""}`}
              >
                {isEarned ? (
                  <IconComponent
                    className={`h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 ${rarity.text}`}
                  />
                ) : (
                  <Lock className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-muted-foreground" />
                )}
              </div>

             
            </div>

            {/* Badge Info */}
            <div className="space-y-2 w-full">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg truncate">
                {badge.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                {badge.description}
              </p>

              {/* Badges */}
              <div className="flex items-center justify-center space-x-2 flex-wrap gap-1">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    isEarned ? rarity.text : "text-muted-foreground"
                  } border-current rounded-full`}
                >
                  {badge.rarity}
                </Badge>
                <Badge variant="" className="text-xs rounded-full">
                  {badge.xpReward} XP
                </Badge>
              </div>
            </div>

            {/* Progress for locked badges */}
            {!isEarned && badge.progress !== undefined && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <Progress value={badge.progress} className="h-2" />
              </div>
            )}

            {/* Status Badge */}
            {isEarned ? (
              <div className="flex items-center space-x-2 bg-green-500/10 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">
                <Star className="h-3 w-3" />
                <span className="text-xs font-semibold">Unlocked</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-muted/50 text-muted-foreground px-3 py-1.5 rounded-full border border-muted">
                <Lock className="h-3 w-3" />
                <span className="text-xs font-medium">Locked</span>
              </div>
            )}

            {/* View Details Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant=""
                  size="sm"
                  className="w-full mt-2 rounded-full"
                >
                  <Eye className="mr-2 h-3 w-3" />
                  View Details
                </Button>
              </DialogTrigger>
              <BadgeDetailModal badge={badge} isEarned={isEarned} />
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getRarityCount = (rarity) => {
    return badgesData.earned.filter((badge) => badge.rarity === rarity).length;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Achievement Badges
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Track your learning journey and unlock amazing badges
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="border-2 border-border dark:border-border">
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm sm:text-base">
                Overall Progress
              </h3>
              <span className="text-sm text-muted-foreground">
                {earnedCount}/{totalBadges} badges
              </span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
        </CardContent>
        {/* Progress Overview - Dashboard Style Cards */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4 px-4 sm:px-6">
          {/* Common Badges Card */}
          <Card className="bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800/50 h-24">
            <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                <div className="bg-white dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                  <Medal className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 dark:text-gray-200 truncate">
                    {getRarityCount("Common")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Common
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rare Badges Card */}
          <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
            <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                  <Gem className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                    {getRarityCount("Rare")}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Rare
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Epic Badges Card */}
          <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
            <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                    {getRarityCount("Epic")}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Epic
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legendary Badges Card */}
          <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-24">
            <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                  <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                    {getRarityCount("Legendary")}
                  </p>
                  <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                    Legendary
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-14 md:h-16">
          <TabsTrigger
            value="all"
            className="text-sm sm:text-base font-medium py-2"
          >
            All Badges
          </TabsTrigger>
          <TabsTrigger
            value="earned"
            className="text-sm sm:text-base font-medium py-2"
          >
            Unlocked ({earnedCount})
          </TabsTrigger>
          <TabsTrigger
            value="locked"
            className="text-sm sm:text-base font-medium py-2"
          >
            Locked ({badgesData.locked.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4  grid-cols-1 min-[430px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {badgesData.earned.map((badge) => renderBadgeCard(badge, true))}
            {badgesData.locked.map((badge) => renderBadgeCard(badge, false))}
          </div>
        </TabsContent>

        <TabsContent value="earned" className="space-y-4">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[430px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {badgesData.earned.map((badge) => renderBadgeCard(badge, true))}
          </div>
        </TabsContent>

        <TabsContent value="locked" className="space-y-4">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 min-[430px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {badgesData.locked.map((badge) => renderBadgeCard(badge, false))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentBadgesPage;
