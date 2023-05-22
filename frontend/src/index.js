import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import env from "./env"; // Import the env.js file

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={env.REACT_APP_DOMAIN}
      clientId={env.REACT_APP_CLIENT_ID}
      redirectUri="http://localhost:3000/articles"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
