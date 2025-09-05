"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Users,
  Plus,
  Coffee,
  Brain,
  Clock,
  Target,
  Trophy,
  Calendar,
  MoreVertical,
  UserPlus,
  Copy,
  Share2,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  X,
  Timer,
  CheckCircle,
  Star,
  BarChart3,
  TrendingUp,
  Zap,
} from "lucide-react";

// Sample data
const sampleSessions = [
  {
    id: 1,
    name: "Math Study Group",
    subject: "Mathematics",
    members: [
      { id: 1, name: "You", avatar: "/avatars/me.jpg", status: "active" },
      { id: 2, name: "Rahul", avatar: "/avatars/student1.jpg", status: "active" },
      { id: 3, name: "Priya", avatar: "/avatars/student2.jpg", status: "break" },
    ],
    isActive: true,
    currentCycle: 2,
    totalCycles: 4,
    createdAt: "2024-12-08",
  },
  {
    id: 2,
    name: "Physics Prep",
    subject: "Physics",
    members: [
      { id: 1, name: "You", avatar: "/avatars/me.jpg", status: "idle" },
      { id: 4, name: "Arjun", avatar: "/avatars/student3.jpg", status: "idle" },
    ],
    isActive: false,
    currentCycle: 0,
    totalCycles: 6,
    createdAt: "2024-12-07",
  },
];

