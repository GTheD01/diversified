import { toast } from "react-toastify";
import {
  useDeleteTodosMutation,
  useRetrieveTodosQuery,
} from "../../redux/features/authApiSlice";
import { Spinner } from "../common/Spinner";

const TodoList = () => {
  const { data: todos, isLoading, isFetching } = useRetrieveTodosQuery();
  const [deleteTodo] = useDeleteTodosMutation();

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    toast.success("Todo successfully deleted.");
  };

  return (
    <div>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        todos?.map((todo) => (
          <div
            key={todo.id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <h1 className="font-semibold capitalize mb-2">{todo.label}</h1>
              <p>- {todo.description}</p>
            </div>
            <div>
              <button
                type="submit"
                className="shadow-md rounded-lg"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
