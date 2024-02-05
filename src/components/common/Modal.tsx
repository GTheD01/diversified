import { ReactNode, useEffect } from "react";
import { modalClose } from "../../redux/features/modalSlice";
import { useAppDispatch } from "../../redux/hooks";

interface modalProps {
  onClick: () => void;
  label: string;
  children: ReactNode;
}

const Modal: React.FC<modalProps> = ({ onClick, label, children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(modalClose());
      }
    };
    window.addEventListener("keydown", escapeHandler);

    return () => {
      window.removeEventListener("keydown", escapeHandler);
    };
  }, []);

  return (
    <div className="bg-sky-200 fixed flex items-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex-col rounded-3xl p-4 max-w-[700px] z-30 w-1/3 min-w-[250px]">
      <div className="relative w-full">
        <h1 className=" font-bold">{label}</h1>
        <button
          className="absolute top-0 right-0 hover:scale-150"
          onClick={onClick}
        >
          X
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
