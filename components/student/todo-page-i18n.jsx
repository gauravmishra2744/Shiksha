"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function TodoPageContentI18n() {
  const { t } = useTranslation();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Math homework", completed: false },
    { id: 2, text: "Read Biology chapter 5", completed: true },
    { id: 3, text: "Practice Physics problems", completed: false }
  ]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('todo.myTasks')}</h1>
          <p className="text-muted-foreground">{t('productivity.todoList')}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('common.total')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('todo.completed')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('todo.pending')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('todo.addNew')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={t('todo.taskName')}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <Button onClick={addTask}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('todo.myTasks')}</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                  <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.text}
                  </span>
                  <Badge variant={task.completed ? "secondary" : "default"}>
                    {task.completed ? t('todo.completed') : t('todo.pending')}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Circle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('todo.noTasks')}</h3>
              <p className="text-muted-foreground">{t('todo.startAdding')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}