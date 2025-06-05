import { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);

  //網路請求
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((response) => {
        console.log("後端回傳：", response.data);
        setTodos(response.data.data); // ← 注意：你是包在 payload 裡！
      })
      .catch((error) => {
        console.error("查詢失敗：", error);
      });
  }, []);

  return (
    <div>
      <h2>代辦事項</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todoId}>
            <strong>{todo.title}</strong>: {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
