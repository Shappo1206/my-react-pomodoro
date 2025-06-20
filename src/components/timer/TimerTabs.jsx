import React from "react";

export default function TimerTabs({ currentTab, handleTabChange }) {
  const tabButtonClass = (tabKey) =>
    `px-6 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
      currentTab === tabKey
        ? "bg-orange-100 text-orange-600 border-orange-400"
        : "bg-white text-gray-600 border-gray-300 hover:text-gray-900"
    }`;

  return (
    <div className="flex justify-center mb-8">
      <div className="flex bg-gray-100 rounded-full p-1 border-2 border-gray-300">
        <button
          onClick={() => handleTabChange("pomodoro")}
          className={tabButtonClass("pomodoro")}
        >
          番茄鐘
        </button>
        <button
          onClick={() => handleTabChange("shortBreak")}
          className={tabButtonClass("shortBreak")}
        >
          短休息
        </button>
        <button
          onClick={() => handleTabChange("longBreak")}
          className={tabButtonClass("longBreak")}
        >
          長休息
        </button>
      </div>
    </div>
  );
}
