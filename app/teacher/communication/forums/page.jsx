"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Plus,
  Reply,
  ThumbsUp,
  Pin,
  Search,
  Filter,
  TrendingUp,
  Users,
  Clock,
  Star,
  Eye,
  MoreHorizontal,
  Settings,
  Lock,
  Globe,
  AlertCircle,
  CheckCircle,
  Calendar,
  Hash,
  Send,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";

export default function DiscussionForums() {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showForumsList, setShowForumsList] = useState(true);

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setForums(mockForums);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching forums:", error);
      setForums(mockForums);
      setLoading(false);
    }
  };

  const mockForums = [
    {
      id: 1,
      name: "General Discussion",
      description: "General topics and announcements",
      category: "general",
      postCount: 45,
      memberCount: 128,
      isPrivate: false,
      lastActivity: "2 hours ago",
      moderators: ["Dr. Smith", "Prof. Johnson"],
      posts: [
        {
          id: 1,
          title: "Welcome to the new semester!",
          content:
            "I'm excited to welcome everyone to our discussion forum. This is a space for collaborative learning and academic discussions.",
          author: {
            name: "Dr. Sarah Wilson",
            avatar: "/api/placeholder/32/32",
            role: "Professor",
          },
          createdAt: "2 hours ago",
          likes: 12,
          replies: 8,
          pinned: true,
          views: 67,
        },
        {
          id: 2,
          title: "Study group formation",
          content:
            "Looking to form study groups for the upcoming midterms. Please reply if you're interested!",
          author: {
            name: "Alice Johnson",
            avatar: "/api/placeholder/32/32",
            role: "Student",
          },
          createdAt: "5 hours ago",
          likes: 8,
          replies: 15,
          pinned: false,
          views: 34,
        },
      ],
    },
    {
      id: 2,
      name: "Mathematics Help",
      description: "Get help with math problems and concepts",
      category: "academic",
      postCount: 67,
      memberCount: 89,
      isPrivate: false,
      lastActivity: "1 hour ago",
      moderators: ["Dr. Smith"],
      posts: [
        {
          id: 3,
          title: "Calculus integration techniques",
          content:
            "Can someone explain the substitution method for integration? I'm having trouble with u-substitution.",
          author: {
            name: "Bob Smith",
            avatar: "/api/placeholder/32/32",
            role: "Student",
          },
          createdAt: "1 hour ago",
          likes: 5,
          replies: 12,
          pinned: false,
          views: 28,
        },
      ],
    },
    {
      id: 3,
      name: "Physics Lab Discussion",
      description: "Discuss lab experiments and results",
      category: "academic",
      postCount: 23,
      memberCount: 45,
      isPrivate: true,
      lastActivity: "3 hours ago",
      moderators: ["Prof. Johnson"],
      posts: [
        {
          id: 4,
          title: "Lab 3: Pendulum experiment results",
          content:
            "Please share your observations from the pendulum experiment. What did you notice about the relationship between length and period?",
          author: {
            name: "Prof. Michael Johnson",
            avatar: "/api/placeholder/32/32",
            role: "Professor",
          },
          createdAt: "3 hours ago",
          likes: 7,
          replies: 6,
          pinned: false,
          views: 19,
        },
      ],
    },
    {
      id: 4,
      name: "Assignment Help",
      description: "Get help with assignments and projects",
      category: "help",
      postCount: 89,
      memberCount: 156,
      isPrivate: false,
      lastActivity: "30 minutes ago",
      moderators: ["Dr. Smith", "TA Emma"],
      posts: [
        {
          id: 5,
          title: "Project guidelines clarification",
          content:
            "I need clarification on the project requirements. Are we supposed to include a bibliography?",
          author: {
            name: "Carol Davis",
            avatar: "/api/placeholder/32/32",
            role: "Student",
          },
          createdAt: "30 minutes ago",
          likes: 3,
          replies: 4,
          pinned: false,
          views: 12,
        },
      ],
    },
  ];

  const createPost = async () => {
    try {
      // Simulate API call
      const newPostData = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: {
          name: "Dr. Sarah Wilson",
          avatar: "/api/placeholder/32/32",
          role: "Professor",
        },
        createdAt: "Just now",
        likes: 0,
        replies: 0,
        pinned: false,
        views: 1,
      };

      // Add to selected forum
      setSelectedForum((prev) => ({
        ...prev,
        posts: [newPostData, ...prev.posts],
      }));

      setNewPost({ title: "", content: "" });
      setShowNewPost(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleForumSelect = (forum) => {
    setSelectedForum(forum);
    setShowForumsList(false); // Hide forums list on mobile when forum is selected
  };

  const filteredForums = forums.filter((forum) => {
    const matchesSearch =
      forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || forum.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DynamicBreadcrumb />
          <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
            <div className="animate-pulse space-y-4 sm:space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 flex-shrink-0">
                    <MessageSquare className="w-6 w-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                      Discussion Forums
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mt-1">
                      Engage with students in meaningful discussions and
                      collaborative learning
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Manage</span>
                      <span className="sm:hidden">Manage</span>
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none">
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">New Forum</span>
                      <span className="sm:hidden">New</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Forum Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {forums.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Active Forums</span>
                    <span className="sm:hidden">Forums</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    {forums.reduce((sum, forum) => sum + forum.postCount, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Total Posts</span>
                    <span className="sm:hidden">Posts</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50">
                  <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {forums.reduce((sum, forum) => sum + forum.memberCount, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Total Members</span>
                    <span className="sm:hidden">Members</span>
                  </div>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-white/50 dark:border-gray-700/50 col-span-2 lg:col-span-1">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                    92%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="hidden sm:inline">Engagement Rate</span>
                    <span className="sm:hidden">Engagement</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="forums" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="forums" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Forums</span>
                <span className="sm:hidden">Forums</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Recent Activity</span>
                <span className="sm:hidden">Recent</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Trending</span>
                <span className="sm:hidden">Trending</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Moderation</span>
                <span className="sm:hidden">Moderate</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="forums" className="space-y-4 sm:space-y-6">
              {/* Search and Filters */}
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                      <Input
                        placeholder="Search forums..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="help">Help & Support</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                          <SelectItem value="active">Most Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Forums List */}
                <Card
                  className={`bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 ${
                    !showForumsList && selectedForum ? "hidden lg:block" : ""
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Hash className="w-5 h-5 text-blue-500" />
                      Forums
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredForums.map((forum) => (
                        <div
                          key={forum.id}
                          className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            selectedForum?.id === forum.id
                              ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/20"
                              : ""
                          }`}
                          onClick={() => handleForumSelect(forum)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {forum.name}
                                </h3>
                                {forum.isPrivate ? (
                                  <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                                ) : (
                                  <Globe className="w-4 h-4 text-green-500 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                {forum.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {forum.postCount} posts
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {forum.memberCount} members
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Last activity: {forum.lastActivity}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Content */}
                <div
                  className={`lg:col-span-2 ${
                    showForumsList && !selectedForum ? "hidden lg:block" : ""
                  }`}
                >
                  {selectedForum ? (
                    <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 lg:hidden">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowForumsList(true)}
                                className="p-1"
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </Button>
                            </div>
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                              {selectedForum.isPrivate ? (
                                <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                              ) : (
                                <Globe className="w-5 h-5 text-green-500" />
                              )}
                              <span className="truncate">
                                {selectedForum.name}
                              </span>
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              {selectedForum.description} • Moderated by{" "}
                              {selectedForum.moderators.join(", ")}
                            </CardDescription>
                          </div>
                          <Button
                            onClick={() => setShowNewPost(true)}
                            className="w-full sm:w-auto"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">New Post</span>
                            <span className="sm:hidden">New Post</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {showNewPost && (
                          <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                            <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
                              Create New Post
                            </h3>
                            <div className="space-y-3">
                              <Input
                                placeholder="Post title..."
                                value={newPost.title}
                                onChange={(e) =>
                                  setNewPost({
                                    ...newPost,
                                    title: e.target.value,
                                  })
                                }
                              />
                              <Textarea
                                placeholder="Write your post content..."
                                rows={4}
                                value={newPost.content}
                                onChange={(e) =>
                                  setNewPost({
                                    ...newPost,
                                    content: e.target.value,
                                  })
                                }
                              />
                              <div className="flex flex-col sm:flex-row gap-2">
                                <Button
                                  onClick={createPost}
                                  disabled={!newPost.title || !newPost.content}
                                  className="flex-1 sm:flex-none"
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Post
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => setShowNewPost(false)}
                                  className="flex-1 sm:flex-none"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-4">
                          {selectedForum.posts?.map((post) => (
                            <div
                              key={post.id}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <Avatar className="flex-shrink-0">
                                  <AvatarImage src={post.author.avatar} />
                                  <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    {post.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                      {post.title}
                                    </h3>
                                    {post.pinned && (
                                      <Pin className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                    )}
                                    <Badge
                                      variant="secondary"
                                      className="text-xs flex-shrink-0"
                                    >
                                      {post.author.role}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {post.content}
                                  </p>
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.createdAt}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {post.views} views
                                      </span>
                                      <span className="truncate">
                                        by {post.author.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-2 text-xs"
                                      >
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        {post.likes}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-2 text-xs"
                                      >
                                        <Reply className="w-3 h-3 mr-1" />
                                        {post.replies}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 px-2"
                                      >
                                        <MoreHorizontal className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                      <CardContent className="p-8 sm:p-12 text-center">
                        <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
                          Select a Forum
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          Choose a forum from the left to view discussions and
                          participate
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Latest posts and discussions across all forums
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forums
                      .flatMap((forum) => forum.posts || [])
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .slice(0, 10)
                      .map((post) => (
                        <div
                          key={post.id}
                          className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                {post.title}
                              </h4>
                              <Badge
                                variant="outline"
                                className="text-xs flex-shrink-0"
                              >
                                {post.author.role}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {post.content.slice(0, 100)}...
                            </p>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <span className="truncate">
                                {post.author.name}
                              </span>
                              <span>•</span>
                              <span>{post.createdAt}</span>
                              <span>•</span>
                              <span>{post.likes} likes</span>
                              <span>•</span>
                              <span>{post.replies} replies</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trending" className="space-y-4">
              <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Trending Discussions
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Most popular posts this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forums
                      .flatMap((forum) => forum.posts || [])
                      .sort(
                        (a, b) => b.likes + b.replies - (a.likes + a.replies)
                      )
                      .slice(0, 8)
                      .map((post, index) => (
                        <div
                          key={post.id}
                          className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/50"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              index === 0
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                                : index === 1
                                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                : index === 2
                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-gray-100 truncate">
                              {post.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Reply className="w-3 h-3" />
                                {post.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderation" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="hidden sm:inline">
                        Pending Moderation
                      </span>
                      <span className="sm:hidden">Pending</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Posts requiring review
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                          Reported post: "Inappropriate content"
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Reported by 2 users for inappropriate language
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs flex-1 sm:flex-none"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs flex-1 sm:flex-none"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-900/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="hidden sm:inline">Moderation Stats</span>
                      <span className="sm:hidden">Stats</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      This week's activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Posts reviewed
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          23
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Posts approved
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          21
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Posts removed
                        </span>
                        <span className="font-medium text-red-600 dark:text-red-400">
                          2
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Active moderators
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          3
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
