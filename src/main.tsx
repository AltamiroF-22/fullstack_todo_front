import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/main.sass";
import AuthProvider from "./context/AuthProvider.tsx";
// import ProtectedRoute from "./context/ProtectedRoute.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages routes
import HomeRoute from "./routes/HomeRoute.tsx";
import LoginRoute from "./routes/LoginRoute.tsx";
import RegisterRoute from "./routes/RegisterRoute.tsx";

//Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "/",
      //   element: (
      //     <ProtectedRoute>
      //       <HomeRoute />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/",
        element: <HomeRoute />,
      },
      { path: "/login", element: <LoginRoute /> },
      { path: "/register", element: <RegisterRoute /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={false}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
