import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  labelId: string;
  link?: {
    linkText: string;
    linkUrl: string;
  };
  required?: boolean;
}

const Input = ({
  children,
  type,
  onChange,
  value,
  labelId,
  link,
  required = false,
}: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6 text-gray-900 mr-4"
        >
          {children}
        </label>
        {link && (
          <div className="text-sm">
            <Link
              to={link.linkUrl}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {link.linkText}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={labelId}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2"
          name={labelId}
          type={type}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
};

export default Input;
