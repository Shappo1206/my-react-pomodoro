//匯入工具組
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Check,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  X,
} from "lucide-react";

export default function PomodoroApp() {
  // ============ 狀態管理 (State Management) ============

  // 計時器相關狀態
  const [currentTab, setCurrentTab] = useState("pomodoro"); // 當前選中的計時器模式 (番茄鐘/短休息/長休息)
  const [isRunning, setIsRunning] = useState(false); // 計時器是否正在運行
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 剩餘時間 (以秒為單位，25分鐘 = 1500秒)

  // 任務管理相關狀態，初始值是兩個陣列
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "任務1",
      completed: true, // 主任務完成狀態
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
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/todos")
  //     .then((response) => {
  //       console.log("後端回傳：", response.data);
  //       setsetTasks(response.data.data); // ← 注意：你是包在 payload 裡！
  //     })
  //     .catch((error) => {
  //       console.error("查詢失敗：", error);
  //     });
  // }, []);

  // 番茄鐘完成數量追蹤
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // ============ 計時器配置 (Timer Configuration) ============

  // 不同計時器模式的時間設定
  const tabSettings = {
    pomodoro: { time: 25 * 60, label: "番茄鐘" }, // 25分鐘工作時間
    shortBreak: { time: 5 * 60, label: "短休息" }, // 5分鐘短休息
    longBreak: { time: 15 * 60, label: "長休息" }, // 15分鐘長休息
  };

  // ============ 計時器核心邏輯 (Timer Core Logic) ============

  // 計時器倒數效果 - 每秒減少1秒，當時間歸零時停止並記錄番茄鐘完成數
  useEffect(() => {
    let interval = null;

    // 如果計時器正在運行且時間大於0，每秒遞減
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    }
    // 時間歸零時的處理邏輯
    else if (timeLeft === 0) {
      setIsRunning(false); // 停止計時器

      // 如果是番茄鐘模式，增加完成數量
      if (currentTab === "pomodoro") {
        setCompletedPomodoros((prev) => prev + 1);
      }

      // 播放提示音（如果瀏覽器支援）
      try {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhAzOH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnkpBSl+zPLaizsIGGS57+OdTgwOUarm7blmIDU6jpTY8sZ9KwUncsfz54lBCRZfteXtpVITC0ml4u6+ZB4yOM/z1oA4BhxqwO/mnEoODlOq5O+zYBoGPJPY88Z7KgUpe8n00oQ3Bxpnu+3kvVIJC1Ct4+m1aRkFOo/R9NF8MwUiccX13YtBBRFfsPLtr2MfAjKH0fTSdSsGJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhAzOH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnkpBSl+zPLaizsIGGS57+OdTgwOUarm7blmIDU6jpTY8sZ9KwUncsfz54lBCRZfteXtpVITC0ml4u6+ZB4yOM/z1oA4BhxqwO/mnEoODlOq5O+zYBoGPJPY88Z7KgUpe8n00oQ3Bxpnu+3kvVIJC1Ct4+m1aRkFOo/R9NF8MwUiccX13YtBBRFfsPLtr2MfAjKH0fTSdSsGJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhAzOH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnkpBSl+zPLaizsIGGS57+OdTgwOUarm7blmIDU6jpTY8sZ9KwUncsfz54lBCRZfteXtpVITC0ml4u6+ZB4yOM/z1oA4BhxqwO/mnEoODlOq5O+zYBo="
        );
        audio.play();
      } catch (e) {
        // 如果無法播放音效，則忽略
      }
    }

    // 清理計時器，避免記憶體洩漏
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentTab]);

  // ============ 工具函數 (Utility Functions) ============

  // 將秒數格式化為 MM:SS 格式顯示 (例: 1500秒 -> 25:00)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // 計算進度百分比（用於圓形進度條）
  const getProgress = () => {
    const totalTime = tabSettings[currentTab].time;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // ============ 計時器控制函數 (Timer Control Functions) ============

  // 切換計時器模式 (番茄鐘/短休息/長休息)
  const handleTabChange = (tab) => {
    setCurrentTab(tab); // 更新當前模式
    setTimeLeft(tabSettings[tab].time); // 設定對應的時間
    setIsRunning(false); // 停止計時器
  };

  // 開始/暫停計時器
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // 重置計時器到初始時間
  const resetTimer = () => {
    setIsRunning(false); // 停止計時器
    setTimeLeft(tabSettings[currentTab].time); // 重置為當前模式的初始時間
  };

  // ============ 任務管理函數 (Task Management Functions) ============

  // ✅切換主任務的完成狀態
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 切換子任務的完成狀態
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

  // 新增任務
  const addNewTask = () => {
    if (newTaskInput.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskInput.trim(),
        completed: false,
        subtasks: [],
      };
      setTasks([...tasks, newTask]);
      setNewTaskInput("");
      setShowAddTask(false);
    }
  };

  // 刪除任務
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // 新增子任務
  const addSubtask = (taskId) => {
    const subtaskName = prompt("請輸入子任務名稱：");
    if (subtaskName && subtaskName.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  {
                    id: Date.now(),
                    name: subtaskName.trim(),
                    completed: false,
                  },
                ],
              }
            : task
        )
      );
    }
  };

  // 計算任務中已完成的子任務數量
  const getCompletedSubtasks = (task) => {
    return task.subtasks.filter((subtask) => subtask.completed).length;
  };

  //👁️‍🗨️從return以下的HTML開始可以自己寫
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* ============ 頂部導航區塊 (Header Navigation Block) ============ */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border-2 border-gray-200">
          <div className="flex justify-between items-center">
            {/* 左側 - 首頁按鈕 */}
            <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-lg font-medium text-red-700">首頁</span>
            </div>

            {/* 右側 - 功能按鈕群組 (紀錄、設定、會員) */}
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-lg font-medium text-gray-700">紀錄</span>
              </div>
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-lg font-medium text-gray-700">設定</span>
              </div>
              <div className="bg-gray-100 rounded-2xl px-6 py-3 border-2 border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-lg font-medium text-gray-700">會員</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============ 主要內容區塊 - 雙欄佈局 ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ============ 左側 - 計時器區塊 (Timer Section) ============ */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-200">
            {/* 計時器模式切換標籤 (Timer Mode Tabs) */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-full p-1 border-2 border-gray-300">
                {/* 番茄鐘標籤 */}
                <button
                  onClick={() => handleTabChange("pomodoro")}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentTab === "pomodoro"
                      ? "bg-white text-gray-900 shadow-sm" // 選中狀態
                      : "text-gray-600 hover:text-gray-900" // 未選中狀態
                  }`}
                >
                  番茄鐘
                </button>

                {/* 短休息標籤 */}
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

                {/* 長休息標籤 */}
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

            {/* 計時器圓形顯示區 (Timer Circle Display) */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* 圓形進度條 */}
                <svg
                  className="w-64 h-64 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* 背景圓環 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                  {/* 進度圓環 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#f97316"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 45 * (1 - getProgress() / 100)
                    }`}
                    className="transition-all duration-300"
                  />
                </svg>

                {/* 計時器內容 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* 時間顯示 */}
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {formatTime(timeLeft)}
                    </div>

                    {/* 開始/暫停按鈕 */}
                    <button
                      onClick={toggleTimer}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mx-auto"
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

            {/* 控制按鈕組 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                重置
              </button>
            </div>

            {/* 番茄鐘統計 */}
            <div className="text-center mt-6 p-4 bg-orange-50 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">
                {completedPomodoros}
              </div>
              <div className="text-sm text-orange-500">今日完成的番茄鐘</div>
            </div>
          </div>

          {/* ============ 右側 - 任務管理區塊 (Tasks Management Section) ============ */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
            {/* 任務區塊標題列 (Tasks Header) */}
            <div className="flex items-center justify-between mb-6">
              {/* 左側 - 標題和新增按鈕 */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAddTask(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Plus className="text-gray-600" size={24} />
                </button>
                <span className="text-xl font-medium text-gray-900">
                  任務清單
                </span>
              </div>

              {/* 右側 - 番茄鐘完成進度和功能選單 */}
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-gray-600">
                  {completedPomodoros}/8
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal className="text-gray-600" size={20} />
                </button>
              </div>
            </div>

            {/* 新增任務輸入框 */}
            {showAddTask && (
              <div className="mb-4 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="輸入新任務..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
                    onKeyPress={(e) => e.key === "Enter" && addNewTask()}
                    autoFocus
                  />
                  <button
                    onClick={addNewTask}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    新增
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setNewTaskInput("");
                    }}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* 任務列表 (Tasks List) */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  {/* 主任務項目 (Main Task Item) */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200 group">
                    {/* 任務完成狀態勾選框 */}
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? "bg-orange-500 border-orange-500 text-white" // 已完成狀態
                          : "border-gray-300 hover:border-orange-500" // 未完成狀態
                      }`}
                    >
                      {task.completed && <Check size={16} />}
                    </button>

                    {/* 任務名稱輸入框 (可編輯) */}
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
                      className={`flex-1 bg-transparent font-medium outline-none ${
                        task.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-900"
                      }`}
                    />

                    {/* 任務操作按鈕 */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => addSubtask(task.id)}
                        className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                        title="新增子任務"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
                        title="刪除任務"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* 子任務列表 (Subtasks List) */}
                  {task.subtasks.length > 0 && (
                    <div className="ml-9 space-y-2">
                      {task.subtasks.map((subtask) => (
                        <div
                          key={subtask.id}
                          className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200 group"
                        >
                          {/* 子任務完成狀態勾選框 */}
                          <button
                            onClick={() =>
                              toggleSubtaskCompletion(task.id, subtask.id)
                            }
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              subtask.completed
                                ? "bg-orange-500 border-orange-500 text-white" // 已完成狀態
                                : "border-gray-300 hover:border-orange-500" // 未完成狀態
                            }`}
                          >
                            {subtask.completed && <Check size={12} />}
                          </button>

                          {/* 子任務名稱輸入框 (可編輯) */}
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
                            className={`flex-1 bg-transparent outline-none ${
                              subtask.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-700"
                            }`}
                          />

                          {/* 刪除子任務按鈕 */}
                          <button
                            onClick={() => {
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id
                                    ? {
                                        ...t,
                                        subtasks: t.subtasks.filter(
                                          (st) => st.id !== subtask.id
                                        ),
                                      }
                                    : t
                                )
                              );
                            }}
                            className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="刪除子任務"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 新增任務按鈕 (Add New Task Button) */}
            {!showAddTask && (
              <button
                onClick={() => setShowAddTask(true)}
                className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
              >
                + 新增任務
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
