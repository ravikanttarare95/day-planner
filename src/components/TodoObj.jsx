import React from "react";

function TodoObj({ todo, priority, isDone, createdAt }) {
  return (
    <div className="border m-5 py-1 px-3 rounded">
      <p>{todo}</p>
      <p>{priority}</p>
      <p>{isDone}</p>
      <p>{createdAt}</p>
    </div>
  );
}

export default TodoObj;
