import { NavLink } from "react-router-dom";

interface NavLinkProps {
  to: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function CustomLink({ to, label, icon }: NavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `bg-sky-200 p-2 lg:text-2xl text-center sm:text-xl font-semibold flex items-center gap-2`
          : `lg:text-xl hover:bg-sky-100 p-2 sm:text-lg flex items-center gap-2`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
