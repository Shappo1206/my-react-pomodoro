// src/components/todo/TodoItem.jsx
import React from "react";
import { Check } from "lucide-react";

export default function TodoItem({ todo, toggleTodoCompletion, toggleSubtodoCompletion, updateTodoName, updateSubtodoName }) {
  return (
    <div className="space-y-2">
      {/* Main Todo */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
        <button
          onClick={() => toggleTodoCompletion(todo.id)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? "bg-orange-500 border-orange-500 text-white"
              : "border-gray-300 hover:border-orange-500"
          }`}
        >
          {todo.completed && <Check size={16} />}
        </button>
        <input
          type="text"
          value={todo.name}
          onChange={(e) => updateTodoName(todo.id, e.target.value)}
          className="flex-1 bg-transparent text-gray-900 font-medium outline-none"
        />
      </div>

      {/* Subtodos */}
      <div className="ml-9 space-y-2">
        {todo.subtodos.map((subtodo) => (
          <div
            key={subtodo.id}
            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <button
              onClick={() => toggleSubtodoCompletion(todo.id, subtodo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                subtodo.completed
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-gray-300 hover:border-orange-500"
              }`}
            >
              {subtodo.completed && <Check size={12} />}
            </button>
            <input
              type="text"
              value={subtodo.name}
              onChange={(e) => updateSubtodoName(todo.id, subtodo.id, e.target.value)}
              className="flex-1 bg-transparent text-gray-700 outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}