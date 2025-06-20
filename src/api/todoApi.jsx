// src/api/todoApi.js
const API_BASE_URL = 'http://localhost:8080/rest/todo';

// 獲取所有待辦事項
export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  const data = await response.json();
  console.log('取得 todos 資料:', data); // 加這行
  return data.payload;
};

// 根據 ID 獲取單個待辦事項
export const fetchTodoById = async (todoId) => {
  const response = await fetch(`${API_BASE_URL}/find/${todoId}`);
  const data = await response.json();
  return data.data;
};

// 創建新的待辦事項
export const createTodo = async (todo) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data.data;
};

// 更新待辦事項
export const updateTodo = async (todoId, todo) => {
  const response = await fetch(`${API_BASE_URL}/put/${todo.todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
};

// 刪除待辦事項
export const deleteTodo = async (todoId) => {
  const response = await fetch(`${API_BASE_URL}/rm/${todoId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};