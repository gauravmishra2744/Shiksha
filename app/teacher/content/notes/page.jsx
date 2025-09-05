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
import {
  FileText,
  Upload,
  Save,
  Download,
  Eye,
  Edit,
  Trash2,
  Share2,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  Calendar,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Tag,
  FolderOpen,
  MoreVertical,
  Copy,
  RefreshCw,
  Archive,
  PlusCircle,
} from "lucide-react";

// Dummy data for notes
const notesData = [
  {
    id: 1,
    title: "Quadratic Equations - Complete Notes",
    subject: "Mathematics",
    classroom: "Grade 10 - Mathematics A",
    grade: "Grade 10",
    section: "A",
    description:
      "Comprehensive notes covering all types of quadratic equations, methods of solving, and real-world applications.",
    fileName: "quadratic_equations_notes.pdf",
    fileSize: "2.4 MB",
    fileType: "pdf",
    uploadDate: "2024-01-15",
    lastModified: "2024-01-15",
    downloads: 156,
    views: 324,
    status: "Published",
    tags: ["Algebra", "Equations", "Problem Solving"],
    chapters: ["Chapter 4", "Quadratic Equations"],
    author: "Dr. Sharma",
    isStarred: true,
    accessLevel: "All Students",
  },
  {
    id: 2,
    title: "Newton's Laws of Motion - Study Guide",
    subject: "Physics",
    classroom: "Grade 9 - Physics B",
    grade: "Grade 9",
    section: "B",
    description:
      "Detailed study guide covering Newton's three laws with examples, diagrams, and practice problems.",
    fileName: "newtons_laws_study_guide.pdf",
    fileSize: "3.1 MB",
    fileType: "pdf",
    uploadDate: "2024-01-12",
    lastModified: "2024-01-14",
    downloads: 89,
    views: 267,
    status: "Published",
    tags: ["Mechanics", "Laws of Motion", "Physics"],
    chapters: ["Chapter 5", "Force and Laws of Motion"],
    author: "Dr. Patel",
    isStarred: false,
    accessLevel: "All Students",
  },
  {
    id: 3,
    title: "Photosynthesis Process - Detailed Notes",
    subject: "Biology",
    classroom: "Grade 8 - Biology C",
    grade: "Grade 8",
    section: "C",
    description:
      "In-depth explanation of photosynthesis process, light and dark reactions, and factors affecting photosynthesis.",
    fileName: "photosynthesis_detailed_notes.docx",
    fileSize: "1.8 MB",
    fileType: "docx",
    uploadDate: "2024-01-10",
    lastModified: "2024-01-11",
    downloads: 73,
    views: 198,
    status: "Draft",
    tags: ["Plant Biology", "Life Processes", "Biochemistry"],
    chapters: ["Chapter 6", "Life Processes"],
    author: "Ms. Kumar",
    isStarred: true,
    accessLevel: "Selected Students",
  },
  {
    id: 4,
    title: "Shakespeare's Hamlet - Character Analysis",
    subject: "English",
    classroom: "Grade 11 - English A",
    grade: "Grade 11",
    section: "A",
    description:
      "Comprehensive character analysis of Hamlet with themes, literary devices, and essay writing tips.",
    fileName: "hamlet_character_analysis.pptx",
    fileSize: "4.2 MB",
    fileType: "pptx",
    uploadDate: "2024-01-08",
    lastModified: "2024-01-09",
    downloads: 112,
    views: 245,
    status: "Published",
    tags: ["Literature", "Drama", "Character Study"],
    chapters: ["Unit 3", "Drama"],
    author: "Prof. Singh",
    isStarred: false,
    accessLevel: "All Students",
  },
  {
    id: 5,
    title: "Organic Chemistry - IUPAC Nomenclature",
    subject: "Chemistry",
    classroom: "Grade 12 - Chemistry B",
    grade: "Grade 12",
    section: "B",
    description:
      "Complete guide to IUPAC naming conventions for organic compounds with examples and practice exercises.",
    fileName: "iupac_nomenclature_guide.pdf",
    fileSize: "5.7 MB",
    fileType: "pdf",
    uploadDate: "2024-01-05",
    lastModified: "2024-01-07",
    downloads: 201,
    views: 387,
    status: "Published",
    tags: ["Organic Chemistry", "Nomenclature", "IUPAC"],
    chapters: ["Chapter 12", "Organic Chemistry"],
    author: "Dr. Gupta",
    isStarred: true,
    accessLevel: "All Students",
  },
];

