import React from "react";
import { X, Ellipsis } from "lucide-react";
import { FaCheck } from "react-icons/fa";

export default function TodoItem({
  todo,
  toggleTodoCompletion,
  updateTodoName,
  removeTodo,
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
      {/* 勾選按鈕 */}
      <FaCheck
        onClick={() => toggleTodoCompletion(todo.todoId)}
        className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-sm border-2 transition-all duration-150 cursor-pointer ${
          todo.completed
            ? "bg-orange-100 border-orange-400 text-orange-600"
            : "bg-white border-gray-300 text-gray-300"
        }`}
      />

      {/* 中間：標題 + 描述 */}
      <div className="flex flex-col flex-grow items-start">
        {/* 標題 + 番茄鐘 + 刪除 */}
        <div className="flex w-full justify-between items-start">
          <input
            type="text"
            value={todo.title || ""}
            onChange={(e) => updateTodoName(todo.todoId, e.target.value)}
            className={`bg-transparent outline-none transition-all duration-150 w-full text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          />

          <div className="flex items-center gap-2 ml-3">
            {/* 顯示番茄進度 */}
            <div className="flex items-center gap-1 text-sm whitespace-nowrap">
              <span className="text-base">🍅</span>
              <span>{todo.completedPomodoros || 0} / {todo.estimatedPomodoros || 0}  </span>
            </div>

            <button
              onClick={() => removeTodo(todo.todoId)}
              className="text-gray-900 hover:text-red-500 transition-colors"
              title="刪除"
            >
              <X size={20} />
            </button>

            <button
              onClick={() => updateTodoTitle(todo.todoId)}
              className="text-gray-900 hover:text-red-500 transition-colors"
              title="修改"
            >
              <Ellipsis  size={20}/>            
            </button>
          </div>
        </div>

        {/* 描述文字 */}
        {todo.description && (
          <div className="text-sm text-gray-500 mt-1 whitespace-pre-line leading-relaxed">
            {todo.description}
          </div>
        )}
      </div>
    </div>
  );
}
