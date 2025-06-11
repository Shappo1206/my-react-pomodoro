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

/**
 * LeftContent 組件：負責渲染番茄鐘計時器功能
 * 包含計時器模式選擇、時間顯示、開始/暫停/重置按鈕，以及番茄鐘完成數量
 */
function LeftContent() {
  // 計時器相關狀態
  const [currentTab, setCurrentTab] = useState("pomodoro"); // 當前選中的計時器模式 (番茄鐘/短休息/長休息)
  const [isRunning, setIsRunning] = useState(false); // 計時器是否正在運行
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 剩餘時間 (以秒為單位，25分鐘 = 1500秒)
  const [completedPomodoros, setCompletedPomodoros] = useState(0); // 番茄鐘完成數量追蹤

  // 不同計時器模式的時間設定
  const tabSettings = {
    pomodoro: { time: 25 * 60, label: "番茄鐘" }, // 25分鐘工作時間
    shortBreak: { time: 5 * 60, label: "短休息" }, // 5分鐘短休息
    longBreak: { time: 15 * 60, label: "長休息" }, // 15分鐘長休息
  };

  // useEffect Hook 用於處理計時器邏輯
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      // 每秒減少時間
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // 時間歸零時停止計時器並增加完成數量
      setIsRunning(false);
      setCompletedPomodoros((prevCount) => prevCount + 1);
      // 可以添加音效提醒或自動切換到下一個模式
    }
    // 清理函數，避免組件卸載時記憶體洩漏
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

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
    // 避免除以零或負值，確保進度條在 0 到 100 之間
    if (totalTime === 0) return 0;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  return (
    <>
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
    </>
  );
}

export default LeftContent;
