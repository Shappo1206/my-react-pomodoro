import React from "react";
import { X, Ellipsis } from "lucide-react";
import { FaCheck } from "react-icons/fa";

export default function TodoItem({
  todo,
  toggleTodoCompletion,
  updateTodoTitle,
  removeTodo,
  isSelected,         
  onSelect            //點擊後回傳任務ID
}) {
  
  const handleCardClick = (e) => {
    // 如果點到的是 input 或 button 或其子元素，就不要觸發選中
    const clickableElements = ["INPUT", "BUTTON", "SVG", "path"];
    
    // 檢查當前元素及其所有父元素
    let target = e.target;
    while (target && target !== e.currentTarget) {
      if (clickableElements.includes(target.tagName) || target.closest('button')) {
        return;
      }
      target = target.parentElement;
    }
    
    console.log('TodoItem clicked, todoId:', todo.todoId);
    onSelect(todo.todoId);
  };

  const handleToggleComplete = (e) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件
    toggleTodoCompletion(todo.todoId);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // 防止觸發父元素的點擊事件
    removeTodo(todo.todoId);
  };

  return (
    <div  
      onClick={handleCardClick}
      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors duration-150
      ${isSelected ? "border-2 border-orange-500 bg-orange-50 shadow-md" : "border border-gray-200 bg-gray-50"} console.log("🎯 isSelected", isSelected, "for", todo.title);`}
    >
      {/* 勾選按鈕 */}
      <FaCheck
        onClick={handleToggleComplete}
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
            onChange={(e) => updateTodoTitle(todo.todoId, e.target.value)}
            onClick={(e) => e.stopPropagation()} // 防止觸發父元素的點擊事件
            className={`bg-transparent outline-none transition-all duration-150 w-full text-lg ${
              todo.completed ? "line-through text-gray-400" : "text-gray-900"
            }`}
          />

          <div className="flex items-center gap-2 ml-3">
            {/* 顯示番茄進度 */}
            <div className="flex items-center gap-1 text-sm whitespace-nowrap">
              <span className="text-base">🍅</span>
              <span>{todo.completedPomodoroCount ?? 0} / {todo.estimatePomodoroCount ?? 0}</span>
            </div>

            <button
              onClick={handleRemove}
              className="text-gray-900 hover:text-red-500 transition-colors"
              title="刪除"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // 這裡可以添加修改功能的邏輯
                console.log('Edit button clicked for todo:', todo.todoId);
              }}
              className="text-gray-900 hover:text-red-500 transition-colors"
              title="修改"
            >
              <Ellipsis size={20} />            
            </button>
          </div>
        </div>

        {/* 描述文字 */}
        {todo.description && (
          <div className="text-sm text-gray-500 mt-1 whitespace-pre-line leading-relaxed text-left">
            {todo.description}
          </div>
        )}
      </div>
    </div>
  );
}