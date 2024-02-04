import { Link } from "react-router-dom";
import Form from "./Form";
import { useLogin } from "../../hooks";

export default function LoginForm() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();

  const config = [
    {
      labelText: "Email address",
      labelId: "email",
      type: "email",
      value: email,
      required: true,
    },
    {
      labelText: "Password",
      labelId: "password",
      type: "password",
      value: password,
      link: {
        linkText: "Forgot password?",
        linkUrl: "/password-reset",
      },
      required: true,
    },
  ];

  return (
    <div>
      <Form
        config={config}
        isLoading={isLoading}
        btnText="Sign in"
        onChange={onChange}
        onSubmit={onSubmit}
      />
      <Link
        to="/register"
        className="text-indigo-600 hover:text-indigo-500 font-semibold"
      >
        Don't have an account?
      </Link>
    </div>
  );
}
