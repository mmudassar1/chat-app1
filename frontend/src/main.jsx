import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* <SocketContextProvider> */}
          <App />
        {/* </SocketContextProvider> */}
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);