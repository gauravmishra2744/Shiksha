"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Search,
  Filter,
  Play,
  CheckCircle,
  Award,
} from "lucide-react";
import Link from "next/link";

const coursesData = [
  {
    id: "math-101",
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Johnson",
    thumbnail: "/l1.png",
    duration: "12 weeks",
    lessons: 45,
    students: 1250,
    rating: 4.8,
    progress: 65,
    category: "Mathematics",
    level: "Intermediate",
    enrolled: true,
    description: "Master advanced mathematical concepts including calculus, algebra, and statistics.",
  },
  {
    id: "physics-201",
    title: "Quantum Physics Fundamentals",
    instructor: "Prof. Michael Chen",
    thumbnail: "/l2.png",
    duration: "10 weeks",
    lessons: 38,
    students: 890,
    rating: 4.9,
    progress: 0,
    category: "Physics",
    level: "Advanced",
    enrolled: false,
    description: "Explore the fascinating world of quantum mechanics and modern physics.",
  },
  {
    id: "chem-101",
    title: "Organic Chemistry Basics",
    instructor: "Dr. Emily Rodriguez",
    thumbnail: "/l3.png",
    duration: "8 weeks",
    lessons: 32,
    students: 675,
    rating: 4.7,
    progress: 100,
    category: "Chemistry",
    level: "Beginner",
    enrolled: true,
    description: "Learn the fundamentals of organic chemistry with practical examples.",
  },
  {
    id: "bio-301",
    title: "Molecular Biology",
    instructor: "Dr. James Wilson",
    thumbnail: "/l4.png",
    duration: "14 weeks",
    lessons: 52,
    students: 1100,
    rating: 4.6,
    progress: 25,
    category: "Biology",
    level: "Advanced",
    enrolled: true,
    description: "Deep dive into cellular processes and molecular mechanisms.",
  },
  {
    id: "cs-101",
    title: "Introduction to Programming",
    instructor: "Prof. Lisa Zhang",
    thumbnail: "/l5.png",
    duration: "16 weeks",
    lessons: 60,
    students: 2300,
    rating: 4.9,
    progress: 0,
    category: "Computer Science",
    level: "Beginner",
    enrolled: false,
    description: "Learn programming fundamentals with Python and JavaScript.",
  },
  {
    id: "eng-201",
    title: "Creative Writing Workshop",
    instructor: "Ms. Amanda Foster",
    thumbnail: "/l6.png",
    duration: "6 weeks",
    lessons: 24,
    students: 450,
    rating: 4.5,
    progress: 80,
    category: "English",
    level: "Intermediate",
    enrolled: true,
    description: "Develop your creative writing skills through guided exercises.",
  },
];

const categories = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    const matchesEnrollment = !showEnrolledOnly || course.enrolled;
    
    return matchesSearch && matchesCategory && matchesLevel && matchesEnrollment;
  });

  const enrolledCourses = coursesData.filter(course => course.enrolled);
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">My Courses</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{completedCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length) || 0}%</p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              
              <Button
                variant={showEnrolledOnly ? "default" : "outline"}
                onClick={() => setShowEnrolledOnly(!showEnrolledOnly)}
                size="sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                My Courses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              {course.enrolled && (
                <Badge className="absolute top-2 right-2 bg-green-600">
                  Enrolled
                </Badge>
              )}
              {course.progress === 100 && (
                <Badge className="absolute top-2 left-2 bg-yellow-600">
                  Completed
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{course.students}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                
                {course.enrolled && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
                
                {course.enrolled ? (
                  <Link href={`/student/courses/${course.id}/learn`}>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/student/courses/${course.id}`}>
                    <Button className="w-full" variant="outline">
                      View Course
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available courses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;