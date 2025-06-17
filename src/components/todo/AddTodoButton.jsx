// src/components/todo/AddTodoButton.jsx
import React from "react";

export default function AddTodoButton({ onAddTodo }) {
  const handleAddClick = () => {
    const newTodoName = prompt("請輸入新的待辦事項名稱：");
    if (newTodoName) {
      onAddTodo(newTodoName);
    }
  };

  return (
    <button
      onClick={handleAddClick}
      className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
    >
      + 新增待辦事項
    </button>
  );
}