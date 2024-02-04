import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActivationMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { uid, token } = useParams();
  const [activation] = useActivationMutation();
  const navigate = useNavigate();

  useEffect(() => {
    activation({ uid, token })
      .unwrap()
      .then(() => {
        toast.success("Account activated");
      })
      .catch(() => {
        toast.error("Failed account activation");
      })
      .finally(() => {
        navigate("/login");
      });
  }, []);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Activating your account...
        </h1>
      </div>
    </div>
  );
};

export default ActivationPage;
