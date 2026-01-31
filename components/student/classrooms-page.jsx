"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  BookOpen,
  Calendar,
  MapPin,
  ChevronRight,
  Plus,
  Search,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { authenticatedFetch } from "@/lib/auth-client";

const ClassroomsPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await authenticatedFetch("/api/classrooms");
      const list = response.classrooms || response || [];
      setClassrooms(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-main" />
          <p className="text-muted-foreground">Loading classrooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive mb-4">Error: {error}</p>
        <Button onClick={fetchClassrooms}>Retry</Button>
      </div>
    );
  }

  const filteredClassrooms = classrooms.filter((classroom) =>
    classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classroom.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    setJoinError("");
    try {
      await authenticatedFetch("/api/classrooms/join", {
        method: "POST",
        body: JSON.stringify({ classCode: joinCode.trim() })
      });
      setJoinCode("");
      fetchClassrooms();
    } catch (err) {
      setJoinError(err.message || "Failed to join classroom");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Classrooms</h1>
        <p className="text-muted-foreground">
          View and manage your enrolled classrooms
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search classrooms..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Classrooms Grid */}
      {filteredClassrooms.length === 0 ? (
        <Card className="text-center p-12">
          <div className="space-y-4">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold mb-2">No Classrooms Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "You haven't joined any classrooms yet"}
              </p>
              {!searchQuery && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Join a Classroom
                </Button>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClassrooms.map((classroom) => (
            <Card
              key={classroom._id}
              className="hover:shadow-lg transition-shadow border-2"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-bold truncate">
                    {classroom.name}
                  </span>
                  <Badge variant="secondary">{classroom.classCode}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>
                      {(classroom.students?.length ?? classroom.students ?? 0)} Students
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>{classroom.subject || "Multiple Subjects"}</span>
                  </div>
                  {classroom.teacher && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Teacher: {classroom.teacher.name}</span>
                    </div>
                  )}
                </div>

                {classroom.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classroom.description}
                  </p>
                )}

                <Link href={`/student/classrooms/${classroom._id}`}>
                  <Button className="w-full" variant="default">
                    Enter Classroom
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Join Classroom Section */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Join a New Classroom</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Have a classroom code? Enter it to join a new classroom.
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter classroom code"
              className="flex-1"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
            />
            <Button onClick={handleJoin}>
              <Plus className="mr-2 h-4 w-4" />
              Join
            </Button>
          </div>
          {joinError && (
            <p className="text-sm text-destructive mt-2">{joinError}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassroomsPage;
