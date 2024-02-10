import { useAppSelector } from "../../redux/hooks";

const Backdrop = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  const { modalState: modalShow } = useAppSelector((state) => state.modal);

  return modalShow ? (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black/75"
      onClick={onClick}
    />
  ) : null;
};

export default Backdrop;
