"use client";

import React, { useState } from "react";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Zap,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  RotateCcw,
  Star,
  MoreVertical,
  Target,
  Brain,
  Award,
  Trophy,
  BookOpen,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  FolderOpen,
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
  {
    id: "general",
    name: "General",
    icon: FileText,
    color:
      "bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-950/50 dark:border-gray-800",
  },
];

// Sample flashcard sets
const sampleFlashcardSets = [
  {
    id: 1,
    name: "Mathematical Formulas",
    subject: "mathematics",
    topic: "Algebra",
    description: "Essential algebraic formulas for quick revision",
    cardCount: 3,
    createdAt: "2024-12-08",
    starred: true,
    aiGenerated: false,
    cards: [
      {
        id: 1,
        front: "Quadratic Formula",
        back: "x = (-b ± √(b²-4ac)) / 2a\n\nUsed to solve equations of the form ax² + bx + c = 0\n\nWhere:\n• a, b, c are coefficients\n• a ≠ 0",
      },
      {
        id: 2,
        front: "Pythagorean Theorem",
        back: "a² + b² = c²\n\nIn a right triangle:\n• a, b are the legs\n• c is the hypotenuse (longest side)\n\nUseful for finding distances and solving geometry problems",
      },
      {
        id: 3,
        front: "Distance Formula",
        back: "d = √[(x₂-x₁)² + (y₂-y₁)²]\n\nCalculates the distance between two points:\n• Point 1: (x₁, y₁)\n• Point 2: (x₂, y₂)\n\nDerived from the Pythagorean theorem",
      },
    ],
  },
  {
    id: 2,
    name: "Physics Laws",
    subject: "physics",
    topic: "Mechanics",
    description: "Fundamental laws of physics for quick reference",
    cardCount: 2,
    createdAt: "2024-12-07",
    starred: false,
    aiGenerated: true,
    cards: [
      {
        id: 4,
        front: "Newton's First Law",
        back: 'Law of Inertia\n\n"An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force."\n\nKey points:\n• Objects resist changes in motion\n• Force is needed to start, stop, or change motion\n• Explains why we wear seatbelts',
      },
      {
        id: 5,
        front: "Newton's Second Law",
        back: 'F = ma\n\n"The force acting on an object equals its mass times acceleration."\n\nWhere:\n• F = Force (Newtons)\n• m = Mass (kg)\n• a = Acceleration (m/s²)\n\nMore force = more acceleration\nMore mass = less acceleration',
      },
    ],
  },
  {
    id: 3,
    name: "Cell Biology Basics",
    subject: "biology",
    topic: "Cell Structure",
    description: "Key cell components and their functions",
    cardCount: 2,
    createdAt: "2024-12-06",
    starred: true,
    aiGenerated: false,
    cards: [
      {
        id: 6,
        front: "Mitochondria",
        back: '"Powerhouse of the Cell"\n\nFunction:\n• Produces ATP (energy) through cellular respiration\n• Has double membrane structure\n• Contains its own DNA\n\nFound in:\n• All eukaryotic cells\n• More abundant in active cells (muscle, brain)',
      },
      {
        id: 7,
        front: "Ribosomes",
        back: "Protein Factories\n\nFunction:\n• Translate mRNA into proteins\n• Link amino acids together\n• Essential for cell growth and repair\n\nLocation:\n• Free in cytoplasm\n• Attached to endoplasmic reticulum",
      },
    ],
  },
];

