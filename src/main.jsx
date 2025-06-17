import React from "react";
import ReactDOM from "react-dom/client"; //React’s library to talk to web browsers (React DOM)
import HomePage from "./pages/HomePage";  // 檔名請保持大小寫一致 //the component you created in "pages"
import "./styles/index.css";  // 你實際有三個 css, 先引入主要 index.css //the styles for your components

//This .jsx is the bridge between the component you created and the web browser.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
