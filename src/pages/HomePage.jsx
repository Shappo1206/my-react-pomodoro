// src/pages/HomePage.jsx
import React from "react";
import TimerDisplay from "../components/timer/TimerDisplay.jsx"; // 修正拼寫錯誤
import TimerTabs from "../components/timer/TimerTabs.jsx";     
import TodoList from "../components/todo/TodoList.jsx";       
import AddTodoButton from "../components/todo/AddTodoButton.jsx"; 
import { usePomodoroTimer } from "../hooks/usePomodoroTimer.jsx";
import { useTodos } from "../hooks/useTodos.jsx";

export default function HomePage() {
  const {
    currentTab,
    isRunning,
    timeLeft,
    completedPomodoros,
    formatTime,
    handleTabChange,
    toggleTimer,
    resetTimer,
  } = usePomodoroTimer();

  const {
    todos,
    loading,
    error,
    addTodo,
    toggleTodoCompletion,
    updateTodoName,
    removeTodo,
  } = useTodos();

  if (loading) return <div className="text-center mt-10">載入中...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">載入失敗: {error.message}</div>;

  // 確保 todos 是陣列
  const safeTodos = todos || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timer Section */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-200">
            <TimerTabs currentTab={currentTab} handleTabChange={handleTabChange} />
            <TimerDisplay
              timeLeft={timeLeft}
              isRunning={isRunning}
              toggleTimer={toggleTimer}
              formatTime={formatTime}
            />
            <div className="text-center">
              <button
                onClick={resetTimer}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          {/* Todos Section */}
          <div className="flex flex-col">
            <TodoList
              todos={safeTodos}
              completedPomodoros={completedPomodoros}
              toggleTodoCompletion={toggleTodoCompletion}
              updateTodoName={updateTodoName}
              removeTodo={removeTodo}
            />
            <AddTodoButton onAddTodo={addTodo} />
          </div>
        </div>
      </div>
    </div>
  );
}