const FlashcardsPageContent = () => {
  const [flashcardSets, setFlashcardSets] = useState(sampleFlashcardSets);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [editingSet, setEditingSet] = useState(null);
  const [viewingSet, setViewingSet] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Form states
  const [setName, setSetName] = useState("");
  const [setSubject, setSetSubject] = useState("");
  const [setTopic, setSetTopic] = useState("");
  const [setDescription, setSetDescription] = useState("");
  const [cards, setCards] = useState([{ front: "", back: "" }]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const resetForm = () => {
    setSetName("");
    setSetSubject("");
    setSetTopic("");
    setSetDescription("");
    setCards([{ front: "", back: "" }]);
    setAiPrompt("");
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingSet(null);
    setShowCreateDialog(true);
  };

  const openEditDialog = (set) => {
    setSetName(set.name);
    setSetSubject(set.subject);
    setSetTopic(set.topic);
    setSetDescription(set.description);
    setCards(set.cards.map((card) => ({ front: card.front, back: card.back })));
    setEditingSet(set);
    setShowCreateDialog(true);
  };

  const openViewDialog = (set) => {
    setViewingSet(set);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setShowViewDialog(true);
  };

  const addCard = () => {
    setCards([...cards, { front: "", back: "" }]);
  };

  const removeCard = (index) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const updateCard = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  const generateAICards = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const aiCards = [
        {
          front: "AI Generated Concept 1",
          back: `This is an AI-generated explanation based on your prompt: "${aiPrompt}"\n\nKey points:\n• Detailed explanation\n• Important facts\n• Practical applications`,
        },
        {
          front: "AI Generated Concept 2",
          back: `Another concept related to: "${aiPrompt}"\n\nExplanation:\n• Core principles\n• Examples\n• Memory tips`,
        },
      ];

      setCards(aiCards);
      setIsGenerating(false);
      setAiPrompt("");
    }, 2000);
  };

  const saveFlashcardSet = () => {
    const validCards = cards.filter(
      (card) => card.front.trim() && card.back.trim()
    );

    const setData = {
      id: editingSet ? editingSet.id : Date.now(),
      name: setName,
      subject: setSubject,
      topic: setTopic,
      description: setDescription,
      cardCount: validCards.length,
      createdAt: editingSet
        ? editingSet.createdAt
        : new Date().toISOString().split("T")[0],
      starred: editingSet ? editingSet.starred : false,
      aiGenerated: cards.some((card) => card.front.includes("AI Generated")),
      cards: validCards.map((card, index) => ({
        id: Date.now() + index,
        front: card.front,
        back: card.back,
      })),
    };

    if (editingSet) {
      setFlashcardSets((prev) =>
        prev.map((set) => (set.id === editingSet.id ? setData : set))
      );
    } else {
      setFlashcardSets((prev) => [setData, ...prev]);
    }

    setShowCreateDialog(false);
    resetForm();
  };

  const deleteSet = (setId) => {
    setFlashcardSets((prev) => prev.filter((set) => set.id !== setId));
  };

  const toggleStar = (setId) => {
    setFlashcardSets((prev) =>
      prev.map((set) =>
        set.id === setId ? { ...set, starred: !set.starred } : set
      )
    );
  };

  const nextCard = () => {
    if (currentCardIndex < viewingSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  // Filter flashcard sets
  const filteredSets = flashcardSets.filter((set) => {
    const matchesSubject =
      selectedSubject === "all" || set.subject === selectedSubject;
    const matchesSearch =
      !searchQuery ||
      set.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.topic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesSearch;
  });

  const getSubjectData = (subjectId) => {
    return (
      subjects.find((s) => s.id === subjectId) || subjects[subjects.length - 1]
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Revision Cards
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Create and study flashcards for quick concept revision
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search flashcard sets..."
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
          <Button onClick={openCreateDialog} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Set
          </Button>
        </div>
      </div>

      {/* Flashcard Sets Grid */}
      <div className="space-y-4">
        {filteredSets.length === 0 ? (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No flashcard sets found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || selectedSubject !== "all"
                  ? "Try adjusting your filters or search terms"
                  : "Create your first flashcard set to get started"}
              </p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard Set
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSets.map((set) => {
              const subjectData = getSubjectData(set.subject);
              const IconComponent = subjectData.icon;

              return (
                <Card
                  key={set.id}
                  className="group hover:shadow-md transition-all duration-200 border-2 cursor-pointer"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${subjectData.color}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm line-clamp-1">
                            {set.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {set.description}
                          </p>
                          <div className="flex items-center flex-wrap gap-1 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {subjectData.name}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {set.topic}
                            </Badge>
                            {set.aiGenerated && (
                              <Badge
                                variant="outline"
                                className="text-xs text-purple-600 border-purple-200"
                              >
                                <Sparkles className="h-2 w-2 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(set.id);
                          }}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              set.starred
                                ? "fill-yellow-400 text-yellow-400"
                                : ""
                            }`}
                          />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openViewDialog(set)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Study
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openEditDialog(set)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => deleteSet(set.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-muted/30 p-2 rounded-lg">
                        <p className="text-sm font-bold">{set.cardCount}</p>
                        <p className="text-xs text-muted-foreground">Cards</p>
                      </div>
                      <div className="bg-muted/30 p-2 rounded-lg">
                        <div className="flex items-center justify-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(set.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => openViewDialog(set)}
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Study Cards
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSet ? "Edit Flashcard Set" : "Create New Flashcard Set"}
            </DialogTitle>
            <DialogDescription>
              {editingSet
                ? "Update your flashcard set"
                : "Create flashcards manually or generate with AI"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            {/* Set Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Set Name
                </label>
                <Input
                  placeholder="Enter set name..."
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject
                </label>
                <Select value={setSubject} onValueChange={setSetSubject}>
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
              <div>
                <label className="text-sm font-medium mb-2 block">Topic</label>
                <Input
                  placeholder="Enter topic..."
                  value={setTopic}
                  onChange={(e) => setSetTopic(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <Input
                  placeholder="Brief description..."
                  value={setDescription}
                  onChange={(e) => setSetDescription(e.target.value)}
                />
              </div>
            </div>

            {/* AI Generation */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium">AI Card Generator</h3>
              </div>
              <div className="space-y-3">
                <Textarea
                  placeholder="Describe what you want to study (e.g., 'Create flashcards about photosynthesis process' or 'Important physics formulas for mechanics')"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button
                  onClick={generateAICards}
                  disabled={!aiPrompt.trim() || isGenerating}
                  variant="outline"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cards with AI
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Manual Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium">Flashcards</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCard}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {cards.map((card, index) => (
                  <Card key={index} className="border-2 border-dashed">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          Card {index + 1}
                        </h4>
                        {cards.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCard(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-xs font-medium mb-1 block">
                          Front (Concept/Question)
                        </label>
                        <Input
                          placeholder="Enter concept or question..."
                          value={card.front}
                          onChange={(e) =>
                            updateCard(index, "front", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1 block">
                          Back (Explanation/Answer)
                        </label>
                        <Textarea
                          placeholder="Enter detailed explanation..."
                          value={card.back}
                          onChange={(e) =>
                            updateCard(index, "back", e.target.value)
                          }
                          className="min-h-[100px]"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={saveFlashcardSet}
                disabled={
                  !setName ||
                  !setSubject ||
                  cards.every((card) => !card.front || !card.back)
                }
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                {editingSet ? "Update" : "Create"} Set
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Study Dialog - FIXED FLIP ANIMATION */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {viewingSet && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span className="text-lg font-bold">{viewingSet.name}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{viewingSet.topic}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {currentCardIndex + 1} / {viewingSet.cards.length}
                    </span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Card Display - FIXED */}
                <div className="flex justify-center">
                  <Card
                    className="w-full max-w-2xl h-80 cursor-pointer transition-all duration-300 hover:shadow-lg border-2"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <CardContent className="h-full flex flex-col justify-center items-center p-6 text-center">
                      <div className="space-y-4 w-full">
                        <Badge
                          variant={showAnswer ? "default" : "outline"}
                          className="mb-4"
                        >
                          {showAnswer ? "Explanation" : "Concept"}
                        </Badge>

                        <div className="text-lg md:text-xl font-medium leading-relaxed min-h-[200px] flex items-center justify-center">
                          {showAnswer ? (
                            <div className="w-full text-left">
                              <pre className="whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed">
                                {viewingSet.cards[currentCardIndex].back}
                              </pre>
                            </div>
                          ) : (
                            <div className="text-xl md:text-2xl font-bold text-center">
                              {viewingSet.cards[currentCardIndex].front}
                            </div>
                          )}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {showAnswer
                            ? "Click to see concept"
                            : "Click to see explanation"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={prevCard}
                    disabled={currentCardIndex === 0}
                    className="flex items-center space-x-2 w-full sm:w-auto"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="flex items-center space-x-2 w-full sm:w-auto"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Flip Card</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={nextCard}
                    disabled={currentCardIndex === viewingSet.cards.length - 1}
                    className="flex items-center space-x-2 w-full sm:w-auto"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress */}
                <div className="w-full">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>
                      {Math.round(
                        ((currentCardIndex + 1) / viewingSet.cards.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentCardIndex + 1) / viewingSet.cards.length) *
                          100
                        }%`,
                      }}
                    />
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

export default FlashcardsPageContent;
