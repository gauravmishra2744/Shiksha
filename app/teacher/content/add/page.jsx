"use client";

import { AppSidebar } from "@/components/teacher/app-sidebar";
import DynamicBreadcrumb from "@/components/student/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Video,
  Image,
  Link,
  BookOpen,
  Plus,
  Trash2,
  Eye,
  Download,
  Edit,
  Share2,
  Clock,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Grid,
  List,
  FolderOpen,
  Tag,
  Star,
  MoreVertical,
  Copy,
  Archive,
  RefreshCw,
} from "lucide-react";

// Dummy data for classrooms
const classroomsData = [
  {
    id: 1,
    name: "Grade 10 - Mathematics A",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
    studentCount: 28,
  },
  {
    id: 2,
    name: "Grade 9 - Physics B",
    subject: "Physics",
    grade: "Grade 9",
    section: "B",
    studentCount: 25,
  },
  {
    id: 3,
    name: "Grade 8 - English C",
    subject: "English",
    grade: "Grade 8",
    section: "C",
    studentCount: 30,
  },
  {
    id: 4,
    name: "Grade 11 - Chemistry",
    subject: "Chemistry",
    grade: "Grade 11",
    section: "A",
    studentCount: 22,
  },
];

// Dummy content data
const contentData = [
  {
    id: 1,
    title: "Quadratic Equations - Chapter 4",
    classroom: "Grade 10 - Mathematics A",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    description: "Complete chapter on quadratic equations with solved examples",
    tags: ["Mathematics", "Algebra", "Grade 10"],
    downloads: 156,
    views: 324,
    status: "Published",
  },
  {
    id: 2,
    title: "Newton's Laws of Motion - Video Lecture",
    classroom: "Grade 9 - Physics B",
    type: "video",
    size: "45.6 MB",
    uploadDate: "2024-01-12",
    description: "Comprehensive video explanation of Newton's three laws",
    tags: ["Physics", "Mechanics", "Grade 9"],
    downloads: 89,
    views: 267,
    status: "Published",
  },
  {
    id: 3,
    title: "Shakespeare's Hamlet - Analysis",
    classroom: "Grade 8 - English C",
    type: "document",
    size: "1.8 MB",
    uploadDate: "2024-01-10",
    description: "Literary analysis and character study of Hamlet",
    tags: ["English", "Literature", "Grade 8"],
    downloads: 73,
    views: 198,
    status: "Draft",
  },
  {
    id: 4,
    title: "Organic Chemistry Lab Manual",
    classroom: "Grade 11 - Chemistry",
    type: "pdf",
    size: "5.2 MB",
    uploadDate: "2024-01-08",
    description: "Laboratory procedures and safety guidelines",
    tags: ["Chemistry", "Lab", "Grade 11"],
    downloads: 112,
    views: 245,
    status: "Published",
  },
];

