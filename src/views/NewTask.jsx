import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "./../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

function NewTodo() {
  const [newtask, setNewTask] = useState({
    todo: "",
    priority: "",
    emoji: "🎯",
  });
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const navigate = useNavigate();

  const addTask = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/todos`,
      newtask
    );
    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-amber-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          📝 New Task
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
          <div className="relative flex flex-col gap-2">
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 pb-1 text-3xl border rounded-lg hover:bg-gray-100 group transition cursor-pointer"
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
            >
              <span className="group-hover:scale-110 duration-300">
                {newtask.emoji ? newtask.emoji : "🎯"}
              </span>
            </button>
            <div className="absolute z-50 left-14 -top-72">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setNewTask({ ...newtask, emoji: emojiData.emoji });
                  setIsEmojiOpen(false);
                }}
                open={isEmojiOpen}
              />
            </div>
          </div>

          {/* Add Task Button */}
          <Button
            btnTitle="+ Add Task"
            customStyle={"w-full text-lg"}
            onBtnClick={addTask}
          />
        </div>
      </div>{" "}
      <Toaster />
    </div>
  );
}

export default NewTodo;
