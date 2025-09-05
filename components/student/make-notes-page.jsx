"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Clock,
  FolderPlus,
  Folder,
  FileText,
  MoreVertical,
  Star,
  Copy,
  Download,
  Eye,
  Target,
  Zap,
  Brain,
  Award,
  Trophy,
} from "lucide-react";

// Subjects data
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Target,
    color: "bg-green-50 border-green-200 text-green-600",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Zap,
    color: "bg-purple-50 border-purple-200 text-purple-600",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: Award,
    color: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    id: "biology",
    name: "Biology",
    icon: Brain,
    color: "bg-emerald-50 border-emerald-200 text-emerald-600",
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color: "bg-blue-50 border-blue-200 text-blue-600",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: Trophy,
    color: "bg-indigo-50 border-indigo-200 text-indigo-600",
  },
  {
    id: "general",
    name: "General Notes",
    icon: FileText,
    color: "bg-gray-50 border-gray-200 text-gray-600",
  },
];

// Sample topics for each subject
const subjectTopics = {
  mathematics: [
    "Algebra",
    "Geometry",
    "Calculus",
    "Statistics",
    "Trigonometry",
  ],
  physics: [
    "Mechanics",
    "Thermodynamics",
    "Optics",
    "Electricity",
    "Magnetism",
  ],
  chemistry: [
    "Atomic Structure",
    "Chemical Bonding",
    "Organic Chemistry",
    "Inorganic Chemistry",
  ],
  biology: [
    "Cell Biology",
    "Genetics",
    "Evolution",
    "Ecology",
    "Human Anatomy",
  ],
  english: ["Poetry", "Grammar", "Literature", "Writing", "Vocabulary"],
  "computer-science": [
    "Programming",
    "Data Structures",
    "Algorithms",
    "Databases",
    "Web Development",
  ],
  general: ["Personal", "Ideas", "Reminders", "Quick Notes"],
};

// Sample notes data
const sampleNotes = [
  {
    id: 1,
    title: "Quadratic Equations Formula",
    content:
      "The quadratic formula is x = (-b ± √(b²-4ac)) / 2a\n\nWhere:\n- a, b, c are coefficients\n- a ≠ 0\n- The discriminant (b²-4ac) determines the nature of roots",
    subject: "mathematics",
    topic: "Algebra",
    createdAt: "2024-12-08",
    updatedAt: "2024-12-08",
    starred: true,
    tags: ["formula", "important", "exam"],
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    content:
      "1. First Law (Inertia): An object at rest stays at rest\n2. Second Law: F = ma\n3. Third Law: Action and reaction are equal and opposite\n\nApplications:\n- Car safety features\n- Rocket propulsion\n- Walking mechanics",
    subject: "physics",
    topic: "Mechanics",
    createdAt: "2024-12-07",
    updatedAt: "2024-12-07",
    starred: false,
    tags: ["laws", "motion", "fundamental"],
  },
  {
    id: 3,
    title: "Study Schedule",
    content:
      "Daily Study Plan:\n\n6:00 AM - Mathematics (2 hours)\n8:00 AM - Physics (1.5 hours)\n10:00 AM - Break\n11:00 AM - Chemistry (1 hour)\n\nWeekly Goals:\n- Complete 2 chapters per subject\n- Practice problems daily\n- Review previous topics on weekends",
    subject: "general",
    topic: "Personal",
    createdAt: "2024-12-06",
    updatedAt: "2024-12-08",
    starred: true,
    tags: ["schedule", "planning", "goals"],
  },
  {
    id: 4,
    title: "Cell Structure",
    content:
      "Key organelles and their functions:\n\n• Nucleus - Control center, contains DNA\n• Mitochondria - Powerhouse of the cell\n• Ribosomes - Protein synthesis\n• Endoplasmic Reticulum - Transport system\n• Golgi Apparatus - Processing and packaging\n\nCell membrane structure:\n- Phospholipid bilayer\n- Selective permeability",
    subject: "biology",
    topic: "Cell Biology",
    createdAt: "2024-12-05",
    updatedAt: "2024-12-05",
    starred: false,
    tags: ["cell", "organelles", "structure"],
  },
];

