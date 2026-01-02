import React from "react";
import ReactDOM from "react-dom/client";
import { PlaylistProvider } from "./context/PlaylistContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlaylistProvider>
          <PlayerProvider>
             <App />
          </PlayerProvider>
         </PlaylistProvider>
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);
