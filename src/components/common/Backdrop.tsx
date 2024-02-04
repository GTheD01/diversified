const Backdrop = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: React.MouseEventHandler;
}) => {
  return show ? (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black/75"
      onClick={onClick}
    />
  ) : null;
};

export default Backdrop;
