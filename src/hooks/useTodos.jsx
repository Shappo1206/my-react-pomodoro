// src/hooks/useTodos.js - 最簡化版本
import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

export const useTodos = () => {
  // ===== 狀態管理 =====
  const [todos, setTodos] = useState([]);     // 存放所有待辦事項
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(null);   // 錯誤訊息

  // ===== 獲取所有待辦事項 =====
  const getTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchTodos();

      // 直接使用 API 回傳的資料
      setTodos(response || []);

    } catch (err) {
      console.error('獲取待辦事項失敗:', err);
      setError(err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  // ===== 初始化載入 =====
  useEffect(() => {
    getTodos();
  }, []);

  // ===== 新增待辦事項 =====
const addTodo = async (todo) => {
  if (!todo.title || todo.title.trim() === '') return;

  const newTodo = {
    title: todo.title.trim(),
    description: todo.description?.trim() || '',
    estimatePomodoroCount: todo.estimatePomodoroCount || 1,
    completed: false,
  };

  await createTodo(newTodo);
  await getTodos();
};


  // ===== 切換待辦事項完成狀態 =====
  const toggleTodoCompletion = async (todoId) => {
    const todoToUpdate = todos.find(todo => todo.todoId === todoId);
    if (!todoToUpdate) return;

    try {
      setError(null);

      await updateTodo(todoId, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });

      await getTodos();

    } catch (err) {
      console.error('更新待辦事項狀態失敗:', err);
      setError(err);
    }
  };

  // ===== 修改待辦事項名稱 (title) =====
  const updateTodoTitle = async (todoId, newTitle) => {
    if (!newTitle || newTitle.trim() === '') {
      return;
    }

    const todoToUpdate = todos.find(todo => todo.todoId === todoId);
    if (!todoToUpdate) return;

    try {
      setError(null);

      await updateTodo(todoId, {
        ...todoToUpdate,
        title: newTitle.trim()
      });

      await getTodos();

    } catch (err) {
      console.error('更新待辦事項標題失敗:', err);
      setError(err);
    }
  };

  // ===== 修改待辦事項描述 (description) =====
  const updateTodoDescription = async (todoId, newDescription) => {
    const todoToUpdate = todos.find(todo => todo.todoId === todoId);
    if (!todoToUpdate) return;

    try {
      setError(null);

      await updateTodo(todoId, {
        ...todoToUpdate,
        description: newDescription.trim()
      });

      await getTodos();

    } catch (err) {
      console.error('更新待辦事項描述失敗:', err);
      setError(err);
    }
  };

  // ===== 修改預估番茄鐘數量 (estimatePomodoroCount) =====
  const updateTodoEstimatePomodoroCount = async (todoId, newCount) => {
    if (typeof newCount !== 'number' || newCount < 0) {
      return;
    }

    const todoToUpdate = todos.find(todo => todo.todoId === todoId);
    if (!todoToUpdate) return;

    try {
      setError(null);

      await updateTodo(todoId, {
        ...todoToUpdate,
        estimatePomodoroCount: newCount
      });

      await getTodos();

    } catch (err) {
      console.error('更新預估番茄鐘數量失敗:', err);
      setError(err);
    }
  };

  // ===== 刪除待辦事項 =====
  const removeTodo = async (todoId) => {
    try {
      setError(null);
      await deleteTodo(todoId);
      await getTodos(); // Refresh the list
    } catch (err) {
      console.error('刪除待辦事項失敗:', err);
      setError(err);
    }
  };

  // ===== 回傳所有狀態和函數 =====
  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodoCompletion,
    updateTodoTitle,
    updateTodoDescription,
    updateTodoEstimatePomodoroCount,
    removeTodo,
  };
};