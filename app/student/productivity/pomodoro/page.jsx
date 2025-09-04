"use client";

import React, { useState, useEffect } from "react";

export default function PomodoroPage() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setTimeLeft(workMinutes * 60);
  }, [workMinutes]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Add to history
            const session = {
              type: onBreak ? "Break" : "Work",
              completedAt: new Date().toLocaleString(),
            };
            setHistory((prevHist) => [session, ...prevHist]);

            // Switch between work and break
            setOnBreak(!onBreak);
            setTimeLeft(!onBreak ? breakMinutes * 60 : workMinutes * 60);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, onBreak, workMinutes, breakMinutes]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold mb-6 text-green-900 border-6 border-green-800 p-6 rounded-md shadow-xl bg-green-100">
        ⏱️ Pomodoro Timer
      </h1>

      {/* Timer Display */}
      <div className="flex flex-col items-center gap-4 mb-8 p-6 rounded-lg border-4 border-green-900 bg-green-100 shadow-xl w-full max-w-sm">
        <span className="text-3xl font-bold text-green-900">
          {onBreak ? "Break" : "Work"}
        </span>
        <span className="text-5xl font-extrabold text-green-800">
          {formatTime(timeLeft)}
        </span>

        {/* Controls */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setIsRunning(true)}
            className="px-6 py-3 bg-green-300 border-4 border-green-900 rounded-lg font-bold text-green-900 hover:bg-green-400 active:translate-y-1"
          >
            Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="px-6 py-3 bg-green-300 border-4 border-green-900 rounded-lg font-bold text-green-900 hover:bg-green-400 active:translate-y-1"
          >
            Pause
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(onBreak ? breakMinutes * 60 : workMinutes * 60);
            }}
            className="px-6 py-3 bg-green-300 border-4 border-green-900 rounded-lg font-bold text-green-900 hover:bg-green-400 active:translate-y-1"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="flex gap-4 mb-8 w-full max-w-sm">
        <input
          type="number"
          min={1}
          max={120}
          value={workMinutes}
          onChange={(e) => setWorkMinutes(parseInt(e.target.value))}
          className="flex-1 border-4 border-green-900 rounded-lg p-4 shadow-inner focus:outline-none bg-green-200 text-green-900 font-bold text-lg"
          placeholder="Work (minutes)"
        />
        <input
          type="number"
          min={1}
          max={60}
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
          className="flex-1 border-4 border-green-900 rounded-lg p-4 shadow-inner focus:outline-none bg-green-200 text-green-900 font-bold text-lg"
          placeholder="Break (minutes)"
        />
      </div>

      {/* History */}
      <h2 className="text-2xl font-bold mb-4 text-green-900">History</h2>
      <ul className="w-full max-w-sm space-y-4">
        {history.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-4 border-green-900 p-4 rounded-lg shadow-inner bg-green-200 opacity-80"
          >
            <span className="font-bold text-lg">{item.type} Session</span>
            <span className="text-sm text-green-900">{item.completedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
