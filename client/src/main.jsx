import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Admin,
  AllJobs,
  Dashboard,
  Error,
  Home,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";
import App from "./App.jsx";
import "./index.css";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const getTheme = () => {
  const theme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", theme);
  return theme;
};

const theme = getTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard isDark={theme} />,
        children: [
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