export default function AddContentPage() {
  const [title, setTitle] = useState("");
  const [classroom, setClassroom] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("document");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [classrooms, setClassrooms] = useState(classroomsData);
  const [contentList, setContentList] = useState(contentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [classroomFilter, setClassroomFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !classroom) {
      setMessage("Please enter title and select classroom");
      setMessageType("error");
      return;
    }

    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newContent = {
      id: Date.now(),
      title,
      classroom,
      description,
      type: contentType,
      size: "2.1 MB", // Mock size
      uploadDate: new Date().toISOString().split("T")[0],
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      downloads: 0,
      views: 0,
      status: "Published",
    };

    setContentList((prev) => [newContent, ...prev]);
    setMessage("Content uploaded successfully!");
    setMessageType("success");

    // Reset form
    setTitle("");
    setClassroom("");
    setDescription("");
    setTags("");
    setSelectedFiles([]);
    setUploading(false);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    if (files.length > 0 && !title) {
      setTitle(files[0].name.split(".")[0]);
    }
  };

  const deleteContent = (id) => {
    setContentList((prev) => prev.filter((content) => content.id !== id));
    setMessage("Content deleted successfully");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "image":
        return <Image className="h-4 w-4" />;
      case "link":
        return <Link className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "pdf":
      case "document":
        return "bg-red-50 text-red-700 border-red-200";
      case "video":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "image":
        return "bg-green-50 text-green-700 border-green-200";
      case "link":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-50 text-green-700 border-green-200";
      case "Draft":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Archived":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredContent = contentList.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || content.type === typeFilter;
    const matchesClassroom =
      classroomFilter === "all" || content.classroom === classroomFilter;

    return matchesSearch && matchesType && matchesClassroom;
  });

  const contentTypes = [...new Set(contentList.map((c) => c.type))];
  const classroomNames = [...new Set(contentList.map((c) => c.classroom))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-800">
                  <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Content Management
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Upload and manage educational content for your classrooms
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {
                    contentList.filter((c) => c.status === "Published").length
                  }{" "}
                  Published
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  {contentList.filter((c) => c.status === "Draft").length}{" "}
                  Drafts
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <FolderOpen className="w-3 h-3 mr-1" />
                  {contentList.length} Total Items
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-2 lg:grid-cols-4">
            <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-blue-900/50 border-2 border-blue-200 dark:border-blue-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-800 dark:text-blue-200 truncate">
                      {
                        contentList.filter(
                          (c) => c.type === "document" || c.type === "pdf"
                        ).length
                      }
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Documents
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Video className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {contentList.filter((c) => c.type === "video").length}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                      Videos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {contentList.reduce((sum, c) => sum + c.views, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Total Views
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-orange-900/50 border-2 border-orange-200 dark:border-orange-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {contentList.reduce((sum, c) => sum + c.downloads, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Downloads
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto bg-white dark:bg-gray-800 border shadow-sm">
              <TabsTrigger value="upload" className="text-xs sm:text-sm">
                <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Upload Content</span>
                <span className="sm:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm">
                <FolderOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Manage Content</span>
                <span className="sm:hidden">Manage</span>
              </TabsTrigger>
            </TabsList>

            {/* Upload Content Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-blue-500" />
                    <span>Upload New Content</span>
                  </CardTitle>
                  <CardDescription>
                    Share educational materials with your students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Content Title *</Label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter content title..."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="classroom">Classroom *</Label>
                        <Select value={classroom} onValueChange={setClassroom}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select classroom" />
                          </SelectTrigger>
                          <SelectContent>
                            {classrooms.map((c) => (
                              <SelectItem key={c.id} value={c.name}>
                                {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the content..."
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contentType">Content Type</Label>
                        <Select
                          value={contentType}
                          onValueChange={setContentType}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="link">External Link</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="e.g., Mathematics, Chapter 1, Algebra"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Select Files</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <label htmlFor="file" className="cursor-pointer">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload files or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PDF, DOC, PPT, MP4, JPG up to 50MB
                          </p>
                        </label>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">
                            Selected files:
                          </p>
                          <div className="space-y-1">
                            {selectedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded"
                              >
                                {getTypeIcon(file.type)}
                                <span>{file.name}</span>
                                <span className="text-gray-400">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                      <Button
                        type="submit"
                        disabled={uploading}
                        className="flex items-center space-x-2"
                      >
                        {uploading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        <span>
                          {uploading ? "Uploading..." : "Upload Content"}
                        </span>
                      </Button>

                      {message && (
                        <div
                          className={`flex items-center space-x-2 text-sm ${
                            messageType === "success"
                              ? "text-green-600"
                              : messageType === "error"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {messageType === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : messageType === "error" ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <BookOpen className="h-4 w-4" />
                          )}
                          <span>{message}</span>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Manage Content Tab */}
            <TabsContent value="manage" className="space-y-4">
              {/* Search and Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-1 items-center space-x-2">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search content..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {contentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={classroomFilter}
                        onValueChange={setClassroomFilter}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Classroom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classrooms</SelectItem>
                          {classroomNames.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content List */}
              {filteredContent.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {searchTerm ||
                      typeFilter !== "all" ||
                      classroomFilter !== "all"
                        ? "No content found"
                        : "No content yet"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ||
                      typeFilter !== "all" ||
                      classroomFilter !== "all"
                        ? "Try adjusting your search criteria"
                        : "Upload your first educational content to get started"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredContent.map((content) => (
                    <Card
                      key={content.id}
                      className="border-0 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CardContent
                        className={viewMode === "grid" ? "p-4" : "p-4"}
                      >
                        {viewMode === "grid" ? (
                          // Grid View
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={`${getTypeColor(
                                    content.type
                                  )} border`}
                                  variant="outline"
                                >
                                  {getTypeIcon(content.type)}
                                  <span className="ml-1 capitalize">
                                    {content.type}
                                  </span>
                                </Badge>
                                <Badge
                                  className={`${getStatusColor(
                                    content.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {content.status}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>

                            <div>
                              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                {content.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {content.description}
                              </p>
                            </div>

                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center justify-between">
                                <span>{content.classroom}</span>
                                <span>{content.size}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{content.views}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Download className="h-3 w-3" />
                                    <span>{content.downloads}</span>
                                  </div>
                                </div>
                                <span>{content.uploadDate}</span>
                              </div>
                            </div>

                            {content.tags && content.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {content.tags.slice(0, 3).map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            <div className="flex space-x-1 pt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Content
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {content.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteContent(content.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ) : (
                          // List View
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="font-semibold text-sm">
                                  {content.title}
                                </h3>
                                <Badge
                                  className={`${getTypeColor(
                                    content.type
                                  )} border`}
                                  variant="outline"
                                >
                                  {getTypeIcon(content.type)}
                                  <span className="ml-1 capitalize">
                                    {content.type}
                                  </span>
                                </Badge>
                                <Badge
                                  className={`${getStatusColor(
                                    content.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {content.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span>{content.classroom}</span>
                                <span>{content.size}</span>
                                <span>{content.uploadDate}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{content.views}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Download className="h-3 w-3" />
                                    <span>{content.downloads}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="h-3 w-3" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Content
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {content.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteContent(content.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
