import React from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function TodoObj({ todo, emoji, priority, isDone, createdAt, id, loadToDos }) {
  const priorityStyles = {
    high: {
      badge: "bg-amber-100 text-amber-700 border border-amber-200",
      border: "border-l-4 border-l-amber-500",
    },
    medium: {
      badge: "bg-cyan-100 text-cyan-700 border border-cyan-200",
      border: "border-l-4 border-l-cyan-500",
    },
    low: {
      badge: "bg-green-100 text-green-700 border border-green-200",
      border: "border-l-4 border-l-green-500",
    },
  };

  const style = priorityStyles[priority?.toLowerCase()] || {
    badge: "bg-gray-200 text-gray-700",
    border: "border-l-4 border-l-gray-300",
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/todos/${id}`
    );
    if (response) {
      toast.success(response.data.message);
      loadToDos();
    }
  };

  const markToDone = async (id, isDone) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/todos/${id}/status`,
      { isDone }
    );
    response && loadToDos();
  };

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto mt-4 p-5 rounded-xl shadow-md hover:shadow-lg transition ${style.border} bg-gradient-to-tl from-cyan-50 via-white to-white`}
    >
      <div className="flex items-center justify-between gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => markToDone(id, e.target.checked)}
          className="w-5 h-5 accent-cyan-600 cursor-pointer"
        />
        <div className="flex-1 flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <p
            className={`text-lg font-semibold ${
              isDone ? "line-through text-gray-400" : "text-cyan-900"
            }`}
          >
            {todo}
          </p>
        </div>
        <Trash
          className="text-red-500 cursor-pointer bg-red-50 rounded p-1 hover:bg-red-100 transition"
          onClick={() => deleteTask(id)}
        />
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${style.badge}`}
        >
          {priority}
        </span>
        <p className="text-sm text-gray-400 italic">
          {createdAt.slice(0, 16).replace("T", " ")}
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default TodoObj;
