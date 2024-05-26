import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Tentang from "./pages/Tentang.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Beranda from "./pages/Beranda.jsx";
import LoginMiddleware from "./middleware/LoginMiddleware.jsx";
import Ubah from "./pages/Ubah.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Tentang />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: (
          <LoginMiddleware>
            <Beranda />
          </LoginMiddleware>
        ),
      },
      {
        path: "/ubah/:id",
        element: (
          <LoginMiddleware>
            <Ubah />
          </LoginMiddleware>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
