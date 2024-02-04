import { Form } from "react-router-dom";
import { Spinner } from "../common/Spinner";
import { useTodos } from "../../hooks";

export default function TodoForm() {
  const { label, description, isLoading, onChange, onSubmit } = useTodos();

  return (
    <Form
      className="space-y-6 p-12 w-full max-w-96"
      onSubmit={onSubmit}
      method="POST"
    >
      <div key="label">
        <label
          htmlFor="label"
          className="block text-sm font-medium leading-6 text-gray-900 mr-4"
        >
          Todo Label
        </label>
        <input
          id="label"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 outline-none"
          name="label"
          type="text"
          onChange={onChange}
          value={label}
          required={true}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="todo">Todo Description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={onChange}
          className="outline-none resize-none p-1"
          cols={30}
          maxLength={255}
          rows={3}
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? <Spinner sm /> : `Add Todo`}
        </button>
      </div>
    </Form>
  );
}
