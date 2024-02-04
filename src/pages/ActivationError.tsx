import { Link } from "react-router-dom";

const ActivationError = () => {
  return (
    <>
      <div className="bg-transparent text-red-700 font-extrabold text-2xl">
        The activation link already expired or its not valid, try getting new
        one.
      </div>
      <Link to="/login" className="mt-3 underline text-black/70 font-extrabold">
        Back to login
      </Link>
    </>
  );
};

export default ActivationError;
