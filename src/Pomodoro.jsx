import React, { useState, useEffect } from "react";
import { Check, Plus, MoreHorizontal, Play, Pause } from "lucide-react";

// ============ 狀態管理 (State Management) ============
function PomodoroApp() {
  const [currentTab, setCurrentTab] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [tasks, setTasks] = useState([
    //會改由資料庫來fetch
    {
      id: 1,
      name: "任務1",
      completed: true,
      subtasks: [
        { id: 1, name: "項目1", completed: true },
        { id: 2, name: "項目2", completed: true },
      ],
    },
    {
      id: 2,
      name: "任務2",
      completed: false,
      subtasks: [
        { id: 1, name: "項目1", completed: true },
        { id: 2, name: "項目2", completed: false },
      ],
    },
  ]);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
}
export default PomodoroApp;
