"use client";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Spinner } from "../common/Spinner";
import Navbar from "../pagecomponents/Navbar";

import UserProfile from "../pagecomponents/UserProfile";

interface Props {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const date = new Date().getFullYear();

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

  return (
    <>
      <div className="flex justify-between h-full items-start">
        <Navbar />
        <div className="w-2/4 py-6">{children}</div>
        <UserProfile />
        <footer className="fixed bottom-0 m-4">
          <p className="text-gray-600 text-xs sm:text-sm">
            Copyright&copy; {date} Georgi. All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
};
