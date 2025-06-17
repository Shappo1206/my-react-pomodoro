import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import { Plus, X } from "lucide-react";

//URL 不要散落各地，統一集中在常數。
const API_URL = "http://localhost:8080";

function RightContent() {
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/todos`)
      .then((response) => {
        const todoArray = response.data.data;
        const convertedTasks = todoArray.map((todo) => ({
          id: todo.todo_id,
          name: todo.title,
          description: todo.description,
          completed: todo.completed === 1,
          estimatePomodoro: todo.estimate_pomodoro,
          subtasks: [
            { id: `${todo.todo_id}-1`, name: "項目1", completed: false },
            { id: `${todo.todo_id}-2`, name: "項目2", completed: false },
          ],
        }));
        setTasks(convertedTasks);
      })
      .catch((error) => {
        console.error("撈取後端資料失敗：", error);
      });
  }, []);

  const addNewTask = () => {
    if (newTaskInput.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskInput.trim(),
        description: "",
        completed: false,
        estimatePomodoro: 0,
        subtasks: [
          { id: `${Date.now()}-1`, name: "項目1", completed: false },
          { id: `${Date.now()}-2`, name: "項目2", completed: false },
        ],
      };
      setTasks([...tasks, newTask]);
      setNewTaskInput("");
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    //右側最大版面的div
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowAddTask(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Plus className="text-gray-600" size={24} />
          </button>
          <span className="text-xl font-medium text-gray-900">任務清單</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-gray-600">
            {tasks.filter((task) => task.completed).length}/{tasks.length}
          </span>
        </div>
      </div>

      {showAddTask && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="輸入新任務..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-orange-500"
              onKeyPress={(e) => e.key === "Enter" && addNewTask()}
              autoFocus
            />
            <button onClick={addNewTask} className="px-4 py-2 bg-orange-500 text-white rounded-lg">新增</button>
            <button onClick={() => { setShowAddTask(false); setNewTaskInput(""); }} className="px-3 py-2 text-gray-500"><X size={20} /></button>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
        ))}
      </div>

      {!showAddTask && (
        <button onClick={() => setShowAddTask(true)} className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
          + 新增任務
        </button>
      )}
    </div>
  );
}

export default RightContent;
