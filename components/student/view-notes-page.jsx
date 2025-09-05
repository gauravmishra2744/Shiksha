"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  MoreVertical,
  Target,
  Brain,
  Award,
  Trophy,
  BookOpen,
  Eye,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Users,
  FileText,
  ThumbsUp,
  Copy,
  ExternalLink,
  Zap,
} from "lucide-react";

// Subjects data
const subjects = [
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Target,
    color:
      "bg-green-50 border-green-200 text-green-600 dark:bg-green-950/50 dark:border-green-800",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Zap,
    color:
      "bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-950/50 dark:border-purple-800",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: Award,
    color:
      "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950/50 dark:border-orange-800",
  },
  {
    id: "biology",
    name: "Biology",
    icon: Brain,
    color:
      "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/50 dark:border-emerald-800",
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    color:
      "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/50 dark:border-blue-800",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: Trophy,
    color:
      "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/50 dark:border-indigo-800",
  },
];

// Sample notes data
const sampleNotes = [
  // My Notes
  {
    id: 1,
    title: "Quadratic Equations Summary",
    content:
      "The quadratic formula: x = (-b ± √(b²-4ac)) / 2a\n\nKey points:\n• Always check discriminant first\n• b²-4ac > 0: Two real roots\n• b²-4ac = 0: One real root\n• b²-4ac < 0: No real roots\n\nSteps to solve:\n1. Write in standard form ax² + bx + c = 0\n2. Identify a, b, c\n3. Calculate discriminant\n4. Apply formula",
    subject: "mathematics",
    topic: "Algebra",
    author: "You",
    authorAvatar: "/avatars/me.jpg",
    createdAt: "2024-12-08",
    isOwn: true,
    likes: 0,
    bookmarked: false,
    tags: ["formula", "important", "exam"],
    class: "12A",
  },
  {
    id: 2,
    title: "Cell Division Process",
    content:
      "Mitosis vs Meiosis\n\nMitosis:\n• Produces 2 identical diploid cells\n• Used for growth and repair\n• Prophase → Metaphase → Anaphase → Telophase\n\nMeiosis:\n• Produces 4 genetically different haploid gametes\n• Used for sexual reproduction\n• Two rounds of division\n• Creates genetic diversity through crossing over",
    subject: "biology",
    topic: "Cell Biology",
    author: "You",
    authorAvatar: "/avatars/me.jpg",
    createdAt: "2024-12-07",
    isOwn: true,
    likes: 0,
    bookmarked: false,
    tags: ["cell", "division", "biology"],
    class: "12A",
  },
  // Shared Notes
  {
    id: 3,
    title: "Newton's Laws Explained",
    content:
      "Comprehensive guide to Newton's three laws:\n\n1st Law (Inertia):\n• Object at rest stays at rest\n• Object in motion stays in motion\n• Unless external force acts\n\n2nd Law (F=ma):\n• Force = mass × acceleration\n• More force = more acceleration\n• More mass = less acceleration\n\n3rd Law (Action-Reaction):\n• Every action has equal opposite reaction\n• Forces always come in pairs\n• Examples: walking, rocket propulsion",
    subject: "physics",
    topic: "Mechanics",
    author: "Rahul Sharma",
    authorAvatar: "/avatars/student1.jpg",
    createdAt: "2024-12-08",
    isOwn: false,
    likes: 24,
    bookmarked: true,
    tags: ["physics", "laws", "mechanics", "important"],
    class: "12A",
  },
  {
    id: 4,
    title: "Chemical Bonding Notes",
    content:
      "Types of Chemical Bonds:\n\n1. Ionic Bonds:\n• Transfer of electrons\n• Metal + Non-metal\n• Forms crystals\n• High melting points\n\n2. Covalent Bonds:\n• Sharing of electrons\n• Non-metal + Non-metal\n• Can be polar or non-polar\n\n3. Metallic Bonds:\n• Sea of electrons\n• Metal atoms only\n• Explains conductivity\n\nBond strength: Ionic > Covalent > Metallic",
    subject: "chemistry",
    topic: "Chemical Bonding",
    author: "Priya Patel",
    authorAvatar: "/avatars/student2.jpg",
    createdAt: "2024-12-07",
    isOwn: false,
    likes: 18,
    bookmarked: false,
    tags: ["chemistry", "bonding", "important"],
    class: "12A",
  },
  {
    id: 5,
    title: "Calculus Integration Tricks",
    content:
      "Quick Integration Methods:\n\n1. Power Rule:\n∫ xⁿ dx = (x^(n+1))/(n+1) + C\n\n2. Substitution:\n• Let u = inner function\n• du = derivative of u\n• Replace and integrate\n\n3. Integration by Parts:\n∫ u dv = uv - ∫ v du\n\nCommon Integrals:\n• ∫ sin(x) dx = -cos(x) + C\n• ∫ cos(x) dx = sin(x) + C\n• ∫ e^x dx = e^x + C\n• ∫ 1/x dx = ln|x| + C",
    subject: "mathematics",
    topic: "Calculus",
    author: "Arjun Singh",
    authorAvatar: "/avatars/student3.jpg",
    createdAt: "2024-12-06",
    isOwn: false,
    likes: 31,
    bookmarked: true,
    tags: ["calculus", "integration", "math", "formulas"],
    class: "12A",
  },
  {
    id: 6,
    title: "English Poetry Analysis",
    content:
      "Poetry Analysis Framework:\n\n1. Structure & Form:\n• Rhyme scheme (ABAB, AABB, etc.)\n• Meter and rhythm\n• Stanza organization\n\n2. Literary Devices:\n• Metaphor: Direct comparison\n• Simile: Comparison using 'like/as'\n• Alliteration: Repetition of sounds\n• Personification: Human qualities to objects\n\n3. Themes & Meaning:\n• Central message\n• Mood and tone\n• Historical context\n\n4. Language Analysis:\n• Word choice (diction)\n• Imagery and symbolism",
    subject: "english",
    topic: "Poetry",
    author: "Sneha Reddy",
    authorAvatar: "/avatars/student4.jpg",
    createdAt: "2024-12-05",
    isOwn: false,
    likes: 15,
    bookmarked: false,
    tags: ["english", "poetry", "analysis", "literature"],
    class: "12A",
  },
];

