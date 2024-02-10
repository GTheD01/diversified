import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { ReactNode } from "react";

const ModalPortal = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler;
  children: ReactNode;
}) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick} />,
        document.getElementById("backdrop")!
      )}
      {ReactDOM.createPortal(children, document.getElementById("overlays")!)}
    </div>
  );
};

export default ModalPortal;
