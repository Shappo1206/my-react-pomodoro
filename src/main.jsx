// src/Main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css"; // 修正引入 index.css 為小寫
import App from "./App.jsx"; // 修正引入 App.jsx

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);