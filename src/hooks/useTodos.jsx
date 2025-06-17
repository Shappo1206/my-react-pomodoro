// src/hooks/useTodos.js
import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初始化讀取
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        const formattedTodos = data.map(todo => ({
          ...todo,
          id: todo.id || Math.random().toString(36).substr(2, 9),
          subtodos: todo.subtodos ? todo.subtodos.map(subtodo => ({
            ...subtodo,
            id: subtodo.id || Math.random().toString(36).substr(2, 9),
          })) : []
        }));
        setTodos(formattedTodos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  const addTodo = async (newTodoName) => {
    try {
      const newTodo = { name: newTodoName, completed: false, subtodos: [] };
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (err) {
      setError(err);
    }
  };

  const toggleTodoCompletion = async (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        await updateTodo(todoId, { ...todoToUpdate, completed: !todoToUpdate.completed });
      }
    } catch (err) {
      setError(err);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const toggleSubtodoCompletion = async (todoId, subtodoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtodos: todo.subtodos.map((subtodo) =>
                subtodo.id === subtodoId
                  ? { ...subtodo, completed: !subtodo.completed }
                  : subtodo
              ),
            }
          : todo
      )
    );
    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        const updatedSubtodos = todoToUpdate.subtodos.map(subtodo =>
            subtodo.id === subtodoId ? { ...subtodo, name: subtodo.name, completed: !subtodo.completed } : subtodo // Fix: ensure name is preserved
        );
        await updateTodo(todoId, { ...todoToUpdate, subtodos: updatedSubtodos });
      }
    } catch (err) {
      setError(err);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtodos: todo.subtodos.map((subtodo) =>
                  subtodo.id === subtodoId
                    ? { ...subtodo, completed: !subtodo.completed } // Rollback based on original state
                    : subtodo
                ),
              }
            : todo
        )
      );
    }
  };

  const updateTodoName = async (todoId, newName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, name: newName } : todo
      )
    );
    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        await updateTodo(todoId, { ...todoToUpdate, name: newName });
      }
    } catch (err) {
      setError(err);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, name: todoToUpdate.name } : todo
        )
      );
    }
  };

  const updateSubtodoName = async (todoId, subtodoId, newName) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtodos: todo.subtodos.map((subtodo) =>
                subtodo.id === subtodoId
                  ? { ...subtodo, name: newName }
                  : subtodo
              ),
            }
          : todo
      )
    );
    try {
      const todoToUpdate = todos.find(todo => todo.id === todoId);
      if (todoToUpdate) {
        const updatedSubtodos = todoToUpdate.subtodos.map(subtodo =>
            subtodo.id === subtodoId ? { ...subtodo, name: newName } : subtodo
        );
        await updateTodo(todoId, { ...todoToUpdate, subtodos: updatedSubtodos });
      }
    } catch (err) {
      setError(err);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId
            ? {
                ...todo,
                subtodos: todo.subtodos.map((subtodo) =>
                  subtodo.id === subtodoId
                    ? { ...subtodo, name: subtodo.name }
                    : subtodo
                ),
              }
            : todo
        )
      );
    }
  };

  const getCompletedSubtodos = (todo) => {
    return todo.subtodos.filter((subtodo) => subtodo.completed).length;
  };

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
  };
};
