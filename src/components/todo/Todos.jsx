// src/components/Todos.jsx
// 主容器元件，負責串接 hooks、控制元件組合
import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoList from './todo/TodoList';
import AddTodoButton from './todo/AddTodoButton';
import React, { useState } from 'react';

export default function Todos() {
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  const {
    todos,
    loading,
    addTodo,
    updateTodoTitle,
    removeTodo,
    toggleTodoCompletion,
  } = useTodos();

  if (loading) return <div>Loading...</div>;

  console.log('Current selectedTodoId:', selectedTodoId);
  console.log('setSelectedTodoId function:', typeof setSelectedTodoId);
  console.log("typeof setSelectedTodoId:", typeof setSelectedTodoId); 


  return (
    <div className="p-4">
      {/* 加入新版的 Modal 新增按鈕 */}
      <AddTodoButton onAddTodo={addTodo} />
      
      {/* 交給 TodoList 負責畫面渲染 */}
      <TodoList
        todos={todos}
        completedPomodoros={0} // 或傳入實際值
        toggleTodoCompletion={toggleTodoCompletion}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
        updateTodoTitle={updateTodoTitle}
        removeTodo={removeTodo}
      />
    </div>
  );
}