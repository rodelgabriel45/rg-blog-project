import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import ProjectsPage from "./pages/Projects";
import AboutPage from "./pages/About";
import DashboardPage from "./pages/Dashboard";
import NavRootLayout from "./pages/NavRoot";
import FooterRootLayout from "./pages/FooterRoot";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import UpdatePost from "./pages/UpdatePost";
import Search from "./pages/Search";

const AppLayout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <NavRootLayout />,
        children: [
          {
            path: "/",
            element: <FooterRootLayout />,
            children: [
              { index: true, element: <HomePage /> },
              { path: "/signup", element: <SignUpPage /> },
              { path: "/signin", element: <SignInPage /> },
              {
                element: <PrivateRoute />,
                children: [{ path: "/dashboard", element: <DashboardPage /> }],
              },
              {
                element: <AdminPrivateRoute />,
                children: [
                  { path: "/create-post", element: <CreatePost /> },
                  { path: "/update-post/:id", element: <UpdatePost /> },
                ],
              },
              { path: "/projects", element: <ProjectsPage /> },
              { path: "/about", element: <AboutPage /> },
              { path: "/post/:postSlug", element: <PostDetails /> },
              { path: "/search", element: <Search /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
