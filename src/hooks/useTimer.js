// src/hooks/useTimer.js

import { useState, useEffect } from "react";

export default function useTimer(onComplete) {
  const tabSettings = {
    pomodoro: { time: 25 * 60 },
    shortBreak: { time: 5 * 60 },
    longBreak: { time: 15 * 60 },
  };

  const [currentTab, setCurrentTab] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(tabSettings["pomodoro"].time);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (currentTab === "pomodoro" && onComplete) {
        onComplete();  // 番茄鐘結束時觸發
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentTab, onComplete]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    setTimeLeft(tabSettings[tab].time);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(tabSettings[currentTab].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return { currentTab, timeLeft, isRunning, handleTabChange, toggleTimer, resetTimer, formatTime };
}
