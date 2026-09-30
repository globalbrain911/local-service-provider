import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Services from "./Services.jsx";
import NotFoundPage from "./NotFound.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Dashboard from "./Dashboard.jsx";
import SellerPage from "./SellerPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Services", element: <Services /> },
  { path: "/Login", element: <Login /> },
  { path: "/Signup", element: <Signup /> },
  { path: "/SellerPage", element: <SellerPage /> },
  { path: "/Dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
