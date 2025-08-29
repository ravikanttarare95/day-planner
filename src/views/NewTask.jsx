import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function NewTodo() {
  const [newtask, setNewTask] = useState({
    todo: "",
    priority: "",
    emoji: "",
  });
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-amber-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          ✨ New Task
        </h1>

        <div className="space-y-6">
          {/* Task Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter your task..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              onChange={(e) => setNewTask({ ...newtask, todo: e.target.value })}
            />
          </div>

          {/* Priority Select */}
          <div>
            <label
              htmlFor="select-priority"
              className="block text-gray-700 font-semibold mb-2"
            >
              Priority
            </label>
            <select
              name="select-priority"
              id="select-priority"
              defaultValue=""
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              onChange={(e) =>
                setNewTask({ ...newtask, priority: e.target.value })
              }
            >
              <option value="">Select Priority</option>
              <option value="high">🔴 High</option>
              <option value="medium">🔵 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          {/* Emoji Picker */}
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold mb-2">
              Select Emoji
            </label>
            <span
              className="text-2xl pb-2 cursor-pointer hover:scale-120 duration-300"
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
            >
              {newtask.emoji ? newtask.emoji : "🤩"}
            </span>
          </div>

          {/* Add Task Button */}
          <button className="w-full py-3 rounded-lg bg-amber-500 text-white font-semibold text-lg hover:bg-amber-600 transition cursor-pointer">
            + Add Task
          </button>
        </div>
      </div>

      <EmojiPicker
        onEmojiClick={(emojiData) => {
          setNewTask({ ...newtask, emoji: emojiData.emoji });
          setIsEmojiOpen(false);
        }}
        open={isEmojiOpen}
      />
    </div>
  );
}

export default NewTodo;
