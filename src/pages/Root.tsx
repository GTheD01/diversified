import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Outlet />
    </div>
  );
};

export default Root;
