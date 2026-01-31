"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Lock,
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Target,
  Loader2,
} from "lucide-react";
import { saveToken } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Student form state
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  
  // Teacher form state
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = activeTab === "student" ? studentEmail : teacherEmail;
    const password = activeTab === "student" ? studentPassword : teacherPassword;
    const role = activeTab;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }

      // Save token to localStorage
      saveToken(data.token);

      // Redirect based on role
      if (role === "student") {
        router.push("/student/dashboard");
      } else {
        router.push("/teacher/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-2 shadow-lg">
          {/* Header Section */}
          <CardHeader>
            <div className="text-center bg-main/20  w-full  rounded-lg px-4 py-3.5 border border-dashed border-border/50">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome to Acedimate
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your gateway to gamified learning
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
                <TabsTrigger
                  value="student"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <GraduationCap className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="teacher"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Users className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="student-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="student-email"
                          placeholder="student@example.com"
                          className="pl-10 h-11"
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="student-password"
                        className="text-sm font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11"
                          value={studentPassword}
                          onChange={(e) => setStudentPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Demo Account:</p>
                    <p>Email: student@example.com</p>
                    <p>Password: password123</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="teacher" className="space-y-6">
                {/* Teacher Tab Header */}

                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="teacher-email"
                          placeholder="teacher@example.com"
                          className="pl-10 h-11"
                          value={teacherEmail}
                          onChange={(e) => setTeacherEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher-password"
                        className="text-sm font-medium"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="teacher-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11"
                          value={teacherPassword}
                          onChange={(e) => setTeacherPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 p-3 bg-muted/50 rounded-md text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Demo Account:</p>
                    <p>Email: teacher@example.com</p>
                    <p>Password: password123</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full mt-8 h-12 text-base font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Start Learning Journey"
              )}
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-main hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
