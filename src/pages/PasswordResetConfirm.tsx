import PasswordResetConfirmForm from "../components/forms/PasswordResetConfirmForm";
import { useParams } from "react-router-dom";

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();

  return <PasswordResetConfirmForm uid={uid!} token={token!} />;
};

export default PasswordResetConfirm;
