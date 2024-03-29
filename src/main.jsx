// index.jsx
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AlertProvider } from "/src/layout/context/AlertContext.jsx"; // Import AlertProvider
import "./index.scss";
import HomePage from "./pages/HomePage.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import Login from "./layout/auth/components/Login.jsx";
import Register from "./layout/auth/components/register.jsx";
import CreateProject from "./layout/project/CreateProject.jsx";
import ListProjects from "./layout/project/ListProjects.jsx";
import { CharitableOrganizationsProvider } from "./layout/context/CharitableOrganizationsProvider.jsx";
import CharitableDetails from "./layout/charitable/CharitableDetails.jsx";
import CreateCharitable from "./layout/charitable/CreateCharitable.jsx";
import Donate from "./layout/project/donate.jsx";
import Contact from "./layout/components/contact.jsx";
import { LoadingProvider } from "./layout/context/LoadingContext.jsx";
import ProjectDetails from "./layout/project/ProjectDetails.jsx";
import Statistics from "./components/statistics/StatisticsTable.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import AboutusPage from "./pages/AboutusPage.jsx";
const router = createBrowserRouter([
  {
    path: "/", // Define the root path
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/", // Define the root path
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
        element: <CreateProject />,
      },
      {
        path: "/create-charitable",
        element: <CreateCharitable />,
      },
      {
        path: "/charitable-details",
        element: <CharitableDetails />,
      },
      {
        path: "/charitable-details/list-projects",
        element: <ListProjects />,
      },
      {
        path: "/about-us",
        element: <AboutusPage />,
      },
      {
        path: "/list-projects",
        element: <ListProjects />,
      },
      {
        path: "/project-detail/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/donate/:id",
        element: <Donate />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/statistics-donations",
        element: <StatisticsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CharitableOrganizationsProvider>
    <LoadingProvider>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </LoadingProvider>
  </CharitableOrganizationsProvider>
);
