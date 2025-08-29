import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./views/App.jsx";
import NewTodo from "./views/newTodo.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new_todo" element={<NewTodo />} />
    </Routes>
  </BrowserRouter>
);
