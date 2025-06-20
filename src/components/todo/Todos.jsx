// src/components/Todos.jsx
import React, { useState } from 'react';
import { Check, Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import TodoList from './todo/TodoList';
import AddTodoButton from './todo/AddTodoButton'; 

export default function Todos() {
  const {
    todos,
    loading,
    addTodo,
    updateTodoTitle,
    removeTodo,
    toggleTodoCompletion,
  } = useTodos();

  // const [newTitle, setNewTitle] = useState('');

  if (loading) return <div>Loading...</div>;

  // const handleAdd = async () => {
  //   if (!newTitle.trim()) return;
  //   await addTodo(newTitle); // 這裡依你 hook 的命名
  //   setNewTitle('');
  // };

  return (
    <div className="p-4">
      {/* 新增輸入區
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2"
          placeholder="新增待辦"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white p-2 rounded">
          新增
        </button>
      </div> */}

      {/* 加入新版的 Modal 新增按鈕 */}
      <AddTodoButton onAddTodo={addTodo} />

      {/* 交給 TodoList 負責畫面渲染 */}
      <TodoList
        todos={todos}
        completedPomodoros={0} // 或傳入實際值
        toggleTodoCompletion={toggleTodoCompletion}
        updateTodoTitle={updateTodoTitle}
        removeTodo={removeTodo}
      />
    </div>
  );
}
