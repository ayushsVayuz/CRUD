import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./store/Store.js";
import App from "./App.jsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <div className="font-cambria">
        <App />
      </div>
    </Provider>
  );
} 
