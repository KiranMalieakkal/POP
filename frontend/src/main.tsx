import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

if (!domain || !clientId) {
  throw new Error("Auth0 environment variables are missing");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      /*  authorizationParams={{
      redirect_uri: authConfig.redirectUri,
    }} */
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
