import React from "react";

function TodoObj({ todo, emogy, priority, isDone, createdAt }) {
  // Priority styles (separated for border + badge)
  const priorityStyles = {
    high: {
      border: "border-l-red-500",
      badge: "bg-red-100 text-red-600",
    },
    medium: {
      border: "border-l-blue-500",
      badge: "bg-blue-100 text-blue-600",
    },
    low: {
      border: "border-l-green-500",
      badge: "bg-green-100 text-green-600",
    },
  };

  const style = priorityStyles[priority?.toLowerCase()] || {
    border: "border-l-gray-400",
    badge: "bg-gray-200 text-gray-700",
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto my-6 p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 border-l-4 ${style.border}`}
    >
      {/* Top Row: Emoji + Todo + Priority Badge */}
      <div className="flex items-center justify-between">
        {/* Emoji + Task */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emogy}</span>
          <p
            className={`text-lg sm:text-xl font-semibold ${
              isDone ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {todo}
          </p>
        </div>

        {/* Priority Badge */}
        <span
          className={`px-4 py-1.5 text-sm font-medium rounded-full ${style.badge}`}
        >
          {priority}
        </span>
      </div>

      {/* Bottom Row: Date */}
      <div className="mt-4 flex justify-end">
        <p className="text-sm text-gray-400 italic">
          {createdAt.slice(0, 16).replace("T", " ")}
        </p>
      </div>
    </div>
  );
}

export default TodoObj;
