import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "./../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./../components/Footer";
import { TbCopyPlusFilled } from "react-icons/tb";

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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-amber-50 px-4">
      <div className="bg-white/90 shadow-2xl rounded-2xl w-full max-w-md p-10">
        <h1 className="text-4xl font-bold text-center text-cyan-800 mb-8 tracking-tight">
          📝 New Task
        </h1>

        <div className="space-y-7">
          <div>
            <label
              className="block text-cyan-700 font-semibold mb-2"
              htmlFor="input-task"
            >
              Task
            </label>
            <input
              type="text"
              id="input-task"
              placeholder="Enter your task..."
              className="w-full px-4 py-2 ring ring-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-cyan-50/50"
              onChange={(e) => setNewTask({ ...newtask, todo: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="select-priority"
              className="block text-cyan-700 font-semibold mb-2"
            >
              Priority
            </label>
            <select
              name="select-priority"
              id="select-priority"
              defaultValue=""
              className="w-full px-4 py-2 ring ring-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-cyan-50/50"
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

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="flex items-center justify-center w-12 h-12 pb-1 text-3xl border border-cyan-300 rounded-lg hover:bg-cyan-100 group transition cursor-pointer bg-cyan-50"
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
            >
              <span className="group-hover:scale-110 duration-300">
                {newtask.emoji ? newtask.emoji : "🎯"}
              </span>
            </button>
          </div>

          <Button
            btnTitle={
              <div className="flex justify-center items-center gap-2">
                {" "}
                <TbCopyPlusFilled className="text-xl" />
                <span>Add Task</span>
              </div>
            }
            customStyle="w-full text-lg bg-amber-500 hover:bg-amber-600"
            onBtnClick={addTask}
          />
        </div>
      </div>
      <Toaster />
      <div className="absolute z-50 mt-2 sm:mt-3 left-1/2 -translate-x-1/2 w-[310px] sm:w-[380px] max-w-[90vw]">
        <EmojiPicker
          onEmojiClick={(emojiData) => {
            setNewTask({ ...newtask, emoji: emojiData.emoji });
            setIsEmojiOpen(false);
          }}
          open={isEmojiOpen}
          width="100%"
        />
      </div>
      <Footer />
    </div>
  );
}

export default NewTodo;
