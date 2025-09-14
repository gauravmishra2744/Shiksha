"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  Crown,
  Medal,
  Filter,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const badgesData = [
  { id: 1, name: "mathWizard", icon: "🧮", earned: true, date: "2 days ago", category: "academic" },
  { id: 2, name: "readingStar", icon: "📚", earned: true, date: "1 week ago", category: "academic" },
  { id: 3, name: "scienceExplorer", icon: "🔬", earned: true, date: "3 days ago", category: "academic" },
  { id: 4, name: "perfectWeek", icon: "⭐", earned: false, date: null, category: "achievement" },
  { id: 5, name: "teamPlayer", icon: "🤝", earned: true, date: "5 days ago", category: "social" },
  { id: 6, name: "quickLearner", icon: "⚡", earned: false, date: null, category: "achievement" },
];

const BadgesPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");

  const earnedBadges = badgesData.filter(badge => badge.earned);
  const totalBadges = badgesData.length;
  const progressPercentage = Math.round((earnedBadges.length / totalBadges) * 100);

  const filteredBadges = badgesData.filter(badge => {
    if (filter === "all") return true;
    if (filter === "earned") return badge.earned;
    if (filter === "unearned") return !badge.earned;
    return badge.category === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{t('badges.myBadges')}</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{earnedBadges.length}</p>
                  <p className="text-sm text-muted-foreground">{t('badges.earnedBadges')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Trophy className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalBadges}</p>
                  <p className="text-sm text-muted-foreground">{t('badges.totalBadges')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{progressPercentage}%</p>
                  <p className="text-sm text-muted-foreground">{t('courses.progress')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{t('badges.badgeProgress')}</h3>
                <span className="text-sm text-muted-foreground">
                  {earnedBadges.length} / {totalBadges}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {["all", "earned", "unearned", "academic", "achievement", "social"].map((filterOption) => (
              <Button
                key={filterOption}
                variant={filter === filterOption ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t(`categories.${filterOption}`)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBadges.map((badge) => (
          <Card
            key={badge.id}
            className={`overflow-hidden transition-all duration-300 ${
              badge.earned
                ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800/50 shadow-lg"
                : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800/50 opacity-75"
            }`}
          >
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl border-4 ${
                    badge.earned
                      ? "bg-white dark:bg-yellow-900/50 border-yellow-300 dark:border-yellow-700/50 shadow-lg"
                      : "bg-gray-100 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700/50"
                  }`}
                >
                  {badge.icon}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {t(`badges.${badge.name}`)}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      badge.earned
                        ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700/50"
                        : "bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-700/50"
                    }`}
                  >
                    {badge.earned ? t('dashboard.earned') : t('dashboard.notEarnedYet')}
                  </Badge>
                </div>

                {badge.earned && badge.date && (
                  <div className="text-sm text-muted-foreground">
                    <p>{t('badges.recentlyEarned')}</p>
                    <p className="font-medium">{badge.date}</p>
                  </div>
                )}

                {badge.earned && (
                  <div className="flex justify-center">
                    <Crown className="h-6 w-6 text-yellow-500" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Medal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('badges.noBadges')}</h3>
            <p className="text-muted-foreground">
              {t('badges.earnBadges')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BadgesPage;