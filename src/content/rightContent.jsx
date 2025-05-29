function rightContent() {
  // 番茄鐘完成數量追蹤
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [newTaskInput, setNewTaskInput] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  // ============ 任務管理函數 (Task Management Functions) ============

  // ✅切換主任務的完成狀態
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 切換子任務的完成狀態
  const toggleSubtaskCompletion = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : task
      )
    );
  };

  // 新增任務
  const addNewTask = () => {
    if (newTaskInput.trim()) {
      const newTask = {
        id: Date.now(),
        name: newTaskInput.trim(),
        completed: false,
        subtasks: [],
      };
      setTasks([...tasks, newTask]);
      setNewTaskInput("");
      setShowAddTask(false);
    }
  };

  // 刪除任務
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // 新增子任務
  const addSubtask = (taskId) => {
    const subtaskName = prompt("請輸入子任務名稱：");
    if (subtaskName && subtaskName.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  {
                    id: Date.now(),
                    name: subtaskName.trim(),
                    completed: false,
                  },
                ],
              }
            : task
        )
      );
    }
  };

  // 計算任務中已完成的子任務數量
  const getCompletedSubtasks = (task) => {
    return task.subtasks.filter((subtask) => subtask.completed).length;
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-gray-200">
        {/* 任務區塊標題列 (Tasks Header) */}
        <div className="flex items-center justify-between mb-6">
          {/* 左側 - 標題和新增按鈕 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddTask(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Plus className="text-gray-600" size={24} />
            </button>
            <span className="text-xl font-medium text-gray-900">任務清單</span>
          </div>

          {/* 右側 - 番茄鐘完成進度和功能選單 */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-gray-600">
              {completedPomodoros}/8
            </span>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="text-gray-600" size={20} />
            </button>
          </div>
        </div>

        {/* 新增任務輸入框 */}
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

        {/* 任務列表 (Tasks List) */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {tasks.map((task) => (
            <div key={task.id} className="space-y-2">
              {/* 主任務項目 (Main Task Item) */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-2 border-gray-200 group">
                {/* 任務完成狀態勾選框 */}
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-orange-500 border-orange-500 text-white" // 已完成狀態
                      : "border-gray-300 hover:border-orange-500" // 未完成狀態
                  }`}
                >
                  {task.completed && <Check size={16} />}
                </button>

                {/* 任務名稱輸入框 (可編輯) */}
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => {
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, name: e.target.value } : t
                      )
                    );
                  }}
                  className={`flex-1 bg-transparent font-medium outline-none ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                />

                {/* 任務操作按鈕 */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addSubtask(task.id)}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                    title="新增子任務"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 hover:bg-red-100 rounded text-gray-500 hover:text-red-600"
                    title="刪除任務"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* 子任務列表 (Subtasks List) */}
              {task.subtasks.length > 0 && (
                <div className="ml-9 space-y-2">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-200 group"
                    >
                      {/* 子任務完成狀態勾選框 */}
                      <button
                        onClick={() =>
                          toggleSubtaskCompletion(task.id, subtask.id)
                        }
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          subtask.completed
                            ? "bg-orange-500 border-orange-500 text-white" // 已完成狀態
                            : "border-gray-300 hover:border-orange-500" // 未完成狀態
                        }`}
                      >
                        {subtask.completed && <Check size={12} />}
                      </button>

                      {/* 子任務名稱輸入框 (可編輯) */}
                      <input
                        type="text"
                        value={subtask.name}
                        onChange={(e) => {
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id
                                ? {
                                    ...t,
                                    subtasks: t.subtasks.map((st) =>
                                      st.id === subtask.id
                                        ? { ...st, name: e.target.value }
                                        : st
                                    ),
                                  }
                                : t
                            )
                          );
                        }}
                        className={`flex-1 bg-transparent outline-none ${
                          subtask.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-700"
                        }`}
                      />

                      {/* 刪除子任務按鈕 */}
                      <button
                        onClick={() => {
                          setTasks(
                            tasks.map((t) =>
                              t.id === task.id
                                ? {
                                    ...t,
                                    subtasks: t.subtasks.filter(
                                      (st) => st.id !== subtask.id
                                    ),
                                  }
                                : t
                            )
                          );
                        }}
                        className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="刪除子任務"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 新增任務按鈕 (Add New Task Button) */}
        {!showAddTask && (
          <button
            onClick={() => setShowAddTask(true)}
            className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + 新增任務
          </button>
        )}
      </div>
    </>
  );
}

export default rightContent;
