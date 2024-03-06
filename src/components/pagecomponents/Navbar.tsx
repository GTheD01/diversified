import CustomLink from "../common/CustomLink";
import { FaHouse } from "react-icons/fa6";
import { FcTodoList } from "react-icons/fc";
import { GiExpense } from "react-icons/gi";
import { IoIosInformationCircle } from "react-icons/io";
import { FaLink } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="m-4">
      <nav className="flex flex-col gap-2 dark:text-white">
        <CustomLink to="/home" label="Home" icon={<FaHouse />} />
        <CustomLink
          to="/about"
          label="About"
          icon={<IoIosInformationCircle />}
        />
        <CustomLink to="/to-do" label="To-Do List" icon={<FcTodoList />} />
        <CustomLink to="/expenses" label="Expenses" icon={<GiExpense />} />
        <CustomLink to="/shorturls" label="Short Urls" icon={<FaLink />} />
      </nav>
    </div>
  );
};

export default Navbar;
