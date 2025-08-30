import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoObj from "./../components/TodoObj";
import { useNavigate } from "react-router";
import Button from "./../components/Button";
import logo from "./../../public/logo.png";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-amber-50">
      <header className="py-10 text-center">
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow-sm">
          DayPlanner
        </h1>
        <p className="text-green-600 mt-2 font-medium flex justify-center items-center gap-2">
          Plan your day smartly{" "}
          <span>
            <img src={logo} alt="Logo" className="w-5" />
          </span>
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {toDos.length === 0 ? (
          <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-md bg-gradient-to-br from-blue-50 via-white to-amber-50 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl mb-4">
                📝
              </div>
              <h2 className="text-2xl font-bold text-gray-800">No Tasks Yet</h2>
              <p className="text-gray-500 mt-2">
                You haven’t planned your day. Start by adding your first task!
              </p>

              <Button btnTitle="+ New Task" onBtnClick={goToAddTask} />
            </div>
          </div>
        ) : (
          <div className="relative p-5 scrollbar-hidden h-120 overflow-auto">
            {" "}
            <Button
              btnTitle="+ New Task"
              onBtnClick={goToAddTask}
              customStyle={
                "fixed bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-10 z-50 md:right-10 "
              }
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
    </div>
  );
}

export default App;
