import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About.jsx";
import NotFoundPage from "./NotFound.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/About", element: <About /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
