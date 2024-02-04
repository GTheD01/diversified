import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const MainPage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/home" />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl mb-6">Welcome to our page</h1>
          <div className="flex gap-4">
            <div>
              <Link
                to="/login"
                className="bg-blue-200 px-4 py-2 rounded-2xl cursor-pointer hover:bg-blue-100 shadow-lg"
              >
                Login
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="bg-blue-200 px-4 py-2 rounded-2xl cursor-pointer  hover:bg-blue-100 shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
