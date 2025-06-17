// src/api/todoApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/rest/todo';

export const fetchTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data.data;
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