// Dummy data for classrooms
const classroomsData = [
  {
    id: 1,
    name: "Grade 10 - Mathematics A",
    subject: "Mathematics",
    grade: "Grade 10",
    section: "A",
  },
  {
    id: 2,
    name: "Grade 9 - Physics B",
    subject: "Physics",
    grade: "Grade 9",
    section: "B",
  },
  {
    id: 3,
    name: "Grade 8 - Biology C",
    subject: "Biology",
    grade: "Grade 8",
    section: "C",
  },
  {
    id: 4,
    name: "Grade 11 - English A",
    subject: "English",
    grade: "Grade 11",
    section: "A",
  },
  {
    id: 5,
    name: "Grade 12 - Chemistry B",
    subject: "Chemistry",
    grade: "Grade 12",
    section: "B",
  },
];

export default function NotesPage() {
  const [noteData, setNoteData] = useState({
    title: "",
    subject: "",
    classroom: "",
    description: "",
    tags: "",
    chapters: "",
    accessLevel: "All Students",
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [notes, setNotes] = useState(notesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setNoteData({ ...noteData, file: files[0] });

    if (files.length > 0 && !noteData.title) {
      setNoteData((prev) => ({ ...prev, title: files[0].name.split(".")[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!noteData.title || !noteData.classroom || !noteData.file) {
      setMessage("Please fill in all required fields and select a file");
      setMessageType("error");
      return;
    }

    setUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const newNote = {
        id: Date.now(),
        title: noteData.title,
        subject: noteData.subject,
        classroom: noteData.classroom,
        description: noteData.description,
        fileName: noteData.file.name,
        fileSize: `${(noteData.file.size / 1024 / 1024).toFixed(1)} MB`,
        fileType: noteData.file.name.split(".").pop(),
        uploadDate: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        downloads: 0,
        views: 0,
        status: "Published",
        tags: noteData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        chapters: noteData.chapters
          .split(",")
          .map((chapter) => chapter.trim())
          .filter((chapter) => chapter),
        author: "Current Teacher",
        isStarred: false,
        accessLevel: noteData.accessLevel,
        grade:
          classroomsData.find((c) => c.name === noteData.classroom)?.grade ||
          "",
        section:
          classroomsData.find((c) => c.name === noteData.classroom)?.section ||
          "",
      };

      setNotes((prev) => [newNote, ...prev]);
      setNoteData({
        title: "",
        subject: "",
        classroom: "",
        description: "",
        tags: "",
        chapters: "",
        accessLevel: "All Students",
        file: null,
      });
      setSelectedFiles([]);
      setMessage("Notes uploaded successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error uploading notes:", error);
      setMessage("Error uploading notes. Please try again.");
      setMessageType("error");
    }

    setUploading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-600" />;
      case "doc":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-600" />;
      case "ppt":
      case "pptx":
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
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

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setMessage("Note deleted successfully");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const toggleStar = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isStarred: !note.isStarred } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || note.subject === subjectFilter;
    const matchesStatus =
      statusFilter === "all" || note.status === statusFilter;

    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = [...new Set(notes.map((n) => n.subject))];
  const statuses = [...new Set(notes.map((n) => n.status))];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DynamicBreadcrumb />

        <div className="flex flex-1 flex-col gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
          {/* Header Section */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-200 dark:border-green-800">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Study Notes
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Upload and manage study materials for your students
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {notes.filter((n) => n.status === "Published").length}{" "}
                  Published
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  {notes.filter((n) => n.status === "Draft").length} Drafts
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {notes.length} Total Notes
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
                      {notes.length}
                    </p>
                    <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Total Notes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-green-900/50 border-2 border-green-200 dark:border-green-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 dark:text-green-200 truncate">
                      {notes.reduce((sum, n) => sum + n.downloads, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium">
                      Downloads
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/50 h-24">
              <CardContent className="p-3 sm:p-4 flex items-center w-full h-full">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 w-full">
                  <div className="bg-white dark:bg-purple-900/50 border-2 border-purple-200 dark:border-purple-700/50 rounded-lg p-2 sm:p-2.5 lg:p-3 flex-shrink-0">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-800 dark:text-purple-200 truncate">
                      {notes.reduce((sum, n) => sum + n.views, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
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
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-800 dark:text-orange-200 truncate">
                      {notes.filter((n) => n.isStarred).length}
                    </p>
                    <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">
                      Starred
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
                <span className="hidden sm:inline">Upload Notes</span>
                <span className="sm:hidden">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="manage" className="text-xs sm:text-sm">
                <FolderOpen className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Manage Notes</span>
                <span className="sm:hidden">Manage</span>
              </TabsTrigger>
            </TabsList>

            {/* Upload Notes Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-green-500" />
                    <span>Upload Study Notes</span>
                  </CardTitle>
                  <CardDescription>
                    Share educational materials and study guides with your
                    students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Note Title *</Label>
                        <Input
                          id="title"
                          placeholder="Enter note title..."
                          value={noteData.title}
                          onChange={(e) =>
                            setNoteData({ ...noteData, title: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="classroom">Classroom *</Label>
                        <Select
                          value={noteData.classroom}
                          onValueChange={(value) => {
                            const selectedClassroom = classroomsData.find(
                              (c) => c.name === value
                            );
                            setNoteData({
                              ...noteData,
                              classroom: value,
                              subject: selectedClassroom?.subject || "",
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select classroom" />
                          </SelectTrigger>
                          <SelectContent>
                            {classroomsData.map((classroom) => (
                              <SelectItem
                                key={classroom.id}
                                value={classroom.name}
                              >
                                {classroom.name}
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
                        placeholder="Brief description of the notes content..."
                        value={noteData.description}
                        onChange={(e) =>
                          setNoteData({
                            ...noteData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          placeholder="e.g., Algebra, Problem Solving, Grade 10"
                          value={noteData.tags}
                          onChange={(e) =>
                            setNoteData({ ...noteData, tags: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chapters">
                          Chapters (comma separated)
                        </Label>
                        <Input
                          id="chapters"
                          placeholder="e.g., Chapter 4, Quadratic Equations"
                          value={noteData.chapters}
                          onChange={(e) =>
                            setNoteData({
                              ...noteData,
                              chapters: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessLevel">Access Level</Label>
                      <Select
                        value={noteData.accessLevel}
                        onValueChange={(value) =>
                          setNoteData({ ...noteData, accessLevel: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Students">
                            All Students
                          </SelectItem>
                          <SelectItem value="Selected Students">
                            Selected Students
                          </SelectItem>
                          <SelectItem value="Premium Students">
                            Premium Students
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">Upload File *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          id="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <label htmlFor="file" className="cursor-pointer">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PDF, DOC, DOCX, PPT, PPTX up to 10MB
                          </p>
                        </label>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">
                            Selected file:
                          </p>
                          <div className="flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded">
                            {getFileIcon(
                              selectedFiles[0]?.name?.split(".").pop()
                            )}
                            <span>{selectedFiles[0]?.name}</span>
                            <span className="text-gray-400">
                              (
                              {(selectedFiles[0]?.size / 1024 / 1024).toFixed(
                                2
                              )}{" "}
                              MB)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                      <Button
                        type="submit"
                        disabled={
                          uploading ||
                          !noteData.title ||
                          !noteData.classroom ||
                          !noteData.file
                        }
                        className="flex items-center space-x-2"
                      >
                        {uploading ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        <span>
                          {uploading ? "Uploading..." : "Upload Notes"}
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

            {/* Manage Notes Tab */}
            <TabsContent value="manage" className="space-y-4">
              {/* Search and Filters */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-1 items-center space-x-2">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search notes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      <Select
                        value={subjectFilter}
                        onValueChange={setSubjectFilter}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
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

              {/* Notes List */}
              {filteredNotes.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {searchTerm ||
                      subjectFilter !== "all" ||
                      statusFilter !== "all"
                        ? "No notes found"
                        : "No notes yet"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ||
                      subjectFilter !== "all" ||
                      statusFilter !== "all"
                        ? "Try adjusting your search criteria"
                        : "Upload your first study notes to get started"}
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
                  {filteredNotes.map((note) => (
                    <Card
                      key={note.id}
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
                                {getFileIcon(note.fileType)}
                                <Badge
                                  className={`${getStatusColor(
                                    note.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {note.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleStar(note.id)}
                                  className={
                                    note.isStarred ? "text-yellow-500" : ""
                                  }
                                >
                                  <Star
                                    className={`h-4 w-4 ${
                                      note.isStarred ? "fill-current" : ""
                                    }`}
                                  />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                                {note.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {note.description}
                              </p>
                            </div>

                            <div className="space-y-2 text-xs text-gray-500">
                              <div className="flex items-center justify-between">
                                <span>{note.classroom}</span>
                                <span>{note.fileSize}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1">
                                    <Download className="h-3 w-3" />
                                    <span>{note.downloads}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{note.views}</span>
                                  </div>
                                </div>
                                <span>{note.uploadDate}</span>
                              </div>
                            </div>

                            {note.tags && note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {note.tags.slice(0, 3).map((tag, index) => (
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
                                <Download className="h-3 w-3" />
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
                                      Delete Note
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {note.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteNote(note.id)}
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
                                {getFileIcon(note.fileType)}
                                <h3 className="font-semibold text-sm">
                                  {note.title}
                                </h3>
                                <Badge
                                  className={`${getStatusColor(
                                    note.status
                                  )} border`}
                                  variant="outline"
                                >
                                  {note.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span>{note.classroom}</span>
                                <span>{note.fileSize}</span>
                                <span>{note.uploadDate}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    <Download className="h-3 w-3" />
                                    <span>{note.downloads}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{note.views}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleStar(note.id)}
                                className={
                                  note.isStarred ? "text-yellow-500" : ""
                                }
                              >
                                <Star
                                  className={`h-4 w-4 ${
                                    note.isStarred ? "fill-current" : ""
                                  }`}
                                />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3" />
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
                                      Delete Note
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {note.title}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteNote(note.id)}
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
