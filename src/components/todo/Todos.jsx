// src/components/Todos.js

import React, { useState } from 'react';
import { Check, Plus, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';

export default function Todos() {
  const { todos, loading, create, update, remove } = useTodos();
  const [newTitle, setNewTitle] = useState('');

  if (loading) return <div>Loading...</div>;

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await create({ title: newTitle });
    setNewTitle('');
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">待辦清單</h2>

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
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.todoId} className="flex justify-between items-center border p-2 rounded">
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.todoId)}>
              <Trash2 className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
