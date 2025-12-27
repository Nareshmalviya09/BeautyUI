import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="111463746180-j6gdtu34vtut9nda7mjv0s36plhvkiu7.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
