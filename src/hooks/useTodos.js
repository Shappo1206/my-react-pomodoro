// src/hooks/useTodos.js

import { useState, useEffect } from 'react';
import {
  getTodos,
  addTodo,
  modifyTodo,
  removeTodo,
} from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 初始化讀取
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error('讀取失敗', err);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // 新增
  const create = async (todo) => {
    const newTodo = await addTodo(todo);
    setTodos((prev) => [...prev, newTodo]);
  };

  // 更新
  const update = async (id, todo) => {
    await modifyTodo(id, todo);
    setTodos((prev) =>
      prev.map((t) => (t.todoId === id ? { ...t, ...todo } : t))
    );
  };

  // 刪除
  const remove = async (id) => {
    await removeTodo(id);
    setTodos((prev) => prev.filter((t) => t.todoId !== id));
  };

  return {
    todos,
    loading,
    create,
    update,
    remove,
  };
};
