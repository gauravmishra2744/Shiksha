"use client";

import React, { useState } from "react";
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
} from "lucide-react";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-2 shadow-lg">
          {/* Header Section */}
          <CardHeader>
            <div className="text-center bg-main/20  w-full  rounded-lg px-4 py-3.5 border border-dashed border-border/50">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome to Janyterz
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your gateway to gamified learning
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
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
                          placeholder="student@school.edu"
                          className="pl-10 h-11"
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="student-roll"
                        className="text-sm font-medium"
                      >
                        Roll Number
                      </Label>
                      <Input
                        id="student-roll"
                        placeholder="2024001"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="student-class"
                        className="text-sm font-medium"
                      >
                        Class
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">Class 6</SelectItem>
                          <SelectItem value="7">Class 7</SelectItem>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                          <SelectItem value="10">Class 10</SelectItem>
                          <SelectItem value="11">Class 11</SelectItem>
                          <SelectItem value="12">Class 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="student-school"
                      className="text-sm font-medium"
                    >
                      School Code
                    </Label>
                    <Input
                      id="student-school"
                      placeholder="ODI001"
                      className="h-11"
                    />
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
                          placeholder="teacher@school.edu"
                          className="pl-10 h-11"
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
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher-id"
                        className="text-sm font-medium"
                      >
                        Employee ID
                      </Label>
                      <Input
                        id="teacher-id"
                        placeholder="EMP2024001"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="teacher-subject"
                        className="text-sm font-medium"
                      >
                        Subject
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">
                            Mathematics
                          </SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="computer-science">
                            Computer Science
                          </SelectItem>
                          <SelectItem value="multiple">
                            Multiple Subjects
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="teacher-school"
                      className="text-sm font-medium"
                    >
                      School Code
                    </Label>
                    <Input
                      id="teacher-school"
                      placeholder="ODI001"
                      className="h-11"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full mt-8 h-12 text-base font-medium"
              type="submit"
            >
              Start Learning Journey
            </Button>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help accessing your account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-main"
                >
                  Contact Administrator
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
