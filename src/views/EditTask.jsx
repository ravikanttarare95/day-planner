import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import Button from "./../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./../components/Footer";
import { MdTipsAndUpdates } from "react-icons/md";

function EditTodo() {
  const [editTask, setEditTask] = useState({
    todo: "",
    priority: "",
    emoji: "🎯",
  });
  const [error, setError] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const updateTask = async (id) => {
    if (editTask.todo.length === 0) {
      return toast.error("Please enter a task before adding.");
    }
    if (error) {
      return toast.error(error);
    }

    if (!editTask.priority) {
      return toast.error("Please select Priority");
    }

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/todos/${id}`,
      editTask
    );
    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const loadTask = async (id) => {
    if (!id) return;
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/todos/${id}`
    );
    const loadedData = response.data.data;
    setEditTask({
      todo: loadedData.todo,
      priority: loadedData.priority,
      emoji: loadedData.emoji || "🎯",
    });
  };

  useEffect(() => {
    loadTask(id);
  }, [id]);

  useEffect(() => {
    if (editTask.todo.length === 0) {
      setError("");
    } else if (editTask.todo.length < 3) {
      setError("Task must be at least 3 characters long.");
    } else {
      setError("");
    }

    if (editTask.todo.length > 100) {
      setError("Task is too long (max 100 characters).");
    }
  }, [editTask.todo]);

  return (
    <div className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-cyan-50 via-teal-50 to-amber-50 px-4 pt-10 sm:pt-16 transition-colors duration-500">
      <div className="bg-white/90 shadow-2xl rounded-2xl w-full max-w-md p-10">
        <h1 className="text-4xl font-bold text-center text-cyan-800 mb-8 tracking-tight">
          📝 Edit Task {id}
        </h1>

        <div className="space-y-7">
          <div>
            <label className="block text-cyan-700 font-semibold mb-2">
              Task
            </label>
            <input
              type="text"
              placeholder="Enter your task..."
              value={editTask.todo}
              className="w-full px-4 py-2 ring ring-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-cyan-50/50"
              onChange={(e) =>
                setEditTask({ ...editTask, todo: e.target.value })
              }
            />

            <span
              className={`block text-sm text-red-500 transition-all duration-300 ${
                error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            >
              {error || " "}
            </span>
          </div>{" "}
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
              // defaultValue=""
              value={editTask.priority}
              className="w-full px-4 py-2 ring ring-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-cyan-50/50"
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
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
                {editTask.emoji ? editTask.emoji : "🎯"}
              </span>
            </button>
          </div>
          <Button
            btnTitle={
              <div className="flex justify-center items-center gap-2">
                <MdTipsAndUpdates className="text-xl" />{" "}
                <span>Update Task</span>
              </div>
            }
            customStyle="w-full text-lg bg-amber-500 hover:bg-amber-600"
            onBtnClick={() => {
              updateTask(id);
            }}
          />
        </div>
      </div>
      <Toaster />
      <div className="absolute z-50 mt-2 sm:mt-3 left-1/2 -translate-x-1/2 w-[310px] sm:w-[380px] max-w-[90vw]">
        <EmojiPicker
          onEmojiClick={(emojiData) => {
            setEditTask({ ...editTask, emoji: emojiData.emoji });
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

export default EditTodo;
