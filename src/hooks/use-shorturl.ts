import { ChangeEvent, FormEvent, useState } from "react";
import { useCreateShortUrlMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useShortUrl() {
  const [createShortUrl, { isLoading }] = useCreateShortUrlMutation();

  const [formData, setFormData] = useState({
    original_url: "",
  });

  const { original_url } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createShortUrl({ original_url })
      .unwrap()
      .then(() => {
        toast.success("Short Url successfully created.");
      })
      .catch(() => {
        toast.error("Failed to add Short Url");
      });
  };

  return {
    original_url,
    isLoading,
    onChange,
    onSubmit,
  };
}