import React, { useState } from "react";

export default function AddTodoButton({ onAddTodo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimate, setEstimate] = useState("");

  const handleSubmit = () => {
    if (title.trim() !== "") {
      const newTodo = {
        title: title.trim(),
        description: description.trim(),
        estimatedPomodoros: estimate,
      };
      onAddTodo(newTodo);
      setTitle("");
      setDescription("");
      setEstimate(1);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {/* 新增按鈕 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mt-6 p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        + 新增待辦事項
      </button>

      {/* 自訂 Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">新增待辦事項</h2>

            {/* 待辦事項名稱 */}
            <input
              type="text"
              placeholder="待辦事項名稱"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-3"
            />

            {/* 待辦事項描述 */}
            <textarea
              placeholder="待辦事項描述（選填）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-3 resize-none"
              rows={3}
            />

            {/* 預估番茄鐘數量 */}
            <input
              type="number"
              min={1}
              value={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2 mb-4"
              placeholder="預估番茄鐘數量(請輸入數字)"
            />

            {/* 按鈕區 */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTitle("");
                  setDescription("");
                  setEstimate(1);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
