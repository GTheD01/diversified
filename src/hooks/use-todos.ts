import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useCreateTodoMutation } from "../redux/features/authApiSlice";
import { modalClose } from "../redux/features/modalSlice";
import { toast } from "react-toastify";

export default function useTodos() {
  const dispatch = useAppDispatch();

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const [formData, setFormData] = useState({
    label: "",
    description: "",
  });

  const { label, description } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo({ label, description })
      .unwrap()
      .then(() => {
        dispatch(modalClose());
        toast.success("Todo successfully created.");
      })
      .catch((error) => {
        if (error && error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error("Failed to add todo.");
        }
      });
  };

  return {
    label,
    description,
    isLoading,
    onChange,
    onSubmit,
  };
}
