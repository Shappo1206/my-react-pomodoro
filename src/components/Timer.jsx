// src/components/Timer.js

import React from "react";
import { Pause, Play } from "lucide-react";
import useTimer from "../hooks/useTimer";

export default function Timer({ onComplete }) {
  const {
    currentTab,
    timeLeft,
    isRunning,
    handleTabChange,
    toggleTimer,
    resetTimer,
    formatTime,
  } = useTimer(onComplete);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-200">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 rounded-full p-1 border-2 border-gray-300">
          {["pomodoro", "shortBreak", "longBreak"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                currentTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "pomodoro" ? "番茄鐘" : tab === "shortBreak" ? "短休息" : "長休息"}
            </button>
          ))}
        </div>
      </div>

      {/* Timer */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-64 h-64 rounded-full border-4 border-gray-300 flex items-center justify-center bg-white shadow-inner">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {formatTime(timeLeft)}
              </div>
              <button
                onClick={toggleTimer}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
                <span className="text-lg font-medium">{isRunning ? "Pause" : "Start"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button onClick={resetTimer} className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors">
          重置
        </button>
      </div>
    </div>
  );
}
