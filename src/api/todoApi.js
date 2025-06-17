// src/api/todoApi.js

import axios from 'axios';

// 你後端的 Base URL (端口請依照你的實際後端設定)
const API_BASE_URL = 'http://localhost:8080/rest/todo';

export const fetchTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.data;  // 注意你回傳格式 ApiResponse 裡的 data
};

export const fetchTodoById = async (todoId) => {
  const response = await axios.get(`${API_BASE_URL}/${todoId}`);
  return response.data.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${API_BASE_URL}`, todo);
  return response.data.data;
};

export const updateTodo = async (todoId, todo) => {
  const response = await axios.put(`${API_BASE_URL}/put/${todoId}`, todo);
  return response.data;
};

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(`${API_BASE_URL}/rm/${todoId}`);
  return response.data;
};
