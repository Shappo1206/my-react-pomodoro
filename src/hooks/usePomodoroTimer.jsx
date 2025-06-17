// src/hooks/usePomodoroTimer.js
import { useState, useEffect } from "react";

const tabSettings = {
  pomodoro: { time: 25 * 60, label: "番茄鐘" },
  shortBreak: { time: 5 * 60, label: "短休息" },
  longBreak: { time: 15 * 60, label: "長休息" },
};

export const usePomodoroTimer = () => {
  const [currentTab, setCurrentTab] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(tabSettings.pomodoro.time);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (currentTab === "pomodoro") {
        setCompletedPomodoros((prev) => prev + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentTab]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  return {
    currentTab,
    isRunning,
    timeLeft,
    completedPomodoros,
    tabSettings,
    formatTime,
    handleTabChange,
    toggleTimer,
    resetTimer,
  };
};