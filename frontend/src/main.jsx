import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { ThemeContextProvider } from "./context/theme.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
