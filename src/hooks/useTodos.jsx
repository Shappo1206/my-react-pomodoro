// src/hooks/useTodos.js - 除錯版本
import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

      const getTodos = async () => {
      try {
        setError(null);
        console.log('開始獲取待辦事項...');
        
        const response = await fetchTodos();
        console.log('原始 API 回應:', response);
        console.log('回應類型:', typeof response);
        console.log('是否為陣列:', Array.isArray(response));
        
        // 檢查不同的回應格式
        let data;
        if (response && response.data && Array.isArray(response.data)) {
          console.log('使用 response.data');
          data = response.data;
        } else if (response && response.payload && Array.isArray(response.payload)) {
          console.log('使用 response.payload');
          data = response.payload;
        } else if (response && response.result && Array.isArray(response.result)) {
          console.log('使用 response.result');
          data = response.result;
        } else if (Array.isArray(response)) {
          console.log('直接使用 response');
          data = response;
        } else {
          console.log('未知格式，設為空陣列');
          console.log('Response keys:', Object.keys(response || {}));
          data = [];
        }
        
        console.log('處理後的資料:', data);
        console.log('資料長度:', data.length);
        
        if (data.length > 0) {
          console.log('第一個項目:', data[0]);
        }
        
        const formattedTodos = data.map((todo, index) => {
          console.log(`格式化第 ${index} 個項目:`, todo);
          return {
            ...todo,
            id: todo.id || todo._id || Math.random().toString(36).substr(2, 9),
            name: todo.name || todo.title || todo.text || `待辦事項 ${index + 1}`,
            completed: Boolean(todo.completed || todo.done || todo.finished),
            subtodos: Array.isArray(todo.subtodos) ? todo.subtodos.map((subtodo, subIndex) => ({
              ...subtodo,
              id: subtodo.id || subtodo._id || Math.random().toString(36).substr(2, 9),
              name: subtodo.name || subtodo.title || subtodo.text || `子任務 ${subIndex + 1}`,
              completed: Boolean(subtodo.completed || subtodo.done || subtodo.finished)
            })) : (Array.isArray(todo.children) ? todo.children.map((subtodo, subIndex) => ({
              ...subtodo,
              id: subtodo.id || subtodo._id || Math.random().toString(36).substr(2, 9),
              name: subtodo.name || subtodo.title || subtodo.text || `子任務 ${subIndex + 1}`,
              completed: Boolean(subtodo.completed || subtodo.done || subtodo.finished)
            })) : [])
          };
        });
        
        console.log('最終格式化的待辦事項:', formattedTodos);
        setTodos(formattedTodos);
        
      } catch (err) {
        console.error('獲取待辦事項失敗:', err);
        setError(err);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };


  // 初始化讀取
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (newTodoName) => {
    if (!newTodoName || newTodoName.trim() === '') {
      return;
    }

    try {
      setError(null);
      const newTodo = { 
        title: newTodoName.trim(), 
        completed: false, 
        subtodos: [],
      };
      
      const response = await createTodo(newTodo);
      console.log('創建待辦事項回應:', response);
      getTodos();
      
      // 處理創建回應
      let createdTodo;
      if (response && response.data) {
        createdTodo = response.data;
      } else if (response && response.payload) {
        createdTodo = response.payload;
      } else {
        createdTodo = response;
      }
      
      // formatted不知道在幹嘛
      // 確保有必要的屬性
      // const formattedTodo = {
      //   ...createdTodo,
      //   id: createdTodo.id || createdTodo._id || Math.random().toString(36).substr(2, 9),
      //   title: createdTodo.name || createdTodo.title || newTodoName.trim(),
      //   completed: Boolean(createdTodo.completed),
      //   subtodos: Array.isArray(createdTodo.subtodos) ? createdTodo.subtodos : []
      // };
      
      //setTodos((prevTodos) => [...prevTodos, formattedTodo]);
    } catch (err) {
      console.error('新增待辦事項失敗:', err);
      setError(err);
    }
  };

  const toggleTodoCompletion = async (todoId) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;

    const newCompletedState = !todoToUpdate.completed;
    
    // 樂觀更新
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: newCompletedState } : todo
      )
    );

    try {
      setError(null);
      await updateTodo(todoId, { 
        ...todoToUpdate, 
        completed: newCompletedState 
      });
    } catch (err) {
      console.error('更新待辦事項狀態失敗:', err);
      setError(err);
      // 回滾更新
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: todoToUpdate.completed } : todo
        )
      );
    }
  };

  const toggleSubtodoCompletion = async (todoId, subtodoId) => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;
    
    const subtodoToUpdate = todoToUpdate.subtodos.find(subtodo => subtodo.id === subtodoId);
    if (!subtodoToUpdate) return;

    const newCompletedState = !subtodoToUpdate.completed;

    // 樂觀更新
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtodos: todo.subtodos.map((subtodo) =>
                subtodo.id === subtodoId
                  ? { ...subtodo, completed: newCompletedState }
                  : subtodo
              ),
            }
          : todo
      )
    );

    try {
      setError(null);
      const updatedSubtodos = todoToUpdate.subtodos.map(subtodo =>
        subtodo.id === subtodoId 
          ? { ...subtodo, completed: newCompletedState } 
          : subtodo
      );
      
      await updateTodo(todoId, { 
        ...todoToUpdate, 
        subtodos: updatedSubtodos 
      });
    } catch (err) {
      console.error('更新子任務狀態失敗:', err);
      setError(err);
      // 回滾更新
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtodos: todo.subtodos.map((subtodo) =>
                  subtodo.id === subtodoId
                    ? { ...subtodo, completed: subtodoToUpdate.completed }
                    : subtodo
                ),
              }
            : todo
        )
      );
    }
  };

  const updateTodoName = async (todoId, newName) => {
    if (!newName || newName.trim() === '') {
      return;
    }

    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;

    const trimmedName = newName.trim();
    const originalName = todoToUpdate.name;

    // 樂觀更新
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, name: trimmedName } : todo
      )
    );

    try {
      setError(null);
      await updateTodo(todoId, { 
        ...todoToUpdate, 
        name: trimmedName 
      });
    } catch (err) {
      console.error('更新待辦事項名稱失敗:', err);
      setError(err);
      // 回滾更新
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, name: originalName } : todo
        )
      );
    }
  };

  const updateSubtodoName = async (todoId, subtodoId, newName) => {
    if (!newName || newName.trim() === '') {
      return;
    }

    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) return;
    
    const subtodoToUpdate = todoToUpdate.subtodos.find(subtodo => subtodo.id === subtodoId);
    if (!subtodoToUpdate) return;

    const trimmedName = newName.trim();
    const originalName = subtodoToUpdate.name;

    // 樂觀更新
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtodos: todo.subtodos.map((subtodo) =>
                subtodo.id === subtodoId
                  ? { ...subtodo, name: trimmedName }
                  : subtodo
              ),
            }
          : todo
      )
    );

    try {
      setError(null);
      const updatedSubtodos = todoToUpdate.subtodos.map(subtodo =>
        subtodo.id === subtodoId 
          ? { ...subtodo, name: trimmedName } 
          : subtodo
      );
      
      await updateTodo(todoId, { 
        ...todoToUpdate, 
        subtodos: updatedSubtodos 
      });
    } catch (err) {
      console.error('更新子任務名稱失敗:', err);
      setError(err);
      // 回滾更新
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtodos: todo.subtodos.map((subtodo) =>
                  subtodo.id === subtodoId
                    ? { ...subtodo, name: originalName }
                    : subtodo
                ),
              }
            : todo
        )
      );
    }
  };

  const getCompletedSubtodos = (todo) => {
    if (!todo || !Array.isArray(todo.subtodos)) {
      return 0;
    }
    return todo.subtodos.filter((subtodo) => subtodo.completed).length;
  };

  const getTotalSubtodos = (todo) => {
    if (!todo || !Array.isArray(todo.subtodos)) {
      return 0;
    }
    return todo.subtodos.length;
  };

  // 除錯用 - 在 console 中輸出當前狀態
  useEffect(() => {
    console.log('當前 todos 狀態:', todos);
    console.log('loading:', loading);
    console.log('error:', error);
  }, [todos, loading, error]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodoCompletion,
    toggleSubtodoCompletion,
    updateTodoName,
    updateSubtodoName,
    getCompletedSubtodos,
    getTotalSubtodos,
  };
};