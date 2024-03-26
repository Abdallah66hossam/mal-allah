// index.jsx
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AlertProvider } from "/src/layout/context/AlertContext.jsx"; // Import AlertProvider
import "./index.scss";
import HomePage from "./pages/HomePage.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Login from "./layout/auth/components/Login.jsx";
import Register from "./layout/auth/components/register.jsx";
import Project from "./layout/auth/components/Project.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path:"/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/create-project",
        element: <Project />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AlertProvider> {/* Wrap the RouterProvider with AlertProvider */}
    <RouterProvider router={router} />
  </AlertProvider>
);