const MakeNotesContent = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  // Form states
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSubject, setNoteSubject] = useState("");
  const [noteTopic, setNoteTopic] = useState("");
  const [noteTags, setNoteTags] = useState("");

  const resetForm = () => {
    setNoteTitle("");
    setNoteContent("");
    setNoteSubject("");
    setNoteTopic("");
    setNoteTags("");
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingNote(null);
    setShowCreateDialog(true);
  };

  const openEditDialog = (note) => {
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteSubject(note.subject);
    setNoteTopic(note.topic);
    setNoteTags(note.tags.join(", "));
    setEditingNote(note);
    setShowCreateDialog(true);
  };

  const saveNote = () => {
    const noteData = {
      id: editingNote ? editingNote.id : Date.now(),
      title: noteTitle,
      content: noteContent,
      subject: noteSubject,
      topic: noteTopic,
      createdAt: editingNote
        ? editingNote.createdAt
        : new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      starred: editingNote ? editingNote.starred : false,
      tags: noteTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) => (note.id === editingNote.id ? noteData : note))
      );
    } else {
      setNotes((prev) => [noteData, ...prev]);
    }

    setShowCreateDialog(false);
    resetForm();
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const toggleStar = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, starred: !note.starred } : note
      )
    );
  };

  const duplicateNote = (note) => {
    const duplicatedNote = {
      ...note,
      id: Date.now(),
      title: `${note.title} (Copy)`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setNotes((prev) => [duplicatedNote, ...prev]);
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSubject =
      selectedSubject === "all" || note.subject === selectedSubject;
    const matchesTopic = !selectedTopic || note.topic === selectedTopic;
    const matchesSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSubject && matchesTopic && matchesSearch;
  });

  // Group notes by subject
  const notesBySubject = filteredNotes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = [];
    }
    acc[note.subject].push(note);
    return acc;
  }, {});

  const getSubjectData = (subjectId) => {
    return (
      subjects.find((s) => s.id === subjectId) || subjects[subjects.length - 1]
    );
  };

  const NoteCard = ({ note }) => {
    const subjectData = getSubjectData(note.subject);
    const IconComponent = subjectData.icon;

    return (
      <Card className="group hover:shadow-md transition-all duration-200 border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className={`p-2 rounded-lg ${subjectData.color}`}>
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1">
                  {note.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {subjectData.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {note.topic}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => toggleStar(note.id)}
              >
                <Star
                  className={`h-4 w-4 ${
                    note.starred ? "fill-yellow-400 text-yellow-400" : ""
                  }`}
                />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setViewingNote(note)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openEditDialog(note)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => duplicateNote(note)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {note.content}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3" />
              <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {note.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {note.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{note.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          My Notes
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Organize your study notes by subjects and topics
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedSubject !== "all" && (
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Topics</SelectItem>
                {subjectTopics[selectedSubject]?.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      {/* Notes Display */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No notes found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || selectedSubject !== "all" || selectedTopic
                  ? "Try adjusting your filters or search terms"
                  : "Create your first note to get started"}
              </p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          Object.entries(notesBySubject).map(([subjectId, subjectNotes]) => {
            const subjectData = getSubjectData(subjectId);
            const IconComponent = subjectData.icon;

            return (
              <div key={subjectId} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${subjectData.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">{subjectData.name}</h2>
                  <Badge variant="secondary">{subjectNotes.length} notes</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {subjectNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create/Edit Note Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingNote ? "Edit Note" : "Create New Note"}
            </DialogTitle>
            <DialogDescription>
              {editingNote
                ? "Update your note details"
                : "Add a new note to your collection"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                placeholder="Enter note title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select value={noteSubject} onValueChange={setNoteSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        <div className="flex items-center space-x-2">
                          <subject.icon className="h-4 w-4" />
                          <span>{subject.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {noteSubject && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Topic
                  </label>
                  <Select value={noteTopic} onValueChange={setNoteTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectTopics[noteSubject]?.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Content</label>
              <Textarea
                placeholder="Write your note content here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Tags (comma separated)
              </label>
              <Input
                placeholder="e.g., important, formula, exam"
                value={noteTags}
                onChange={(e) => setNoteTags(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={saveNote}
                disabled={!noteTitle || !noteContent || !noteSubject}
              >
                <Save className="mr-2 h-4 w-4" />
                {editingNote ? "Update" : "Create"} Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Note Dialog */}
      <Dialog open={!!viewingNote} onOpenChange={() => setViewingNote(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewingNote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{viewingNote.title}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleStar(viewingNote.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        viewingNote.starred
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }`}
                    />
                  </Button>
                </DialogTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {getSubjectData(viewingNote.subject).name}
                  </Badge>
                  <Badge variant="secondary">{viewingNote.topic}</Badge>
                  <div className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(viewingNote.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-6 space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {viewingNote.content}
                  </pre>
                </div>
                {viewingNote.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {viewingNote.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => openEditDialog(viewingNote)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => duplicateNote(viewingNote)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakeNotesContent;
