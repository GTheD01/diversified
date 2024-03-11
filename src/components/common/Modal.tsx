import { ReactNode, useEffect, useState } from "react";
import { modalClose } from "../../redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface modalProps {
  label: string;
  children: ReactNode;
}

const Modal: React.FC<modalProps> = ({ label, children }) => {
  const dispatch = useAppDispatch();

  const { modalState: modalShow } = useAppSelector((state) => state.modal);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(modalShow);
  }, [modalShow]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(modalClose());
    }, 300);
  };

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const backdrop = document.querySelector(".backdrop");

    const backdropClickHandler = (e: MouseEvent) => {
      if (e.target === backdrop) {
        closeModal();
      }
    };
    window.addEventListener("keydown", escapeHandler);
    window.addEventListener("click", backdropClickHandler);

    return () => {
      window.removeEventListener("keydown", escapeHandler);
      window.removeEventListener("click", backdropClickHandler);
    };
  }, []);

  return (
    <div className="bg-black/50 fixed inset-0 backdrop">
      <div
        className={`bg-sky-200 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-3xl p-4 max-w-[700px] z-30 w-1/3 min-w-[250px] transition-opacity duration-300`}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full">
            <h1 className=" font-bold">{label}</h1>
            <button
              className="absolute top-0 right-0 hover:scale-150"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