const PomodoroPageContent = () => {
  // Timer states
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [totalCycles, setTotalCycles] = useState(4);
  const [completedSessions, setCompletedSessions] = useState(0);
  
  // Settings states
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // UI states
  const [showSettings, setShowSettings] = useState(false);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [groupSessions, setGroupSessions] = useState(sampleSessions);
  const [activeGroupSession, setActiveGroupSession] = useState(null);
  
  // Group session states
  const [newSessionName, setNewSessionName] = useState("");
  const [newSessionSubject, setNewSessionSubject] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [inviteEmails, setInviteEmails] = useState("");
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
    
    if (!isBreak) {
      // Work session completed
      setCompletedSessions(prev => prev + 1);
      const newCycle = currentCycle + 1;
      setCurrentCycle(newCycle);
      
      if (newCycle >= totalCycles) {
        // All cycles completed
        setIsBreak(true);
        setTimeLeft(longBreak * 60);
        setCurrentCycle(0);
      } else if (newCycle % longBreakInterval === 0) {
        // Long break time
        setIsBreak(true);
        setTimeLeft(longBreak * 60);
      } else {
        // Short break time
        setIsBreak(true);
        setTimeLeft(shortBreak * 60);
      }
    } else {
      // Break completed, start work session
      setIsBreak(false);
      setTimeLeft(workDuration * 60);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
    setCurrentCycle(0);
  };

  const applySettings = () => {
    setTimeLeft(workDuration * 60);
    setIsBreak(false);
    setIsRunning(false);
    setCurrentCycle(0);
    setShowSettings(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const createGroupSession = () => {
    const newSession = {
      id: Date.now(),
      name: newSessionName,
      subject: newSessionSubject,
      members: [
        { id: 1, name: "You", avatar: "/avatars/me.jpg", status: "active" }
      ],
      isActive: true,
      currentCycle: 0,
      totalCycles: totalCycles,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setGroupSessions(prev => [newSession, ...prev]);
    setActiveGroupSession(newSession);
    setNewSessionName("");
    setNewSessionSubject("");
    setShowGroupDialog(false);
  };

  const joinGroupSession = () => {
    // Simulate joining a session
    const session = groupSessions.find(s => s.id.toString() === sessionCode);
    if (session) {
      const updatedSession = {
        ...session,
        members: [...session.members, { 
          id: Date.now(), 
          name: "You", 
          avatar: "/avatars/me.jpg", 
          status: "active" 
        }]
      };
      
      setGroupSessions(prev => prev.map(s => s.id === session.id ? updatedSession : s));
      setActiveGroupSession(updatedSession);
      setSessionCode("");
      setShowJoinDialog(false);
    }
  };

  const getProgressPercentage = () => {
    const totalDuration = isBreak 
      ? (currentCycle % longBreakInterval === 0 && currentCycle > 0 ? longBreak : shortBreak) * 60
      : workDuration * 60;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const getSessionProgress = () => {
    return (currentCycle / totalCycles) * 100;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Pomodoro Timer
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Boost your productivity with focused study sessions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Timer Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer Card */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={isBreak ? "secondary" : "default"} className="text-sm">
                    {isBreak 
                      ? (currentCycle % longBreakInterval === 0 && currentCycle > 0 ? "Long Break" : "Short Break")
                      : "Focus Time"
                    }
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Cycle {currentCycle + 1}/{totalCycles}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Circular Progress */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                    className={`transition-all duration-1000 ${isBreak ? 'text-green-500' : 'text-blue-500'}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl sm:text-5xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {isBreak ? "Break Time" : "Focus Time"}
                  </div>
                </div>
              </div>

              {/* Current Task */}
              <div className="space-y-2">
                <Input
                  placeholder="What are you working on?"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  className="text-center text-lg"
                />
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={toggleTimer}
                  className="px-8"
                >
                  {isRunning ? (
                    <Pause className="mr-2 h-5 w-5" />
                  ) : (
                    <Play className="mr-2 h-5 w-5" />
                  )}
                  {isRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={resetTimer}
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>

              {/* Session Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Session Progress</span>
                  <span>{currentCycle}/{totalCycles} cycles</span>
                </div>
                <Progress value={getSessionProgress()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{completedSessions}</div>
                <div className="text-xs text-muted-foreground">Completed Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{currentCycle}</div>
                <div className="text-xs text-muted-foreground">Current Cycle</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.floor(completedSessions * workDuration / 60)}h
                </div>
                <div className="text-xs text-muted-foreground">Focus Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">7</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Group Sessions Sidebar */}
        <div className="space-y-6">
          {/* Group Session Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Study Groups</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setShowGroupDialog(true)}
                  className="w-full"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create
                </Button>
                <Button
                  onClick={() => setShowJoinDialog(true)}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join
                </Button>
              </div>

              {activeGroupSession && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{activeGroupSession.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {activeGroupSession.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    {activeGroupSession.members.slice(0, 3).map((member, idx) => (
                      <Avatar key={idx} className="h-6 w-6">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {activeGroupSession.members.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        +{activeGroupSession.members.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activeGroupSession.members.filter(m => m.status === 'active').length} active members
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupSessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{session.name}</h4>
                    <Badge variant={session.isActive ? "default" : "secondary"} className="text-xs">
                      {session.isActive ? "Active" : "Ended"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{session.members.length} members</span>
                    <span>{session.subject}</span>
                  </div>
                  <div className="flex items-center mt-2 space-x-1">
                    {session.members.slice(0, 3).map((member, idx) => (
                      <Avatar key={idx} className="h-5 w-5">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Statistics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Trophy className="mr-2 h-4 w-4" />
                Achievements
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Timer Settings</DialogTitle>
            <DialogDescription>
              Customize your Pomodoro timer preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Work Duration</label>
                <Select value={workDuration.toString()} onValueChange={(v) => setWorkDuration(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="25">25 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Short Break</label>
                <Select value={shortBreak.toString()} onValueChange={(v) => setShortBreak(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Long Break</label>
                <Select value={longBreak.toString()} onValueChange={(v) => setLongBreak(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Total Cycles</label>
                <Select value={totalCycles.toString()} onValueChange={(v) => setTotalCycles(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 cycles</SelectItem>
                    <SelectItem value="4">4 cycles</SelectItem>
                    <SelectItem value="6">6 cycles</SelectItem>
                    <SelectItem value="8">8 cycles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={applySettings}>
                Apply Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Study Group</DialogTitle>
            <DialogDescription>
              Start a collaborative study session with friends
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Session Name</label>
              <Input
                placeholder="Enter session name..."
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select value={newSessionSubject} onValueChange={setNewSessionSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Invite Members (Optional)</label>
              <Textarea
                placeholder="Enter email addresses separated by commas..."
                value={inviteEmails}
                onChange={(e) => setInviteEmails(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowGroupDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={createGroupSession}
                disabled={!newSessionName || !newSessionSubject}
              >
                Create Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Group Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join Study Group</DialogTitle>
            <DialogDescription>
              Enter the session code to join an existing study group
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Session Code</label>
              <Input
                placeholder="Enter session code..."
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={joinGroupSession}
                disabled={!sessionCode}
              >
                Join Session
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden audio element for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/notification.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default PomodoroPageContent;