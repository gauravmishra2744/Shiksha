 
"use client";

import React, { useState, useEffect } from "react";

export default function ToDoPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(""); // string from time input HH:MM
  const [history, setHistory] = useState([]);
  const [now, setNow] = useState(Date.now()); // for live countdown

  const getCurrentDateTime = () => new Date().toLocaleString();

  // Convert timer input (HH:MM) to milliseconds
  const timerToMs = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1000;
  };

  const addTask = () => {
    if (!input.trim() || !timer) return;
    const dateTime = getCurrentDateTime();
    const timeLimitMs = timerToMs(timer);
    const task = { text: input, dateTime, timeLimitMs, createdAt: Date.now() };
    setTasks([...tasks, task]);
    setInput("");
    setTimer("");
  };

  const completeTask = (index) => {
    const task = tasks[index];
    const completedAt = getCurrentDateTime();
    setHistory([{ ...task, completedAt, status: "completed" }, ...history]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Live countdown interval
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
      const expiredTasks = tasks.filter(task => Date.now() - task.createdAt >= task.timeLimitMs);
      if (expiredTasks.length > 0) {
        expiredTasks.forEach(task => {
          setHistory(prev => [
            { ...task, completedAt: getCurrentDateTime(), status: "incomplete" },
            ...prev,
          ]);
        });
        setTasks(prev => prev.filter(task => Date.now() - task.createdAt < task.timeLimitMs));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  // Helper to format remaining time
  const formatTime = (ms) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-8">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-6 text-green-900 border-6 border-green-800 p-6 rounded-md shadow-xl bg-green-100">
        🟢 Productivity - To-Do List
      </h1>

      {/* Input */}
      <div className="flex flex-col gap-4 mb-8 w-full max-w-lg">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 border-4 border-green-900 rounded-lg p-4 shadow-inner focus:outline-none bg-green-200 text-green-900 placeholder-green-700 font-bold text-lg"
          />
          <input
            type="time"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            className="w-36 border-4 border-green-900 rounded-lg p-4 shadow-inner focus:outline-none bg-green-200 text-green-900 font-bold text-lg"
          />
        </div>
        <button
          onClick={addTask}
          className="bg-green-300 border-4 border-green-900 px-8 py-4 rounded-lg shadow-xl hover:bg-green-400 active:translate-y-1 font-extrabold text-green-900 text-lg"
        >
          Add Task
        </button>
      </div>

      {/* Current Tasks */}
      <h2 className="text-2xl font-bold mb-4 text-green-900">Tasks</h2>
      <ul className="w-full max-w-lg space-y-4 mb-8">
        {tasks.map((task, index) => {
          const remaining = task.timeLimitMs - (now - task.createdAt);
          return (
            <li
              key={index}
              className="flex justify-between items-center border-4 border-green-900 p-4 rounded-lg shadow-xl bg-green-100"
            >
              <div className="flex flex-col flex-1">
                <span className="font-bold text-lg">{task.text}</span>
                <span className="text-sm text-green-800">
                  Added: {task.dateTime} | Remaining: {formatTime(remaining)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => completeTask(index)}
                  className="border-4 border-green-900 rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 active:translate-y-1 font-bold text-green-900"
                >
                  Complete
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="border-4 border-green-900 rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 active:translate-y-1 font-bold text-green-900"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* History */}
      <h2 className="text-2xl font-bold mb-4 text-green-900">History</h2>
      <ul className="w-full max-w-lg space-y-4">
        {history.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-4 border-green-900 p-4 rounded-lg shadow-inner bg-green-200 opacity-80"
          >
            <div className="flex flex-col flex-1">
              <span className="font-bold text-lg line-through">{task.text}</span>
              <span className="text-sm text-green-900">
                Added: {task.dateTime} | Completed: {task.completedAt} | Status: {task.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}



