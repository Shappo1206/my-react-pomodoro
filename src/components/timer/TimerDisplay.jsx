// src/components/timer/TimerDisplay.jsx
import React from "react";
import { Play, Pause } from "lucide-react";

export default function TimerDisplay({ timeLeft, isRunning, toggleTimer, formatTime }) {
  return (
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
              <span className="text-lg font-medium">
                {isRunning ? "Pause" : "Start"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}