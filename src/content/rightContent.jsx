import React, { useState, useEffect } from "react";
import axios from "axios";
import { Check, Plus, MoreHorizontal, X } from "lucide-react";

const API_URL = "http://localhost:8080";

function RightContent() {
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // 撈取主任務，並自動塞入假子任務
  useEffect(() => {
    axios
      .get(`${API_URL}/api/todos`)
      .then((response) => {
        const todoArray = response.data.data;
        const convertedTasks = todoArray.map((todo) => ({
          id: todo.todo_id,
          name: todo.title,
          description: todo.description,
          completed: todo.completed === 1,
          estimatePomodoro: todo.estimate_pomodoro,
          // 🔥 假資料塞入兩個子任務
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

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleSubtaskCompletion = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            ),
          };
        }
        return task;
      })
    );
  };

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
    <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddTask(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="text-gray-600" size={24} />
          </button>
          <span className="text-xl font-medium text-gray-900">任務清單</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-gray-600">
            {tasks.filter((task) => task.completed).length}/{tasks.length}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="text-gray-600" size={20} />
          </button>
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
            <button
              onClick={addNewTask}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              新增
            </button>
            <button
              onClick={() => {
                setShowAddTask(false);
                setNewTaskInput("");
              }}
              className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200 group">
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-300 hover:border-orange-500"
                }`}
              >
                {task.completed && <Check size={16} />}
              </button>

              <div className="flex-1">
                <div
                  className={`font-medium ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.name}
                </div>
                <div className="text-sm text-gray-500">
                  {task.description}（預估番茄：{task.estimatePomodoro}）
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>

            {/* 🔥 子任務區塊 */}
            {task.subtasks.length > 0 && (
              <div className="ml-9 space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <button
                      onClick={() =>
                        toggleSubtaskCompletion(task.id, subtask.id)
                      }
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        subtask.completed
                          ? "bg-orange-500 border-orange-500 text-white"
                          : "border-gray-300 hover:border-orange-500"
                      }`}
                    >
                      {subtask.completed && <Check size={12} />}
                    </button>
                    <div
                      className={`flex-1 ${
                        subtask.completed
                          ? "text-gray-500 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {subtask.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showAddTask && (
        <button
          onClick={() => setShowAddTask(true)}
          className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
        >
          + 新增任務
        </button>
      )}
    </div>
  );
}

export default RightContent;
