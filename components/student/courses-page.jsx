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
  TrendingUp,
  Target,
  GraduationCap,
  ChevronRight,
  Eye,
  Medal,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const coursesData = [
  {
    id: "math-101",
    title: "Advanced Mathematics",
    instructor: "Dr. Priya Sharma",
    thumbnail: "/l1.png",
    duration: "12 weeks",
    lessons: 45,
    students: 1250,
    rating: 4.8,
    progress: 65,
    category: "Mathematics",
    level: "Intermediate",
    enrolled: true,
    price: "₹2,999",
    originalPrice: "₹4,999",
    discount: 40,
    description:
      "Master advanced mathematical concepts including calculus, algebra, and statistics with real-world applications.",
  },
  {
    id: "physics-201",
    title: "Quantum Physics Fundamentals",
    instructor: "Prof. Rajesh Kumar",
    thumbnail: "/l2.png",
    duration: "10 weeks",
    lessons: 38,
    students: 890,
    rating: 4.9,
    progress: 0,
    category: "Physics",
    level: "Advanced",
    enrolled: false,
    price: "₹3,499",
    originalPrice: "₹5,999",
    discount: 42,
    description:
      "Explore the fascinating world of quantum mechanics and modern physics with interactive simulations.",
  },
  {
    id: "chem-101",
    title: "Organic Chemistry Basics",
    instructor: "Dr. Anita Desai",
    thumbnail: "/l3.png",
    duration: "8 weeks",
    lessons: 32,
    students: 675,
    rating: 4.7,
    progress: 100,
    category: "Chemistry",
    level: "Beginner",
    enrolled: true,
    price: "₹1,999",
    originalPrice: "₹3,499",
    discount: 43,
    description:
      "Learn the fundamentals of organic chemistry with practical examples and laboratory demonstrations.",
  },
  {
    id: "bio-301",
    title: "Molecular Biology",
    instructor: "Dr. Vikram Singh",
    thumbnail: "/l4.png",
    duration: "14 weeks",
    lessons: 52,
    students: 1100,
    rating: 4.6,
    progress: 25,
    category: "Biology",
    level: "Advanced",
    enrolled: true,
    price: "₹4,199",
    originalPrice: "₹6,999",
    discount: 40,
    description:
      "Deep dive into cellular processes and molecular mechanisms with cutting-edge research insights.",
  },
  {
    id: "cs-101",
    title: "Introduction to Programming",
    instructor: "Prof. Meera Joshi",
    thumbnail: "/l5.png",
    duration: "16 weeks",
    lessons: 60,
    students: 2300,
    rating: 4.9,
    progress: 0,
    category: "Computer Science",
    level: "Beginner",
    enrolled: false,
    price: "₹2,499",
    originalPrice: "₹4,199",
    discount: 40,
    description:
      "Learn programming fundamentals with Python and JavaScript through hands-on projects.",
  },
  {
    id: "eng-201",
    title: "Creative Writing Workshop",
    instructor: "Ms. Kavya Patel",
    thumbnail: "/l6.png",
    duration: "6 weeks",
    lessons: 24,
    students: 450,
    rating: 4.5,
    progress: 80,
    category: "English",
    level: "Intermediate",
    enrolled: true,
    price: "₹1,499",
    originalPrice: "₹2,499",
    discount: 40,
    description:
      "Develop your creative writing skills through guided exercises and peer feedback sessions.",
  },
];

const categories = [
  "All",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;
    const matchesEnrollment = !showEnrolledOnly || course.enrolled;

    return (
      matchesSearch && matchesCategory && matchesLevel && matchesEnrollment
    );
  });

  const enrolledCourses = coursesData.filter((course) => course.enrolled);
  const completedCourses = enrolledCourses.filter(
    (course) => course.progress === 100
  );

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/50";
      case "Intermediate":
        return "bg-yellow-50 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50";
      case "Advanced":
        return "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-950/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <Card className="bg-main/5 dark:bg-main/10 border-main/20 dark:border-main/30 h-28 sm:h-32 justify-center">
        <CardContent className="p-4 sm:p-6 flex flex-col justify-center h-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2">
            My Learning Journey
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
            Discover, learn, and master new skills with expert-led courses
          </p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                  {enrolledCourses.length}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                  Enrolled Courses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                  {completedCourses.length}
                </p>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                  Completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800/50 h-20 sm:h-24">
          <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
              <div className="bg-white dark:bg-yellow-900/50 border-2 border-yellow-200 dark:border-yellow-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-800 dark:text-yellow-200 truncate">
                  {Math.round(
                    enrolledCourses.reduce(
                      (acc, course) => acc + course.progress,
                      0
                    ) / enrolledCourses.length
                  ) || 0}
                  %
                </p>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                  Avg Progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 border-border dark:border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl bg-main/20 rounded-md px-5 border border-border/20 py-2">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            <span>Find Your Perfect Course</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <Input
                  placeholder="Search courses, instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border-2 border-border dark:border-border rounded-lg text-sm sm:text-base bg-background dark:bg-background min-w-0 sm:min-w-[120px]"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 sm:px-4 sm:py-3 border-2 border-border dark:border-border rounded-lg text-sm sm:text-base bg-background dark:bg-background min-w-0 sm:min-w-[120px]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <Button
                variant={showEnrolledOnly ? "default" : "outline"}
                onClick={() => setShowEnrolledOnly(!showEnrolledOnly)}
                size="sm"
                className="h-10 sm:h-12 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                My Courses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-border dark:border-border hover:border-main/30 dark:hover:border-main/40 group"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                {course.enrolled && (
                  <Badge className="bg-green-600 text-white border-green-600 shadow-lg">
                    Enrolled
                  </Badge>
                )}
                {course.progress === 100 && (
                  <Badge className="bg-yellow-600 text-white border-yellow-600 shadow-lg">
                    <Medal className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
                {course.discount && !course.enrolled && (
                  <Badge className="bg-red-600 text-white border-red-600 shadow-lg ml-auto">
                    {course.discount}% OFF
                  </Badge>
                )}
              </div>
            </div>

            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg lg:text-xl line-clamp-2 mb-1 sm:mb-2">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {course.instructor}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{course.students}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-medium">
                      {course.rating}
                    </span>
                  </div>
                </div>
                <Badge
                  className={`${getLevelColor(course.level)} border text-xs`}
                >
                  {course.level}
                </Badge>
              </div>

              {!course.enrolled && (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">
                      {course.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {course.originalPrice}
                    </span>
                  </div>
                  <Badge className="bg-red-600 text-white text-xs">
                    Save {course.discount}%
                  </Badge>
                </div>
              )}

              {course.enrolled && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Progress</span>
                    <span className="font-bold">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 sm:h-3" />
                </div>
              )}

              {course.enrolled ? (
                <Link href={`/student/courses/${course.id}/learn`}>
                  <Button className="w-full h-10 sm:h-12 text-sm sm:text-base">
                    <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Continue Learning
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href={`/student/courses/${course.id}`}>
                  <Button
                    className="w-full h-10 sm:h-12 text-sm sm:text-base"
                    variant="outline"
                  >
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    View Course Details
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="border-2 border-border dark:border-border">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="bg-muted/30 dark:bg-muted/20 rounded-full p-6 w-fit mx-auto mb-4 sm:mb-6">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
              No courses found
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Try adjusting your search criteria or browse all available courses
              to find the perfect learning path.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedLevel("All");
                setShowEnrolledOnly(false);
              }}
              className="mt-4 sm:mt-6"
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoursesPage;
