// src/components/todo/TodoList.jsx
import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import TodoItem from "./TodoItem.jsx";
import { MdChecklist } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";

export default function TodoList({
  todos,
  completedPomodoros,
  toggleTodoCompletion,
  updateTodoName,
  removeTodo, //接收 removeTodo
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BsCheck2Circle size={40}/>
          <span className="text-xl font-medium text-gray-900">待辦清單</span>
        </div>
        <div className="flex items-center gap-3">
          {/* <span className="text-lg font-medium text-gray-600">
            {completedPomodoros}/2
          </span> */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="text-gray-600" size={20} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.todoId}
              todo={todo}
              toggleTodoCompletion={toggleTodoCompletion}
              updateTodoName={updateTodoName}
              removeTodo={removeTodo}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">沒有待辦事項，新增一個吧！</p>
        )}
      </div>
    </div>
  );
}
