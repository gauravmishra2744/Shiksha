"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  Plus,
  Calendar,
  Clock,
  Flag,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  Target,
  Brain,
  Award,
  Trophy,
  BookOpen,
  Zap,
  Filter,
  Search,
  Star,
  AlertCircle,
  TrendingUp,
  CheckCheck,
  ListTodo,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";

// Priority levels
const priorities = [
  {
    value: "low",
    label: "Low",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    value: "high",
    label: "High",
    color: "bg-red-100 text-red-700 border-red-200",
  },
];

// Categories
const categories = [
  {
    id: "study",
    name: "Study",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    id: "assignment",
    name: "Assignment",
    icon: Target,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    id: "exam",
    name: "Exam Prep",
    icon: Brain,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    id: "project",
    name: "Project",
    icon: Trophy,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    id: "personal",
    name: "Personal",
    icon: Star,
    color: "bg-pink-50 text-pink-600 border-pink-200",
  },
  {
    id: "other",
    name: "Other",
    icon: Circle,
    color: "bg-gray-50 text-gray-600 border-gray-200",
  },
];

// Sample tasks
const sampleTasks = [
  {
    id: 1,
    title: "Complete Math Assignment Chapter 5",
    description: "Solve problems 1-20 from quadratic equations",
    category: "assignment",
    priority: "high",
    dueDate: "2024-12-10",
    completed: false,
    createdAt: "2024-12-08",
    estimatedTime: "2 hours",
  },
  {
    id: 2,
    title: "Study Physics - Newton's Laws",
    description: "Review concepts and practice problems for upcoming test",
    category: "study",
    priority: "medium",
    dueDate: "2024-12-09",
    completed: false,
    createdAt: "2024-12-07",
    estimatedTime: "1.5 hours",
  },
  {
    id: 3,
    title: "Chemistry Lab Report",
    description: "Write lab report for acid-base titration experiment",
    category: "assignment",
    priority: "high",
    dueDate: "2024-12-11",
    completed: false,
    createdAt: "2024-12-06",
    estimatedTime: "3 hours",
  },
  {
    id: 4,
    title: "Read English Literature Chapter",
    description: "Read and analyze Romeo and Juliet Act 2",
    category: "study",
    priority: "low",
    dueDate: "2024-12-12",
    completed: true,
    createdAt: "2024-12-05",
    estimatedTime: "1 hour",
  },
  {
    id: 5,
    title: "Prepare Biology Presentation",
    description: "Create slides on photosynthesis process",
    category: "project",
    priority: "medium",
    dueDate: "2024-12-15",
    completed: false,
    createdAt: "2024-12-08",
    estimatedTime: "2.5 hours",
  },
];

const ToDoPageContent = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
    setDueDate("");
    setEstimatedTime("");
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingTask(null);
    setShowCreateDialog(true);
  };

  const openEditDialog = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setCategory(task.category);
    setPriority(task.priority);
    setDueDate(task.dueDate);
    setEstimatedTime(task.estimatedTime);
    setEditingTask(task);
    setShowCreateDialog(true);
  };

  const saveTask = () => {
    const taskData = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      category,
      priority,
      dueDate,
      estimatedTime,
      completed: editingTask ? editingTask.completed : false,
      createdAt: editingTask
        ? editingTask.createdAt
        : new Date().toISOString().split("T")[0],
    };

    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingTask.id ? taskData : task))
      );
    } else {
      setTasks((prev) => [taskData, ...prev]);
    }

    setShowCreateDialog(false);
    resetForm();
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || task.category === selectedCategory;
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(
      (t) => !t.completed && new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, pending, overdue };
  };

  const getCategoryData = (categoryId) => {
    return (
      categories.find((c) => c.id === categoryId) ||
      categories[categories.length - 1]
    );
  };

  const getPriorityData = (priorityValue) => {
    return priorities.find((p) => p.value === priorityValue) || priorities[0];
  };

  const isOverdue = (task) => {
    return !task.completed && new Date(task.dueDate) < new Date();
  };

  const isDueToday = (task) => {
    const today = new Date().toISOString().split("T")[0];
    return task.dueDate === today;
  };

  const stats = getTaskStats();

  const TaskCard = ({ task }) => {
    const categoryData = getCategoryData(task.category);
    const priorityData = getPriorityData(task.priority);
    const IconComponent = categoryData.icon;

    return (
      <Card
        className={`group hover:shadow-md transition-all duration-200 ${
          task.completed ? "opacity-60" : ""
        } ${isOverdue(task) ? "border-red-200 bg-red-50/30" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`font-semibold text-sm line-clamp-2 ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {task.description && (
                <p
                  className={`text-sm text-muted-foreground line-clamp-2 mb-3 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.description}
                </p>
              )}

              <div className="flex items-center flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className={`text-xs ${categoryData.color}`}
                >
                  <IconComponent className="h-3 w-3 mr-1" />
                  {categoryData.name}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${priorityData.color}`}
                >
                  <Flag className="h-3 w-3 mr-1" />
                  {priorityData.label}
                </Badge>
                {isDueToday(task) && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Due Today
                  </Badge>
                )}
                {isOverdue(task) && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-red-100 text-red-700 border-red-200"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Overdue
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  {task.estimatedTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{task.estimatedTime}</span>
                    </div>
                  )}
                </div>
              </div>
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
          To-Do List
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Organize your tasks and stay productive
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-xs text-muted-foreground">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.overdue}
            </div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={openCreateDialog} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Tasks */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14">
          <TabsTrigger
            value="pending"
            className="text-sm sm:text-base font-medium"
          >
            <ListTodo className="mr-2 h-4 w-4" />
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="text-sm sm:text-base font-medium"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingTasks.length === 0 ? (
            <Card className="border-2 border-dashed border-muted">
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  All tasks completed!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Great job! You've completed all your pending tasks.
                </p>
                <Button onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTasks.length === 0 ? (
            <Card className="border-2 border-dashed border-muted">
              <CardContent className="text-center py-12">
                <Circle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No completed tasks
                </h3>
                <p className="text-sm text-muted-foreground">
                  Completed tasks will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create/Edit Task Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
            <DialogDescription>
              {editingTask
                ? "Update your task details"
                : "Add a new task to your list"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Task Title
              </label>
              <Input
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description (Optional)
              </label>
              <Textarea
                placeholder="Add task description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        <div className="flex items-center space-x-2">
                          <cat.icon className="h-4 w-4" />
                          <span>{cat.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center space-x-2">
                          <Flag className="h-4 w-4" />
                          <span>{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Estimated Time
                </label>
                <Input
                  placeholder="e.g., 2 hours"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
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
                onClick={saveTask}
                disabled={!title || !category || !priority || !dueDate}
                className="w-full sm:w-auto"
              >
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToDoPageContent;
