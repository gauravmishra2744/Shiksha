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
  User,
  Loader2,
} from "lucide-react";
import { saveToken } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("10th Grade");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const role = activeTab;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, grade }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");
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
          <CardHeader>
            <div className="text-center bg-main/20 w-full rounded-lg px-4 py-3.5 border border-dashed border-border/50">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Join Acedimate
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Create your account to start learning
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
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

                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10 h-11"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-11"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        className="pl-10 h-11"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 h-11"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Grade Field (Students Only) */}
                  <TabsContent value="student" className="mt-0 p-0">
                    <div className="space-y-2">
                      <Label htmlFor="grade" className="text-sm font-medium">
                        Grade/Class
                      </Label>
                      <Select value={grade} onValueChange={setGrade}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6th Grade">6th Grade</SelectItem>
                          <SelectItem value="7th Grade">7th Grade</SelectItem>
                          <SelectItem value="8th Grade">8th Grade</SelectItem>
                          <SelectItem value="9th Grade">9th Grade</SelectItem>
                          <SelectItem value="10th Grade">10th Grade</SelectItem>
                          <SelectItem value="11th Grade">11th Grade</SelectItem>
                          <SelectItem value="12th Grade">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="teacher" className="mt-0 p-0">
                    <div className="p-3 bg-muted/50 rounded-md text-xs text-muted-foreground">
                      <p>As a teacher, you'll be able to:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Create and manage classrooms</li>
                        <li>Upload notes and assignments</li>
                        <li>Track student progress</li>
                        <li>Use AI-powered teaching tools</li>
                      </ul>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>

              <Button
                className="w-full mt-6 h-12 text-base font-medium"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-main hover:underline">
                    Sign in here
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

export default RegisterPage;
