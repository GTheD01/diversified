import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useCreateExpenseMutation } from "../redux/features/authApiSlice";
import { modalClose } from "../redux/features/modalSlice";
import { toast } from "react-toastify";

export default function useExpenses() {
  const dispatch = useAppDispatch();

  const [createExpense, { isLoading }] = useCreateExpenseMutation();

  const [formData, setFormData] = useState({
    label: "",
    price: "",
  });

  const { label, price } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createExpense({ label, price })
      .unwrap()
      .then(() => {
        dispatch(modalClose());
        toast.success("Expense successfully created.");
      })
      .catch((error) => {
        console.error(error);
        if (error && error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error("Failed to add Expense");
        }
      });
  };

  return {
    label,
    price,
    isLoading,
    onChange,
    onSubmit,
  };
}
