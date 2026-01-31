"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  BookOpen,
  FileText,
  MessageCircle,
  Calendar,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { authenticatedFetch } from "@/lib/auth-client";
import Link from "next/link";

const StudentClassroomPage = () => {
  const params = useParams();
  const [classroom, setClassroom] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassroom();
  }, [params.studentclass]);

  const fetchClassroom = async () => {
    try {
      const response = await authenticatedFetch(`/api/classrooms/${params.studentclass}`);
      setClassroom(response.classroom);
      setAssignments(response.assignments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-main" />
      </div>
    );
  }

  if (error || !classroom) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive mb-4">Error: {error || "Classroom not found"}</p>
        <Link href="/student/classrooms">
          <Button>Back to Classrooms</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Classroom Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{classroom.name}</h1>
          <p className="text-muted-foreground">{classroom.description || "Welcome to your classroom"}</p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="secondary" className="text-sm">
              {classroom.classCode}
            </Badge>
            <span className="text-sm text-muted-foreground">
              <Users className="inline h-4 w-4 mr-1" />
              {classroom.students?.length || 0} students
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Teacher Card */}
          {classroom.teacher && (
            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-bold">
                      {classroom.teacher.name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{classroom.teacher.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Mail className="h-3 w-3" />
                      <span>{classroom.teacher.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Classroom Info */}
          <Card>
            <CardHeader>
              <CardTitle>Classroom Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-semibold">{classroom.subject || "Multiple Subjects"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Classroom Code</p>
                  <p className="font-semibold font-mono">{classroom.classCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="font-semibold">{classroom.students?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                  <p className="font-semibold">{assignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <Card key={assignment._id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant={assignment.status === 'published' ? 'default' : 'secondary'}>
                          {assignment.status}
                        </Badge>
                        <span className="text-muted-foreground">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        {assignment.points && (
                          <span className="text-muted-foreground">
                            Points: {assignment.points}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No assignments yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students ({classroom.students?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {classroom.students && classroom.students.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {classroom.students.map((student) => (
                    <div key={student._id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarFallback>
                          {student.name?.charAt(0) || "S"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{student.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No students enrolled yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No announcements yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentClassroomPage;
