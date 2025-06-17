// src/pages/HomePage.js

import React, { useState } from "react";
import Header from "../components/Header";
import Timer from "../components/Timer";
import Todos from "../components/Todos";  // <-- 改這裡

export default function HomePage() {
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const handlePomodoroComplete = () => {
    setCompletedPomodoros(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Timer onComplete={handlePomodoroComplete} />
          <Todos completedPomodoros={completedPomodoros} />  {/* 改這裡 */}
        </div>
      </div>
    </div>
  );
}
