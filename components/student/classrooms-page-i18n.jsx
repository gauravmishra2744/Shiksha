"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  Clock,
  BookOpen,
  Plus,
  Search,
  Bell,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const classroomsData = [
  {
    id: "class-1",
    name: "Science Champions",
    teacher: "Mrs. Pooja Kumari",
    subject: "Biology",
    students: 28,
    nextClass: "Tomorrow, 9:00 AM",
    status: "Active",
    color: "bg-blue-500",
  },
  {
    id: "class-2",
    name: "Math Masters",
    teacher: "Mr. Raj Kumar",
    subject: "Mathematics",
    students: 25,
    nextClass: "Today, 2:00 PM",
    status: "Active",
    color: "bg-green-500",
  },
  {
    id: "class-3",
    name: "Physics Explorers",
    teacher: "Dr. Anita Sharma",
    subject: "Physics",
    students: 30,
    nextClass: "Wednesday, 11:00 AM",
    status: "Active",
    color: "bg-purple-500",
  },
];

const ClassroomsPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [classCode, setClassCode] = useState("");

  const filteredClassrooms = classroomsData.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{t('classrooms.myClassrooms')}</h1>
        
        {/* Join Classroom Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  {t('classrooms.classCode')}
                </label>
                <Input
                  placeholder={t('classrooms.enterCode')}
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
              </div>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                {t('classrooms.join')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classrooms Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClassrooms.map((classroom) => (
          <Card key={classroom.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-2 ${classroom.color}`} />
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{classroom.name}</h3>
                    <p className="text-sm text-muted-foreground">{classroom.subject}</p>
                  </div>
                  <Badge variant={classroom.status === 'Active' ? 'default' : 'secondary'}>
                    {t(`status.${classroom.status.toLowerCase()}`)}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {classroom.teacher.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{classroom.teacher}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{classroom.students} {t('dashboard.students')}</span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/50">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      {t('dashboard.nextClass')}: {classroom.nextClass}
                    </span>
                  </div>
                </div>

                <Link href={`/student/classrooms/${classroom.id}`}>
                  <Button className="w-full">
                    {t('dashboard.enterClassroom')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClassrooms.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('classrooms.noClassrooms')}</h3>
            <p className="text-muted-foreground">
              {t('classrooms.joinFirst')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassroomsPage;