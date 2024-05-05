import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ProjectsPage from "./pages/Projects";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/signin", element: <SignInPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/about", element: <AboutPage /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
