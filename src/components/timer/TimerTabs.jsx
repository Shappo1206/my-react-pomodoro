// src/components/timer/TimerTabs.jsx
import React from "react";

export default function TimerTabs({ currentTab, handleTabChange }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-100 rounded-full p-1 border-2 border-gray-300">
        <button
          onClick={() => handleTabChange("pomodoro")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTab === "pomodoro"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          番茄鐘
        </button>
        <button
          onClick={() => handleTabChange("shortBreak")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTab === "shortBreak"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          短休息
        </button>
        <button
          onClick={() => handleTabChange("longBreak")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            currentTab === "longBreak"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          長休息
        </button>
      </div>
    </div>
  );
}