import { useShortUrl } from "../../hooks";
import Form from "./Form";

export default function ShortUrlForm() {
  const { original_url, isLoading, onChange, onSubmit } = useShortUrl();
  const config = [
    {
      labelText: "Original Url",
      labelId: "original_url",
      type: "text",
      value: original_url,
      required: true,
    },
  ];

  return (
    <div className="p-4 sm:p-8 bg-sky-100">
      <Form
        config={config}
        isLoading={isLoading}
        btnText="Add Short Url"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
