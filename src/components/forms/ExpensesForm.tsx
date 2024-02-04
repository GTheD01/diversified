import { useExpenses } from "../../hooks";
import Form from "./Form";

export default function LoginForm() {
  const { label, price, isLoading, onChange, onSubmit } = useExpenses();
  const config = [
    {
      labelText: "Label",
      labelId: "label",
      type: "text",
      value: label,
      required: true,
    },
    {
      labelText: "Price",
      labelId: "price",
      type: "number",
      value: price,
      required: true,
    },
  ];

  return (
    <div className="p-8">
      <Form
        config={config}
        isLoading={isLoading}
        btnText="Add"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
