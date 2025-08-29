import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoObj from "./../components/TodoObj";

function App() {
  const [toDos, setToDos] = useState([]);

  const loadToDos = async () => {
    const response = await axios.get("http://localhost:8080/todos");
    setToDos(response.data.data);
  };

  useEffect(() => {
    loadToDos();
  }, []);
  return (
    // blue / teal / amber
    <div>
      <h1 className="text-5xl text-cyan-800 text-center my-5 font-bold">
        DayPlanner
      </h1>
      {toDos.map((toDoObj) => {
        const { id, todo, priority, isDone, createdAt } = toDoObj;
        return (
          <div key={id}>
            <TodoObj
              todo={todo}
              priority={priority}
              isDone={isDone}
              createdAt={createdAt}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
