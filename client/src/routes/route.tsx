import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/layout";
import Home from "../pages/Home";
import PropertyDetails from "../pages/PropertyDetails";
import Login from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../Layout/PrivateRoute";
import Residencies from "../pages/Residencies";
import FavoritesPage from "../pages/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "residencies",
        element: (
          <PrivateRoute>
            <Residencies />
          </PrivateRoute>
        )
      },
      {
        path: "residencies/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        )
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        )
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <SignUpPage />
  },
]);

export default router;
