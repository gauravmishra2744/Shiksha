"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Star,
  Award,
  TrendingUp,
  GraduationCap,
  User,
  MapPin,
  Trophy,
  Target,
  Zap,
  Medal,
  Crown,
  Brain,
} from "lucide-react";

// Dummy data for other sections of same grade
const sectionsData = [
  {
    id: 1,
    section: "7A",
    grade: "7th Grade",
    classTeacher: "Mrs. Sharma",
    studentCount: 35,
    room: "Room 201",
    totalAchievements: 127,
    averageGrade: "A-",
    topPerformers: [
      { name: "Priya Agarwal", xp: 2680, subject: "Mathematics" },
      { name: "Arjun Singh", xp: 2450, subject: "Science" },
      { name: "Kavya Reddy", xp: 2340, subject: "English" },
    ],
    studentTitles: [
      {
        title: "Math Champion",
        student: "Priya Agarwal",
        reason: "Perfect scores in all math tests",
        icon: Brain,
      },
      {
        title: "Science Explorer",
        student: "Arjun Singh",
        reason: "Outstanding lab experiments",
        icon: Target,
      },
      {
        title: "Reading Star",
        student: "Kavya Reddy",
        reason: "Read 25 books this semester",
        icon: BookOpen,
      },
      {
        title: "Team Leader",
        student: "Rohan Gupta",
        reason: "Led successful group projects",
        icon: Users,
      },
      {
        title: "Art Genius",
        student: "Ananya Verma",
        reason: "Amazing artwork displayed in school",
        icon: Star,
      },
    ],
    academicStats: {
      averageAttendance: "96%",
      completionRate: "94%",
      activeProjects: 8,
      upcomingTests: 3,
    },
  },
  {
    id: 2,
    section: "7B",
    grade: "7th Grade",
    classTeacher: "Mr. Patel",
    studentCount: 33,
    room: "Room 202",
    totalAchievements: 115,
    averageGrade: "B+",
    topPerformers: [
      { name: "Vikram Kumar", xp: 2590, subject: "Science" },
      { name: "Meera Joshi", xp: 2380, subject: "Mathematics" },
      { name: "Aditya Rao", xp: 2290, subject: "History" },
    ],
    studentTitles: [
      {
        title: "Science Wizard",
        student: "Vikram Kumar",
        reason: "Innovative science fair project",
        icon: Zap,
      },
      {
        title: "Math Solver",
        student: "Meera Joshi",
        reason: "Creative problem-solving approaches",
        icon: Trophy,
      },
      {
        title: "History Buff",
        student: "Aditya Rao",
        reason: "Exceptional knowledge of world history",
        icon: Medal,
      },
      {
        title: "Sports Star",
        student: "Karan Mehta",
        reason: "Won multiple athletic competitions",
        icon: Crown,
      },
    ],
    academicStats: {
      averageAttendance: "94%",
      completionRate: "91%",
      activeProjects: 6,
      upcomingTests: 2,
    },
  },
  {
    id: 3,
    section: "7C",
    grade: "7th Grade",
    classTeacher: "Ms. Nair",
    studentCount: 31,
    room: "Room 203",
    totalAchievements: 98,
    averageGrade: "B",
    topPerformers: [
      { name: "Ishita Shah", xp: 2420, subject: "English" },
      { name: "Aryan Iyer", xp: 2310, subject: "Art" },
      { name: "Shreya Desai", xp: 2180, subject: "Music" },
    ],
    studentTitles: [
      {
        title: "Creative Writer",
        student: "Ishita Shah",
        reason: "Published story in school magazine",
        icon: BookOpen,
      },
      {
        title: "Art Master",
        student: "Aryan Iyer",
        reason: "Won district art competition",
        icon: Star,
      },
      {
        title: "Music Maestro",
        student: "Shreya Desai",
        reason: "Lead singer in school choir",
        icon: Award,
      },
      {
        title: "Drama Queen",
        student: "Siddharth Sinha",
        reason: "Outstanding performance in school play",
        icon: Trophy,
      },
    ],
    academicStats: {
      averageAttendance: "92%",
      completionRate: "89%",
      activeProjects: 5,
      upcomingTests: 4,
    },
  },
  {
    id: 4,
    section: "7D",
    grade: "7th Grade",
    classTeacher: "Mr. Chauhan",
    studentCount: 34,
    room: "Room 204",
    totalAchievements: 108,
    averageGrade: "B+",
    topPerformers: [
      { name: "Aarav Malhotra", xp: 2480, subject: "Mathematics" },
      { name: "Riya Kapoor", xp: 2350, subject: "Science" },
      { name: "Dev Pandey", xp: 2240, subject: "English" },
    ],
    studentTitles: [
      {
        title: "Tech Innovator",
        student: "Aarav Malhotra",
        reason: "Created amazing coding project",
        icon: Zap,
      },
      {
        title: "Lab Expert",
        student: "Riya Kapoor",
        reason: "Best chemistry lab techniques",
        icon: Target,
      },
      {
        title: "Debate Champion",
        student: "Dev Pandey",
        reason: "Won inter-school debate competition",
        icon: Crown,
      },
      {
        title: "Community Helper",
        student: "Tanya Saxena",
        reason: "Led community service projects",
        icon: Users,
      },
    ],
    academicStats: {
      averageAttendance: "95%",
      completionRate: "93%",
      activeProjects: 7,
      upcomingTests: 2,
    },
  },
];

const ViewAllClassroomsPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const SectionDetailModal = ({ section }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">
          Section {section.section} - Detailed Overview
        </DialogTitle>
        <DialogDescription>
          Complete details about {section.section} including student
          achievements and academic progress
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 mt-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <Users className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="font-bold">{section.studentCount}</p>
            <p className="text-xs text-muted-foreground">Students</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="font-bold">{section.averageGrade}</p>
            <p className="text-xs text-muted-foreground">Average Grade</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <Award className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="font-bold">{section.totalAchievements}</p>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
          <div className="bg-muted/30 p-3 rounded-lg text-center">
            <Calendar className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
            <p className="font-bold">
              {section.academicStats.averageAttendance}
            </p>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-main" />
            <span>Top Performers</span>
          </h3>
          <div className="grid gap-3">
            {section.topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg border"
              >
                <div className="w-8 h-8 bg-main/20 rounded-full flex items-center justify-center">
                  <span className="font-bold text-sm">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{performer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {performer.subject} • {performer.xp} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Achievements */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
            <Star className="h-5 w-5 text-main" />
            <span>Student Achievements</span>
          </h3>
          <div className="grid gap-3">
            {section.studentTitles.map((title, index) => {
              const IconComponent = title.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg border"
                >
                  <div className="w-10 h-10 bg-main/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-main" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm">{title.title}</p>
                      <Badge variant="secondary" className="text-xs">
                        {title.student}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {title.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Statistics */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-main" />
            <span>Academic Statistics</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg border text-center">
              <p className="text-lg font-bold">
                {section.academicStats.completionRate}
              </p>
              <p className="text-xs text-muted-foreground">
                Task Completion Rate
              </p>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg border text-center">
              <p className="text-lg font-bold">
                {section.academicStats.activeProjects}
              </p>
              <p className="text-xs text-muted-foreground">Active Projects</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          All Grade Sections
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Overview of all sections in your grade level
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {sectionsData.map((section) => (
          <Card
            key={section.id}
            className="border-2 border-border dark:border-border"
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>Section {section.section}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-bold text-xl sm:text-2xl uppercase">
                  {section.grade} - {section.section}
                </h3>

                <div className="space-y-2">
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                    Class Teacher: {section.classTeacher}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm sm:text-base lg:text-lg text-muted-foreground">
                    <span className="flex items-center space-x-2">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{section.studentCount} students</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{section.room}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-blue-50 dark:bg-blue-950/50 p-3 rounded-lg border border-blue-200 dark:border-blue-800/50 text-center">
                      <TrendingUp className="h-4 w-4 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
                      <p className="font-bold text-blue-800 dark:text-blue-200">
                        {section.averageGrade}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        Average Grade
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded-lg border border-green-200 dark:border-green-800/50 text-center">
                      <Award className="h-4 w-4 mx-auto mb-1 text-green-600 dark:text-green-400" />
                      <p className="font-bold text-green-800 dark:text-green-200">
                        {section.totalAchievements}
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Achievements
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 3 Students Preview */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">
                  Top Performers
                </h4>
                <div className="space-y-2">
                  {section.topPerformers.slice(0, 3).map((performer, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 bg-muted/30 rounded-md"
                    >
                      <div className="w-6 h-6 bg-main/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {performer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {performer.subject}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {performer.xp} XP
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant=""
                    className="w-full text-sm sm:text-base lg:text-lg py-4 sm:py-6"
                    size="lg"
                  >
                    <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    View Detailed Overview
                  </Button>
                </DialogTrigger>
                <SectionDetailModal section={section} />
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewAllClassroomsPage;
