// src/hooks/useTodos.js - 添加選中狀態管理
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

    try {
      // 獲取後端返回的完整 todo 物件（包含 todoId）
      const createdTodo = await createTodo(newTodo);
      
      console.log('新建的 todo:', createdTodo); // 除錯用
      
      // 方案 1: 直接將新 todo 加入現有狀態（推薦）
      if (createdTodo && createdTodo.todoId) {
        setTodos(prevTodos => [...prevTodos, createdTodo]);
        
        // 自動選中新建的任務
        setSelectedTodoId(createdTodo.todoId);
        
        return createdTodo; // 返回新建的 todo
      } else {
        // 如果沒有返回 todoId，fallback 到重新獲取所有資料
        console.warn('創建 todo 沒有返回 todoId，重新獲取所有資料');
        await getTodos();
      }
      
    } catch (error) {
      console.error('新增 todo 失敗:', error);
      // 錯誤處理：可以顯示錯誤訊息給用戶
      // 或者嘗試重新獲取資料
      await getTodos();
    }
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
      
      // 如果刪除的是當前選中的任務，清除選中狀態
      if (selectedTodoId === todoId) {
        setSelectedTodoId(null);
      }
      
      await deleteTodo(todoId);
      await getTodos(); // Refresh the list
    } catch (err) {
      console.error('刪除待辦事項失敗:', err);
      setError(err);
    }
  };

  // ===== 獲取當前選中的任務 =====
  const getSelectedTodo = () => {
    return todos.find(todo => todo.todoId === selectedTodoId) || null;
  };

  // ===== 回傳所有狀態和函數 =====
  return {
    todos,
    loading,
    error,
    getSelectedTodo,
    addTodo,
    toggleTodoCompletion,
    updateTodoTitle,
    updateTodoDescription,
    updateTodoEstimatePomodoroCount,
    removeTodo,
  };
};