"use client";

import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Spinner } from "../common/Spinner";
import Navbar from "../pagecomponents/Navbar";

import UserProfile from "../pagecomponents/UserProfile";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { darkMode, lightMode } from "../../redux/features/userProfileSlice";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const { modeTheme } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const date = new Date().getFullYear();

  useEffect(() => {
    const body = document.querySelector("body");
    if (modeTheme === "dark") {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
    }
  }, [modeTheme]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const modeThemeHandler = () => {
    modeTheme === "dark" ? dispatch(lightMode()) : dispatch(darkMode());
  };

  return (
    <>
      <div className="flex justify-between h-full items-start dark:bg-gray-700">
        <Navbar />
        <div className="w-2/4 py-6">{children}</div>
        <div className="flex items-center justify-center">
          <button
            className="bg-white hover:bg-gray-200 rounded-full p-2"
            onClick={modeThemeHandler}
          >
            {modeTheme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
          <UserProfile />
        </div>
        <footer className="fixed bottom-0 m-4">
          <p className="text-gray-600 text-xs sm:text-sm dark:text-white">
            Copyright&copy; {date} Georgi. All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};
