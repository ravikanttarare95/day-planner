import React from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function TodoObj({ todo, emoji, priority, isDone, createdAt, id, loadToDos }) {
  const priorityStyles = {
    high: {
      badge: "bg-red-100 text-red-600",
    },
    medium: {
      badge: "bg-blue-100 text-blue-600",
    },
    low: {
      badge: "bg-green-100 text-green-600",
    },
  };

  const style = priorityStyles[priority?.toLowerCase()] || {
    badge: "bg-gray-200 text-gray-700",
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/todos/${id}`
    );
    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        loadToDos();
      }, 1000);
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
      className={`relative w-full max-w-2xl mx-auto mt-6 p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-400 border-l-5`}
    >
      <div className="flex items-center justify-between">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => {
            markToDone(id, e.target.checked);
          }}
        />
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <p
            className={`text-lg sm:text-xl font-semibold ${
              isDone ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {todo}
          </p>
        </div>
        <Trash
          className="ml-auto mr-2 text-red-500 cursor-pointer bg-red-50 rounded p-1"
          onClick={() => {
            deleteTask(id);
          }}
        />

        <span
          className={`px-4 py-1.5 text-sm font-medium rounded-full capitalize ${style.badge}`}
        >
          {priority}
        </span>
      </div>
      <div className="mt-4 flex justify-end">
        <p className="text-sm text-gray-400 italic">
          {createdAt.slice(0, 16).replace("T", " ")}
        </p>
      </div>{" "}
      <Toaster />
    </div>
  );
}

export default TodoObj;
