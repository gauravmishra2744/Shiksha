"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Star, Coins, Zap, Target } from "lucide-react";

export default function GamificationOverlay() {
  const [xp, setXp] = useState(1250);
  const [level, setLevel] = useState(5);
  const [coins, setCoins] = useState(340);
  const [streak, setStreak] = useState(7);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showReward, setShowReward] = useState(null);

  const maxXP = level * 200;
  const progress = (xp / maxXP) * 100;

  useEffect(() => {
    // Check for level up
    if (xp >= maxXP) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [xp, maxXP]);

  return (
    <>
      {/* Top Gamification Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Level & XP */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                {level}
              </div>
              <div className="min-w-[120px]">
                <div className="text-xs opacity-90">Level {level}</div>
                <Progress value={progress} className="h-2 bg-white/20" />
                <div className="text-xs opacity-90">{xp}/{maxXP} XP</div>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
              <Coins className="h-4 w-4 text-yellow-300" />
              <span className="font-bold">{coins}</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1 bg-orange-500/20 px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 text-orange-300" />
              <span className="font-bold">{streak}</span>
            </div>

            {/* Daily Target */}
            <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
              <Target className="h-4 w-4 text-green-300" />
              <span className="text-sm">3/5 Daily</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              🏆 Rank #12
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white animate-pulse">
              🎯 2x XP Active!
            </Badge>
          </div>
        </div>
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <Card className="p-8 text-center animate-bounce bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">LEVEL UP!</h2>
            <p className="text-xl">You reached Level {level + 1}!</p>
            <p className="text-lg mt-2">+50 Coins Bonus!</p>
          </Card>
        </div>
      )}

      {/* Floating Rewards */}
      {showReward && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <Card className="p-4 bg-green-500 text-white">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>+{showReward.xp} XP</span>
              <Coins className="h-5 w-5" />
              <span>+{showReward.coins}</span>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}