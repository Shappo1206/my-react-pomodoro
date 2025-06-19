// src/api/todoApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/rest/todo';

// 確保 fetchTodos 函數返回正確格式
export const fetchTodos = async () => {
  try {
    const response = await fetch('http://localhost:8080/rest/todo/find');
    const data = await response.json();
    
    // 請確認這裡返回的格式
    return data; // 或者 return data.payload; 或者 return data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTodoById = async (todoId) => {
  const response = await axios.get(`${API_BASE_URL}/find/${todoId}`);
  return response.data.data;
};

export const createTodo = async (todo) => {
  console.log(todo);
  const response = await axios.post(`${API_BASE_URL}/post`, todo);
  return response.data.data;
};

export const updateTodo = async (todoId, todo) => {
  const response = await axios.put(`${API_BASE_URL}/put/${todo.todoId}`, todo);
  return response.data;
};

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(`${API_BASE_URL}/rm/${todoId}`);
  return response.data;
};