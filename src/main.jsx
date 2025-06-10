import React from "react";
import ReactDOM from "react-dom/client";
import AppTop from "./content/TopContent.jsx";
import AppToDo from "./content/TodoList.jsx";
import AppLeft from "./content/leftContent.jsx";
import AppRight from "./content/RightContent.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppTop />
    {/* <AppToDo /> */}
    <AppLeft />
    <AppRight />
  </React.StrictMode>
);
