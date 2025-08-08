import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <SignUp />
  }
]);