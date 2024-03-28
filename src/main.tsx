import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/main.sass";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages routes
import HomeRoute from "./routes/HomeRoute.tsx";
import LoginRoute from "./routes/LoginRoute.tsx";
import RegisterRoute from "./routes/RegisterRoute.tsx";
import FriendsTasksRoute from "./routes/FriendsTasksRoute.tsx";
import PrivateRoute from "./routes/privateRoute.tsx";

//Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomeRoute />
          </PrivateRoute>
        ),
      },
      {
        path: "/friend-tasks/:id",
        element: (
          <PrivateRoute>
            <FriendsTasksRoute />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <LoginRoute /> },
      { path: "/register", element: <RegisterRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
