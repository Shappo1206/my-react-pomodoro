// src/components/todo/TodoList.jsx
import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import TodoItem from "./TodoItem.jsx"; // 確保這裡引入 TodoItem.jsx

export default function TodoList({
  todos,
  completedPomodoros,
  toggleTodoCompletion,
  toggleSubtodoCompletion,
  updateTodoName,
  updateSubtodoName,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
      {/* Todos Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Plus className="text-gray-600" size={24} />
          <span className="text-xl font-medium text-gray-900">
            待辦清單
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

      {/* Todos List */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodoCompletion={toggleTodoCompletion}
              toggleSubtodoCompletion={toggleSubtodoCompletion}
              updateTodoName={updateTodoName}
              updateSubtodoName={updateSubtodoName}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">沒有待辦事項，新增一個吧！</p>
        )}
      </div>
    </div>
  );
}