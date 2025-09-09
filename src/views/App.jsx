import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoObj from "./../components/TodoObj";
import { useNavigate } from "react-router";
import Button from "./../components/Button";
import logo from "./../../public/logo.png";
import Footer from "./../components/Footer";
import { TbCopyPlusFilled } from "react-icons/tb";
import GoalImg from "./../assets/goal.png";

function App() {
  const navigate = useNavigate();
  const [toDos, setToDos] = useState([]);

  const loadToDos = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/todos`);
    setToDos(response.data.data);
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const goToAddTask = () => {
    navigate("/new_task");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-white to-amber-50">
      <header className="py-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-cyan-900 drop-shadow-sm tracking-tight">
          DayPlanner
        </h1>
        <p className="text-gray-700 mt-3 font-medium flex justify-center items-center gap-3 text-md sm:text-lg">
          Plan your day smartly
          <img
            src={logo}
            alt="Logo"
            className="w-6 h-6 sm:w-8 sm:h-8 inline-block drop-shadow-sm"
          />
        </p>
      </header>

      <main className=" w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {toDos.length === 0 ? (
          <div className="max-w-md mx-auto mt-5 p-10 rounded-2xl shadow-lg bg-gradient-to-br from-cyan-50 via-white to-amber-50 text-center border border-cyan-100">
            <div className="flex flex-col items-center">
              <div className="w-35 mb-2">
                <img src={GoalImg} alt="Goal Image" />
              </div>

              <h2 className="text-3xl font-bold text-cyan-800">No Tasks Yet</h2>
              <p className="text-gray-500 mt-2">
                You haven’t planned your day. Start by adding your first task!
              </p>
              <Button
                btnTitle={
                  <div className="flex justify-center items-center gap-2">
                    {" "}
                    <TbCopyPlusFilled className="text-2xl" />
                    <span>Create New Task</span>
                  </div>
                }
                onBtnClick={goToAddTask}
                customStyle="bg-amber-500 hover:bg-amber-600"
              />
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl bg-white shadow-2xl border border-cyan-100 p-5 sm:p-10 h-[480px] overflow-y-auto">
            <Button
              btnTitle={
                <div className="flex justify-center items-center gap-2">
                  {" "}
                  <TbCopyPlusFilled className="text-3xl sm:text-2xl" />
                  <span className="hidden sm:block">New Task</span>
                </div>
              }
              onBtnClick={goToAddTask}
              customStyle="fixed bottom-17 right-4 sm:right-8 z-50 text-lg px-2! sm:px-5!"
            />
            {toDos.map((toDoObj) => {
              const { id, emoji, todo, priority, isDone, createdAt } = toDoObj;
              return (
                <TodoObj
                  key={id}
                  todo={todo}
                  emoji={emoji}
                  priority={priority}
                  isDone={isDone}
                  createdAt={createdAt}
                  id={id}
                  loadToDos={loadToDos}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
