import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddJob,
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
import { loader as dashLoader } from "./pages/DashboardPage";
import { loader as allJobsLoader } from "./pages/AllJobsPage";
import { action as regAction } from "./pages/RegisterPage";
import { action as loginAction } from "./pages/LoginPage";
import { action as addJobAction } from "./pages/AddJobPage";
import "react-toastify/ReactToastify.css";
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
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: regAction,
      },
      {
        path: "dashboard",
        element: <Dashboard isDark={theme} />,
        loader: dashLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
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
    <ToastContainer position="bottom-right" />
  </React.StrictMode>
);
