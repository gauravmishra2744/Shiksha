"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function PomodoroPageContentI18n() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(focusTime);
        setSessions(sessions + 1);
      } else {
        setIsBreak(true);
        setTimeLeft(breakTime);
      }
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, sessions]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(focusTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((breakTime - timeLeft) / breakTime) * 100
    : ((focusTime - timeLeft) / focusTime) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('productivity.pomodoro')}</h1>
          <p className="text-muted-foreground">{t('pomodoro.focusTime')}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <Badge variant={isBreak ? "secondary" : "default"} className="text-sm">
                  {isBreak ? (
                    <>
                      <Coffee className="mr-2 h-4 w-4" />
                      {t('pomodoro.breakTime')}
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      {t('pomodoro.focusTime')}
                    </>
                  )}
                </Badge>
                <div className="text-6xl font-mono font-bold">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <Progress value={progress} className="w-full max-w-md mx-auto" />

              <div className="flex justify-center gap-4">
                <Button onClick={toggle} size="lg">
                  {isActive ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      {t('pomodoro.pause')}
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      {t('pomodoro.start')}
                    </>
                  )}
                </Button>
                <Button onClick={reset} variant="outline" size="lg">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  {t('pomodoro.reset')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('pomodoro.session')} {t('pomodoro.completed')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sessions}</div>
            <p className="text-muted-foreground">{t('pomodoro.session')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('status.status')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Active" : "Paused"}
              </Badge>
              {isBreak && (
                <p className="text-sm text-muted-foreground">
                  {t('pomodoro.takeBreak')}
                </p>
              )}
              {!isBreak && !isActive && timeLeft === focusTime && (
                <p className="text-sm text-muted-foreground">
                  Ready to start
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Focus for 25 minutes, then take a 5-minute break</li>
            <li>• After 4 sessions, take a longer 15-30 minute break</li>
            <li>• Eliminate distractions during focus time</li>
            <li>• Use breaks to stretch, hydrate, or relax</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}