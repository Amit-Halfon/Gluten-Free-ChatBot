import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto slab,serif ",
    allVariants: { color: "white" },
  },
});

const auth_domain = import.meta.env.VITE_DOMAIN;
const auth_clientId = import.meta.env.VITE_CLIENTID;
const auth_audience = import.meta.env.VITE_AUDIENCE;
const auth_redirectUri = import.meta.env.VITE_REDIRECT_URI;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth_domain}
      clientId={auth_clientId}
      authorizationParams={{
        audience: auth_audience,
        redirect_uri: auth_redirectUri,
      }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
