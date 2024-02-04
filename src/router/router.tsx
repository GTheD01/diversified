import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/auth/Home";

import Login from "../pages/Login";
import Root from "../pages/Root";
import Register from "../pages/Register";
import ActivationPage from "../pages/Activation";
import ActivationError from "../pages/ActivationError";
import { RequireAuth } from "../components/utils/RequireAuth";
import MainPage from "../pages/MainPage";
import PasswordReset from "../pages/PasswordReset";
import PasswordResetConfirm from "../pages/PasswordResetConfirm";
import Error from "../pages/Error";
import About from "../pages/auth/About";
import TodoList from "../pages/auth/TodoList";
import Expenses from "../pages/auth/Expenses";
import ShortUrl from "../pages/auth/ShortUrl";
import RedirectUrl from "../pages/RedirectUrl";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/activation/:uid/:token",
        element: <ActivationPage />,
        errorElement: <ActivationError />,
      },
      {
        path: "password-reset",
        element: <PasswordReset />,
      },
      {
        path: "password-reset/:uid/:token",
        element: <PasswordResetConfirm />,
      },
    ],
  },
  {
    path: "home",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "about",
    element: (
      <RequireAuth>
        <About />
      </RequireAuth>
    ),
  },
  {
    path: "to-do",
    element: (
      <RequireAuth>
        <TodoList />
      </RequireAuth>
    ),
  },
  {
    path: "expenses",
    element: (
      <RequireAuth>
        <Expenses />
      </RequireAuth>
    ),
  },
  {
    path: "shorturls",
    element: (
      <RequireAuth>
        <ShortUrl />
      </RequireAuth>
    ),
  },
  {
    path: ":id",
    element: <RedirectUrl />,
  },
]);
