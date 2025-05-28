import React, { useState, useEffect } from "react";
import { Check, Plus, MoreHorizontal, Play, Pause } from "lucide-react";

// ============ 狀態管理 (State Management) ============
export default function PomodoroApp() {
  const [currentTab, setCurrentTab] = useState("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [tasks, setTasks] = useState([
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

  const tabSettings = {
    pomodoro: { time: 25 * 60, label: "番茄鐘" },
    shortBreak: { time: 5 * 60, label: "短休息" },
    longBreak: { time: 15 * 60, label: "長休息" },
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
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

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleSubtaskCompletion = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  const getCompletedSubtasks = (task) => {
    return task.subtasks.filter((subtask) => subtask.completed).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Navigation */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-gray-200">
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
              <span className="text-lg font-medium text-gray-700">首頁</span>
            </div>
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
                <span className="text-lg font-medium text-gray-700">紀錄</span>
              </div>
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
                <span className="text-lg font-medium text-gray-700">設定</span>
              </div>
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300">
                <span className="text-lg font-medium text-gray-700">會員</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timer Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-200">
            {/* Timer Tabs */}
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

            {/* Timer Circle */}
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

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetTimer}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
            {/* Tasks Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Plus className="text-gray-600" size={24} />
                <span className="text-xl font-medium text-gray-900">
                  任務清單
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-600">
                  {completedPomodoros}/2
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="text-gray-600" size={20} />
                </button>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  {/* Main Task */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "border-gray-300 hover:border-orange-500"
                      }`}
                    >
                      {task.completed && <Check size={16} />}
                    </button>
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) => {
                        setTasks(
                          tasks.map((t) =>
                            t.id === task.id
                              ? { ...t, name: e.target.value }
                              : t
                          )
                        );
                      }}
                      className="flex-1 bg-transparent text-gray-900 font-medium outline-none"
                    />
                  </div>

                  {/* Subtasks */}
                  <div className="ml-9 space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div
                        key={subtask.id}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <button
                          onClick={() =>
                            toggleSubtaskCompletion(task.id, subtask.id)
                          }
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            subtask.completed
                              ? "bg-orange-500 border-orange-500 text-white"
                              : "border-gray-300 hover:border-orange-500"
                          }`}
                        >
                          {subtask.completed && <Check size={12} />}
                        </button>
                        <input
                          type="text"
                          value={subtask.name}
                          onChange={(e) => {
                            setTasks(
                              tasks.map((t) =>
                                t.id === task.id
                                  ? {
                                      ...t,
                                      subtasks: t.subtasks.map((st) =>
                                        st.id === subtask.id
                                          ? { ...st, name: e.target.value }
                                          : st
                                      ),
                                    }
                                  : t
                              )
                            );
                          }}
                          className="flex-1 bg-transparent text-gray-700 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Task Button */}
            <button className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
              + 新增任務
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