const ViewNotesContent = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewingNote, setViewingNote] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const toggleBookmark = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, bookmarked: !note.bookmarked } : note
      )
    );
  };

  const toggleLike = (noteId) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId && !note.isOwn
          ? { ...note, likes: note.likes + 1 }
          : note
      )
    );
  };

  const openViewDialog = (note) => {
    setViewingNote(note);
    setShowViewDialog(true);
  };

  // Filter and sort notes
  const filterNotes = (notesList, isOwn) => {
    return notesList
      .filter((note) => note.isOwn === isOwn)
      .filter((note) => {
        const matchesSubject =
          selectedSubject === "all" || note.subject === selectedSubject;
        const matchesSearch =
          !searchQuery ||
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );

        return matchesSubject && matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "popular":
            return b.likes - a.likes;
          case "title":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  };

  const myNotes = filterNotes(notes, true);
  const sharedNotes = filterNotes(notes, false);

  const getSubjectData = (subjectId) => {
    return subjects.find((s) => s.id === subjectId) || subjects[0];
  };

  const NoteCard = ({ note }) => {
    const subjectData = getSubjectData(note.subject);
    const IconComponent = subjectData.icon;

    return (
      <Card className="group hover:shadow-md transition-all duration-200 border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div
                className={`p-2 rounded-lg flex-shrink-0 ${subjectData.color}`}
              >
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                  {note.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={note.authorAvatar} />
                    <AvatarFallback className="text-xs">
                      {note.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {note.author}
                  </span>
                  {!note.isOwn && (
                    <Badge variant="outline" className="text-xs">
                      Class {note.class}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {subjectData.name}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {note.topic}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => toggleBookmark(note.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    note.bookmarked ? "fill-blue-500 text-blue-500" : ""
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
                  <DropdownMenuItem onClick={() => openViewDialog(note)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Note
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Content
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {note.content}
          </p>

          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {note.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{note.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
              {!note.isOwn && (
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{note.likes}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!note.isOwn && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-xs"
                  onClick={() => toggleLike(note.id)}
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Like
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs"
                onClick={() => openViewDialog(note)}
              >
                View
              </Button>
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
          Notes Library
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Browse your notes and discover notes shared by classmates
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-40">
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
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="title">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes Tabs */}
      <Tabs defaultValue="shared" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14">
          <TabsTrigger
            value="shared"
            className="text-sm sm:text-base font-medium"
          >
            <Users className="mr-2 h-4 w-4" />
            Shared Notes ({sharedNotes.length})
          </TabsTrigger>
          <TabsTrigger
            value="my-notes"
            className="text-sm sm:text-base font-medium"
          >
            <FileText className="mr-2 h-4 w-4" />
            My Notes ({myNotes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shared" className="space-y-4">
          {sharedNotes.length === 0 ? (
            <Card className="border-2 border-dashed border-muted">
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No shared notes found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || selectedSubject !== "all"
                    ? "Try adjusting your search or filters"
                    : "Your classmates haven't shared any notes yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sharedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-notes" className="space-y-4">
          {myNotes.length === 0 ? (
            <Card className="border-2 border-dashed border-muted">
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No personal notes found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || selectedSubject !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start creating notes to see them here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {myNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* View Note Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewingNote && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-lg font-bold">{viewingNote.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {getSubjectData(viewingNote.subject).name}
                    </Badge>
                    <Badge variant="secondary">{viewingNote.topic}</Badge>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center space-x-3 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={viewingNote.authorAvatar} />
                      <AvatarFallback className="text-xs">
                        {viewingNote.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>By {viewingNote.author}</span>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(viewingNote.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {!viewingNote.isOwn && (
                      <div className="text-sm text-muted-foreground flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{viewingNote.likes} likes</span>
                      </div>
                    )}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 p-4 rounded-lg">
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

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    {!viewingNote.isOwn && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleLike(viewingNote.id)}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Like ({viewingNote.likes})
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBookmark(viewingNote.id)}
                    >
                      <Bookmark
                        className={`mr-2 h-4 w-4 ${
                          viewingNote.bookmarked ? "fill-current" : ""
                        }`}
                      />
                      {viewingNote.bookmarked ? "Bookmarked" : "Bookmark"}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewNotesContent;
