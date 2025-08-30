import React from "react";
import { Trash, SquarePen } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router";

function TodoObj({ todo, emoji, priority, isDone, createdAt, id, loadToDos }) {
  const priorityStyles = {
    high: {
      badge: "bg-amber-100 text-amber-700 border border-amber-200",
      border: "border border-cyan-400",
    },
    medium: {
      badge: "bg-cyan-100 text-cyan-700 border border-cyan-200",
      border: "border border-cyan-400",
    },
    low: {
      badge: "bg-green-100 text-green-700 border border-green-200",
      border: "border border-cyan-400",
    },
  };

  const style = priorityStyles[priority?.toLowerCase()] || {
    badge: "bg-gray-200 text-gray-700",
    border: "border border-gray-300",
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
      className={`relative w-full mx-auto mt-4 py-3 px-4 rounded-md sm:rounded-xl shadow-md hover:shadow-lg transition ${style.border} bg-gradient-to-tl from-cyan-50 via-white to-white`}
    >
      <div className=" flex gap-2 sm:gap-3 justify-end -mt-2 -mr-2">
        {
          <Link to={`/edit_task/${id}`}>
            <SquarePen className="text-gray-600 cursor-pointer w-4 sm:w-5 transition opacity-80 hover:opacity-100" />
          </Link>
        }
        <Trash
          className="text-red-600 cursor-pointer w-4 sm:w-5 transition opacity-70 hover:opacity-100"
          onClick={() => deleteTask(id)}
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => markToDone(id, e.target.checked)}
          className="min-w-5 min-h-5 accent-cyan-600 cursor-pointer"
        />

        <div className="flex items-center gap-2 sm:gap-3 min-w-0 ">
          <span className="text-2xl sm:text-3xl">{emoji}</span>
          <p
            className={`text-base sm:text-lg font-semibold ${
              isDone ? "line-through text-gray-400" : "text-cyan-900"
            }`}
          >
            {todo}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-3 gap-2">
        <p
          className={`px-3 py-0.5 text-xs sm:text-sm font-medium rounded-full capitalize ${style.badge}`}
        >
          {priority}
        </p>
        <p className="text-xs sm:text-sm text-gray-400 italic">
          {createdAt.slice(0, 16).replace("T", " ")}
        </p>
      </div>

      <Toaster />
    </div>
  );
}

export default TodoObj;
