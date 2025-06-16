// src/services/todoService.js

import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../api/todoApi';

// 取得全部 todos
export const getTodos = async () => {
  return await fetchTodos();
};

// 取得單筆
export const getTodo = async (id) => {
  return await fetchTodoById(id);
};

// 新增
export const addTodo = async (todo) => {
  return await createTodo(todo);
};

// 更新
export const modifyTodo = async (id, todo) => {
  return await updateTodo(id, todo);
};

// 刪除
export const removeTodo = async (id) => {
  return await deleteTodo(id);
};
