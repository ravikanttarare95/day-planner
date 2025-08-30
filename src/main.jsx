import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./views/App.jsx";
import NewTask from "./views/NewTask.jsx";
import EditTask from "./views/EditTask.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/new_task" element={<NewTask />} />
      <Route path="/edit_task/:id" element={<EditTask />} />
    </Routes>
  </BrowserRouter>
);
