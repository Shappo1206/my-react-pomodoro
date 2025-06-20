import { MoreVertical } from "lucide-react";
import { UpdateTodoModal } from "./UpdateTodoModal";
import { useState } from "react";

function TodoItem({ todo }) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleUpdate = (todoId, newTitle) => {
    updateTodoTitle(todoId, newTitle); // 你原本寫的 async 更新函數
  };

  return (
    <div className="relative bg-gray-50 p-4 rounded-lg border flex justify-between items-start">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.description}</p>
      </div>

      <div className="flex items-center space-x-2">
        <span>🍅 0 / 0</span>
        <button title="刪除">✕</button>
        <button
          onClick={() => setIsUpdateOpen(true)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="更新"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <UpdateTodoModal
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        todo={todo}
        onSave={handleUpdate}
      />
    </div>
  );
}
